// mergeNode.js
// Merge node that combines multiple inputs

import { useState } from "react";
import { BaseNode, NodeSelect } from "./BaseNode";
import styles from "./NodeStyles.module.css";

export const MergeNode = ({ id, data, selected }) => {
  const [mergeStrategy, setMergeStrategy] = useState(
    data?.mergeStrategy || "concat"
  );

  const strategyOptions = [
    { value: "concat", label: "Concatenate" },
    { value: "merge_object", label: "Merge Objects" },
    { value: "array", label: "Create Array" },
    { value: "first", label: "Take First" },
    { value: "last", label: "Take Last" },
    { value: "join", label: "Join with Separator" },
  ];

  return (
    <BaseNode
      id={id}
      title="Merge"
      icon="🔀"
      inputs={[
        { id: "input1", label: "Input 1" },
        { id: "input2", label: "Input 2" },
        { id: "input3", label: "Input 3" },
      ]}
      outputs={[{ id: "merged", label: "Merged" }]}
      accentColor="#14b8a6"
      minWidth={220}
      minHeight={160}
      selected={selected}
    >
      <p className={styles.nodeDescription}>
        Combine multiple inputs into a single output.
      </p>
      <NodeSelect
        label="Merge Strategy"
        value={mergeStrategy}
        onChange={(e) => setMergeStrategy(e.target.value)}
        options={strategyOptions}
      />
    </BaseNode>
  );
};
