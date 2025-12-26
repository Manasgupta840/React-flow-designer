// inputNode.js

import { useState } from "react";
import { Handle, Position } from "reactflow";
import { FileText } from "lucide-react";
import BaseNode from "../atom/BaseNode";
import { useStore } from "../store";
import Label from "../atom/Label";

export const InputNode = ({ id, data, ...rest }) => {
  const { updateNodeOutput } = useStore();
  const [currText, setCurrText] = useState(data?.output?.inputValue);
  const [inputType, setInputType] = useState(data?.inputType || "Text");

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    updateNodeOutput(id, { inputValue: e.target.value });
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      nodeName="Input"
      label={data?.label || "Input Node"}
      description="Input Node"
      nodeIcon={<FileText className="w-4 h-4" />}
      id={id}
      {...rest}
    >
      <div>
        <Label label="Type:" />
        <select
          value={inputType}
          onChange={handleTypeChange}
          className="ml-2 text-sm"
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
      <textarea
        className="w-full min-h-[40px] mt-2 p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
        value={currText}
        onChange={handleTextChange}
        rows={1}
        placeholder="Enter input value"
        style={{ height: "auto" }}
        onInput={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
      />
      <Handle type="source" position={Position.Right} id={`${id}-value`} />
    </BaseNode>
  );
};
