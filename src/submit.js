// submit.js

import { toast } from "react-toastify";
import { nodeServices } from "./services/nodesServices";
import { useStore } from "./store";

export const SubmitButton = () => {
  const { nodes, edges } = useStore();

  const onSubmit = async () => {
    const body = {
      nodes,
      edges,
    };
    const response = await nodeServices.addPipeline(body);
    const message = `Your pipeline contains ${response.num_nodes} nodes and ${
      response.num_edges
    } edges. 
It ${
      response.is_dag ? "forms" : "does not form"
    } a directed acyclic graph (DAG).`;
    toast.success(message);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button type="submit" onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
};
