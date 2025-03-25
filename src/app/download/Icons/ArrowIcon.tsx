import { ComponentProps } from "react";

export const CurveArrowIcon = (props: ComponentProps<"svg">) => {
  const { ...attrs } = props;
  return (
    <svg
      width="30"
      height="22"
      viewBox="0 0 30 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...attrs}
    >
      <path
        d="M1 18C15 24 25 19 24 1M24 1L29 6M24 1L19 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};
