import { BaseNode } from "./BaseNode";
import { FaPalette } from "react-icons/fa"; // Importing an icon for the input node

export const ColorNode = ({ id, data }) => {
  // Configuration object for the input node
  const config = {
    title: "Color",
    icon: <FaPalette color="#007BFF" size={16} />,
    fields: [
      { key: "color", label: "Color", type: "text", defaultValue: "#FFFFFF" },
    ],
    handles: [{ id: `${id}-output`, type: "source", position: "Right" }],
  };
  // Render the BaseNode with the input node configuration
  return <BaseNode id={id} data={data} config={config} />;
};
