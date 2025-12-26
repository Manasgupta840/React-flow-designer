export const getDefaultOutputBasedOnNodeType = (nodeType) => {
  switch (nodeType) {
    case "customInput":
      return { inputValue: "" };
    case "llm":
      return { response: "" };
    case "customOutput":
      return { value: "" };
    case "text":
      return { message: "" };
    default:
      return {};
  }
};

export const getInitNodeData = (nodeID, type, label) => {
  const output = getDefaultOutputBasedOnNodeType(type);
  let nodeData = { id: nodeID, nodeType: `${type}`, label, output };
  return nodeData;
};
