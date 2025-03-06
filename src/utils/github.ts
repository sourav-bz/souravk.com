import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

// Setup Day.js plugins
dayjs.extend(customParseFormat);

export async function fetchGitHubUpdatesFromFolder(githubUrl: string) {
  try {
    // Extract owner and repo from GitHub URL
    const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) {
      throw new Error("Invalid GitHub URL");
    }

    const [, owner, repo] = match;
    const folderUrl = `https://api.github.com/repos/${owner}/${repo}/contents/updates`;

    const folderResponse = await fetch(folderUrl);

    if (!folderResponse.ok) {
      throw new Error(
        `Failed to fetch updates folder: ${folderResponse.statusText}`
      );
    }

    const folderContents = await folderResponse.json();

    // Filter to only include .md files with date format in filename
    const updateFiles = folderContents.filter((file) => {
      const date = file.name.replace(".md", "");
      return (
        file.type === "file" &&
        file.name.endsWith(".md") &&
        dayjs(date).isValid()
      );
    });

    // Sort files by date (newest first)
    updateFiles.sort((a, b) => {
      const dateA = dayjs(a.name.replace(".md", ""), "D-MMM-YYYY");
      const dateB = dayjs(b.name.replace(".md", ""), "D-MMM-YYYY");
      return dateB.unix() - dateA.unix();
    });

    const allUpdates = [];
    for (const file of updateFiles) {
      const fileResponse = await fetch(file.download_url);

      if (!fileResponse.ok) {
        continue;
      }

      const content = await fileResponse.text();
      const fileDate = dayjs(file.name.replace(".md", ""));

      const updates = parseUpdateContent(content, fileDate);
      allUpdates.push(...updates);
    }

    allUpdates.sort((a, b) => {
      return dayjs(b.timestamp).unix() - dayjs(a.timestamp).unix();
    });

    return allUpdates;
  } catch (error) {
    console.error("Error fetching updates from GitHub:", error);
    return null;
  }
}

function parseUpdateContent(content: string, fileDate: dayjs.Dayjs) {
  const updates = [];
  const lines = content.split("\n");

  let currentUpdate = null;
  let currentContent = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Look for ### headings with time (both 12-hour and 24-hour formats)
    const timeHeadingMatch = line.match(/^### (\d{1,2}:\d{2}(?:am|pm)?)\s*$/);

    if (timeHeadingMatch) {
      // If we already have an update in progress, save it
      if (currentUpdate && currentContent.length > 0) {
        const update = {
          date: currentUpdate.date.format("D MMM YYYY - h:mma"),
          timestamp: currentUpdate.date.toISOString(),
          content: currentContent.join("\n").trim(),
        };
        updates.push(update);
      }

      const timeStr = timeHeadingMatch[1];
      const updateDate = combineDateTime(fileDate, timeStr);
      currentUpdate = {
        date: updateDate,
      };

      currentContent = [];
    }
    // Add content to the current update
    else if (currentUpdate) {
      currentContent.push(line);
    }
  }

  // Add the last update
  if (currentUpdate && currentContent.length > 0) {
    const update = {
      date: currentUpdate.date.format("D MMM YYYY - h:mma"),
      timestamp: currentUpdate.date.toISOString(),
      content: currentContent.join("\n").trim(),
    };
    updates.push(update);
  }

  return updates;
}

/**
 * Combine a date from the filename with a time from the heading
 */
function combineDateTime(date: dayjs.Dayjs, timeStr: string): dayjs.Dayjs {
  // Parse the time using 12-hour or 24-hour format
  let timeMoment;

  if (
    timeStr.toLowerCase().includes("am") ||
    timeStr.toLowerCase().includes("pm")
  ) {
    // 12-hour format
    timeMoment = dayjs(timeStr, "h:mma", true);
    if (!timeMoment.isValid()) {
      timeMoment = dayjs(timeStr, "h:mmA", true);
    }
  } else {
    // 24-hour format
    timeMoment = dayjs(timeStr, "H:mm", true);
  }

  if (!timeMoment.isValid()) {
    throw new Error(`Invalid time format: ${timeStr}`);
  }

  // Combine the date and time
  const result = date
    .hour(timeMoment.hour())
    .minute(timeMoment.minute())
    .second(0)
    .millisecond(0);

  return result;
}
