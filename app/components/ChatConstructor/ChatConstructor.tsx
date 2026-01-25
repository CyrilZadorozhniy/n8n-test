"use client";

import { DndContext, DragEndEvent, DragOverlay, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { useState } from "react";
import AgentsPanel from "../AgentsPanel/AgentsPanel";
import ChatCanvas from "../ChatCanvas/ChatCanvas";
import type { Agent } from "@/app/types/agent";

interface ChatConstructorProps {
  initialAgents: Agent[];
}

export default function ChatConstructor({ initialAgents }: ChatConstructorProps) {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [connectedAgentIds, setConnectedAgentIds] = useState<Set<string>>(new Set());
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Update agents with isInUse status
  const agentsWithStatus = agents.map((agent) => ({
    ...agent,
    isInUse: connectedAgentIds.has(agent.id),
  }));

  const connectedAgents = agents.filter((agent) => connectedAgentIds.has(agent.id));

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || over.id !== "chat-canvas") {
      return;
    }

    const agentId = active.id as string;
    const agent = agents.find((a) => a.id === agentId);

    if (!agent || connectedAgentIds.has(agentId)) {
      return;
    }

    // Add agent to connected agents
    setConnectedAgentIds((prev) => new Set(prev).add(agentId));
  };

  const handleRemoveAgent = (agentId: string) => {
    setConnectedAgentIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(agentId);
      return newSet;
    });
  };

  const activeAgent = activeId ? agents.find((a) => a.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-screen">
        <AgentsPanel agents={agentsWithStatus} />
        <ChatCanvas
          connectedAgents={connectedAgents}
          onRemoveAgent={handleRemoveAgent}
        />
      </div>
      <DragOverlay>
        {activeAgent ? (
          <div className="p-4 bg-white border-2 border-blue-400 rounded-lg shadow-lg min-w-[200px]">
            <h3 className="font-semibold text-gray-900">{activeAgent.name}</h3>
            {activeAgent.description && (
              <p className="text-sm text-gray-600 mt-1">{activeAgent.description}</p>
            )}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
