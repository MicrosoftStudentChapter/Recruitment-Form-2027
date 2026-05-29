export const mediaTask = {
    name: "Media Department",
    subtitle: "Visual Content Task",
    badges: [
      { label: "Media Department", color: "blue" },
      { label: "Portfolio Task", color: "cyan" },
      { label: "Second Year Only", color: "orange" },
    ],
    overview: `This task evaluates your ability to capture, edit, and present visual content that tells a compelling story about your hometown.`,
    overviewNote: `The Media Department covers event photography, video production, and visual storytelling for all chapter activities.`,
    taskStatement: `Create a digital media submission consisting of EITHER a short hometown video (30–60 seconds) OR a series of 5-10 edited hometown photos. Your submission should showcase your ability to frame shots, edit, and tell a story through visual media.`,
    conditions: [
      {
        title: "Technical Quality",
        description: "Your submission must demonstrate an understanding of composition, lighting, and editing techniques.",
        checklist: [
          "If submitting photos: All photographs must be edited (color correction and cropping at minimum).",
          "If submitting a video: It must have transitions, appropriate music, and visual flow.",
          "All content must be original (captured or created by you).",
        ],
      },
      {
        title: "Submission Format",
        description: "You must provide accessible links to high-quality versions of your work.",
        checklist: [
          "Upload your media to a Google Drive folder.",
          "Ensure the link sharing is set to 'Anyone with the link can view'.",
          "Include a short text document describing the theme or story of your hometown submission.",
        ],
      }
    ],
    submission: [
      "A Google Drive link containing your video file (MP4) OR your photo series (JPEGs/PNGs).",
      "A short theme description document.",
      "10–15 minute review where you present your portfolio and editing process.",
    ],
    evaluation: [
      { name: "Visual Quality", points: 35, percentage: 100, description: "Composition, lighting, and color grading." },
      { name: "Storytelling", points: 35, percentage: 100, description: "Ability to convey a theme or narrative about your hometown." },
      { name: "Technical Editing", points: 20, percentage: 57, description: "Smooth transitions (video) or consistent style (photos)." },
      { name: "Organization", points: 10, percentage: 28, description: "Properly labeled files and clear presentation." },
    ],
    recommendations: [
      "Shoot in good lighting conditions (e.g., golden hour).",
      "Maintain a consistent editing style across the entire series or video.",
      "Add music that matches the mood of your video.",
      "Ensure your Google Drive link has the correct permissions before submitting."
    ],
    avoidList: [
      "Submitting unedited, raw photographs.",
      "Using heavily copyrighted music without proper attribution or consideration.",
      "Over-editing with excessive or unnatural filters.",
      "Failing to provide a working Drive link."
    ],
  };