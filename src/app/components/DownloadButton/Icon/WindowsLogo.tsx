import { ComponentProps } from "react";

export const WindowsLogo = (props: ComponentProps<"svg">) => {
  const { ...attrs } = props;
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...attrs}>
      <path
        d="M3.001 5.479L10.378 4.463V11.59H3L3.001 5.479ZM3.001 18.521L10.378 19.538V12.498H3L3.001 18.521ZM11.189 19.646L21.001 21V12.498H11.189V19.646ZM11.189 4.354V11.59H21.001V3L11.189 4.354Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};
