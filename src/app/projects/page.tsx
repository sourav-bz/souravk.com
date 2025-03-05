import Link from "next/link";

const projects = [
  {
    id: "ai-chat",
    title: "AI Chat Application",
    description: "A real-time chat application powered by AI",
    category: "ai",
    lastUpdated: "2024-03-05",
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    description: "A modern portfolio website built with Next.js",
    category: "web",
    lastUpdated: "2024-03-05",
  },
];

export default function ProjectsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* <h1 className="text-3xl font-bold mb-8">PROJECTS</h1> */}
      <div className="grid gap-6">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="block p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span className="capitalize">{project.category}</span>
              <span>Last updated: {project.lastUpdated}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
