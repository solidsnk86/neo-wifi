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
    <h1 className={`z-50 font-bold text-center ${className} relative mx-auto`}>
      {beforeHighlight}
      <span className="bg-gradient-to-b from-yellow-400 mx-2 to-yellow-600 text-transparent bg-clip-text">
        {highlight}
      </span>
      {afterHighlight}
    </h1>
  );
};
