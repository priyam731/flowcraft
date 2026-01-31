// conditionNode.js
// Conditional logic node (if/else branching)

import { useState } from "react";
import { BaseNode, NodeInput, NodeSelect, NodeCheckbox } from "./BaseNode";
import styles from "./NodeStyles.module.css";

export const ConditionNode = ({ id, data, selected }) => {
  const [conditionType, setConditionType] = useState(
    data?.conditionType || "equals"
  );
  const [compareValue, setCompareValue] = useState(data?.compareValue || "");
  const [caseSensitive, setCaseSensitive] = useState(
    data?.caseSensitive || false
  );

  const conditionOptions = [
    { value: "equals", label: "Equals" },
    { value: "not_equals", label: "Not Equals" },
    { value: "is_empty", label: "Is Empty" },
    { value: "is_not_empty", label: "Is Not Empty" },
    { value: "is_true", label: "Is True" },
    { value: "is_false", label: "Is False" },
    { value: "contains", label: "Contains" },
    { value: "regex_match", label: "Regex Match" },
  ];

  return (
    <BaseNode
      id={id}
      title="Condition"
      icon="❓"
      inputs={[{ id: "input", label: "Input" }]}
      outputs={[
        { id: "true", label: "True", color: "#10b981" },
        { id: "false", label: "False", color: "#ef4444" },
      ]}
      accentColor="#f97316"
      minWidth={240}
      minHeight={200}
      selected={selected}
    >
      <p className={styles.nodeDescription}>
        Branch the pipeline based on conditions.
      </p>
      <NodeSelect
        label="Condition"
        value={conditionType}
        onChange={(e) => setConditionType(e.target.value)}
        options={conditionOptions}
      />
      <NodeInput
        label="Compare To"
        value={compareValue}
        onChange={(e) => setCompareValue(e.target.value)}
        placeholder="Value to compare"
      />
      <NodeCheckbox
        label="Case Sensitive"
        checked={caseSensitive}
        onChange={(e) => setCaseSensitive(e.target.checked)}
      />
    </BaseNode>
  );
};
