// Controller component responsible for rendering individual task guides and instructions inline.
"use client";


import Image from "next/image";
import { cn } from "@/lib/utils";

function Badge({ label, color }) {
  const colors = {
    blue: "bg-[rgba(0,120,212,0.2)] border-[#0078d4] text-[#60b8ff]",
    cyan: "bg-[rgba(0,212,255,0.15)] border-[#00d4ff] text-[#00d4ff]",
    orange: "bg-[rgba(255,149,0,0.15)] border-[#ff9500] text-[#ff9500]",
  };
  return (
    <span className={cn("px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border", colors[color])}>
      {label}
    </span>
  );
}

function SectionNum({ num }) {
  return (
    <div className="w-9 h-9 bg-gradient-to-br from-[#0078d4] to-[#00d4ff] rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0">
      {num}
    </div>
  );
}

function Card({ children, accentColor }) {
  return (
    <div className="relative bg-[rgba(0,120,212,0.08)] border border-[rgba(0,162,255,0.25)] rounded-xl p-6 sm:p-7 mb-4 overflow-hidden">
      <div className={cn("absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0078d4] to-[#00d4ff]", accentColor)} />
      {children}
    </div>
  );
}

function Alert({ type, title, children }) {
  const styles = {
    info: "bg-[rgba(0,162,255,0.08)] border-l-[#0078d4] text-[#9ec8f0]",
    warning: "bg-[rgba(255,149,0,0.08)] border-l-[#ff9500] text-[#ffd080]",
    success: "bg-[rgba(0,229,160,0.08)] border-l-[#00e5a0] text-[#80ffcc]",
  };
  return (
    <div className={cn("rounded-lg p-4 my-4 border-l-[3px] text-sm", styles[type])}>
      {title && <strong className="block mb-1 text-xs uppercase tracking-widest opacity-80">{title}</strong>}
      {children}
    </div>
  );
}

function ChecklistItem({ children, filled }) {
  return (
    <li className="flex gap-3 items-start py-2 border-b border-[rgba(0,120,212,0.1)] last:border-b-0 text-sm text-[#e8f4ff]">
      <div className={cn("w-5 h-5 border-2 rounded shrink-0 mt-0.5 flex items-center justify-center", filled ? "bg-[#0078d4] border-[#0078d4]" : "border-[#0078d4]")}>
        {filled && <span className="text-white text-xs">✓</span>}
      </div>
      <div>{children}</div>
    </li>
  );
}

function ScoreBar({ name, points, pct, desc, isBonus }) {
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="font-semibold text-[15px] text-[#e8f4ff]">{name}</span>
        <span className={cn("px-2.5 py-0.5 rounded text-xs font-mono font-semibold border", isBonus ? "bg-[rgba(255,149,0,0.12)] border-[rgba(255,149,0,0.3)] text-[#ff9500]" : "bg-[rgba(0,162,255,0.15)] border-[rgba(0,162,255,0.3)] text-[#60b8ff]")}>
          {points} pts
        </span>
      </div>
      <p className="text-xs text-[#9ec8f0] mb-1.5">{desc}</p>
      <div className="h-1.5 bg-[rgba(0,120,212,0.15)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: isBonus ? "linear-gradient(90deg, #ff9500, #ffd080)" : "linear-gradient(90deg, #0078d4, #00d4ff)",
          }}
        />
      </div>
    </div>
  );
}

