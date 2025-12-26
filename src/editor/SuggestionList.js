import { useRef, useEffect } from "react";

const SuggestionList = ({ nodes, onSelect, position, onClose }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        zIndex: 100,
        background: "white",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        maxHeight: "200px",
        overflowY: "auto",
      }}
    >
      {nodes.map((node) =>
        Object.keys(node.data.output || {}).map((key) => (
          <div
            key={`${node.id}.${key}`}
            onClick={() =>
              onSelect({
                label: node.data.label,
                id: node.id,
                key,
              })
            }
            style={{
              padding: "4px 8px",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f0f0")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
          >
            {node.data.label}.{key}
          </div>
        ))
      )}
    </div>
  );
};

export default SuggestionList;
