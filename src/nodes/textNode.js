// textNode.js

import { useState } from "react";
import { Handle, Position } from "reactflow";
import BaseNode from "../atom/BaseNode";

export const TextNode = ({ id, data, ...rest }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <BaseNode
      nodeName="Text"
      label={data?.label || "Text Node"}
      description="Text Node"
      nodeIcon=""
      id={id}
      {...rest}
      style={{ width: "auto", minWidth: "200px", maxWidth: "400px" }}
    >
      <div className="flex flex-col gap-2 justify-start p-2">
        <label className="text-xs font-medium text-gray-500">Text:</label>
        <textarea
          className="w-full min-h-[40px] p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
          value={currText}
          onChange={handleTextChange}
          rows={1}
          style={{ height: "auto" }}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
        />
      </div>
      <Handle type="source" position={Position.Right} id={`${id}-output`} />
    </BaseNode>
  );
};
