// draggableNode.js

import styled from "styled-components";
import {
  FaNode,
  FaSignInAlt,
  FaBrain,
  FaSignOutAlt,
  FaStickyNote,
  FaKeyboard,
  FaCogs,
  FaCalculator,
  FaClock,
  FaPalette,
} from "react-icons/fa"; // Example icon, replace with appropriate icons

// Styles for the draggable container, including hover effects
const DraggableContainer = styled.div`
  cursor: grab;
  min-width: 80px;
  height: 100px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  background-color: #ffffff;
  justify-content: center;
  flex-direction: column;
  border: 2px solid #007bff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: border-color 0.2s, box-shadow 0.2s;
  padding: 10px;
  box-sizing: border-box;

  &:hover {
    border-color: #0056b3;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

// Styles for the icon container
const IconContainer = styled.div`
  margin-bottom: 5px;
`;

// Styles for the label text
const Label = styled.span`
  color: #333;
  font-size: 14px;
`;

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  // Function to select icons based on node type
  const getIcon = (nodeType) => {
    switch (nodeType) {
      case "customInput":
        return <FaSignInAlt color="#007BFF" size={24} />;
      case "llm":
        return <FaBrain color="#007BFF" size={24} />;
      case "customOutput":
        return <FaSignOutAlt color="#007BFF" size={24} />;
      case "text":
        return <FaStickyNote color="#007BFF" size={24} />;
      case "file":
        return <FaKeyboard color="#007BFF" size={24} />;
      case "logic":
        return <FaCogs color="#007BFF" size={24} />;
      case "math":
        return <FaCalculator color="#007BFF" size={24} />;
      case "timer":
        return <FaClock color="#007BFF" size={24} />;
      case "color":
        return <FaPalette color="#007BFF" size={24} />;

      default:
        return <FaNode color="#007BFF" size={24} />;
    }
  };

  return (
    <DraggableContainer
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      <IconContainer>{getIcon(type)}</IconContainer>
      <Label>{label}</Label>
    </DraggableContainer>
  );
};