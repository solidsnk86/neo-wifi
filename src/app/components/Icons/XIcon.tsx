import { ComponentProps } from "react";

export const XIcon = (props: ComponentProps<"svg">) => {
  const { ...attrs } = props;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...attrs}
    >
      <g clip-path="url(#clip0_3906_30410)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.3308 2H19.9808C21.7082 2 22.6232 4.04254 21.4731 5.33152L16.5182 10.8848L22.5863 18.7814C23.5971 20.0967 22.6593 22 21.0004 22H14.4675L10.9938 17.5291L7.01713 22H3.3603C1.63732 22 0.720688 19.9666 1.86167 18.6756L7.18254 12.6549L1.4201 5.2258C0.400801 3.9117 1.33735 2 3.00042 2H9.67799L12.7424 5.98812L16.3308 2ZM12.6212 9.11291L8.69252 4H3.00042L9.77816 12.738L3.3603 20H6.11938L11.0977 14.403L15.4463 20H21.0004L13.9228 10.7897L19.9808 4H17.2217L12.6212 9.11291ZM7.88879 5.53506H6.24534L16.256 18.4059H17.7855L7.88879 5.53506Z"
          fill="currentColor"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_3906_30410">
          <rect width="24" height="24" fill="white"></rect>
        </clipPath>
      </defs>
    </svg>
  );
};
