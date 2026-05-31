// Contains data for the Content department and its scripting recruitment task.
export const contentDepartment = {
  "id": "content",
  "name": "Content",
  "emoji": "🖋️",
  "image": "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop",
  "taskSummary": "Write a complete script for an event you observed during your first year at the chapter."
};

export const contentTask = {
    name: "Content Department",
    subtitle: "Writing and Scripting Task",
    badges: [
      { label: "Content Department", color: "blue" },
      { label: "Event Script Task", color: "cyan" },
      { label: "Second Year Only", color: "orange" },
    ],
    overview: `This task evaluates your ability to observe, synthesize, and write engaging scripts for events.`,
    overviewNote: `The Content Department produces scripts, blogs, newsletters, and educational resources for the chapter.`,
    taskStatement: `Write a complete hosting and moderation script for any event you observed or attended during your first year at the chapter. The script should be engaging, professional, and tailored to a student tech audience.`,
    conditions: [
      {
        title: "Script Requirements",
        description: "The script should cover the entire flow of the event.",
        checklist: [
          "Include an engaging introduction to welcome the audience.",
          "Write speaker introductions and smooth transitions.",
          "Include interactive segments or crowd engagement prompts.",
          "Provide a strong concluding remark and vote of thanks."
        ],
      },
      {
        title: "Originality and Submission Format",
        description: "Your script must be original and clearly structured.",
        checklist: [
          "Do not copy generic scripts from the internet.",
          "Submit your work via a public Google Docs link or Google Drive link.",
          "Ensure link sharing is set to 'Anyone with the link can view'."
        ],
      }
    ],
    submission: [
      "A Google Docs or Google Drive link containing your script.",
      "A brief note (maximum 100 words) identifying the event you chose and why.",
      "10–15 minute review where you discuss your writing process and tone choices."
    ],
    evaluation: [
      { name: "Content Quality and Flow", points: 40, percentage: 100, description: "Smooth transitions, engaging tone, clear structure." },
      { name: "Audience Engagement", points: 30, percentage: 75, description: "Use of interactive elements suitable for students." },
      { name: "Originality", points: 20, percentage: 50, description: "Unique perspective and authentic voice." },
      { name: "Formatting", points: 10, percentage: 25, description: "Clear headings, speaker tags, and readable layout." },
    ],
    recommendations: [
      "Write for a student audience — keep it energetic but professional.",
      "Use clear formatting (e.g., bolding speaker names, italicizing stage directions).",
      "Read your script aloud to ensure it sounds natural.",
      "Proofread multiple times for typos."
    ],
    avoidList: [
      "Submitting AI-generated content without significant personal editing.",
      "Writing long, monotonous paragraphs without breaks.",
      "Using overly formal or robotic language.",
      "Failing to provide accessible links."
    ],
  };
