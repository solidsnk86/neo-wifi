"use client";

import "highlight.js/styles/an-old-hope.css";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { Copy, CopyCheck } from "lucide-react";
import { useRef, useState } from "react";

export default function MarkdownRenderer({ content }: { content: string }) {
  const [isCopied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopyClick = () => {
    if (preRef.current) {
      const range = document.createRange();
      range.selectNode(preRef.current);
      window.getSelection()!.removeAllRanges();
      window.getSelection()!.addRange(range);
    }

    document.execCommand("copy");
    setCopied(true);

    window.getSelection()!.removeAllRanges();

    setTimeout(() => {
      setCopied(false);
    }, 1600);
  };

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
          <h1 className="mt-8 mb-4 text-3xl font-bold">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="mt-6 mb-3 text-2xl font-semibold">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-4 mb-2 text-xl font-semibold">{children}</h3>
        ),
        pre: ({ children }) => (
          <div className="my-3 code-block relative">
            {isCopied ? (
              <span title="Copiado">
                <CopyCheck className="absolute right-2 top-1 w-4 hover:text-blue-400" />
              </span>
            ) : (
              <span title="Copiar" onClick={handleCopyClick}>
                <Copy className="absolute right-2 top-1 w-4 hover:text-blue-400" />
              </span>
            )}
            <pre className="p-2 bg-[#1C1D21] rounded-lg" ref={preRef}>
              {children}
            </pre>
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