export default function TaskController({ task, onClose }) {
  return (
    <div className="min-h-screen bg-[#020617] text-[#e8f4ff] relative">

      <div className="max-w-[960px] mx-auto px-6 pb-20 relative z-10">
        {/* Header */}
        <header className="text-center py-14 sm:py-16">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_0_20px_rgba(0,162,255,0.5)]">
              <Image src="/MLSCLogo-transparent.png" alt="MLSC" fill className="object-contain" />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold tracking-[3px] text-[#00d4ff] uppercase">Microsoft Learn Student Community</div>
              <div className="text-2xl font-bold text-[#e8f4ff]">Thapar Institute Chapter</div>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-br from-white to-[#00d4ff] bg-clip-text text-transparent mb-3">
            {task.name}<br />Recruitment Task Guide
          </h1>
          <p className="text-[#9ec8f0] text-sm mb-6 max-w-xl mx-auto">
            Second Year Recruitment — 2026–27 · {task.subtitle}
          </p>
          <div className="flex gap-2.5 justify-center flex-wrap">
            {task.badges.map((b, i) => <Badge key={i} {...b} />)}
          </div>
        </header>

        <div className="h-px bg-gradient-to-r from-transparent via-[#0078d4] to-transparent my-10" />

        {/* Overview */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <SectionNum num="∅" />
            <h2 className="text-2xl font-bold">Overview & Objective</h2>
          </div>
          <Card>
            <p className="mb-3 text-[15px]">{task.overview}</p>
            {task.overviewExtra && <p className="text-[15px]">{task.overviewExtra}</p>}
          </Card>
          {task.overviewNote && (
            <Alert type="info" title="⚙ department context">{task.overviewNote}</Alert>
          )}
        </section>

        {/* Task Statement */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <SectionNum num="01" />
            <h2 className="text-2xl font-bold">The Task</h2>
          </div>
          <div className="border border-[#00d4ff] rounded-xl p-5 sm:p-6 bg-[rgba(0,212,255,0.05)] mb-5">
            <div className="text-[11px] font-bold tracking-[2px] uppercase text-[#00d4ff] mb-2.5">📌 Task Statement</div>
            <p className="text-base text-[#e8f4ff]">{task.taskStatement}</p>
          </div>

          {task.curriculumNote && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-[#60b8ff] mb-3">Curriculum Coverage Required</h3>
              <p className="text-sm text-[#e8f4ff] leading-relaxed mb-4">{task.curriculumNote}</p>
            </div>
          )}

          {task.topicTable && (
            <>
              <h3 className="text-lg font-semibold text-[#60b8ff] mt-6 mb-3">What the Website Must Include</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[rgba(0,120,212,0.25)]">
                      <th className="px-3 py-2.5 text-left text-xs uppercase tracking-wide text-[#00d4ff] font-semibold">#</th>
                      <th className="px-3 py-2.5 text-left text-xs uppercase tracking-wide text-[#00d4ff] font-semibold">Topic</th>
                      <th className="px-3 py-2.5 text-left text-xs uppercase tracking-wide text-[#00d4ff] font-semibold">Must Have</th>
                    </tr>
                  </thead>
                  <tbody>
                    {task.topicTable.map((row) => (
                      <tr key={row.num} className="hover:bg-[rgba(0,120,212,0.05)] border-b border-[rgba(0,120,212,0.1)]">
                        <td className="px-3 py-2.5">{row.num}</td>
                        <td className="px-3 py-2.5 font-medium">{row.topic}</td>
                        <td className="px-3 py-2.5 text-[#9ec8f0]">{row.must}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Alert type="warning" title="⚠ no gaps allowed">
                Every topic in the table above must appear on the site. Missing even one major section is grounds for disqualification.
              </Alert>
            </>
          )}
        </section>

        {/* Conditions */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <SectionNum num="02" />
            <h2 className="text-2xl font-bold">Conditions to Fulfill</h2>
          </div>
          {task.conditions.map((cond, i) => (
            <Card key={i}>
              <h3 className="text-lg font-semibold text-[#60b8ff] mb-2">
                Condition {i + 1} — {cond.title}
              </h3>
              <p className="text-sm text-[#e8f4ff] mb-3">{cond.desc}</p>
              {cond.checklist && (
                <>
                  <h4 className="text-xs font-mono font-semibold text-[#00d4ff] tracking-wide mt-4 mb-2 uppercase">Requirements</h4>
                  <ul className="list-none">
                    {cond.checklist.map((item, j) => <ChecklistItem key={j}>{item}</ChecklistItem>)}
                  </ul>
                </>
              )}
              {cond.sampleQuestions && (
                <>
                  <h4 className="text-xs font-mono font-semibold text-[#00d4ff] tracking-wide mt-4 mb-2 uppercase">Sample Review Questions</h4>
                  <div className="bg-black/40 border border-[rgba(0,162,255,0.2)] rounded-lg p-4 font-mono text-xs text-[#00d4ff] leading-relaxed whitespace-pre-line">
                    {cond.sampleQuestions.map((q, j) => `→ ${q}`).join("\n")}
                  </div>
                </>
              )}
              {cond.tip && (
                <Alert type="info" title="✦ tip">{cond.tip}</Alert>
              )}
              {cond.warning && (
                <Alert type="warning" title="⚠ disqualification condition">{cond.warning}</Alert>
              )}
            </Card>
          ))}
        </section>

        {/* Submission */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <SectionNum num="03" />
            <h2 className="text-2xl font-bold">Submission Requirements</h2>
          </div>
          <Card>
            <ul className="list-none">
              {task.submission.map((item, i) => <ChecklistItem key={i}>{item}</ChecklistItem>)}
            </ul>
          </Card>
        </section>

        {/* Evaluation */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <SectionNum num="04" />
            <h2 className="text-2xl font-bold">Evaluation Rubric</h2>
          </div>
          <Card>
            <div className="flex flex-col gap-5">
              {task.evaluation.map((item, i) => <ScoreBar key={i} {...item} />)}
            </div>
          </Card>
        </section>

        {/* Recommendations and Avoid List */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <SectionNum num="05" />
            <h2 className="text-2xl font-bold">Recommendations & What to Avoid</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-lg font-semibold text-[#00e5a0] mb-3">✓ Recommendations</h3>
              <ul className="list-none">
                {task.recommendations && task.recommendations.map((item, i) => <ChecklistItem key={i} filled>{item}</ChecklistItem>)}
              </ul>
            </Card>
            <Card accentColor="!bg-gradient-to-r from-red-500 to-red-400">
              <h3 className="text-lg font-semibold text-red-400 mb-3">✗ What to Avoid</h3>
              <ul className="list-none">
                {task.avoidList && task.avoidList.map((item, i) => (
                  <li key={i} className="flex gap-3 items-start py-2 border-b border-[rgba(0,120,212,0.1)] last:border-b-0 text-sm text-[#e8f4ff]">
                    <div className="w-5 h-5 border-2 border-red-500 rounded shrink-0 mt-0.5" />
                    <div>{item}</div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>


        {/* Footer */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#0078d4] to-transparent my-10" />
        <footer className="text-center text-[#6a9ec0] text-sm pt-4">
          <div className="relative w-12 h-12 mx-auto mb-3 opacity-70 drop-shadow-[0_0_8px_rgba(0,162,255,0.3)]">
            <Image src="/MLSCLogo-transparent.png" alt="MLSC" fill className="object-contain" />
          </div>
          <p className="font-semibold text-[#9ec8f0]">Microsoft Learn Student Community — Thapar Institute of Engineering & Technology</p>
          <p className="mt-1">{task.name} · Second Year Recruitment 2026–27</p>
          <p className="mt-3 text-xs italic text-[#6a9ec0]">&ldquo;Build something you can explain. Understand everything you submit.&rdquo;</p>
          <button onClick={onClose} type="button" className="inline-block mt-6 px-5 py-2.5 rounded-xl bg-[#0078d4]/20 border border-[#0078d4]/40 text-[#60b8ff] text-sm font-medium hover:bg-[#0078d4]/30 transition-all">
            ← Back to Application Form
          </button>
        </footer>
      </div>
    </div>
  );
}
