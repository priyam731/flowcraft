// textNode.js
// Enhanced Text node with dynamic sizing and variable detection

import { useState, useMemo, useRef } from "react";
import { Handle, Position, NodeResizer } from "reactflow";
import { useStore } from "../store";
import styles from "./NodeStyles.module.css";

// Regex to match valid JavaScript variable names inside {{ }}
const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

export const TextNode = ({ id, data, selected }) => {
  const [currText, setCurrText] = useState(data?.text || "");
  const textareaRef = useRef(null);
  const deleteNode = useStore((state) => state.deleteNode);

  // Extract unique variables from the text
  const variables = useMemo(() => {
    const matches = [];
    let match;
    const regex = new RegExp(VARIABLE_REGEX);
    while ((match = regex.exec(currText)) !== null) {
      if (!matches.includes(match[1])) {
        matches.push(match[1]);
      }
    }
    return matches;
  }, [currText]);

  // Calculate handle positions for variables
  const getVariableHandlePosition = (index, total) => {
    const headerOffset = 50;
    const bodyHeight = 150;
    if (total === 1) {
      return headerOffset + bodyHeight * 0.5;
    }
    const spacing = bodyHeight / (total + 1);
    return headerOffset + spacing * (index + 1);
  };

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    deleteNode(id);
  };

  return (
    <div
      className={`${styles.nodeContainer} ${
        selected ? styles.nodeSelected : ""
      }`}
      style={{
        "--accent-color": "#3b82f6",
        minWidth: "280px",
        minHeight: "180px",
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      {/* Delete Button - visible when selected */}
      {selected && (
        <button
          className={styles.deleteButton}
          onClick={handleDelete}
          title="Delete node"
        >
          ✕
        </button>
      )}

      {/* Resize Handle - only visible when selected */}
      <NodeResizer
        isVisible={selected}
        minWidth={280}
        minHeight={180}
        handleStyle={{
          width: 8,
          height: 8,
          borderRadius: 2,
          backgroundColor: "#3b82f6",
          border: "2px solid white",
        }}
        lineStyle={{
          borderColor: "#3b82f6",
          borderWidth: 1,
        }}
      />
      {/* Dynamic Variable Handles */}
      {variables.map((variable, index) => (
        <Handle
          key={`var-${variable}`}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          className={`${styles.handle} ${styles.variableHandle}`}
          style={{
            top: `${getVariableHandlePosition(index, variables.length)}px`,
            backgroundColor: "#10b981",
          }}
          title={variable}
        />
      ))}

      {/* Variable Labels */}
      {variables.map((variable, index) => (
        <span
          key={`label-${variable}`}
          style={{
            position: "absolute",
            left: "18px",
            top: `${getVariableHandlePosition(index, variables.length)}px`,
            transform: "translateY(-50%)",
            fontSize: "10px",
            color: "#10b981",
            fontWeight: 600,
            background: "rgba(255, 255, 255, 0.95)",
            padding: "2px 6px",
            borderRadius: "4px",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          {variable}
        </span>
      ))}

      {/* Node Header */}
      <div className={styles.nodeHeader} style={{ backgroundColor: "#3b82f6" }}>
        <span className={styles.nodeIcon}>📝</span>
        <span className={styles.nodeTitle}>Text</span>
      </div>

      {/* Node Body */}
      <div className={styles.nodeBody}>
        <div className={styles.nodeField}>
          <label className={styles.fieldLabel}>Text Content</label>
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            placeholder="Enter text here... Use {{variableName}} to create input handles"
            className={styles.fieldTextarea}
            style={{
              height: "80px",
              maxHeight: "80px",
              overflowY: "auto",
              resize: "none",
            }}
          />
        </div>
        {variables.length > 0 && (
          <div
            style={{
              fontSize: "11px",
              color: "#64748b",
              display: "flex",
              flexWrap: "wrap",
              gap: "4px",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: 600 }}>Variables:</span>
            {variables.map((v) => (
              <span
                key={v}
                style={{
                  background: "#ecfdf5",
                  color: "#059669",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontSize: "10px",
                  fontWeight: 500,
                }}
              >
                {v}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className={styles.handle}
        style={{
          top: "50%",
          backgroundColor: "#3b82f6",
        }}
        title="Output"
      />
    </div>
  );
};
