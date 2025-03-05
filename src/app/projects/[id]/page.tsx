import Link from "next/link";

// This would typically come from a database or CMS
const projects = {
  "ai-chat": {
    title: "AI Chat Application",
    description: "A real-time chat application powered by AI",
    category: "ai",
    lastUpdated: "2024-03-05",
    updates: [
      {
        date: "2024-03-05",
        title: "Initial Release",
        content:
          "Launched the first version of the AI chat application with basic functionality.",
      },
      {
        date: "2024-03-04",
        title: "Development Progress",
        content: "Implemented real-time messaging and AI integration.",
      },
    ],
  },
  "souravk-com": {
    title: "souravk.com",
    description: "A modern portfolio website built with Next.js & Contentlayer",
    category: "web",
    lastUpdated: "2024-03-05",
    updates: [
      {
        date: "2024-03-05",
        title: "Website Launch",
        content:
          "Successfully launched the portfolio website with a modern design.",
      },
    ],
  },
};

export default function ProjectPage({ params }: { params: { id: string } }) {
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
            {project.updates.map((update, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4">
                <div className="text-sm text-gray-500 mb-1">{update.date}</div>
                <h3 className="text-xl font-medium mb-2">{update.title}</h3>
                <p className="text-gray-600">{update.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
