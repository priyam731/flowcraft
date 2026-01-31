// inputNode.js
// Refactored to use BaseNode abstraction

import { useState } from "react";
import { BaseNode, NodeInput, NodeSelect } from "./BaseNode";

export const InputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data?.inputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const typeOptions = [
    { value: "Text", label: "Text" },
    { value: "File", label: "File" },
    { value: "Number", label: "Number" },
    { value: "Boolean", label: "Boolean" },
  ];

  return (
    <BaseNode
      id={id}
      title="Input"
      icon="📥"
      outputs={[{ id: "value", label: "Output" }]}
      accentColor="#10b981"
      minWidth={240}
      minHeight={140}
      selected={selected}
    >
      <NodeInput
        label="Name"
        value={currName}
        onChange={handleNameChange}
        placeholder="Enter input name"
      />
      <NodeSelect
        label="Type"
        value={inputType}
        onChange={handleTypeChange}
        options={typeOptions}
      />
    </BaseNode>
  );
};
