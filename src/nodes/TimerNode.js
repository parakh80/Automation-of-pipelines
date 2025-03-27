import { BaseNode } from "./BaseNode";
import { FaClock } from "react-icons/fa";
export const TimerNode = ({ id, data }) => {
  const config = {
    title: "Timer",
    icon: <FaClock color="#007BFF" size={16} />,
    fields: [
      {
        key: "duration",
        label: "Duration (ms)",
        type: "text",
        defaultValue: "1000",
      },
    ],
    handles: [
      { id: `${id}-start`, type: "target", position: "Left" },
      { id: `${id}-end`, type: "source", position: "Right" },
    ],
  };

  return <BaseNode id={id} data={data} config={config} />;
};
