"use client";

import ChatConstructor from "../components/ChatConstructor/ChatConstructor";
import type { Agent } from "../types/agent";

// Mock agents data
const mockAgents: Agent[] = [
  {
    id: "1",
    name: "Email Agent",
    description: "Handles email operations and notifications",
  },
  {
    id: "2",
    name: "Calendar Agent",
    description: "Manages calendar events and scheduling",
  },
  {
    id: "3",
    name: "Database Agent",
    description: "Performs database queries and operations",
  },
  {
    id: "4",
    name: "API Agent",
    description: "Makes external API calls and integrations",
  },
  {
    id: "5",
    name: "File Agent",
    description: "Handles file operations and storage",
  },
];

export default function ChatConstructorPage() {
  return <ChatConstructor initialAgents={mockAgents} />;
}
