// draggableNode.js

import "./styles/DraggableNode.css";

export const DraggableNode = ({ type, label, icon, color = "#1C2536" }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData),
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="draggable-node"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      style={{
        "--node-color": color,
        borderColor: color,
      }}
      draggable
    >
      {icon && <span className="draggable-node-icon">{icon}</span>}
      <span className="draggable-node-label">{label}</span>
    </div>
  );
};
