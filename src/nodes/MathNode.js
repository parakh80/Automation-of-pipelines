import { BaseNode } from "./BaseNode";
import { FaCalculator } from "react-icons/fa";

export const MathNode = ({ id, data }) => {
  const config = {
    title: "Math",
    icon: <FaCalculator color="#007BFF" size={16} />,
    fields: [
      {
        key: "operation",
        label: "Operation",
        type: "select",
        defaultValue: "Add",
        options: [
          { value: "Add", label: "Add" },
          { value: "Subtract", label: "Subtract" },
        ],
      },
    ],
    handles: [
      { id: `${id}-input1`, type: "target", position: "Left", offset: "33%" },
      { id: `${id}-input2`, type: "target", position: "Left", offset: "66%" },
      { id: `${id}-result`, type: "source", position: "Right" },
    ],
  };

  return <BaseNode id={id} data={data} config={config} />;
};
