// toolbar.js

import { DraggableNode } from "./draggableNode";
import "./styles/Toolbar.css";

export const PipelineToolbar = () => {
  const nodeCategories = [
    {
      name: "Core",
      nodes: [
        { type: "customInput", label: "Input", icon: "📥", color: "#10b981" },
        { type: "customOutput", label: "Output", icon: "📤", color: "#f59e0b" },
        { type: "text", label: "Text", icon: "📝", color: "#3b82f6" },
      ],
    },
    {
      name: "AI",
      nodes: [{ type: "llm", label: "LLM", icon: "🤖", color: "#8b5cf6" }],
    },
    {
      name: "Logic",
      nodes: [
        { type: "filter", label: "Filter", icon: "🔍", color: "#ef4444" },
        { type: "condition", label: "Condition", icon: "❓", color: "#f97316" },
        { type: "merge", label: "Merge", icon: "🔀", color: "#14b8a6" },
      ],
    },
    {
      name: "Utilities",
      nodes: [
        { type: "math", label: "Math", icon: "🔢", color: "#06b6d4" },
        { type: "api", label: "API", icon: "🌐", color: "#ec4899" },
      ],
    },
  ];

  return (
    <div className="toolbar">
      <div className="toolbar-header">
        <h1 className="toolbar-title">🚀 Flowcraft</h1>
        <p className="toolbar-subtitle">Drag nodes to build your pipeline</p>
      </div>
      <div className="toolbar-categories">
        {nodeCategories.map((category) => (
          <div key={category.name} className="toolbar-category">
            <span className="category-label">{category.name}</span>
            <div className="category-nodes">
              {category.nodes.map((node) => (
                <DraggableNode
                  key={node.type}
                  type={node.type}
                  label={node.label}
                  icon={node.icon}
                  color={node.color}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
