// LLMNode.js
import { BaseNode } from "./BaseNode";
import { FaBrain } from "react-icons/fa"; 
export const LLMNode = ({ id, data }) => {
  const config = {
    title: "LLM",
    description: "This is a LLM.",
    icon: <FaBrain color="#007BFF" size={16} />,
    fields: [],
    handles: [
      { id: `${id}-system`, type: "target", position: "Left", offset: "33%" },
      { id: `${id}-prompt`, type: "target", position: "Left", offset: "66%" },
      { id: `${id}-response`, type: "source", position: "Right" },
    ],
  };

  return <BaseNode id={id} data={data} config={config} />;
};
