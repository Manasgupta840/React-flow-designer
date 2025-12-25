// inputNode.js

import { useState } from "react";
import { Handle, Position } from "reactflow";
import BaseNode from "../atom/BaseNode";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };
  console.log(data);

  return (
    <BaseNode
      nodeName="Input"
      label={data?.label || "Input Node"}
      description="Input Node"
      nodeIcon=""
      id={id}
    >
      <div className="node-title">
        <label>
          Name:
          <input type="text" value={currName} onChange={handleNameChange} />
        </label>
        <label>
          Type:
          <select value={inputType} onChange={handleTypeChange}>
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
      <Handle type="source" position={Position.Right} id={`${id}-value`} />
    </BaseNode>
  );
};
