interface HighlightTitleProps  {
  beforeHighlight?: string;
  highlight: string;
  afterHighlight?: string;
  className?: string
}

export const HighlightTitle = ({
  beforeHighlight = "",
  highlight,
  afterHighlight = "",
  className
}: HighlightTitleProps) => {
  return (
    <h1 className={`z-50 font-bold text-center ${className}`}>
      {beforeHighlight}
      <span className="bg-gradient-to-b from-green-400 mx-2 to-green-600 text-transparent bg-clip-text z-50 relative">
        {highlight}
      </span>
      {afterHighlight}
    </h1>
  );
};
