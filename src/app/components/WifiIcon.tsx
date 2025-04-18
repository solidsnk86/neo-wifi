import { ComponentProps } from "react";

export const WifiIcon = (props: ComponentProps<"svg">) => {
  const { ...attrs } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" {...attrs}>
      <path
        d="M100 0 C45 0 0 45 0 100 C0 140 50 200 100 280 C150 200 200 140 200 100 C200 45 155 0 100 0 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="3"
      />
      <circle
        cx="100"
        cy="90"
        r="65"
        fill="white"
        stroke="#EEEEEE"
        strokeWidth="1"
      />
      <g transform="translate(46, 35) scale(4.5)">
        <path
          d="M5 12.55a11 11 0 0 1 14.08 0"
          fill="none"
          stroke="#0078D7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 16.35a5 5 0 0 1 7 0"
          fill="none"
          stroke="#0078D7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 8.82a15 15 0 0 1 20 0"
          fill="none"
          stroke="#0078D7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="20"
          r="1"
          fill="#0078D7"
          stroke="#0078D7"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
};
