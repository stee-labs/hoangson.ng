/**
 * What I'm exploring right now. Edit this file to update the
 * "Currently Exploring" card and the Lab page — no component changes needed.
 */

export type ExperimentStatus = "researching" | "prototyping" | "paused" | "planned";

export type Experiment = {
  title: string;
  subtitle?: string;
  status: ExperimentStatus;
  description: string;
};

export const currentlyExploring: Experiment = {
  title: "AI Agents",
  subtitle: "for Hospitality",
  status: "researching",
  description: "How agents that understand intent can make hotel discovery and booking feel like a conversation.",
};

export const experiments: Experiment[] = [
  currentlyExploring,
  {
    title: "Agentic Commerce",
    status: "planned",
    description: "Agents that can compare, bundle and purchase on a guest’s behalf — with clear consent.",
  },
  {
    title: "AI Search",
    status: "planned",
    description: "Semantic search over hotels, rooms and offers using natural language instead of filters.",
  },
  {
    title: "Conversational UX",
    status: "planned",
    description: "Patterns for when chat helps, when it hurts, and how to hand off to classic UI.",
  },
];

export const statusLabel: Record<ExperimentStatus, string> = {
  researching: "Researching",
  prototyping: "Prototyping",
  paused: "Paused",
  planned: "Up next",
};

export const aiLab = {
  heading: "AI Lab",
  subtitle: "Exploring how AI agents can change the way guests discover and book hotels.",
  badge: "Research / Prototype",
  prompt: "I want a room near the beach this weekend.",
  concepts: ["AI Agents", "LLM", "Tool Calling", "RAG", "AI Search", "Recommendation", "Conversational UX"],
  flow: [
    { id: "user", label: "User", items: ["“I want a room near the beach this weekend.”"] },
    { id: "agent", label: "AI Agent", items: ["Intent detection", "Search", "Reasoning", "Tool calling"] },
    { id: "apis", label: "Hotel APIs", items: ["Hotel", "Room", "Availability", "Rate"] },
    { id: "result", label: "Smart result", items: ["Personalized hotel recommendation"] },
  ],
};
