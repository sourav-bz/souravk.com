export async function fetchGitHubReadme(githubUrl: string) {
  try {
    // Extract owner and repo from GitHub URL
    const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) throw new Error("Invalid GitHub URL");

    const [, owner, repo] = match;

    // Fetch README content from GitHub API
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`
    );
    if (!response.ok) throw new Error("Failed to fetch README");

    const data = await response.json();

    // Decode base64 content
    const content = Buffer.from(data.content, "base64").toString("utf-8");

    // Extract everything after the Updates heading
    const updatesMatch = content.match(/## Updates\n\n([\s\S]*)$/);
    if (!updatesMatch) return null;

    const updatesContent = updatesMatch[1];

    // Parse updates into structured format
    const updates = updatesContent
      .split(/(?=### )/)
      .filter(Boolean)
      .map((update) => {
        const dateMatch = update.match(/### (.*?)\n/);
        const content = update.replace(/### .*?\n/, "").trim();

        if (!dateMatch) return null;

        return {
          date: dateMatch[1],
          content: content, // Keep the original markdown formatting
        };
      })
      .filter(Boolean);

    return updates;
  } catch (error) {
    console.error("Error fetching GitHub README:", error);
    return null;
  }
}
