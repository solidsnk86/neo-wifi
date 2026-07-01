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

  function PreBlock({ children }: { children: React.ReactNode }) {
    const preRef = useRef<HTMLPreElement>(null);

    const copy = () => {
      if (!preRef.current) return;
      navigator.clipboard.writeText(preRef.current.innerText);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1600);
    };

    return (
      <div className="my-3 code-block relative">
        {isCopied ? (
          <span title="Copiado">
            <CopyCheck
              id="copy-check"
              className="absolute right-2 top-1 w-4 hover:text-[#facc15]"
            />
          </span>
        ) : (
          <span title="Copiar" onClick={copy}>
            <Copy
              id="copy"
              className="absolute right-2 top-1 w-4 hover:text-[#facc15]"
            />
          </span>
        )}
        <pre
          id={crypto.randomUUID().slice(0, 5).toString()}
          className="p-2 bg-[#1C1D21] rounded-lg"
          ref={preRef}
        >
          {children}
        </pre>
      </div>
    );
  }

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
          <h1 className="mt-8 mb-4 text-3xl font-bold pb-2 border-b border-zinc-200/70 dark:border-zinc-800">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="mt-6 mb-3 text-2xl font-semibold pb-2 border-b border-zinc-200/70 dark:border-zinc-800">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-4 mb-2 text-xl font-semibold">{children}</h3>
        ),
        pre: ({ children }) => <PreBlock>{children}</PreBlock>,
        a: ({ children }) => (
          <a href={children as string} target="_blank">
            {children}
          </a>
        ),
        hr: () => (
          <hr className="my-4 border-2 border-zinc-200/70 dark:border-zinc-800" />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
