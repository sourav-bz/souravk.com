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
    const updatesMatch = content.match(/## Updates\s*\n([\s\S]*)$/);
    if (!updatesMatch) return null;

    const updatesContent = updatesMatch[1];

    // Use regex to find all update sections with timestamp headers (### level)
    const updateRegex =
      /### (.*?\d{4} - \d{1,2}:\d{2}(?:am|pm)?)\s*\n([\s\S]*?)(?=### .*?\d{4} - \d{1,2}:\d{2}(?:am|pm)?|$)/gi;

    const updates = [];
    let updateMatch;

    while ((updateMatch = updateRegex.exec(updatesContent)) !== null) {
      const timestamp = updateMatch[1].trim();
      const content = updateMatch[2].trim();

      updates.push({
        date: timestamp,
        content,
      });
    }

    return updates;
  } catch (error) {
    console.error("Error fetching GitHub README:", error);
    return null;
  }
}

// Alternative implementation using a more flexible approach
export async function fetchGitHubUpdates(githubUrl: string) {
  try {
    // Extract owner and repo from GitHub URL
    const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) throw new Error("Invalid GitHub URL");

    const [, owner, repo] = match;

    // Fetch README content
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`
    );
    if (!response.ok) throw new Error("Failed to fetch README");

    const data = await response.json();
    const content = Buffer.from(data.content, "base64").toString("utf-8");

    // Find the Updates section
    const lines = content.split("\n");
    let updatesStartIndex = -1;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].match(/^## Updates\s*$/)) {
        updatesStartIndex = i;
        break;
      }
    }

    if (updatesStartIndex === -1) return null;

    // Process the updates
    const updates = [];
    let currentUpdate = null;

    for (let i = updatesStartIndex + 1; i < lines.length; i++) {
      const line = lines[i];

      // If we find a new level 3 heading with a date format, it's a new update
      const updateHeadingMatch = line.match(
        /^### (.*?\d{4} - \d{1,2}:\d{2}(?:am|pm)?)\s*$/
      );

      if (updateHeadingMatch) {
        // If we already have an update in progress, push it to the results
        if (currentUpdate) {
          updates.push(currentUpdate);
        }

        // Start a new update
        currentUpdate = {
          date: updateHeadingMatch[1].trim(),
          content: "",
        };
      }
      // If we encounter a level 2 heading (##), we've left the Updates section
      else if (line.match(/^## /) && currentUpdate) {
        updates.push(currentUpdate);
        break;
      }
      // Otherwise, add the line to the current update's content
      else if (currentUpdate) {
        currentUpdate.content += (currentUpdate.content ? "\n" : "") + line;
      }
    }

    // Don't forget the last update if we reached the end of the file
    if (currentUpdate) {
      updates.push(currentUpdate);
    }

    return updates.map((update) => ({
      date: update.date,
      content: update.content.trim(),
    }));
  } catch (error) {
    console.error("Error fetching GitHub README:", error);
    return null;
  }
}

// Example usage:
/* 
const updates = await fetchGitHubUpdates("https://github.com/username/repo");
if (updates) {
  updates.forEach(update => {
    console.log(`Date: ${update.date}`);
    console.log(`Content:\n${update.content}`);
    console.log('---');
  });
}
*/
