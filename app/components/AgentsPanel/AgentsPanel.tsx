"use client";

import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import type { Agent } from "@/app/types/agent";

interface AgentsPanelProps {
  agents: Agent[];
  onAgentClick?: (agent: Agent) => void;
}

interface AgentCardProps {
  agent: Agent;
  onAgentClick?: (agent: Agent) => void;
}

function AgentCard({ agent, onAgentClick }: AgentCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: agent.id,
    disabled: agent.isInUse,
    data: {
      agent,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined;

  // Only apply drag listeners if agent is not in use
  const dragProps = agent.isInUse ? {} : { ...listeners, ...attributes };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...dragProps}
      className={`
        relative p-4 border rounded-lg transition-all
        ${agent.isInUse 
          ? "bg-gray-100 border-gray-300 cursor-not-allowed opacity-60" 
          : "bg-white border-gray-200 hover:border-blue-400 hover:shadow-md cursor-move"
        }
        ${isDragging ? "z-50" : ""}
      `}
      onClick={() => !agent.isInUse && onAgentClick?.(agent)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{agent.name}</h3>
          {agent.description && (
            <p className="text-sm text-gray-600 mt-1">{agent.description}</p>
          )}
        </div>
        {agent.isInUse && (
          <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
            In use
          </span>
        )}
      </div>
    </div>
  );
}

export default function AgentsPanel({ agents, onAgentClick }: AgentsPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="w-80 border-r border-gray-200 bg-gray-50 flex flex-col h-full">
      <div
        className="p-4 border-b border-gray-200 bg-white cursor-pointer flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-lg font-semibold text-gray-900">Agents</h2>
        <button
          className="text-gray-500 hover:text-gray-700"
          aria-label={isExpanded ? "Collapse" : "Expand"}
        >
          {isExpanded ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>
      </div>
      {isExpanded && (
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {agents.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">No agents available</p>
          ) : (
            agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} onAgentClick={onAgentClick} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
