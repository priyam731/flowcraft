// llmNode.js
// Refactored to use BaseNode abstraction

import { useState } from "react";
import { BaseNode, NodeSelect } from "./BaseNode";
import styles from "./NodeStyles.module.css";

export const LLMNode = ({ id, data, selected }) => {
  const [model, setModel] = useState(data?.model || "gpt-4");

  const modelOptions = [
    { value: "gpt-4", label: "GPT-4" },
    { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
    { value: "claude-3", label: "Claude 3" },
    { value: "llama-2", label: "LLaMA 2" },
  ];

  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="🤖"
      inputs={[
        { id: "system", label: "System" },
        { id: "prompt", label: "Prompt" },
      ]}
      outputs={[{ id: "response", label: "Response" }]}
      accentColor="#8b5cf6"
      minWidth={240}
      minHeight={160}
      selected={selected}
    >
      <p className={styles.nodeDescription}>
        Large Language Model node that processes prompts and generates
        responses.
      </p>
      <NodeSelect
        label="Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        options={modelOptions}
      />
    </BaseNode>
  );
};
