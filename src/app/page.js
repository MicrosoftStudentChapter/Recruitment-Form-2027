"use client";

/**
 * MLSC Recruitment Form — page.js
 * Self-contained. Drop into src/app/page.js
 * Place tasks.json at project root (next to package.json)
 *
 * Dependencies (already in package.json):
 *   framer-motion, react-hook-form, @hookform/resolvers, zod
 */

import { useState, useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ─── tasks data (inline — matches tasks.json structure) ──────────────────────
// In production this is loaded from tasks.json via a server component or API.
// To keep this file self-contained for your src/app setup, data is inlined here
// and mirrors the exact shape of tasks.json at project root.
const TASKS_DATA = {
  Technical: {
    color: "#00d0d4",
    emoji: "💻",
    tasks: [
      {
        id: "tech-1",
        headline: "Build a Mini Project or Contribute to Open Source",
        description:
          "Build a small working project (web app, CLI tool, API, ML model, etc.) that solves a real problem. Alternatively, make a meaningful contribution to any open source repository and document what you did.",
        additionalInfo:
          "Host on GitHub with a proper README — setup instructions, what it does, tech stack. Bonus points for a live demo link. Quality of documentation matters as much as code.",
        submissionType: "link",
        submissionLabel: "GitHub Repository Link",
        submissionPlaceholder: "https://github.com/yourusername/your-project",
        referenceLabel: "Live Demo Link (optional)",
        referencePlaceholder: "https://your-project.vercel.app",
      },
    ],
  },
  Design: {
    color: "#8b5cf6",
    emoji: "🎨",
    tasks: [
      {
        id: "design-1",
        headline: "Design an ID Card for MLSC Members",
        description:
          "Design a member ID card for MLSC that will be used year-round. Include: Member Name, Roll Number, Department, Academic Year, and the MLSC logo. The design should feel professional yet modern, consistent with Microsoft's design language.",
        additionalInfo:
          "Reference the previous General Secretary ID card design for layout and branding guidelines. Preferred tools: Figma, Adobe XD, Canva, or Photoshop. Export as PNG or PDF.",
        submissionType: "link",
        submissionLabel: "Design File Link (Figma / Drive / Behance)",
        submissionPlaceholder: "https://figma.com/file/...",
        referenceLabel: "Reference: Previous GS ID Card Design (optional)",
        referencePlaceholder: "https://drive.google.com/...",
      },
    ],
  },
  Content: {
    color: "#10b981",
    emoji: "✍️",
    tasks: [
      {
        id: "content-1",
        headline: "Draft 5 Instagram Captions Announcing MLSC Core Members",
        description:
          "Write 5 creative, engaging Instagram captions for posts introducing new MLSC core team members. Each caption should be distinct in tone — try a mix of professional, witty, inspirational, and conversational styles.",
        additionalInfo:
          "Each caption should be 2–4 lines long. Include relevant hashtags. Captions should feel authentic to a student tech community.",
        submissionType: "textarea",
        submissionLabel: "Your 5 Captions",
        submissionPlaceholder:
          "Caption 1:\n\nCaption 2:\n\nCaption 3:\n\nCaption 4:\n\nCaption 5:",
        referenceLabel: "MLSC Instagram Page (reference for tone)",
        referencePlaceholder: "https://instagram.com/mlsc_tiet",
      },
    ],
  },
  Marketing: {
    color: "#f59e0b",
    emoji: "📣",
    tasks: [
      {
        id: "marketing-1",
        headline: "Draft an MLSC Recruitment Campaign Strategy",
        description:
          "Write a concise marketing strategy for the MLSC annual recruitment drive. Include: target audience, key messaging pillars, channel mix (Instagram, WhatsApp, LinkedIn, etc.), and a 2-week rollout timeline.",
        additionalInfo:
          "Focus on 1st and 2nd year engineering students. Think about what pain points you're solving — community, skills, network, resume value.",
        submissionType: "textarea",
        submissionLabel: "Your Campaign Strategy",
        submissionPlaceholder:
          "Target Audience:\n\nKey Messaging:\n\nChannels:\n\n2-Week Timeline:",
        referenceLabel: "Reference Campaign or Inspiration (optional)",
        referencePlaceholder: "https://...",
      },
    ],
  },
  Media: {
    color: "#d544ef",
    emoji: "📸",
    tasks: [
      {
        id: "media-1",
        headline: "Create a 60-Second Event Highlight Reel or Photo Story",
        description:
          "Create a short 60-second highlight reel or photo story (minimum 10 photos) documenting a real or imagined MLSC workshop or tech event. Include behind-the-scenes shots, candid moments, and a keynote moment.",
        additionalInfo:
          "You may use stock images if needed but original content is preferred. Upload to Google Drive, YouTube, or a portfolio and share the link.",
        submissionType: "link",
        submissionLabel: "Drive / YouTube / Portfolio Link",
        submissionPlaceholder: "https://drive.google.com/... or https://youtube.com/...",
        referenceLabel: "Reference Event or Inspiration (optional)",
        referencePlaceholder: "https://...",
      },
    ],
  },
};

const DEPARTMENTS = Object.keys(TASKS_DATA);

// ─── helpers ─────────────────────────────────────────────────────────────────
function wordCount(str) {
  if (!str || !str.trim()) return 0;
  return str.trim().split(/\s+/).length;
}

// ─── tiny sub-components (all inline) ────────────────────────────────────────

function FieldError({ message }) {
  if (!message) return null;
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-xs text-red-400 font-medium mt-1 flex items-center gap-1"
    >
      <span>⚠</span> {message}
    </motion.p>
  );
}

