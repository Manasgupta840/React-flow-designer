// submit.js

import { nodeServices } from "./services/nodesServices";
import { useStore } from "./store";

export const SubmitButton = () => {
  const { nodes, edges } = useStore();

  const onSubmit = () => {
    const body = {
      nodes,
      edges,
    };
    nodeServices.addPipeline(body);
    console.log(nodes, edges);
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
