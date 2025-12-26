// textNode.js

import { Handle, Position } from "reactflow";
import { MessageSquareText } from "lucide-react";
import BaseNode from "../atom/BaseNode";
import ExpressionEditor from "../editor/ExpressionEditor";
import Label from "../atom/Label";

export const TextNode = ({ id, data, ...rest }) => {
  return (
    <BaseNode
      nodeName="Text"
      label={data?.label || "Text Node"}
      description="Text Node"
      nodeIcon={<MessageSquareText className="w-4 h-4" />}
      id={id}
      {...rest}
      style={{
        width: "auto",
        minWidth: "250px",
        maxWidth: "400px",
        height: "auto",
        minHeight: "50px",
      }}
    >
      <div className="flex flex-col gap-2 justify-start p-2">
        <Label label="Text" />
        <ExpressionEditor currentNodeId={id} inputKeyLabel="message" />
      </div>
      <Handle type="source" position={Position.Right} id={`${id}-output`} />
      <Handle type="target" position={Position.Left} id={`${id}-value`} />
    </BaseNode>
  );
};
