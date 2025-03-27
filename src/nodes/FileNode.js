import { BaseNode } from "./BaseNode";
import { FaKeyboard } from "react-icons/fa";

export const FileNode = ({ id, data }) => {
  const config = {
    title: "File",
    icon: <FaKeyboard color="#007BFF" size={16} />,
    fields: [
      {
        key: "fileName",
        label: "File Name",
        type: "text",
        defaultValue: "file_1",
      },
      {
        key: "fileType",
        label: "Type",
        type: "select",
        defaultValue: "PDF",
        options: [
          { value: "PDF", label: "PDF" },
          { value: "DOCX", label: "DOCX" },
        ],
      },
    ],
    handles: [{ id: `${id}-file`, type: "source", position: "Right" }],
  };

  return <BaseNode id={id} data={data} config={config} />;
};
