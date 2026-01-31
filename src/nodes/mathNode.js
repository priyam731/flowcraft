// mathNode.js
// Math node for performing calculations

import { useState } from "react";
import { BaseNode, NodeSelect, NodeInput } from "./BaseNode";
import styles from "./NodeStyles.module.css";

export const MathNode = ({ id, data, selected }) => {
  const [operation, setOperation] = useState(data?.operation || "add");
  const [constant, setConstant] = useState(data?.constant || "");

  const operationOptions = [
    { value: "add", label: "Add (+)" },
    { value: "subtract", label: "Subtract (−)" },
    { value: "multiply", label: "Multiply (×)" },
    { value: "divide", label: "Divide (÷)" },
    { value: "modulo", label: "Modulo (%)" },
    { value: "power", label: "Power (^)" },
    { value: "sqrt", label: "Square Root (√)" },
    { value: "abs", label: "Absolute Value" },
  ];

  return (
    <BaseNode
      id={id}
      title="Math"
      icon="🔢"
      inputs={[
        { id: "a", label: "A" },
        { id: "b", label: "B" },
      ]}
      outputs={[{ id: "result", label: "Result" }]}
      accentColor="#06b6d4"
      minWidth={220}
      minHeight={180}
      selected={selected}
    >
      <p className={styles.nodeDescription}>
        Perform mathematical operations on input values.
      </p>
      <NodeSelect
        label="Operation"
        value={operation}
        onChange={(e) => setOperation(e.target.value)}
        options={operationOptions}
      />
      <NodeInput
        label="Constant (optional)"
        value={constant}
        onChange={(e) => setConstant(e.target.value)}
        placeholder="Use instead of B"
        type="number"
      />
    </BaseNode>
  );
};
