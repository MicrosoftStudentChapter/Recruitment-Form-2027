"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Plus, Trash2, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { departments } from "@/data/departments";
import { submitApplication } from "@/lib/api";

function SectionBadge({ number }) {
  return (
    <div className="w-10 h-10 rounded-xl bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center shrink-0 shadow-inner">
      <span className="text-brand-blue font-bold text-lg">{number}</span>
    </div>
  );
}

function WordCounter({ text, min, max }) {
  const words = text ? text.trim().split(/\s+/).filter((w) => w.length > 0).length : 0;
  let colorClass = "text-slate-500";
  if (words > 0) {
    if (words < min) colorClass = "text-amber-500";
    else if (words <= max) colorClass = "text-emerald-500";
    else colorClass = "text-red-500";
  }

  return (
    <div className={cn("text-xs font-mono transition-colors", colorClass)}>
      {words}
    </div>
  );
}

function getLinkOptions(deptId) {
  switch (deptId) {
    case "technical": return [{value: "github", label: "GitHub Repository"}, {value: "deployed", label: "Deployed Website"}, {value: "drive", label: "Google Drive Folder"}, {value: "other", label: "Other Link"}];
    case "design": return [{value: "figma", label: "Figma Design File"}, {value: "drive", label: "Google Drive Folder"}, {value: "other", label: "Other Link"}];
    case "content": return [{value: "docs", label: "Google Docs Link"}, {value: "drive", label: "Google Drive Folder"}, {value: "other", label: "Other Link"}];
    case "marketing": return [{value: "docs", label: "Google Docs Link"}, {value: "drive", label: "Google Drive Folder"}, {value: "other", label: "Other Link"}];
    case "media": return [{value: "drive", label: "Google Drive Folder/File"}, {value: "other", label: "Other Link"}];
    default: return [{value: "github", label: "GitHub Repository"}, {value: "drive", label: "Google Drive Folder"}, {value: "deployed", label: "Deployed Website"}, {value: "figma", label: "Figma Design File"}, {value: "other", label: "Other Link"}];
  }
}

