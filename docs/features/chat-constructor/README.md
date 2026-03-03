# [FE] Chatbot Builder – Step 2: Main Editor Screen (Agents Canvas + Configuration)

## 1. Overview
**UI Area:**  
Page

**User Goal:**  
Configure a chatbot by connecting available agents as tools on a visual canvas and managing their lifecycle within a single editor screen.

**Summary:**  
The Chatbot Builder Step 2 provides the main editor screen ("Chat Constructor / Sunbeam") where admins can drag agents from a reusable left-hand agents panel onto a central chat canvas to connect them as tools for a chatbot. The screen enforces that each agent can only be connected once per chat, visually marks agents that are already in use, and allows safe removal of connected agents via a confirmation popup that re-enables them in the panel.

**Status:**  
experimental

---

## 2. User Flow & UX Behavior
### User Flow
1. User opens the Chat Constructor page (`/chat-constructor`) from the home screen.
2. User drags an agent card from the left "Agents Panel" and drops it onto the central chat canvas area.
3. UI transitions to a state where the dropped agent appears as a connected node on the canvas and the same agent in the left panel is marked as "In use" and disabled from further dragging.
4. User sees the connected agent node on the canvas, with the ability to hover and remove it via an "X" button that opens a confirmation popup; on confirm, the agent is removed from the canvas and becomes available again in the panel.

### UI States
- **Idle:** Editor is loaded with the agents panel on the left and an empty (or partially filled) chat canvas on the right. All available agents are visible in the panel; connected agents appear as nodes on the canvas.
- **Loading:** No explicit loading state is implemented in this step; the page content renders once Next.js has loaded the client bundle.
- **Success:** After a successful drop, the agent appears as a connected node on the canvas, and the corresponding agent card in the panel shows an "In use" badge and non-interactive styling (disabled cursor, reduced opacity).
- **Empty:** On first load or after removing all agents, the canvas shows the empty state copy and illustration (guidance text explaining that agents can be dragged into the canvas to connect them to the chat), and all agents in the left panel are available without "In use" labels.
- **Error:** Error handling is limited to interaction-level safeguards (e.g., trying to drag an already used agent is visually disabled). There is no dedicated error banner or toast for network or system failures in this implementation.

---

## 3. Component Structure
### Component Tree
- `app/chat-constructor/page.tsx` (ChatConstructorPage)
  - `ChatConstructor`
    - `DndContext` (@dnd-kit/core)
      - `AgentsPanel`
        - `AgentCard` (per agent)
      - `ChatCanvas`
        - `Droppable` area (id: `"chat-canvas"`)
        - `ConnectedAgentNode` (per connected agent)
          - `ConfirmationPopup` (modal, rendered when removing an agent)
      - `DragOverlay` (for active dragged agent preview)

### Key Components
- **ChatConstructorPage** — Next.js page entry for `/chat-constructor`; instantiates `ChatConstructor` with initial mock agents.
- **ChatConstructor** — Orchestrates drag-and-drop context, tracks connected agents, derives `isInUse` state, and wires `AgentsPanel` with `ChatCanvas` via `@dnd-kit/core` sensors and handlers.
- **AgentsPanel** — Left-side reusable panel listing all agents with collapse/expand behavior; renders each agent as an `AgentCard` and exposes them as draggable sources.
- **AgentCard** — Draggable representation of a single agent; integrates `useDraggable`, updates visual state while dragging, and shows an "In use" badge and disabled styling when the agent is already connected.
- **ChatCanvas** — Central canvas area configured as a droppable target for agents; renders `ConnectedAgentNode` instances for all currently connected agents and wires removal back to `ChatConstructor`.
- **ConnectedAgentNode** — Visual node/card on the canvas for a connected agent; shows an inline remove "X" icon on hover and controls the visibility of the `ConfirmationPopup`.
- **ConfirmationPopup** — Reusable confirmation modal used when removing a connected agent; displays the specified copy and Cancel/Remove actions and handles Escape key and backdrop interactions.
- **Step1** — Reference page for Step 1 that reuses `AgentsPanel` in a simpler layout to ensure visual and behavioral consistency of the left agents panel between steps.
- **Agent type (`app/types/agent.ts`)** — Shared TypeScript interface describing agent objects, including optional `description` and `isInUse` fields used across the panel and canvas.
