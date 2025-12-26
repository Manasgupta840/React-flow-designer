import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import { ReactFlowProvider } from "@xyflow/react";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <ReactFlowProvider>
        <PipelineToolbar />
        <PipelineUI />
      </ReactFlowProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
