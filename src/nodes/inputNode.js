import { BaseNode } from "./BaseNode";
import { FaSignInAlt } from "react-icons/fa"; // Importing an icon for the input node

export const InputNode = ({ id, data }) => {
  // Configuration object for the input node
  const config = {
    title: "Input",
    icon: <FaSignInAlt color="#007BFF" size={16} />,
    fields: [
      {
        key: "inputName",
        label: "Name",
        type: "text",
        defaultValue: id.replace("customInput-", "input_"),
      },
      {
        key: "inputType",
        label: "Type",
        type: "select",
        defaultValue: "Text",
        options: [
          { value: "Text", label: "Text" },
          { value: "File", label: "File" },
        ],
      },
    ],
    handles: [{ id: `${id}-value`, type: "source", position: "Right" }],
  };

  // Render the BaseNode with the input node configuration
  return <BaseNode id={id} data={data} config={config} />;
};
