import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw, rehypeHighlight]}
      components={{
        pre: ({ children }) => (
          <div className="my-3 code-block">
            <pre>{children}</pre>
          </div>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
