// Contains data for the Marketing department and its campaign strategy recruitment task.
export const marketingDepartment = {
  "id": "marketing",
  "name": "Marketing",
  "emoji": "📊",
  "image": "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop",
  "taskSummary": "Plan and present a comprehensive marketing campaign for the chapter's flagship event."
};

export const marketingTask = {
    name: "Marketing Department",
    subtitle: "Campaign Strategy Task",
    badges: [
      { label: "Marketing Department", color: "blue" },
      { label: "Strategy Task", color: "cyan" },
      { label: "Second Year Only", color: "orange" },
    ],
    overview: `This task evaluates your strategic thinking, creativity, and ability to plan and execute a marketing campaign.`,
    overviewNote: `The Marketing Department handles event promotion, social media strategy, sponsorship outreach, and community engagement.`,
    taskStatement: `Design a complete Marketing Campaign Strategy for the chapter's hypothetical flagship event — "TechSpark 2027" — a 2-day technology festival featuring workshops, hackathons, and speaker sessions. Your campaign should cover pre-event, during-event, and post-event phases.`,
    conditions: [
      {
        title: "Strategic Depth",
        description: "Your campaign must demonstrate an understanding of the target audience, channels, messaging, and measurable outcomes.",
        checklist: [
          "Define target audience personas (at least 2 distinct profiles).",
          "Create a content calendar for the 3-week pre-event phase.",
          "Include at least 3 social media post mockups (Instagram or LinkedIn).",
          "Define key performance indicators and how you would measure success.",
        ],
      },
      {
        title: "AI Usage Policy and Submission",
        description: "You may use AI for brainstorming, but the core strategy must be yours.",
        checklist: [
          "Submit your strategy document via a public Google Docs or Google Drive link.",
          "Ensure link sharing is set to 'Anyone with the link can view'.",
          "Be prepared to pivot your strategy during the review session.",
        ],
      }
    ],
    submission: [
      "A Google Drive or Google Docs link containing your campaign strategy document (1500–2500 words).",
      "3 or more social media post mockups (can be included in the drive link).",
      "Content calendar spreadsheet for the pre-event phase.",
      "10–15 minute review where you present and defend your strategy.",
    ],
    evaluation: [
      { name: "Strategic Thinking", points: 30, percentage: 100, description: "Audience analysis, channel selection, messaging clarity." },
      { name: "Creativity and Originality", points: 25, percentage: 83, description: "Unique campaign ideas, engaging content concepts." },
      { name: "Execution Plan", points: 20, percentage: 67, description: "Realistic approach, clear responsibilities, measurable goals." },
      { name: "Visual Mockups", points: 15, percentage: 50, description: "Quality of social media post designs." },
    ],
    recommendations: [
      "Research what works for student technology communities.",
      "Use real platform constraints (image dimensions, character limits).",
      "Define measurable goals (registrations, reach, engagement rates).",
      "Show a clear plan with milestones and checkpoints."
    ],
    avoidList: [
      "Submitting a vague 'post on social media' plan.",
      "Ignoring the target audience in your messaging.",
      "Using generic templates without meaningful customization.",
      "Failing to provide accessible links to your files."
    ],
  };
