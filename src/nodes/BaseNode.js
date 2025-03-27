// BaseNode.js - Defines a customizable node component for use in a flow diagram

import { useState } from "react";
import { Handle, Position } from "reactflow";
import { useStore } from "../store"; // Import the store
import styled from "styled-components";

// Styled Components for Node UI
// Styles for the node container, including dynamic border color based on focus and target states
const NodeContainer = styled.div`
  position: relative;
  width: 200px;
  min-height: 100px;
  border: 2px solid
    ${(props) =>
      props.isTargeted
        ? "#28a745" // Green when handle is dragged over
        // ? "#FF0000" // Green when handle is dragged over
        : props.isFocused
        ? "#0056b3" // Darker blue when focused
        : "#007BFF"}; // Default blue
  border-radius: 5px;
  padding: 10px;
  background-color: #fff;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-shadow: ${(props) =>
    props.isFocused
      ? "0 0 15px rgba(0, 123, 255, 0.5)" // Shadow when focused
      : "0 0 5px rgba(0, 0, 0, 0.1)"}; // Default shadow

  &:hover {
    border-color: #0056b3;
  }
`;

// Styles for the title section of the node
const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

// Styles for the icon next to the title
const TitleIcon = styled.div`
  margin-right: 8px;
`;

// Styles for the title text
const TitleText = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

// Styles for the container of each input field
const FieldContainer = styled.div`
  margin-bottom: 5px;
`;

// Styles for the label of each input field
const FieldLabel = styled.label`
  font-size: 12px;
  color: #555;
`;

// Styles for text input fields, including focus state
const InputField = styled.input`
  width: 100%;
  padding: 5px;
  margin-top: 3px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
  transition: border-color 0.2s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

// Styles for select dropdown fields, including focus state
const SelectField = styled.select`
  width: 100%;
  padding: 5px;
  margin-top: 3px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
  transition: border-color 0.2s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

// Handles
// Styled component for connection handles -  Styles for the handle, including dynamic positioning and color based on connection state
const HandleStyled = styled(Handle)`
  background-color: transparent;
  border: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  position: absolute;
  cursor: pointer;

  /* Positioning based on props */
  ${(props) => {
    switch (props.$position) {
      case "Left":
        return `
          left: -8px;
          top: ${props.$offset || "50%"};
          transform: translate(0, -50%);
        `;
      case "Right":
        return `
          right: -8px;
          top: ${props.$offset || "50%"};
          transform: translate(0, -50%);
        `;
      case "Top":
        return `
          top: -8px;
          left: ${props.$offset || "50%"};
          transform: translate(-50%, 0);
        `;
      case "Bottom":
        return `
          bottom: -8px;
          left: ${props.$offset || "50%"};
          transform: translate(-50%, 0);
        `;
      default:
        return "";
    }
  }}

  &:before {
    content: "";
    display: block;
    width: 16px;
    height: 16px;
    background-color: ${(props) =>
      props.connected ? "#28a745" : "#007BFF"}; /* Green when connected */
    border-radius: 50%;
    opacity: 0.2;
    position: absolute;
    top: 0;
    left: 0;
  }

  &:after {
    content: "";
    display: block;
    width: 8px;
    height: 8px;
    background-color: ${(props) =>
      props.connected ? "#28a745" : "#007BFF"}; /* Inner circle */
    border-radius: 50%;
    position: absolute;
    top: 4px;
    left: 4px;
  }

  &:hover:after {
    background-color: #0056b3;
  }
`;

// State for managing field values and node interaction states
export const BaseNode = ({ id, data, config }) => {
  const [state, setState] = useState(
    Object.fromEntries(
      config.fields.map((field) => [
        field.key,
        data?.[field.key] || field.defaultValue,
      ])
    )
  );

  const [isFocused, setIsFocused] = useState(false);
  const [isTargeted, setIsTargeted] = useState(false);

  // Access connected handles from the global store
  const connectedHandles = useStore((state) => state.connectedHandles);

  // Function to handle changes in input fields
  const handleChange = (key) => (e) => {
    setState((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  return (
    <NodeContainer
      isFocused={isFocused}
      isTargeted={isTargeted}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      onDragOver={(event) => {
        event.preventDefault();
        setIsTargeted(true);
      }}
      onDragLeave={() => setIsTargeted(false)}
      onDrop={() => setIsTargeted(false)}
    >
      {/* Render target handles based on configuration */}
      {config.handles
        .filter((handle) => handle.type === "target")
        .map((handle) => (
          <HandleStyled
            key={handle.id}
            type="target"
            position={Position[handle.position]}
            id={handle.id}
            connected={connectedHandles[handle.id]}
            $position={handle.position}
            $offset={handle.offset} // Pass offset to styled component
          />
        ))}
      {/* Render node title and icon */}
      <Title>
        {config.icon && <TitleIcon>{config.icon}</TitleIcon>}
        <TitleText>{config.title}</TitleText>
      </Title>

      {/* Render node description if available */}
      {config.description && <div>{config.description}</div>}

      {/* Render input fields based on configuration */}
      <div>
        {config.fields.map((field) => (
          <FieldContainer key={field.key}>
            {field.label && <FieldLabel>{field.label}</FieldLabel>}
            {field.type === "select" ? (
              <SelectField
                value={state[field.key]}
                onChange={handleChange(field.key)}
              >
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </SelectField>
            ) : field.type === "textarea" ? (
              // Use the custom component if provided
              field.component ? (
                <field.component
                  ref={field.textareaRef}
                  value={field.value}
                  onChange={field.onChange}
                  rows={1}
                />
              ) : (
                <InputField
                  as="textarea"
                  value={field.value}
                  onChange={handleChange(field.key)}
                  rows={1}
                  style={{ resize: "none", overflow: "hidden" }}
                />
              )
            ) : (
              <InputField
                type={field.type}
                value={state[field.key]}
                onChange={handleChange(field.key)}
              />
            )}
          </FieldContainer>
        ))}
      </div>

      {/* Render source handles based on configuration */}
      {config.handles
        .filter((handle) => handle.type === "source")
        .map((handle) => (
          <HandleStyled
            key={handle.id}
            type="source"
            position={Position[handle.position]}
            id={handle.id}
            connected={connectedHandles[handle.id]}
            $position={handle.position}
            $offset={handle.offset} // Pass offset to styled component
          />
        ))}
    </NodeContainer>
  );
};
