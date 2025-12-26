import { Editor, Transforms, Range, Text } from "slate";

export const withExpressions = (editor) => {
  const { insertText, isInline } = editor;

  editor.isInline = (el) => (el.type === "expression" ? true : isInline(el));

  editor.insertText = (text) => {
    if (text === "{") {
      const { selection } = editor;
      if (selection && Range.isCollapsed(selection)) {
        const before = Editor.before(editor, selection.anchor, {
          unit: "character",
        });
        if (before) {
          const range = { anchor: before, focus: selection.anchor };
          if (Editor.string(editor, range) === "{") {
            Transforms.delete(editor, { unit: "character", reverse: true });
            Transforms.insertNodes(editor, {
              type: "expression",
              children: [{ text: "" }],
            });
            return;
          }
        }
      }
    }
    insertText(text);
  };

  return editor;
};

export const serialize = (nodes, allNodes) => {
  return nodes
    .map((n) => {
      if (Text.isText(n)) {
        return n.text;
      }
      if (n.type === "expression") {
        const content = n.children.map((c) => c.text).join("");
        const [label, ...path] = content.split(".");
        // If label is missing (e.g. just ".prop"), this might fail, but assuming valid format
        const node = allNodes.find((an) => an.data.label === label);
        // If we found the node, use its ID. Otherwise keep the label (fallback)
        const id = node ? node.id : label;
        return `{{${id}.${path.join(".")}}}`;
      }
      return serialize(n.children, allNodes);
    })
    .join("");
};

export const deserialize = (text = "", allNodes) => {
  const children = [];
  // Split by {{ ... }}
  const parts = text.split(/(\{\{.*?\}\})/g);

  parts.forEach((part) => {
    if (!part) return;

    if (part.startsWith("{{") && part.endsWith("}}")) {
      const content = part.slice(2, -2);
      const [id, ...path] = content.split(".");
      const node = allNodes.find((n) => n.id === id);
      const label = node ? node.data.label : id;

      children.push({
        type: "expression",
        children: [{ text: `${label}.${path.join(".")}` }],
      });
    } else {
      children.push({ text: part });
    }
  });

  if (children.length === 0) {
    children.push({ text: "" });
  }

  return [{ type: "paragraph", children }];
};

export const onKeyDownHandler = (event, editor, position) => {
  const { selection } = editor;
  // 1. Enter key: Prevent splitting expression, insert newline if not suggestion selection
  if (event.key === "Enter") {
    if (position) {
      // Let the portal handle it if suggestion list is open?
      // Actually SuggestionList doesn't listen to keyboard yet,
      // but if we preventDefault here, handleSelect won't trigger if it was keyboard driven.
      // For now, let's just make sure we don't split the node.
      event.preventDefault();
      return;
    }

    // If cursor is inside an expression node, prevent splitting
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "expression",
    });
    if (match) {
      event.preventDefault();
      Transforms.move(editor, { unit: "offset", distance: 1 }); // Just exit
      return;
    }
  }

  // 2. Arrow Right: Fix getting stuck in inline node
  if (event.key === "ArrowRight") {
    if (selection && Range.isCollapsed(selection)) {
      const [match] = Editor.nodes(editor, {
        match: (n) => n.type === "expression",
      });
      if (match) {
        const [, path] = match;
        const end = Editor.end(editor, path);
        if (Range.equals(selection, { anchor: end, focus: end })) {
          // We are at the end of the inline node.
          // Force move 1 unit right to exit it.
          event.preventDefault();
          Transforms.move(editor, { unit: "offset", distance: 1 });
        }
      } else {
        // Check if the next node is an expression to enter it immediately
        const nextPoint = Editor.after(editor, selection);
        if (nextPoint) {
          const [, path] = Editor.node(editor, nextPoint);
          const [parent] = Editor.parent(editor, path);
          if (parent.type === "expression") {
            event.preventDefault();
            Transforms.select(editor, nextPoint);
          }
        }
      }
    }
  }
};
