// submit.js

import { useState } from "react";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

// Alert Modal Component
const AlertModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="alert-overlay" onClick={onClose}>
      <div className="alert-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="alert-title">✨ Pipeline Analysis</h2>
        <div className="alert-content">
          <div className="alert-item">
            <span className="alert-item-label">Number of Nodes</span>
            <span className="alert-item-value">{data.num_nodes}</span>
          </div>
          <div className="alert-item">
            <span className="alert-item-label">Number of Edges</span>
            <span className="alert-item-value">{data.num_edges}</span>
          </div>
          <div className="alert-item">
            <span className="alert-item-label">Is Valid DAG?</span>
            <span
              className={`alert-item-value ${
                data.is_dag ? "success" : "error"
              }`}
            >
              {data.is_dag ? "✓ Yes" : "✗ No"}
            </span>
          </div>
        </div>
        <button className="alert-button" onClick={onClose}>
          Got it!
        </button>
      </div>
    </div>
  );
};

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [isLoading, setIsLoading] = useState(false);
  const [alertData, setAlertData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/pipelines/parse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error("Failed to parse pipeline");
      }

      const data = await response.json();
      setAlertData(data);
      setShowAlert(true);
    } catch (error) {
      console.error("Error submitting pipeline:", error);
      alert(
        "Error: Failed to submit pipeline. Make sure the backend is running.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
    setAlertData(null);
  };

  return (
    <>
      <div className="submit-container">
        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="loading-spinner"></span>
              Analyzing...
            </>
          ) : (
            <>🚀 Submit Pipeline</>
          )}
        </button>
      </div>
      <AlertModal
        isOpen={showAlert}
        onClose={closeAlert}
        data={alertData || { num_nodes: 0, num_edges: 0, is_dag: true }}
      />
    </>
  );
};
