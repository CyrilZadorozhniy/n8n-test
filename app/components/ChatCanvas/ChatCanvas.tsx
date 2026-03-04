"use client";

import { useDroppable } from "@dnd-kit/core";
import type { Agent } from "@/app/types/agent";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";
import { useState } from "react";

interface ChatCanvasProps {
  connectedAgents: Agent[];
  onRemoveAgent: (agentId: string) => void;
}

interface ConnectedAgentNodeProps {
  agent: Agent;
  onRemove: (agentId: string) => void;
}

function ConnectedAgentNode({ agent, onRemove }: ConnectedAgentNodeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <div
        className="relative p-4 bg-white border-2 border-blue-400 rounded-lg shadow-md min-w-[200px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{agent.name}</h3>
            {agent.description && (
              <p className="text-sm text-gray-600 mt-1">{agent.description}</p>
            )}
          </div>
          {isHovered && (
            <button
              onClick={() => setShowConfirm(true)}
              className="ml-2 p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
              aria-label="Remove agent"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <ConfirmationPopup
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => onRemove(agent.id)}
        title="Remove connected agent?"
        message="If you delete an agent, the chatbot may throw an error. Are you sure you want to delete this agent?"
        confirmText="Remove"
        cancelText="Cancel"
      />
    </>
  );
}

export default function ChatCanvas({ connectedAgents, onRemoveAgent }: ChatCanvasProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: "chat-canvas",
  });

  return (
    <div
      ref={setNodeRef}
      className={`
        flex-1 p-8 min-h-[400px] transition-colors
        ${isOver ? "bg-blue-50" : "bg-gray-100"}
      `}
    >
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Chat Canvas</h2>
        <p className="text-sm text-gray-600">
          Drag agents from the left panel to connect them to the chatbot
        </p>
      </div>
      <div className="flex flex-wrap gap-4">
        {connectedAgents.length === 0 ? (
          <div className="w-full py-12 text-center text-gray-500">
            <p>No agents connected. Drag agents from the left panel to get started.</p>
          </div>
        ) : (
          connectedAgents.map((agent) => (
            <ConnectedAgentNode
              key={agent.id}
              agent={agent}
              onRemove={onRemoveAgent}
            />
          ))
        )}
      </div>
    </div>
  );
}