function Label({ children, required }) {
  return (
    <label className="block text-sm font-semibold text-white/80 mb-1.5">
      {children}
      {required && <span className="text-[#0078D4] ml-1">*</span>}
    </label>
  );
}

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm font-medium transition-all duration-200 outline-none focus:bg-white/10 focus:ring-2 focus:ring-[#0078D4]/50 focus:border-[#0078D4]/60 hover:border-white/20 autofill:bg-transparent";

function Input({ label, error, hint, required = true, ...props }) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      {hint && <p className="text-xs text-white/35 mb-2">{hint}</p>}
      <input className={inputClass} {...props} />
      <FieldError message={error?.message} />
    </div>
  );
}

function WordTextarea({ label, error, value = "", minW = 70, maxW = 100, required = true, rows = 5, ...props }) {
  const wc = wordCount(value);
  const pct = Math.min((wc / maxW) * 100, 100);
  const color = wc === 0 ? "text-white/30" : wc < minW ? "text-amber-400" : wc <= maxW ? "text-emerald-400" : "text-red-400";
  const barColor = wc === 0 ? "bg-white/10" : wc < minW ? "bg-amber-400" : wc <= maxW ? "bg-emerald-400" : "bg-red-400";
  const status = wc === 0 ? "" : wc < minW ? `${minW - wc} more words` : wc <= maxW ? "✓ Perfect" : `${wc - maxW} over`;

  return (
    <div>
      <Label required={required}>{label}</Label>
      <p className="text-xs text-white/35 mb-2">Expected {minW}–{maxW} words</p>
      <textarea
        rows={rows}
        className={`${inputClass} resize-none leading-relaxed`}
        {...props}
      />
      <div className="mt-2 flex items-center gap-3">
        <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${barColor} transition-colors duration-300`}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.25 }}
          />
        </div>
        <span className={`text-xs font-semibold tabular-nums ${color}`}>
          {wc}{status ? ` · ${status}` : ""}
        </span>
      </div>
      <FieldError message={error?.message} />
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Page() {
  const [selectedDept, setSelectedDept] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const tasksRef = useRef(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const watchedValues = watch();
  const whyValue = watch("whyJoin") || "";
  const diffValue = watch("howDiff") || "";

  // live progress bar
  useEffect(() => {
    const keys = ["name", "email", "rollNumber", "phone", "whyJoin", "howDiff", "department"];
    const filled = keys.filter((k) => watchedValues[k] && watchedValues[k].length > 0);
    setProgress(Math.round((filled.length / keys.length) * 100));
  }, [watchedValues]);

  // scroll to tasks on dept select
  useEffect(() => {
    if (selectedDept && tasksRef.current) {
      setTimeout(() => tasksRef.current.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    }
  }, [selectedDept]);

  // ── IMPROVED onSubmit with early return, try/catch/finally, AbortController timeout ──
  const onSubmit = async (data) => {
    if (loading) return;

    // Honeypot anti-bot check
    if (data.website) return;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      setLoading(true);
      // Simulated delay — replace with actual fetch(url, { signal: controller.signal }) in production
      await new Promise((r) => setTimeout(r, 1800));
      setSubmitted(true);
    } catch (err) {
      if (err.name === "AbortError") {
        alert("Submission timed out. Please check your connection and try again.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  };

  const activeDeptData = selectedDept ? TASKS_DATA[selectedDept] : null;

  // ── SUCCESS SCREEN ──
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(135deg, #001a3d 0%, #002d6b 40%, #0050a0 100%)" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center flex flex-col items-center gap-6 max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 180 }}
            className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center"
          >
            <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <motion.path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4, duration: 0.5 }} />
            </svg>
          </motion.div>
          <div>
            <h1 className="text-3xl font-black text-white">Application Submitted!</h1>
            <p className="text-white/50 mt-2 leading-relaxed">
              Thank you{watchedValues.name ? `, ${watchedValues.name.split(" ")[0]}` : ""}! We&apos;ll review your application and reach out via your Thapar email.
            </p>
          </div>
          <Image src="/MLSCLogo.png" alt="MLSC" width={56} height={56} className="opacity-50 rounded-xl" />
          <p className="text-white/25 text-xs font-semibold tracking-widest uppercase">
            Microsoft Learn Student Chapter · TIET
          </p>
        </motion.div>
      </div>
    );
  }

  // ── MAIN FORM ──
  return (
    <div
      className="min-h-screen relative"
      style={{ background: "linear-gradient(135deg, #001a3d 0%, #002d6b 40%, #0050a0 75%, #003d82 100%)" }}
    >
      {/* sticky progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-[#0078D4] to-[#50c0ff]"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #0078D4, transparent 70%)" }} />
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #1a4fa8, transparent 70%)" }} />
        {/* dot grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[680px] mx-auto px-4 py-14 pb-20">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4 mb-10"
        >
          {/* nav bar pill */}
          <Image src="/MLSCLogo.png" alt="MLSC" width={150} height={150} className="rounded-md" />

          <div className="text-center mt-2">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight"
            >
              Recruitment
              <span className="block text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(90deg, #50b0ff, #ffffff, #50b0ff)" }}>
                2026 – 27
              </span>
            </motion.h1>
          </div>

          
        </motion.div>

        {/* ── FORM CARD ── */}
        <div className="flex justify-center">
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className=" rounded-3xl border border-white/10 overflow-hidden"
          style={{
            background: "rgba(0, 0, 0, 0.47)",
            backdropFilter: "blur(28px)",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate>

            {/* ── HONEYPOT anti-bot field — hidden from real users ── */}
            <input
              type="text"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              {...register("website")}
            />

            <div className="p-7 md:p-10 flex flex-col gap-10">

              {/* ══ SECTION 1 — Personal Info ══ */}
              <Section number="01" title="Personal Information">
                <div className="grid gap-5">
                  <Input
                    label="Full Name"
                    placeholder="Name"
                    error={errors.name}
                    {...register("name", { required: "Name is required", minLength: { value: 2, message: "At least 2 characters" } })}
                  />
                  <Input
                    label="Thapar Email ID"
                    type="email"
                    placeholder="yourname@thapar.edu"
                    hint="Must be your official @thapar.edu email"
                    error={errors.email}
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^[^\s@]+@thapar\.edu$/, message: "Must be a @thapar.edu email address" },
                    })}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label="Roll Number"
                      placeholder="102203XXX"
                      error={errors.rollNumber}
                      {...register("rollNumber", {
                        required: "Roll number is required",
                        pattern: { value: /^[A-Za-z0-9]{7,15}$/, message: "Invalid roll number format" },
                      })}
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="98XXXXXXXX"
                      error={errors.phone}
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit Indian number" },
                      })}
                    />
                  </div>
                </div>
              </Section>

              {/* ══ SECTION 2 — Previous Societies ══ */}
              <Section number="02" title="Previous Societies">
                <div className="grid gap-5">
                  <Input
                    label="Society"
                    placeholder="e.g. ACM, MARKFIN, ..... "
                    hint="List all clubs separated by commas. Write 'None' if not applicable."
                    error={errors.prevSocieties}
                    {...register("prevSocieties", {
                      required: "Required — write 'None' if not applicable",
                      maxLength: { value: 300, message: "Keep it under 300 characters" },
                    })}
                  />
                  <div>
                    <Label required>Short Description of Role</Label>
                    <p className="text-xs text-white/35 mb-2">10–20 words about your contribution</p>
                    <input
                      className={inputClass}
                      placeholder="e.g. Led design team, managed social media, organised annual fest workshops…"
                      {...register("societyDesc", {
                        required: "Required — write 'N/A' if no previous societies",
                        maxLength: { value: 300, message: "Keep it under 300 characters" },
                      })}
                    />
                    <FieldError message={errors.societyDesc?.message} />
                  </div>
                </div>
              </Section>

              {/* ══ SECTION 3 — Written Responses ══ */}
              <Section number="03" title="Written Responses">
                <div className="grid gap-7">
                  <WordTextarea
                    label="Why do you want to join MLSC?"
                    placeholder="Tell us what draws you to MLSC, what you hope to learn, and why you'd be a great fit for the community…"
                    value={whyValue}
                    error={errors.whyJoin}
                    {...register("whyJoin", {
                      required: "This response is required",
                      validate: (v) => wordCount(v) >= 50 || "Write at least 50 words",
                      maxLength: { value: 2000, message: "Keep it under 2000 characters" },
                    })}
                  />
                  <WordTextarea
                    label="How would you create a difference?"
                    placeholder="Describe the impact you want to make — events you'd organise, projects you'd initiate, or problems you'd solve within MLSC and the student community…"
                    value={diffValue}
                    error={errors.howDiff}
                    {...register("howDiff", {
                      required: "This response is required",
                      validate: (v) => wordCount(v) >= 50 || "Write at least 50 words",
                      maxLength: { value: 2000, message: "Keep it under 2000 characters" },
                    })}
                  />
                </div>
              </Section>

              {/* ══ SECTION 4 — Department ══ */}
              <Section number="04" title="Primary Department" >
                <div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {DEPARTMENTS.map((dept, i) => {
                      const d = TASKS_DATA[dept];
                      const isActive = selectedDept === dept;
                      return (
                        <motion.button
                          key={dept}
                          type="button"
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => {
                            setSelectedDept(dept);
                            setValue("department", dept, { shouldValidate: true });
                          }}
                          className={`relative flex flex-col items-center gap-2 py-4 px-2 rounded-2xl border cursor-pointer transition-all duration-200 ${
                            isActive
                              ? "border-opacity-80 shadow-lg"
                              : "bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20"
                          }`}
                          style={isActive ? {
                            background: `${d.color}20`,
                            borderColor: `${d.color}90`,
                            boxShadow: `0 0 20px ${d.color}30`,
                          } : {}}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="dept-indicator"
                              className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full flex items-center justify-center text-white"
                              style={{ background: d.color }}
                              initial={false}
                            >
                              <svg width="7" height="7" viewBox="0 0 8 8" fill="none">
                                <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </motion.span>
                          )}
                          <span className="text-xl">{d.emoji}</span>
                          <span className={`text-xs font-bold tracking-wide ${isActive ? "text-white" : "text-white/50"}`}>
                            {dept}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                  {/* hidden input for validation */}
                  <input type="hidden" {...register("department", { required: "Please select a department" })} />
                  <FieldError message={errors.department?.message} />
                </div>
              </Section>

              {/* ══ SECTION 5 — Department Tasks (dynamic) ══ */}
              <AnimatePresence mode="wait">
                {activeDeptData && (
                  <motion.div
                    key={selectedDept}
                    ref={tasksRef}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                  >
                    <Section
                      number="05"
                      title={`${selectedDept} Tasks`}
                      icon="📋"
                      subtitle={`Complete the task${activeDeptData.tasks.length > 1 ? "s" : ""} below for your selected department`}
                      accentColor={activeDeptData.color}
                    >
                      <div className="flex flex-col gap-5">
                        {activeDeptData.tasks.map((task, i) => (
                          <TaskCard
                            key={task.id}
                            task={task}
                            index={i}
                            deptColor={activeDeptData.color}
                            register={register}
                            errors={errors}
                          />
                        ))}
                      </div>
                    </Section>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* ── SUBMIT ── */}
            <div className="px-7 md:px-10 pb-10">
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />
              <p className="text-xs text-white/25 text-center mb-5 leading-relaxed">
                By submitting, you confirm that all information provided is accurate. Applications are reviewed by the MLSC core team.
              </p>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.015 }}
                whileTap={{ scale: loading ? 1 : 0.985 }}
                className="relative w-full py-4 rounded-2xl font-bold text-base text-white overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
                style={{
                  background: "linear-gradient(90deg, #0063b1, #0078D4, #0063b1)",
                  backgroundSize: "200% 100%",
                  boxShadow: "0 0 30px rgba(0,120,212,0.35)",
                }}
              >
                {/* shimmer */}
                {!loading && (
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/12 to-transparent -skew-x-12 pointer-events-none"
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{ repeat: Infinity, repeatDelay: 2.5, duration: 0.7 }}
                  />
                )}
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting your application…
                  </span>
                ) : (
                  "Submit Application →"
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
        </div>
        

        {/* footer */}
        <p className="text-center text-white/20 text-xs mt-8 tracking-wide">
          Microsoft Learn Student Chapter · Thapar Institute of Engineering & Technology · 2026–27
        </p>
      </div>
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ number, title, subtitle, icon, children, accentColor }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45 }}
      className="flex flex-col gap-5"
    >
      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black"
          style={{
            background: accentColor ? `${accentColor}25` : "rgba(0,120,212,0.15)",
            border: `1px solid ${accentColor || "#0078D4"}40`,
            color: accentColor || "#0078D4",
          }}
        >
          {number}
        </div>
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span>{icon}</span> {title}
          </h2>
          {subtitle && <p className="text-xs text-white/35 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="pl-0 sm:pl-12">{children}</div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </motion.section>
  );
}

// ─── Task Card ────────────────────────────────────────────────────────────────
function TaskCard({ task, index, deptColor, register, errors }) {
  const subKey = `taskSubmission_${task.id}`;
  const refKey = `taskReference_${task.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
      className="rounded-2xl border border-white/10 overflow-hidden"
      style={{ background: "rgba(255,255,255,0.03)" }}
    >
      {/* top stripe */}
      <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${deptColor}, ${deptColor}60)` }} />

      <div className="p-5 flex flex-col gap-4">
        {/* headline */}
        <div className="flex gap-3 items-start">
          <div
            className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black mt-0.5"
            style={{ background: `${deptColor}20`, color: deptColor, border: `1px solid ${deptColor}30` }}
          >
            {index + 1}
          </div>
          <h3 className="text-sm font-bold text-white leading-snug">{task.headline}</h3>
        </div>

        {/* description */}
        {task.description && (
          <p className="text-sm text-white/55 leading-relaxed pl-10">{task.description}</p>
        )}

        {/* info box */}
        {task.additionalInfo && (
          <div className="flex gap-2 rounded-xl p-3 pl-4 ml-10"
            style={{ background: `${deptColor}12`, border: `1px solid ${deptColor}25` }}>
            <span style={{ color: deptColor }} className="text-sm mt-0.5 flex-shrink-0">ℹ</span>
            <p className="text-xs text-white/60 leading-relaxed">{task.additionalInfo}</p>
          </div>
        )}

        {/* submission input */}
        <div className="ml-10 flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-white/70">
            {task.submissionLabel} <span style={{ color: deptColor }}>*</span>
          </label>
          {task.submissionType === "textarea" ? (
            <textarea
              rows={4}
              placeholder={task.submissionPlaceholder}
              {...register(subKey, {
                required: "This submission is required",
                maxLength: { value: 4000, message: "Keep it under 4000 characters" },
              })}
              className={`${inputClass} resize-none leading-relaxed`}
            />
          ) : (
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm pointer-events-none">🔗</span>
              <input
                type="url"
                placeholder={task.submissionPlaceholder}
                {...register(subKey, {
                  required: "This submission is required",
                  validate: (value) => {
                    try {
                      const url = new URL(value);
                      if (!["http:", "https:"].includes(url.protocol)) {
                        return "Invalid URL protocol";
                      }
                      return true;
                    } catch {
                      return "Enter a valid URL";
                    }
                  },
                })}
                className={`${inputClass} pl-9`}
              />
            </div>
          )}
          <FieldError message={errors[subKey]?.message} />
        </div>

        {/* reference field */}
        {/* {task.referenceLabel && (
          <div className="ml-10 flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-white/45">{task.referenceLabel}</label>
            <input
              type="text"
              placeholder={task.referencePlaceholder}
              {...register(refKey)}
              className={`${inputClass} border-dashed opacity-70 focus:opacity-100`}
            />
          </div>
        )} */}
      </div>
    </motion.div>
  );
}