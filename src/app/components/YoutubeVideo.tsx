interface YouTubeLiteVideoProps {
  videoId: string;
  width: number;
  height: number;
  className: string;
  border: number;
}

export const YouTubeLiteVideo: React.FC<Partial<YouTubeLiteVideoProps>> = ({
  videoId,
  width,
  height,
  className,
  border,
}) => {
  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      width={width}
      height={height}
      frameBorder={border}
      allowFullScreen
      className={className}
    />
  );
};
