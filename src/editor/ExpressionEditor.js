import { useMemo, useState, useEffect } from "react";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import { createEditor, Range, Editor, Transforms } from "slate";
import { serialize, deserialize, withExpressions } from "./helpers";
import Element from "./Element";
import SuggestionList from "./SuggestionList";
import { useStore } from "../store";
import { Portal } from "../atom/Portal";

export default function ExpressionEditor({ currentNodeId, inputKeyLabel }) {
  const [editor] = useState(() => withExpressions(withReact(createEditor())));
  const { nodes, edges } = useStore();

  // Initialize value from the store's current state for this node
  // We use useMemo so it only calculates once on mount (or when currentNodeId changes)
  // Warning: If `nodes` aren't loaded yet, this might be empty.
  // But typically editor opens *after* nodes are present.
  const initialValue = useMemo(() => {
    const node = nodes.find((n) => n.id === currentNodeId);
    const message = node?.data?.output?.[inputKeyLabel] || "";
    return deserialize(message, nodes);
  }, [currentNodeId, inputKeyLabel, nodes]); // Logic allows re-calc if nodes load later? No, Slate initialValue is uncontrolled.

  // We actually need to control the value if we want it to update from outside,
  // but Slate `initialValue` is only read once.
  // For a controlled input feel, we just set it once on mount.

  const [value, setValue] = useState(initialValue);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [node] = Editor.parent(editor, selection);
      if (node.type === "expression") {
        const domRange = window.getSelection()?.getRangeAt(0);
        if (!domRange) return;
        const rect = domRange.getBoundingClientRect();
        setPosition({ top: rect.bottom + window.scrollY, left: rect.left });
        return;
      }
    }
    setPosition(null);
  }, [editor.selection]);

  const handleSelect = ({ label, id, key }) => {
    const text = `${label}.${key}`;
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "expression",
    });

    if (match) {
      // If inside expression, replace its content
      // Select the entire expression text content
      Transforms.select(editor, match[1]);
      Transforms.insertText(editor, text);
    } else {
      // Otherwise insert new expression node
      Transforms.insertNodes(editor, {
        type: "expression",
        children: [{ text }],
      });
    }

    // Force move cursor outside the inline node to close suggestion list
    // Move to next point (which should be outside the inline node)
    Transforms.move(editor, { unit: "offset", distance: 1 });

    ReactEditor.focus(editor);
    setPosition(null);
  };

  const sources = useMemo(() => {
    return edges.filter((n) => n.target === currentNodeId).map((n) => n.source);
  }, [edges, currentNodeId]);

  return (
    <Slate
      editor={editor}
      initialValue={value}
      onChange={(v) => {
        setValue(v);

        // Serialize to store format (IDs)
        const stored = serialize(v, nodes);

        // Update store
        useStore.getState().updateNodeOutput(currentNodeId, {
          [inputKeyLabel]: stored,
        });
      }}
    >
      <Editable
        renderElement={(props) => <Element {...props} />}
        className="nodrag hover:cursor-text p-2 border rounded"
        placeholder="Type here... Use {{ to start expression"
        onInput={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
        autoFocus
      />
      {position && (
        <Portal>
          <SuggestionList
            position={position}
            nodes={nodes.filter(
              (n) => n.id !== currentNodeId && sources.includes(n.id)
            )}
            onSelect={handleSelect}
            onClose={() => setPosition(null)}
          />
        </Portal>
      )}
    </Slate>
  );
}
