// apiNode.js
// API node for making HTTP requests

import { useState } from "react";
import { BaseNode, NodeInput, NodeSelect } from "./BaseNode";
import styles from "./NodeStyles.module.css";

export const APINode = ({ id, data, selected }) => {
  const [url, setUrl] = useState(data?.url || "");
  const [method, setMethod] = useState(data?.method || "GET");
  const [headers, setHeaders] = useState(data?.headers || "");

  const methodOptions = [
    { value: "GET", label: "GET" },
    { value: "POST", label: "POST" },
    { value: "PUT", label: "PUT" },
    { value: "PATCH", label: "PATCH" },
    { value: "DELETE", label: "DELETE" },
  ];

  return (
    <BaseNode
      id={id}
      title="API Request"
      icon="🌐"
      inputs={[
        { id: "body", label: "Body" },
        { id: "params", label: "Params" },
      ]}
      outputs={[
        { id: "response", label: "Response" },
        { id: "error", label: "Error" },
      ]}
      accentColor="#ec4899"
      minWidth={280}
      minHeight={220}
      selected={selected}
    >
      <p className={styles.nodeDescription}>
        Make HTTP API requests to external services.
      </p>
      <NodeSelect
        label="Method"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        options={methodOptions}
      />
      <NodeInput
        label="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://api.example.com/endpoint"
      />
      <NodeInput
        label="Headers (JSON)"
        value={headers}
        onChange={(e) => setHeaders(e.target.value)}
        placeholder='{"Authorization": "Bearer ..."}'
      />
    </BaseNode>
  );
};
