# Chatbot Builder – Step 2: Main Editor Screen (Agents Canvas + Configuration)

## 1. Overview
**UI Area:**  
Page

**User Goal:**  
Admins configure a chatbot by selecting and connecting available agents as tools within a visual editor.

**Summary:**  
The Chat Constructor page (Sunbeam) provides a two-panel editor where admins drag agents from the left agents panel onto a central chat canvas to connect them as tools for the chatbot. Agents already connected are marked as “In use”, cannot be added twice, and can be removed from the canvas via a confirmation popup that also resets their availability in the panel.

**Status:**  
experimental

---

## 2. User Flow & UX Behavior
### User Flow
1. User opens the Chat Constructor page at `/chat-constructor` from the home screen.
2. User drags an agent card from the left Agents Panel toward the main chat canvas area.
3. UI transitions to highlight the droppable chat canvas region and, on drop, renders a connected agent node on the canvas while updating the agent status to “In use” in the panel.
4. User sees the connected agent visually represented on the canvas and the corresponding agent card disabled and labeled “In use” in the left panel.

### UI States
- **Idle:** Left panel displays all available agents; chat canvas shows either an empty guidance state or existing connected agents; no drag operation in progress.
- **Loading:** Not applicable; agents are provided synchronously as mock data and no explicit loading indicator is implemented.
- **Success:** After dropping a valid agent on the canvas, the new connected agent node is rendered, the left panel agent card is disabled with an “In use” badge, and further drag attempts for that agent are blocked.
- **Empty:** Unknown
- **Error:** No dedicated error UI; failures would surface only via console errors or unexpected behavior during drag-and-drop.

---

## 3. Component Structure
### Component Tree
- `app/chat-constructor/page.tsx` (Chat Constructor Page)
  - `ChatConstructor`
    - `AgentsPanel`
      - `AgentCard`
    - `ChatCanvas`
      - `ConnectedAgentNode`
      - `ConfirmationPopup`

### Key Components
- **ChatConstructor** — Orchestrates drag-and-drop via `@dnd-kit/core`, manages the set of connected agents, derives `isInUse` status, and wires the AgentsPanel to the ChatCanvas.
- **AgentsPanel** — Reusable left-side panel that lists all available agents, supports collapse/expand behavior, and exposes draggable `AgentCard` items that are disabled and labeled when `isInUse`.
- **AgentCard** — Visual representation of an individual agent in the panel, configured as a draggable source (unless `isInUse`) with hover styles and optional description text.
- **ChatCanvas** — Droppable area for agents; renders the list of connected agents as nodes and delegates removal interactions to individual nodes with confirmation.
- **ConnectedAgentNode** — Canvas node for a connected agent that shows agent details and, on hover, reveals an X button that triggers the removal confirmation popup.
- **ConfirmationPopup** — Generic modal used to confirm agent removal, implementing the required copy, Cancel/Remove actions, backdrop click-to-close, and Escape key handling.
