// outputNode.js

import { useState } from "react";
import { Handle, Position } from "reactflow";
import BaseNode from "../atom/BaseNode";
import Label from "../atom/Label";

export const OutputNode = ({ id, data, ...rest }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      nodeName="Output"
      label={data?.label || "Output Node"}
      description="Output Node"
      nodeIcon=""
      id={id}
      {...rest}
    >
      <div>
        <Label label="Type:" />
        <select
          value={outputType}
          onChange={handleTypeChange}
          className="ml-2 text-sm"
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
      <Handle type="target" position={Position.Left} id={`${id}-value`} />
    </BaseNode>
  );
};
