export async function fetchGitHubUpdatesFromFolder(githubUrl: string) {
  try {
    // Extract owner and repo from GitHub URL
    const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) throw new Error("Invalid GitHub URL");

    const [, owner, repo] = match;

    // First, get the contents of the updates folder
    const folderResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/updates`
    );

    if (!folderResponse.ok) {
      throw new Error(
        `Failed to fetch updates folder: ${folderResponse.statusText}`
      );
    }

    const folderContents = await folderResponse.json();

    // Filter to only include .md files with date format in filename
    const updateFiles = folderContents.filter(
      (file) =>
        file.type === "file" &&
        file.name.endsWith(".md") &&
        file.name.match(/^\d{1,2}-[a-zA-Z]{3}-\d{4}\.md$/)
    );

    // Sort files by date (newest first)
    updateFiles.sort((a, b) => {
      const dateA = parseUpdateFilename(a.name);
      const dateB = parseUpdateFilename(b.name);
      return dateB.getTime() - dateA.getTime();
    });

    // Process each update file
    const allUpdates = [];

    for (const file of updateFiles) {
      // Fetch the content of each file
      const fileResponse = await fetch(file.download_url);

      if (!fileResponse.ok) {
        console.error(
          `Failed to fetch ${file.name}: ${fileResponse.statusText}`
        );
        continue;
      }

      const content = await fileResponse.text();
      const fileDate = parseUpdateFilename(file.name);

      // Parse the content for time-based updates (### headings)
      const updates = parseUpdateContent(content, fileDate);
      allUpdates.push(...updates);
    }

    // Sort all updates by date/time (newest first)
    allUpdates.sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return dateB.getTime() - dateA.getTime();
    });

    return allUpdates;
  } catch (error) {
    console.error("Error fetching updates from GitHub:", error);
    return null;
  }
}

/**
 * Parse date from filename in format: dd-mmm-yyyy.md
 */
function parseUpdateFilename(filename: string): Date {
  const match = filename.match(/^(\d{1,2})-([a-zA-Z]{3})-(\d{4})\.md$/);
  if (!match) throw new Error(`Invalid update filename format: ${filename}`);

  const [, day, month, year] = match;

  // Convert month abbreviation to month number (0-11)
  const monthNames = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  const monthIndex = monthNames.findIndex(
    (m) => m.toLowerCase() === month.toLowerCase()
  );

  if (monthIndex === -1)
    throw new Error(`Invalid month abbreviation: ${month}`);

  return new Date(parseInt(year), monthIndex, parseInt(day));
}

/**
 * Parse the content of an update file to extract time-based updates
 */
function parseUpdateContent(content: string, fileDate: Date) {
  const updates = [];
  const lines = content.split("\n");

  let currentUpdate = null;
  let currentContent = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Look for ### headings with time
    const timeHeadingMatch = line.match(/^### (\d{1,2}:\d{2}(?:am|pm)?)\s*$/);

    if (timeHeadingMatch) {
      // If we already have an update in progress, save it
      if (currentUpdate && currentContent.length > 0) {
        updates.push({
          date: formatDateForDisplay(currentUpdate.date),
          timestamp: currentUpdate.date.toISOString(),
          content: currentContent.join("\n").trim(),
        });
      }

      // Create a new date object for this update by combining file date with heading time
      const timeStr = timeHeadingMatch[1];
      const updateDate = combineDateTime(fileDate, timeStr);

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

  // Don't forget to add the last update
  if (currentUpdate && currentContent.length > 0) {
    updates.push({
      date: formatDateForDisplay(currentUpdate.date),
      timestamp: currentUpdate.date.toISOString(),
      content: currentContent.join("\n").trim(),
    });
  }

  return updates;
}

/**
 * Combine a date from the filename with a time from the heading
 */
function combineDateTime(date: Date, timeStr: string): Date {
  const result = new Date(date);

  // Parse the time string (format: 7:15pm or 14:30)
  let hours = 0;
  let minutes = 0;

  if (
    timeStr.toLowerCase().includes("am") ||
    timeStr.toLowerCase().includes("pm")
  ) {
    // 12-hour format
    const match = timeStr.match(/^(\d{1,2}):(\d{2})(am|pm)$/i);
    if (!match) throw new Error(`Invalid time format: ${timeStr}`);

    let [, hoursStr, minutesStr, period] = match;
    hours = parseInt(hoursStr);
    minutes = parseInt(minutesStr);

    // Adjust for PM
    if (period.toLowerCase() === "pm" && hours < 12) {
      hours += 12;
    }
    // Adjust for 12 AM
    if (period.toLowerCase() === "am" && hours === 12) {
      hours = 0;
    }
  } else {
    // 24-hour format
    const match = timeStr.match(/^(\d{1,2}):(\d{2})$/);
    if (!match) throw new Error(`Invalid time format: ${timeStr}`);

    let [, hoursStr, minutesStr] = match;
    hours = parseInt(hoursStr);
    minutes = parseInt(minutesStr);
  }

  result.setHours(hours, minutes, 0, 0);
  return result;
}

/**
 * Format a date for display in the desired format
 */
function formatDateForDisplay(date: Date): string {
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Format time (7:15pm format)
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const period = hours >= 12 ? "pm" : "am";

  // Convert to 12-hour format
  if (hours > 12) hours -= 12;
  if (hours === 0) hours = 12;

  return `${day} ${month} ${year} - ${hours}:${minutes}${period}`;
}

// Example usage:
/*
const updates = await fetchGitHubUpdatesFromFolder("https://github.com/username/repo");
if (updates) {
  updates.forEach(update => {
    console.log(`Date: ${update.date}`);
    console.log(`Content:\n${update.content}`);
    console.log('---');
  });
}
*/
