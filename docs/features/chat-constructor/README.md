# Chatbot Builder – Step 2: Main Editor Screen (Agents Canvas + Configuration)

## 1. Overview
**UI Area:**  
Page

**User Goal:**  
Configure which agents are connected to a chatbot by dragging them onto the canvas and managing their lifecycle.

**Summary:**  
The Chat Constructor main editor screen (Sunbeam) lets admins drag agents from the left Agents Panel onto the central chat canvas to connect them as tools used by the chatbot. It enforces single-use per agent within a chat, visually marks "In use" agents, and allows safe removal via a confirmation popup that re-enables the agent in the panel.

**Status:**  
stable

---

## 2. User Flow & UX Behavior
### User Flow
1. User opens the Chat Constructor page (`/chat-constructor`) from the home screen.
2. User drags an agent card from the left Agents Panel towards the chat canvas area.
3. UI transitions to show the agent node placed on the Chat Canvas, with the corresponding agent card marked as "In use" and disabled in the panel.
4. User sees the list of connected agents on the canvas and can hover to reveal the remove (X) button, open the confirmation popup, and remove agents to make them available again in the panel.

### UI States
- **Idle:** Chat Constructor page is loaded; the left Agents Panel shows all available agents; the Chat Canvas shows existing connected agents or an empty-state placeholder; agents already on the canvas are marked "In use" and disabled in the panel.
- **Loading:** No dedicated loading UI; the page renders synchronously with the provided agents list.
- **Success:** After a successful drop, the new agent node appears on the Chat Canvas, the corresponding agent card in the panel shows an "In use" badge and becomes non-draggable, and the DnD overlay disappears.
- **Empty:** When no agents are connected, the Chat Canvas shows an empty canvas area (and may include an instructional placeholder such as "Drag an agent here to connect it to the chat").
- **Error:** No explicit error component; invalid actions are prevented by disabling drag for "In use" agents and ignoring drops outside the Chat Canvas.

---

## 3. Component Structure
### Component Tree
- `app/chat-constructor/page.tsx` (ChatConstructorPage)
  - `ChatConstructor`
    - `DndContext` (from `@dnd-kit/core`)
      - `AgentsPanel`
        - `AgentCard` (for each available agent)
      - `ChatCanvas`
        - `ConnectedAgentNode` (for each connected agent)
          - `ConfirmationPopup` (modal for removal confirmation)

### Key Components
- **ChatConstructorPage** — Next.js page component for `/chat-constructor` that wires mock agents into the ChatConstructor UI.
- **ChatConstructor** — Orchestrates drag-and-drop behavior, tracks which agents are connected, derives `isInUse` status for agents, and passes state into the AgentsPanel and ChatCanvas.
- **AgentsPanel** — Left-side panel that lists all available agents, supports collapse/expand, and exposes agents as draggable cards while visually marking and disabling "In use" agents.
- **AgentCard** — Individual agent tile that is draggable via `@dnd-kit/core`, shows name and description, and renders an "In use" badge and disabled styling when the agent is already connected.
- **ChatCanvas** — Droppable area representing the chatbot's configuration canvas; renders connected agent nodes and wires removal actions back to ChatConstructor.
- **ConnectedAgentNode** — Visual node/card for a connected agent on the canvas, showing details and revealing an X (remove) button on hover to trigger the confirmation flow.
- **ConfirmationPopup** — Reusable confirmation modal that asks "Remove connected agent?" with the specified copy and Cancel/Remove buttons; used when removing an agent from the canvas to confirm disconnection.
