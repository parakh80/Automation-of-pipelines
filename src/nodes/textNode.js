// TextNode.js

import { useState, useEffect, useRef } from "react";
import { BaseNode } from "./BaseNode";
import { FaStickyNote } from "react-icons/fa"; 
import styled from "styled-components";

// Styled Components for TextArea within BaseNode
const TextAreaField = styled.textarea`
  width: 100%;
  padding: 5px;
  margin-top: 3px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.4;
  resize: none;
  overflow: hidden;
  transition: border-color 0.2s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

// TextNode Component
export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const textareaRef = useRef(null);

  const [variables, setVariables] = useState([]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Function to extract variables from the text
  const extractVariables = (text) => {
    const variableRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const vars = new Set();
    let match;
    while ((match = variableRegex.exec(text)) !== null) {
      vars.add(match[1]); // match[1] contains the variable name
    }
    return Array.from(vars);
  };

  // useEffect to extract variables whenever currText changes
  useEffect(() => {
    const vars = extractVariables(currText);
    setVariables(vars);
  }, [currText]);

  // Auto-adjust the height of the textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;

      // Reset height to 'auto' to calculate correct scrollHeight
      textarea.style.height = "auto";

      // Set height to scrollHeight to adjust for new content
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [currText]);

  // Calculate total height needed for variable handles
  const variableHandleCount = variables.length;
  const variableHandleSpacing = 30; // Adjust spacing between handles as needed
  const totalVariableHandleHeight =
    variableHandleCount > 0
      ? variableHandleSpacing * (variableHandleCount - 1)
      : 0;

  // Configure BaseNode
  const config = {
    title: "Text",
    icon: <FaStickyNote color="#007BFF" size={16} />,
    fields: [
      {
        key: "text",
        label: "",
        type: "textarea",
        value: currText,
        onChange: handleTextChange,
        textareaRef: textareaRef,
        component: TextAreaField, // Use the styled TextAreaField
      },
    ],
    handles: [
      // Dynamic handles for variables 
      ...variables.map((variable, index) => {
        // Calculate offset to center the handles vertically
        const offset = `calc(50% - ${totalVariableHandleHeight / 2}px + ${
          index * variableHandleSpacing
        }px)`;

        return {
          id: `${id}-${variable}`,
          type: "target",
          position: "Left",
          offset, // Pass the calculated offset
        };
      }),
      // Source handle on the right
      {
        id: `${id}-output`,
        type: "source",
        position: "Right",

      },
    ],
  };

  return <BaseNode id={id} data={data} config={config} />;
};
