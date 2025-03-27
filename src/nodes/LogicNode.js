import { BaseNode } from "./BaseNode";
import { FaCogs } from "react-icons/fa";

export const LogicNode = ({ id, data }) => {
  const config = {
    title: "Logic",
    icon: <FaCogs color="#007BFF" size={16} />,
    fields: [
      {
        key: "condition",
        label: "Condition",
        type: "text",
        defaultValue: "x > 5",
      },
    ],
    handles: [
      { id: `${id}-input`, type: "target", position: "Left" },
      { id: `${id}-true`, type: "source", position: "Right", offset: "33%" },
      { id: `${id}-false`, type: "source", position: "Right", offset: "66%" },
    ],
  };

  return <BaseNode id={id} data={data} config={config} />;
};
