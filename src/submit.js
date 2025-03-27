// submit.js
import React, { useCallback } from "react";
import { useStore } from "./store"; // Importing the global state store
import { shallow } from "zustand/shallow";
import { toast, ToastContainer } from "react-toastify"; // Importing toast notifications
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";

// Styled component for the submit button - Styles for the button, including hover and active states
const StyledButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #004080;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
  }
`;

// Access nodes and edges from the global store
export const SubmitButton = () => {
  const { nodes, edges } = useStore(
    (state) => ({ nodes: state.nodes, edges: state.edges }),
    shallow
  );

  // Function to handle the submission of the pipeline data
  const handleSubmit = useCallback(async () => {
    const data = { nodes, edges };

    try {
      // Send data to the backend API
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Handle HTTP errors
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Extract and display analysis results
      const { num_nodes, num_edges, is_dag } = result;
      const message = `Pipeline Analysis:\n\nNumber of Nodes: ${num_nodes}\nNumber of Edges: ${num_edges}\nIs DAG: ${
        is_dag ? "Yes" : "No"
      }`;

      // Show success notification
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          whiteSpace: "pre-line",
        },
      });
    } catch (error) {
      // Show error notification
      console.error("Error:", error);
      toast.error(
        "An error occurred while submitting the pipeline. Please try again.",
        {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }
  }, [nodes, edges]);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <StyledButton type="submit" onClick={handleSubmit}>
          Submit
        </StyledButton>
      </div>
      <ToastContainer />
    </>
  );
};
