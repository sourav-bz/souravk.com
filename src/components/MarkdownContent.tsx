import ReactMarkdown from "react-markdown";

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="text-gray-600 prose prose-sm max-w-none">
      <ReactMarkdown
        components={{
          // Headings
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold mb-4">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-semibold mb-3">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-medium mb-2">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-base font-medium mb-2">{children}</h4>
          ),
          // Lists
          ul: ({ children }) => (
            <ul className="list-disc pl-4 space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-4 space-y-1">{children}</ol>
          ),
          li: ({ children }) => <li className="text-gray-600">{children}</li>,
          // Code blocks
          code: ({
            className,
            children,
            ...props
          }: {
            className?: string;
            children: React.ReactNode;
          }) => {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <code
                className="block bg-gray-100 rounded-md p-3 text-sm font-mono overflow-x-auto"
                {...props}
              >
                {children}
              </code>
            ) : (
              <code
                className="bg-gray-100 rounded px-1 py-0.5 text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            );
          },
          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          // Paragraphs
          p: ({ children }) => <p className="mb-4 text-gray-600">{children}</p>,
          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-200 pl-4 italic text-gray-600">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
