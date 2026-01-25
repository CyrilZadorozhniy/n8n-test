"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import AgentsPanel from "../AgentsPanel/AgentsPanel";
import type { Agent } from "@/app/types/agent";
import { useState } from "react";

interface Step1Props {
  agents: Agent[];
}

export default function Step1({ agents }: Step1Props) {
  const [localAgents, setLocalAgents] = useState<Agent[]>(agents);

  const handleDragEnd = (event: DragEndEvent) => {
    // In Step 1, we might not have a drop target, or it could be different
    // This is just a placeholder for Step 1 functionality
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex h-screen">
        <AgentsPanel agents={localAgents} />
        <div className="flex-1 p-8 bg-white">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Step 1</h1>
          <p className="text-gray-600">This is Step 1 with the agents panel.</p>
        </div>
      </div>
    </DndContext>
  );
}
