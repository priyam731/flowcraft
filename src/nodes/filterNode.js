// filterNode.js
// Filter node that filters data based on conditions

import { useState } from "react";
import { BaseNode, NodeInput, NodeSelect } from "./BaseNode";

export const FilterNode = ({ id, data, selected }) => {
  const [field, setField] = useState(data?.field || "");
  const [operator, setOperator] = useState(data?.operator || "equals");
  const [value, setValue] = useState(data?.value || "");

  const operatorOptions = [
    { value: "equals", label: "Equals" },
    { value: "not_equals", label: "Not Equals" },
    { value: "contains", label: "Contains" },
    { value: "greater_than", label: "Greater Than" },
    { value: "less_than", label: "Less Than" },
    { value: "starts_with", label: "Starts With" },
    { value: "ends_with", label: "Ends With" },
  ];

  return (
    <BaseNode
      id={id}
      title="Filter"
      icon="🔍"
      inputs={[{ id: "input", label: "Data In" }]}
      outputs={[
        { id: "passed", label: "Passed" },
        { id: "failed", label: "Failed" },
      ]}
      accentColor="#ef4444"
      minWidth={240}
      minHeight={200}
      selected={selected}
    >
      <NodeInput
        label="Field"
        value={field}
        onChange={(e) => setField(e.target.value)}
        placeholder="Field name to filter"
      />
      <NodeSelect
        label="Operator"
        value={operator}
        onChange={(e) => setOperator(e.target.value)}
        options={operatorOptions}
      />
      <NodeInput
        label="Value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Filter value"
      />
    </BaseNode>
  );
};
