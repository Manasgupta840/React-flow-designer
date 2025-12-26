import { PipelineToolbar } from "./layout/toolbar";
import { PipelineUI } from "./layout/ui";
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
