import Link from "next/link";
import { fetchGitHubReadme } from "@/utils/github";
import ReactMarkdown from "react-markdown";

// This would typically come from a database or CMS
const projects = {
  "showfer-ai": {
    title: "Showfer AI",
    description: "An AI-powered chatbot for showing off your projects",
    category: "ai",
    lastUpdated: "2024-03-05",
    github: "https://github.com/sourav-bz/showfer-ai",
    demo: "https://showfer.ai",
  },
  "souravk-com": {
    title: "souravk.com",
    description: "A modern portfolio website built with Next.js & Contentlayer",
    category: "web",
    lastUpdated: "2024-03-05",
    github: "https://github.com/sourav-bz/souravk.com",
    demo: "https://souravk.com",
  },
};

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const project = projects[params.id as keyof typeof projects];

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Project Not Found</h1>
        <Link
          href="/projects"
          className="inline-flex items-center text-black hover:text-gray-900 mb-[18px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          BACK TO PROJECTS
        </Link>
      </div>
    );
  }

  // Fetch GitHub README updates
  const updates = await fetchGitHubReadme(project.github);

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/projects"
        className="inline-flex items-center text-black hover:text-gray-900 mb-[18px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        BACK TO PROJECTS
      </Link>

      <div className="py-4">
        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        <p className="text-gray-600 mb-8">{project.description}</p>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Project Updates</h2>
          <div className="space-y-6">
            {updates ? (
              updates.map((update, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-4">
                  <div className="text-sm text-gray-500 mb-1">
                    {update.date}
                  </div>
                  <div className="text-gray-600 prose prose-sm max-w-none">
                    <ReactMarkdown
                      components={{
                        // Headings
                        h1: ({ children }) => (
                          <h1 className="text-2xl font-bold mb-4">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-xl font-semibold mb-3">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-lg font-medium mb-2">
                            {children}
                          </h3>
                        ),
                        h4: ({ children }) => (
                          <h4 className="text-base font-medium mb-2">
                            {children}
                          </h4>
                        ),
                        // Lists
                        ul: ({ children }) => (
                          <ul className="list-disc pl-4 space-y-1">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal pl-4 space-y-1">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className="text-gray-600">{children}</li>
                        ),
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
                        p: ({ children }) => (
                          <p className="mb-4 text-gray-600">{children}</p>
                        ),
                        // Blockquotes
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-gray-200 pl-4 italic text-gray-600">
                            {children}
                          </blockquote>
                        ),
                      }}
                    >
                      {update.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No updates available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
