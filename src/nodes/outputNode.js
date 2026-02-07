// outputNode.js
// Refactored to use BaseNode abstraction

import { useState } from "react";
import { BaseNode, NodeInput, NodeSelect } from "./BaseNode";

export const OutputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_"),
  );
  const [outputType, setOutputType] = useState(data?.outputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const typeOptions = [
    { value: "Text", label: "Text" },
    { value: "Image", label: "Image" },
    { value: "File", label: "File" },
    { value: "JSON", label: "JSON" },
  ];

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="📤"
      inputs={[{ id: "value", label: "Input" }]}
      accentColor="#f59e0b"
      minWidth={240}
      minHeight={140}
      selected={selected}
    >
      <NodeInput
        label="Name"
        value={currName}
        onChange={handleNameChange}
        placeholder="Enter output name"
      />
      <NodeSelect
        label="Type"
        value={outputType}
        onChange={handleTypeChange}
        options={typeOptions}
      />
    </BaseNode>
  );
};
