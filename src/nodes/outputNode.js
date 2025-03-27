import { BaseNode } from "./BaseNode";
import { FaSignOutAlt } from "react-icons/fa";

export const OutputNode = ({ id, data }) => {
  const config = {
    title: "Output",
    icon: <FaSignOutAlt color="#007BFF" size={16} />,
    fields: [
      {
        key: "outputName",
        label: "Name",
        type: "text",
        defaultValue: id.replace("customOutput-", "output_"),
      },
      {
        key: "outputType",
        label: "Type",
        type: "select",
        defaultValue: "Text",
        options: [
          { value: "Text", label: "Text" },
          { value: "Image", label: "Image" },
        ],
      },
    ],
    handles: [{ id: `${id}-value`, type: "target", position: "Left" }],
  };

  return <BaseNode id={id} data={data} config={config} />;
};
