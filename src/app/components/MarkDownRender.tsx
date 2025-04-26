import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw, rehypeHighlight]}
      components={{
        h1: ({ children }) => (
          <h1 className="mt-8 mb-4 text-4xl font-bold">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="mt-6 mb-3 text-3xl font-semibold">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-4 mb-2 text-2xl font-semibold">{children}</h3>
        ),
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