export default function RecruitmentForm() {
  const { register, handleSubmit, watch, setValue, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      submissionLinks: [{ type: "github", url: "" }],
      secondarySubmissionLinks: [{ type: "github", url: "" }]
    }
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "submissionLinks"
  });

  const { fields: secondaryFields, append: appendSecondary, remove: removeSecondary } = useFieldArray({
    control,
    name: "secondarySubmissionLinks"
  });

  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const allData = watch();

  useEffect(() => {
    const draft = localStorage.getItem("mlsc-recruitment-draft");
    if (draft) {
      try {
        reset(JSON.parse(draft));
      } catch (e) {}
    }
    setIsMounted(true);
  }, [reset]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("mlsc-recruitment-draft", JSON.stringify(allData));
    }
  }, [allData, isMounted]);

  const selectedDepartmentId = watch("department");
  const selectedDepartment = departments.find(d => d.id === selectedDepartmentId);

  const selectedSecondaryId = watch("secondaryDepartment");
  const selectedSecondary = departments.find(d => d.id === selectedSecondaryId);

  const watchWhyJoin = watch("whyJoin", "");
  const watchDifference = watch("difference", "");
  const watchSecondaryManagement = watch("secondaryManagement", "");

  useEffect(() => {
    if (selectedDepartmentId) {
      const options = getLinkOptions(selectedDepartmentId);
      setValue("submissionLinks.0.type", options[0].value);
    }
  }, [selectedDepartmentId, setValue]);

  useEffect(() => {
    if (selectedSecondaryId) {
      const options = getLinkOptions(selectedSecondaryId);
      setValue("secondarySubmissionLinks.0.type", options[0].value);
    }
  }, [selectedSecondaryId, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      await submitApplication(data);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error(error);
      setSubmitError(error.message || "Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl mx-auto mt-20 p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl text-center"
      >
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-400" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Application Received!</h2>
        <p className="text-slate-300 text-lg leading-relaxed">
          Thank you for applying to the Microsoft Learn Student Chapter. We will review your application and get back to you soon.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-[1000px] mx-auto pb-24 px-4 sm:px-6 relative z-10 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-12 sm:space-y-16">
            
            {/* ── Section 01: Personal Information ── */}
            <motion.section 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <SectionBadge number="01" />
                <h2 className="text-xl sm:text-2xl font-bold text-white">Personal Information</h2>
              </div>
              
              <div className="pl-0 sm:pl-16 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-300">Full Name<span className="text-brand-blue ml-1">*</span></label>
                  <input
                    {...register("fullName", { required: "Full name is required" })}
                    placeholder="Enter your full name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue/50 transition-all"
                  />
                  {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName.message}</p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-300 flex justify-between">
                    <span>Thapar Email Address<span className="text-brand-blue ml-1">*</span></span>
                    <span className="text-xs text-slate-500 font-normal">Must be your official @thapar.edu email</span>
                  </label>
                  <input
                    {...register("email", { 
                      required: "Email is required",
                      pattern: { value: /^[A-Z0-9._%+-]+@thapar\.edu$/i, message: "Must be a valid @thapar.edu email address" }
                    })}
                    placeholder="yourname@thapar.edu"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue/50 transition-all"
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300">Roll Number<span className="text-brand-blue ml-1">*</span></label>
                  <input
                    {...register("rollNumber", { 
                      required: "Roll number is required",
                      pattern: { value: /^\d+$/, message: "Must contain only numbers" }
                    })}
                    placeholder="102203XXX"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue/50 transition-all"
                  />
                  {errors.rollNumber && <p className="text-xs text-red-400 mt-1">{errors.rollNumber.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300">Phone Number<span className="text-brand-blue ml-1">*</span></label>
                  <input
                    {...register("phone", { 
                      required: "Phone number is required",
                      pattern: { value: /^\d{10}$/, message: "Must be exactly 10 digits" }
                    })}
                    placeholder="98XXXXXXXX"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue/50 transition-all"
                  />
                  {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>}
                </div>
              </div>
            </motion.section>

            <div className="border-t border-white/5" />

            {/* ── Section 02: Previous Societies ── */}
            <motion.section 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <SectionBadge number="02" />
                <h2 className="text-xl sm:text-2xl font-bold text-white">Previous Societies</h2>
              </div>

              <div className="pl-0 sm:pl-16 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                    <span>Societies<span className="text-brand-blue ml-1">*</span></span>
                    <span className="text-xs text-slate-500 font-normal">List all clubs separated by commas. Write 'None' if not applicable.</span>
                  </label>
                  <input
                    {...register("societies", { required: "Please provide societies or write 'None'" })}
                    placeholder="For example: ACM, MARKFIN, ..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue/50 transition-all"
                  />
                  {errors.societies && <p className="text-xs text-red-400 mt-1">{errors.societies.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                    <span>Short Description of Role<span className="text-brand-blue ml-1">*</span></span>
                    <span className="text-xs text-slate-500 font-normal">10–20 words about your contribution</span>
                  </label>
                  <input
                    {...register("societyRole", { required: "Please describe your role" })}
                    placeholder="For example: Led design team, managed social media, organized annual festival workshops…"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue/50 transition-all"
                  />
                  {errors.societyRole && <p className="text-xs text-red-400 mt-1">{errors.societyRole.message}</p>}
                </div>
              </div>
            </motion.section>

            <div className="border-t border-white/5" />

            {/* ── Section 03: Written Responses ── */}
            <motion.section 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <SectionBadge number="03" />
                <h2 className="text-xl sm:text-2xl font-bold text-white">Written Responses</h2>
              </div>

              <div className="pl-0 sm:pl-16 space-y-8">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-semibold text-slate-300">
                      Why do you want to join the Microsoft Learn Student Chapter?<span className="text-brand-blue ml-1">*</span>
                    </label>
                    <p className="text-xs text-slate-500 mt-1">Expected 70–100 words</p>
                  </div>
                  <div className="relative">
                    <textarea
                      {...register("whyJoin", { required: "This response is required" })}
                      rows={4}
                      placeholder="Tell us what draws you to the chapter, what you hope to learn, and why you would be a great fit for the community…"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue/50 transition-all resize-none"
                    />
                    <div className="absolute bottom-3 right-4 flex items-center gap-1.5">
                      <WordCounter text={watchWhyJoin} min={70} max={100} />
                    </div>
                  </div>
                  {errors.whyJoin && <p className="text-xs text-red-400 mt-1">{errors.whyJoin.message}</p>}
                </div>

                <div className="w-full h-px bg-white/5" />

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-semibold text-slate-300">
                      How would you create a difference?<span className="text-brand-blue ml-1">*</span>
                    </label>
                    <p className="text-xs text-slate-500 mt-1">Expected 70–100 words</p>
                  </div>
                  <div className="relative">
                    <textarea
                      {...register("difference", { required: "This response is required" })}
                      rows={4}
                      placeholder="Describe the impact you want to make — events you would organize, projects you would initiate, or problems you would solve…"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue/50 transition-all resize-none"
                    />
                    <div className="absolute bottom-3 right-4 flex items-center gap-1.5">
                      <WordCounter text={watchDifference} min={70} max={100} />
                    </div>
                  </div>
                  {errors.difference && <p className="text-xs text-red-400 mt-1">{errors.difference.message}</p>}
                </div>
              </div>
            </motion.section>

            <div className="border-t border-white/5" />

            {/* ── Section 04: Primary Department ── */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <SectionBadge number="04" />
                <h2 className="text-xl sm:text-2xl font-bold text-white">Primary Department</h2>
              </div>

              <div className="pl-0 sm:pl-16">
                <input type="hidden" {...register("department", { required: "Please select a primary department" })} />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                  {departments.map((dept) => (
                    <motion.button
                      key={dept.id}
                      type="button"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setValue("department", dept.id, { shouldValidate: true });
                        if (selectedSecondaryId === dept.id) setValue("secondaryDepartment", null);
                      }}
                      className={cn(
                        "flex flex-col items-center gap-2.5 p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer",
                        selectedDepartmentId === dept.id 
                          ? "bg-brand-blue/20 border-brand-blue/50 shadow-lg shadow-brand-blue/20" 
                          : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                      )}
                    >
                      <span className="text-3xl sm:text-4xl">{dept.emoji}</span>
                      <span className={cn(
                        "text-xs sm:text-sm font-medium",
                        selectedDepartmentId === dept.id ? "text-brand-blue" : "text-slate-300"
                      )}>
                        {dept.name}
                      </span>
                    </motion.button>
                  ))}
                </div>
                {errors.department && <p className="text-xs text-red-400 mt-2">{errors.department.message}</p>}
              </div>

              {/* Primary Department Content */}
              <AnimatePresence>
                {selectedDepartment && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden pl-0 sm:pl-16 space-y-6"
                  >
                    {/* Task Summary Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="p-5 rounded-2xl bg-brand-blue/10 border border-brand-blue/30 space-y-3"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">📌 {selectedDepartment.name} Task</span>
                      </div>
                      <p className="text-sm text-slate-200 leading-relaxed">{selectedDepartment.taskSummary}</p>
                      <a 
                        href={`/tasks/${selectedDepartment.id}`} 
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-blue/20 border border-brand-blue/40 text-brand-blue text-sm font-medium hover:bg-brand-blue/30 transition-all"
                      >
                        View Full Task Guide →
                      </a>
                    </motion.div>

                    {/* Primary Submission Links */}
                    <div className="space-y-5">
                      <p className="text-sm font-semibold text-slate-300">
                        Task Submission Links for {selectedDepartment.name}<span className="text-brand-blue ml-1">*</span>
                      </p>

                      <div className="space-y-4">
                        <AnimatePresence initial={false}>
                          {fields.map((item, index) => (
                            <motion.div 
                              key={item.id}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="flex flex-col sm:flex-row gap-3 items-start sm:items-center overflow-hidden"
                            >
                              <div className="w-full sm:w-1/3">
                                <select
                                  {...register(`submissionLinks.${index}.type`)}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue/50 appearance-none"
                                >
                                  {getLinkOptions(selectedDepartmentId).map(opt => (
                                    <option key={opt.value} value={opt.value} className="bg-[#0f172a]">{opt.label}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="w-full flex gap-3">
                                <div className="relative flex-grow">
                                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <LinkIcon className="h-4 w-4 text-slate-500" />
                                  </div>
                                  <input
                                    {...register(`submissionLinks.${index}.url`, { required: "Link is required" })}
                                    placeholder="https://..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue/50 transition-all"
                                  />
                                </div>
                                {fields.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="p-3 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl border border-transparent hover:border-red-400/20 transition-all shrink-0"
                                  >
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                )}
                              </div>
                              {errors.submissionLinks?.[index]?.url && (
                                <p className="text-xs text-red-400 mt-1 sm:hidden w-full">{errors.submissionLinks[index].url.message}</p>
                              )}
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => append({ type: "other", url: "" })}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-slate-600 text-slate-400 text-sm font-medium hover:text-white hover:border-slate-400 hover:bg-white/5 transition-all"
                      >
                        <Plus className="w-4 h-4" /> Add Another Link
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>

            <div className="border-t border-white/5" />

            {/* ── Section 05: Secondary Department (Optional) ── */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <SectionBadge number="05" />
                <h2 className="text-xl sm:text-2xl font-bold text-white">Secondary Department <span className="text-slate-500 text-sm font-normal ml-2">(Optional)</span></h2>
              </div>

              <div className="pl-0 sm:pl-16 space-y-6">
                <input type="hidden" {...register("secondaryDepartment")} />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {departments.filter(d => d.id !== selectedDepartmentId).map((dept) => (
                    <motion.button
                      key={dept.id}
                      type="button"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setValue("secondaryDepartment", dept.id, { shouldValidate: true })}
                      className={cn(
                        "flex flex-col items-center gap-2.5 p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer",
                        selectedSecondaryId === dept.id 
                          ? "bg-brand-blue/20 border-brand-blue/50 shadow-lg shadow-brand-blue/20" 
                          : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                      )}
                    >
                      <span className="text-3xl sm:text-4xl">{dept.emoji}</span>
                      <span className={cn(
                        "text-xs sm:text-sm font-medium",
                        selectedSecondaryId === dept.id ? "text-brand-blue" : "text-slate-300"
                      )}>
                        {dept.name}
                      </span>
                    </motion.button>
                  ))}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setValue("secondaryDepartment", null, { shouldValidate: true })}
                    className={cn(
                      "flex flex-col items-center justify-center gap-2.5 p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer",
                      !selectedSecondaryId 
                        ? "bg-slate-800 border-slate-600 shadow-lg shadow-slate-900/20" 
                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                    )}
                  >
                    <span className="text-3xl sm:text-4xl text-slate-500">∅</span>
                    <span className={cn(
                      "text-xs sm:text-sm font-medium",
                      !selectedSecondaryId ? "text-slate-300" : "text-slate-500"
                    )}>
                      None
                    </span>
                  </motion.button>
                </div>
                {errors.secondaryDepartment && <p className="text-xs text-red-400 mt-2">{errors.secondaryDepartment.message}</p>}

                <AnimatePresence>
                  {selectedSecondary && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden space-y-6 mt-4"
                    >
                      {/* Task Summary Card */}
                      <div className="p-5 rounded-2xl bg-brand-blue/10 border border-brand-blue/30 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">📌 {selectedSecondary.name} Task</span>
                        </div>
                        <p className="text-sm text-slate-200 leading-relaxed">{selectedSecondary.taskSummary}</p>
                        <a 
                          href={`/tasks/${selectedSecondary.id}`} 
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-blue/20 border border-brand-blue/40 text-brand-blue text-sm font-medium hover:bg-brand-blue/30 transition-all"
                        >
                          View Full Task Guide →
                        </a>
                      </div>

                      {/* Secondary Management Question */}
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-semibold text-slate-300">
                            Why are you applying for {selectedSecondary.name} as a secondary option, and how do you plan to manage tasks for both departments?<span className="text-brand-blue ml-1">*</span>
                          </label>
                          <p className="text-xs text-slate-500 mt-1">Expected 50–80 words</p>
                        </div>
                        <div className="relative">
                          <textarea
                            {...register("secondaryManagement", { required: selectedSecondaryId ? "This response is required" : false })}
                            rows={3}
                            placeholder="Explain your motivation and time management strategy..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue/50 transition-all resize-none"
                          />
                          <div className="absolute bottom-3 right-4 flex items-center gap-1.5">
                            <WordCounter text={watchSecondaryManagement} min={50} max={100} />
                          </div>
                        </div>
                        {errors.secondaryManagement && <p className="text-xs text-red-400 mt-1">{errors.secondaryManagement.message}</p>}
                      </div>

                      {/* Secondary Submission Links */}
                      <div className="space-y-5">
                        <p className="text-sm font-semibold text-slate-300">
                          Task Submission Links for {selectedSecondary.name}<span className="text-brand-blue ml-1">*</span>
                        </p>

                        <div className="space-y-4">
                          <AnimatePresence initial={false}>
                            {secondaryFields.map((item, index) => (
                              <motion.div 
                                key={item.id}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col sm:flex-row gap-3 items-start sm:items-center overflow-hidden"
                              >
                                <div className="w-full sm:w-1/3">
                                  <select
                                    {...register(`secondarySubmissionLinks.${index}.type`)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue/50 appearance-none"
                                  >
                                    {getLinkOptions(selectedSecondaryId).map(opt => (
                                      <option key={opt.value} value={opt.value} className="bg-[#0f172a]">{opt.label}</option>
                                    ))}
                                  </select>
                                </div>
                                <div className="w-full flex gap-3">
                                  <div className="relative flex-grow">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                      <LinkIcon className="h-4 w-4 text-slate-500" />
                                    </div>
                                    <input
                                      {...register(`secondarySubmissionLinks.${index}.url`, { required: selectedSecondaryId ? "Link is required" : false })}
                                      placeholder="https://..."
                                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue/50 transition-all"
                                    />
                                  </div>
                                  {secondaryFields.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => removeSecondary(index)}
                                      className="p-3 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl border border-transparent hover:border-red-400/20 transition-all shrink-0"
                                    >
                                      <Trash2 className="w-5 h-5" />
                                    </button>
                                  )}
                                </div>
                                {errors.secondarySubmissionLinks?.[index]?.url && (
                                  <p className="text-xs text-red-400 mt-1 sm:hidden w-full">{errors.secondarySubmissionLinks[index].url.message}</p>
                                )}
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                        
                        <button
                          type="button"
                          onClick={() => appendSecondary({ type: "other", url: "" })}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-slate-600 text-slate-400 text-sm font-medium hover:text-white hover:border-slate-400 hover:bg-white/5 transition-all"
                        >
                          <Plus className="w-4 h-4" /> Add Another Link
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.section>

          </div>

          {/* Submit section (outside card for visual break) */}
          <div className="mt-8 space-y-5">
            {submitError && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {submitError}
              </div>
            )}
            <p className="text-center text-xs text-slate-500 leading-relaxed px-4">
              By submitting this application, you confirm that all information provided is accurate and all submitted tasks are your original work. Applications will be reviewed by the Microsoft Learn Student Chapter core team.
            </p>
            <motion.button
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.99 }}
              disabled={isSubmitting}
              type="submit"
              className="w-full py-4.5 sm:py-5 rounded-2xl bg-gradient-to-r from-brand-dark via-brand-blue to-cyan-500 text-white font-semibold text-lg shadow-xl shadow-brand-blue/25 hover:shadow-brand-blue/40 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Submit Application →"
              )}
            </motion.button>
          </div>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-slate-600">
          Microsoft Learn Student Chapter · Thapar Institute of Engineering and Technology · 2026–27
        </p>
      </motion.div>
    </div>
  );
}
