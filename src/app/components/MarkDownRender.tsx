import "highlight.js/styles/an-old-hope.css";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      rehypePlugins={[
        rehypeRaw,
        rehypeHighlight,
        rehypeSlug,
        rehypeAutolinkHeadings,
      ]}
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
        a: ({ children }) => (
          <a href={children as string} target="_blank">
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
