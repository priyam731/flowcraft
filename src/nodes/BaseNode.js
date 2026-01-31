// BaseNode.js
// A reusable node abstraction that provides common functionality for all nodes

import React from "react";
import { Handle, Position, NodeResizer } from "reactflow";
import { useStore } from "../store";
import styles from "./NodeStyles.module.css";

/**
 * BaseNode - A flexible, configurable node component
 *
 * @param {Object} props
 * @param {string} props.id - The unique node ID
 * @param {string} props.title - The node title/label
 * @param {string} props.icon - Optional icon for the node header
 * @param {Array} props.inputs - Array of input handle configurations
 * @param {Array} props.outputs - Array of output handle configurations
 * @param {React.ReactNode} props.children - The node content/body
 * @param {string} props.accentColor - The accent color for the node (default: #6366f1)
 * @param {Object} props.style - Additional styles for the node container
 * @param {string} props.className - Additional CSS class names
 */
export const BaseNode = ({
  id,
  title,
  icon,
  inputs = [],
  outputs = [],
  children,
  accentColor = "#6366f1",
  style = {},
  className = "",
  minWidth = 220,
  minHeight = 80,
  selected = false,
  showHandleLabels = false,
}) => {
  const deleteNode = useStore((state) => state.deleteNode);

  // Calculate handle positions evenly distributed
  const getHandlePosition = (index, total) => {
    if (total === 1) return 50;
    const spacing = 100 / (total + 1);
    return spacing * (index + 1);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    deleteNode(id);
  };

  return (
    <div
      className={`${styles.nodeContainer} ${
        selected ? styles.nodeSelected : ""
      } ${className}`}
      style={{
        "--accent-color": accentColor,
        minWidth: `${minWidth}px`,
        minHeight: `${minHeight}px`,
        width: "100%",
        height: "100%",
        ...style,
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
        minWidth={minWidth}
        minHeight={minHeight}
        handleStyle={{
          width: 8,
          height: 8,
          borderRadius: 2,
          backgroundColor: accentColor,
          border: "2px solid white",
        }}
        lineStyle={{
          borderColor: accentColor,
          borderWidth: 1,
        }}
      />
      {/* Input Handles */}
      {inputs.map((input, index) => (
        <Handle
          key={`input-${input.id || index}`}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id || `input-${index}`}`}
          className={styles.handle}
          style={{
            top: `${getHandlePosition(index, inputs.length)}%`,
            backgroundColor: input.color || accentColor,
          }}
          title={input.label || input.id}
        />
      ))}

      {/* Node Header */}
      <div
        className={styles.nodeHeader}
        style={{ backgroundColor: accentColor }}
      >
        {icon && <span className={styles.nodeIcon}>{icon}</span>}
        <span className={styles.nodeTitle}>{title}</span>
      </div>

      {/* Node Body */}
      <div className={styles.nodeBody}>{children}</div>

      {/* Output Handles */}
      {outputs.map((output, index) => (
        <Handle
          key={`output-${output.id || index}`}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id || `output-${index}`}`}
          className={styles.handle}
          style={{
            top: `${getHandlePosition(index, outputs.length)}%`,
            backgroundColor: output.color || accentColor,
          }}
          title={output.label || output.id}
        />
      ))}

      {/* Handle Labels (optional) */}
      {showHandleLabels && (
        <div className={styles.handleLabels}>
          {inputs.map(
            (input, index) =>
              input.label && (
                <span
                  key={`label-input-${index}`}
                  className={styles.handleLabelLeft}
                  style={{ top: `${getHandlePosition(index, inputs.length)}%` }}
                >
                  {input.label}
                </span>
              ),
          )}
          {outputs.map(
            (output, index) =>
              output.label && (
                <span
                  key={`label-output-${index}`}
                  className={styles.handleLabelRight}
                  style={{
                    top: `${getHandlePosition(index, outputs.length)}%`,
                  }}
                >
                  {output.label}
                </span>
              ),
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Field Components - Reusable form elements for node content
 */
export const NodeField = ({ label, children, className = "" }) => (
  <div className={`${styles.nodeField} ${className}`}>
    {label && <label className={styles.fieldLabel}>{label}</label>}
    {children}
  </div>
);

export const NodeInput = ({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  ...props
}) => (
  <NodeField label={label}>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={styles.fieldInput}
      {...props}
    />
  </NodeField>
);

export const NodeSelect = ({
  label,
  value,
  onChange,
  options = [],
  ...props
}) => (
  <NodeField label={label}>
    <select
      value={value}
      onChange={onChange}
      className={styles.fieldSelect}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </NodeField>
);

export const NodeTextArea = ({
  label,
  value,
  onChange,
  placeholder = "",
  rows = 3,
  ...props
}) => (
  <NodeField label={label}>
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={styles.fieldTextarea}
      rows={rows}
      {...props}
    />
  </NodeField>
);

export const NodeCheckbox = ({ label, checked, onChange, ...props }) => (
  <div className={styles.checkboxField}>
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={styles.fieldCheckbox}
      {...props}
    />
    {label && <label className={styles.checkboxLabel}>{label}</label>}
  </div>
);

export default BaseNode;
