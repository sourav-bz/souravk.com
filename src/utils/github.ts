import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

// Setup Day.js plugins
dayjs.extend(customParseFormat);

export async function fetchGitHubUpdatesFromFolder(githubUrl: string) {
  try {
    console.log("Starting to fetch GitHub updates from:", githubUrl);

    // Extract owner and repo from GitHub URL
    const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) {
      console.error("Failed to parse GitHub URL:", githubUrl);
      throw new Error("Invalid GitHub URL");
    }

    const [, owner, repo] = match;
    console.log("Parsed GitHub URL - Owner:", owner, "Repo:", repo);

    // Get the contents of the updates folder
    const folderUrl = `https://api.github.com/repos/${owner}/${repo}/contents/updates`;
    console.log("Fetching folder contents from:", folderUrl);

    const folderResponse = await fetch(folderUrl);

    if (!folderResponse.ok) {
      console.error("Failed to fetch updates folder:", {
        status: folderResponse.status,
        statusText: folderResponse.statusText,
      });
      throw new Error(
        `Failed to fetch updates folder: ${folderResponse.statusText}`
      );
    }

    const folderContents = await folderResponse.json();
    console.log("Found folder contents:", folderContents, "items");

    // Filter to only include .md files with date format in filename
    const updateFiles = folderContents.filter(
      (file) =>
        file.type === "file" &&
        file.name.endsWith(".md") &&
        dayjs(file.name.replace(".md", ""), "D-MMM-YYYY", true).isValid()
    );
    console.log(
      "Filtered update files:",
      updateFiles.length,
      "valid .md files"
    );

    // Sort files by date (newest first)
    updateFiles.sort((a, b) => {
      const dateA = dayjs(a.name.replace(".md", ""), "D-MMM-YYYY");
      const dateB = dayjs(b.name.replace(".md", ""), "D-MMM-YYYY");
      return dateB.unix() - dateA.unix();
    });
    console.log("Sorted update files by date");

    // Process each update file
    const allUpdates = [];

    for (const file of updateFiles) {
      console.log("Processing file:", file.name);
      const fileResponse = await fetch(file.download_url);

      if (!fileResponse.ok) {
        console.error(
          `Failed to fetch ${file.name}: ${fileResponse.statusText}`
        );
        continue;
      }

      const content = await fileResponse.text();
      const fileDate = dayjs(file.name.replace(".md", ""), "D-MMM-YYYY");
      console.log("File date:", fileDate.format("D MMM YYYY"));

      // Parse the content for time-based updates
      const updates = parseUpdateContent(content, fileDate);
      console.log("Parsed updates from file:", updates.length);
      allUpdates.push(...updates);
    }

    // Sort all updates by date/time (newest first)
    allUpdates.sort((a, b) => {
      return dayjs(b.timestamp).unix() - dayjs(a.timestamp).unix();
    });
    console.log("Total updates found:", allUpdates.length);

    return allUpdates;
  } catch (error) {
    console.error("Error fetching updates from GitHub:", error);
    return null;
  }
}

/**
 * Parse the content of an update file to extract time-based updates
 */
function parseUpdateContent(content: string, fileDate: dayjs.Dayjs) {
  console.log(
    "Starting to parse update content for date:",
    fileDate.format("D MMM YYYY")
  );
  const updates = [];
  const lines = content.split("\n");
  console.log("Total lines to process:", lines.length);

  let currentUpdate = null;
  let currentContent = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Look for ### headings with time (both 12-hour and 24-hour formats)
    const timeHeadingMatch = line.match(/^### (\d{1,2}:\d{2}(?:am|pm)?)\s*$/);

    if (timeHeadingMatch) {
      console.log("Found time heading:", timeHeadingMatch[1]);

      // If we already have an update in progress, save it
      if (currentUpdate && currentContent.length > 0) {
        const update = {
          date: currentUpdate.date.format("D MMM YYYY - h:mma"),
          timestamp: currentUpdate.date.toISOString(),
          content: currentContent.join("\n").trim(),
        };
        console.log("Saving update:", update.date);
        updates.push(update);
      }

      // Create timestamp by combining file date with heading time
      const timeStr = timeHeadingMatch[1];
      const updateDate = combineDateTime(fileDate, timeStr);
      console.log(
        "Combined date and time:",
        updateDate.format("D MMM YYYY - h:mma")
      );

      // Start a new update
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
    console.log("Saving final update:", update.date);
    updates.push(update);
  }

  console.log("Finished parsing updates. Total updates found:", updates.length);
  return updates;
}

/**
 * Combine a date from the filename with a time from the heading
 */
function combineDateTime(date: dayjs.Dayjs, timeStr: string): dayjs.Dayjs {
  console.log(
    "Combining date:",
    date.format("D MMM YYYY"),
    "with time:",
    timeStr
  );

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
    console.error("Invalid time format:", timeStr);
    throw new Error(`Invalid time format: ${timeStr}`);
  }

  // Combine the date and time
  const result = date
    .hour(timeMoment.hour())
    .minute(timeMoment.minute())
    .second(0)
    .millisecond(0);

  console.log("Combined result:", result.format("D MMM YYYY - h:mma"));
  return result;
}
