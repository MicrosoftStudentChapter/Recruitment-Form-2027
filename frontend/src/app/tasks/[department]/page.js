import { taskData } from "@/data/tasks";
import { notFound } from "next/navigation";
import TaskPageClient from "./TaskPageClient";

export async function generateStaticParams() {
  return Object.keys(taskData).map((dept) => ({ department: dept }));
}

export async function generateMetadata({ params }) {
  const { department } = await params;
  const task = taskData[department];
  if (!task) return { title: "Not Found" };
  return {
    title: `${task.name} Task Guide — MLSC Recruitment`,
    description: task.taskStatement,
  };
}

export default async function TaskPage({ params }) {
  const { department } = await params;
  const task = taskData[department];
  if (!task) notFound();
  return <TaskPageClient task={task} />;
}
