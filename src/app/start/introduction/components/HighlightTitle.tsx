import { ComponentProps, forwardRef } from "react";

interface HighlightTitleProps extends ComponentProps<"h1"> {
  beforeHighlight?: string;
  highlight: string;
  afterHighlight?: string;
}

export const HighlightTitle = forwardRef<HTMLHeadingElement, HighlightTitleProps>(
  (
    {
      beforeHighlight = "",
      highlight,
      afterHighlight = "",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <h1
        ref={ref}
        className={`z-50 font-bold text-center ${className} relative mx-auto`}
        {...props}
      >
        {beforeHighlight}
        <span className="bg-gradient-to-b from-yellow-400 mx-2 to-yellow-600 text-transparent bg-clip-text">
          {highlight}
        </span>
        {afterHighlight}
      </h1>
    );
  }
);

HighlightTitle.displayName = "HighlightTitle";
