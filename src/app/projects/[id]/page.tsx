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
  portfolio: {
    title: "Portfolio Website",
    description: "A modern portfolio website built with Next.js",
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
        <Link href="/projects" className="text-blue-600 hover:underline">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/projects"
        className="text-blue-600 hover:underline mb-8 inline-block"
      >
        ← Back to Projects
      </Link>

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
  );
}
