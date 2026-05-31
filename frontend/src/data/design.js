// Contains data for the Design department and its visual design recruitment task.
export const designDepartment = {
  "id": "design",
  "name": "Design",
  "emoji": "📐",
  "image": "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
  "taskSummary": "Design a professional ID card for the Microsoft Learn Student Chapter."
};

export const designTask = {
    name: "Design Department",
    subtitle: "Visual Design Task",
    badges: [
      { label: "Design Department", color: "blue" },
      { label: "ID Card Design", color: "cyan" },
      { label: "Second Year Only", color: "orange" },
    ],
    overview: `This task evaluates your visual design skills, attention to detail, and ability to create professional assets that align with a brand's identity.`,
    overviewNote: `The Design Department creates all visual assets, event branding, and digital experiences for the chapter.`,
    taskStatement: `Design a professional, print-ready ID Card for the Microsoft Learn Student Chapter core team members. The design must be clean, legible, and incorporate the chapter's branding elements.`,
    conditions: [
      {
        title: "Design Requirements",
        description: "The ID card must be functional and professional. It should include placeholders for necessary information.",
        checklist: [
          "Include placeholders for: Name, Role, Department, Profile Photo, and valid academic year.",
          "Design both the front and back of the ID card.",
          "Use standard ID card dimensions (e.g., 2.125\" x 3.375\" or CR80 size).",
          "Ensure high contrast for readability."
        ],
      },
      {
        title: "Tool and Submission Format",
        description: "You must use professional design software and provide accessible source files.",
        checklist: [
          "Figma is the preferred tool. You may also use Adobe Illustrator or Photoshop.",
          "Provide a public link to your Figma file or a Google Drive folder containing your source files and exported high-resolution PDFs.",
          "Ensure link sharing is set to 'Anyone with the link can view'."
        ],
      }
    ],
    submission: [
      "A public Figma link or Google Drive link containing your designs.",
      "A brief design rationale (maximum 150 words) explaining your color, typography, and layout choices.",
      "10–15 minute live review where you walk through your design process."
    ],
    evaluation: [
      { name: "Visual Aesthetics", points: 35, percentage: 100, description: "Color harmony, typography, spacing, overall professional look." },
      { name: "Brand Consistency", points: 25, percentage: 71, description: "Alignment with Microsoft Learn Student Chapter identity." },
      { name: "Practicality", points: 25, percentage: 71, description: "Legibility, appropriate sizing, clear information hierarchy." },
      { name: "Tool Proficiency", points: 15, percentage: 42, description: "Proper use of layers, alignment, and design software features." },
    ],
    recommendations: [
      "Use clear, readable typography for names and roles.",
      "Keep the design uncluttered — white space is your friend.",
      "Ensure proper alignment of all text and image elements.",
      "Check export settings to ensure high resolution."
    ],
    avoidList: [
      "Using overly complex backgrounds that obscure text.",
      "Relying entirely on AI-generated assets for the core design.",
      "Submitting flat images without providing the source files.",
      "Using more than 2-3 distinct font families."
    ],
  };
