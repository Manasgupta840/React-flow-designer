// submit.js

import { useStore } from "./store";

export const SubmitButton = () => {
  const { nodes, edges } = useStore();

  const onSubmit = () => {
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
