import { useState } from "react";
import { useStore } from "../store";
import "./baseNode.css";
import { twMerge } from "tailwind-merge";
const BaseNode = ({
  nodeName,
  label,
  description,
  children,
  nodeIcon,
  id,
  style,
  className,
}) => {
  const [isEditingLabel, setIsEditingLabel] = useState(false);
  const { updateNodeField } = useStore();

  const baseContainerClassNames = twMerge(
    "w-[13.75rem] bg-white border border-gray-300 rounded-lg shadow-md font-sans",
    className || ""
  );
  return (
    <div className={baseContainerClassNames} style={style}>
      {/* Header */}
      <div className="node-header">
        <div className="node-title">
          {nodeIcon && <span className="node-icon">{nodeIcon}</span>}
          <span className="node-name">{nodeName}</span>
        </div>
        {description && <div className="node-description">{description}</div>}
      </div>

      {/* Body */}
      <div className="node-body">
        <div className="label-container">
          {isEditingLabel ? (
            <input
              value={label}
              onBlur={() => setIsEditingLabel(false)}
              onChange={(e) => updateNodeField(id, "label", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setIsEditingLabel(false)}
              autoFocus
            />
          ) : (
            <>
              {label && (
                <div
                  onDoubleClick={() => setIsEditingLabel(true)}
                  className="node-label"
                >
                  {label}
                </div>
              )}
            </>
          )}
        </div>

        {children && <div className="node-children">{children}</div>}
      </div>
    </div>
  );
};

export default BaseNode;
