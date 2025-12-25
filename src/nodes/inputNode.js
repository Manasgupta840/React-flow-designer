// inputNode.js

import { useState } from "react";
import { Handle, Position } from "reactflow";
import BaseNode from "../atom/BaseNode";

export const InputNode = ({ id, data, ...rest }) => {
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

  return (
    <BaseNode
      nodeName="Input"
      label={data?.label || "Input Node"}
      description="Input Node"
      nodeIcon=""
      id={id}
      {...rest}
    >
      <div className="node-title">
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
