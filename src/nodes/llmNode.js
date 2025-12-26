// llmNode.js

import { Handle, Position } from "reactflow";
import { Sparkles } from "lucide-react";
import BaseNode from "../atom/BaseNode";

export const LLMNode = ({ id, data, ...rest }) => {
  return (
    <BaseNode
      nodeName="LLM"
      label={data?.label || "LLM Node"}
      description="LLM Node"
      nodeIcon={<Sparkles className="w-4 h-4" />}
      id={id}
      {...rest}
    >
      {/* Handles */}
      <Handle type="source" position={Position.Right} id={`${id}-response`} />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        style={{ top: `${100 / 3}%` }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        style={{ top: `${200 / 3}%` }}
      />
    </BaseNode>
  );
};
