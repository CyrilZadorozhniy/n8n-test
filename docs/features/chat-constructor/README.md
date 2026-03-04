# [FE] Chatbot Builder – Step 2: Main Editor Screen (Agents Canvas + Configuration)

## 1. Overview
**UI Area:**  
Page

**User Goal:**  
Configure which agents are connected to a chatbot by dragging them onto a visual canvas, ensuring each agent is used at most once per chat and can be safely removed when no longer needed.

**Summary:**  
The Chat Constructor (Sunbeam) main editor screen provides a two-pane layout with an agents panel on the left and a chat canvas on the right. Admins can drag agents from the left panel and drop them onto the canvas to connect them as tools for the chatbot. Once connected, agents are visually represented on the canvas and marked as "In use" in the panel to prevent duplicates. Hovering a connected agent reveals a remove control, which opens a confirmation popup before disconnecting the agent and making it available again in the panel.

**Status:**  
experimental

---

## 2. User Flow & UX Behavior
### User Flow
1. User opens the Chat Constructor page at `/chat-constructor` from the home screen.
2. User interacts with the left **Agents Panel** by dragging an agent card toward the **Chat Canvas**.
3. UI transitions to a drag-and-drop state, and when the user drops the agent over the canvas drop area, the agent is added as a connected node.
4. User sees the agent node rendered on the canvas, the corresponding agent marked as **In use** and disabled in the panel, and can optionally hover the node to remove it via the confirmation popup.

### UI States
- **Idle:** Agents panel is visible (expanded by default) with the list of all available agents. The chat canvas displays its drop area and any already-connected agents.
- **Loading:** Unknown (no explicit loading state is implemented; drag-and-drop and state updates are synchronous in the current UI).
- **Success:** After a successful drop, the agent appears as a connected node on the canvas, and the corresponding agent card in the panel is visually marked as **In use**, disabled from dragging, and slightly dimmed.
- **Empty:** Canvas has no connected agents; only the empty drop area and instructional content (if any) are shown. The agents panel still lists all agents as available and draggable.
- **Error:** Unknown (no explicit error UI implemented; invalid drops or duplicate connections are silently ignored in the drag-end handler).

---

## 3. Component Structure
### Component Tree
ChatConstructorPage (`app/chat-constructor/page.tsx`)  
  └─ ChatConstructor (`app/components/ChatConstructor/ChatConstructor.tsx`)  
    ├─ DndContext (@dnd-kit/core)  
    │   ├─ AgentsPanel (`app/components/AgentsPanel/AgentsPanel.tsx`)  
    │   │   └─ AgentCard (inner component)  
    │   └─ ChatCanvas (`app/components/ChatCanvas/ChatCanvas.tsx`)  
    │       ├─ ConnectedAgentNode (inner component)  
    │       │   └─ ConfirmationPopup (`app/components/ConfirmationPopup/ConfirmationPopup.tsx`)  
    │       └─ Droppable area (`useDroppable` with id="chat-canvas")  
    └─ DragOverlay (from @dnd-kit/core, used to render the active dragging agent if configured)

### Key Components
- **ChatConstructorPage** — Next.js page entry for `/chat-constructor`; injects mock `initialAgents` and renders the `ChatConstructor` feature shell.
- **ChatConstructor** — Orchestrates drag-and-drop using `DndContext`, tracks which agents are connected via a `Set` of IDs, derives `isInUse` state for each agent, and passes connected agents to the canvas and status-aware agents to the panel.
- **AgentsPanel** — Left sidebar panel reused from Step 1; lists all agents, supports collapse/expand, and renders individual draggable `AgentCard` items, disabling drag and click for agents marked as `isInUse` and visually labeling them as **In use**.
- **AgentCard** — Draggable card for a single agent, wired with `useDraggable` from `@dnd-kit/core`; reflects drag state (transform and opacity) and conditionally shows disabled styling and the **In use** badge.
- **ChatCanvas** — Main canvas area configured as a drop target via `useDroppable` (id `"chat-canvas"`); displays all connected agents as `ConnectedAgentNode` elements and handles agent removal via callbacks.
- **ConnectedAgentNode** — Visual representation of a connected agent on the canvas; on hover, reveals an X remove button. Clicking the button opens `ConfirmationPopup` and, on confirmation, invokes `onRemove` to disconnect the agent.
- **ConfirmationPopup** — Centered modal overlay used to confirm removal of a connected agent, with exact copy: title "Remove connected agent?", message explaining potential chatbot errors, and **Cancel** / **Remove** actions. Handles Escape key and background click to close.
- **Step1** — Separate page-level feature for Step 1 that reuses `AgentsPanel` in isolation; primarily for parity and comparison, not directly part of the Step 2 canvas behavior.
- **Agent (type)** — Shared TypeScript interface (`id`, `name`, `description?`, `isInUse?`) used across `AgentsPanel`, `ChatCanvas`, and `ChatConstructor` to ensure consistent agent shape and usage state.
