// toolbar.js

import { DraggableNode } from "../atom/draggableNode";
import { SubmitButton } from "./submit";

export const PipelineToolbar = () => {
  return (
    <div className="flex flex-wrap gap-2 p-2 justify-between">
      <div className="flex flex-wrap gap-2">
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
      </div>
      <div className="flex flex-wrap gap-2 mr-2">
        <SubmitButton />
      </div>
    </div>
  );
};
