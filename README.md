# 📦 Zellerfeld Order Dashboard (Frontend Challenge)

An interactive, filterable, and sortable dashboard for managing Zellerfeld orders — built with **React + TypeScript + Vite + TailwindCSS + shadcn/ui**.

> ✅ Built as part of a frontend developer coding challenge.  
> 💼 Live Demo • 📸 Screenshots

---

## 🚀 Features

- - 🔍 **Filterable UI** for all major fields (Status, Lock Reason, Type, etc.)
-
- - 📊 **Sort toggles** (asc/desc) on each sortable column
-
- - ⚡️ Fast performance with **React Query** for data fetching
-
- - 🎛️ **Preset saving system** with 2 built-in presets
-
- - 💡 Debounced search for performance optimization
-
- - ♿️ Responsive + accessible layout using **shadcn/ui**
-
- - ✅ Unit tested with **Jest** and **Testing Library**
-

---

## 🛠️ Tech Stack

- - **React 18** + **TypeScript**
-
- - **Tailwind CSS** + **shadcn/ui**
-
- - **Redux Toolkit** for global state
-
- - **React Query** for async data
-
- - **Vite** for fast dev/build
-
- - **Jest** + **React Testing Library** for unit testing
-

---

## 📁 Folder Structure

bash

CopyEdit

`src/ ├── assets/                                 # Static assets and mock data │   ├── data.ts │   ├── dummydata.json │   └── zellerfeld.jpg  ├── components/                             # Global reusable UI components (e.g., buttons, inputs) │   └── ui/ │       ├── button.tsx │       ├── input.tsx │       └── ... (from shadcn UI)  ├── features/                               # Feature-specific logic │   └── orders/ │       └── components/ │           ├── __tests__/                  # Unit tests for feature components │           │   └── OrderDashboard.test.tsx │           ├── ConfigPresets.tsx │           ├── FilterControl.tsx │           ├── OrderDashboard.module.css │           ├── OrderDashboard.tsx │           ├── SortControl.tsx │           └── TableWrapper.tsx  ├── hooks/                                  # Custom React hooks │   └── useDebouncedSearch.ts  ├── lib/                                    # Utility functions │   └── utils.ts  ├── state/                                  # Redux state management │   └── saved-configs/ │       ├── SavedConfigSlice.ts             # Redux slice for saved filter/sort configs │       └── services/ │           └── orderService.ts             # Async API/mock data handling logic  ├── types/                                  # Global TypeScript types and enums │   ├── enums/ │   │   ├── LockReasonEnum.ts │   │   ├── ModelDesignerEnum.ts │   │   ├── OrderStatusEnum.ts │   │   └── OrderTypeEnum.ts │   ├── FilterState.ts │   ├── Order.ts │   ├── SavedConfigs.ts │   └── SortState.ts  ├── App.tsx                                 # Root React component ├── index.css                               # Global styles ├── main.tsx                                # App entry point └── vite-env.d.ts                           # Vite type declarations`

---

## 🧪 Testing

- - Test coverage includes:
-
-     * *   ✅ Initial loading state
-     *
-     * *   ✅ Filter logic
-     *
-     * *   ✅ Sort toggling
-     *
-     * *   ✅ Preset rendering
-     *
- - Tests live under:
-     `src/features/orders/components/__tests__`
-

bash

CopyEdit

`npm test`

---

## 📦 Installation

bash

CopyEdit

`# Clone repo git clone https://github.com/shilpasudhish/zellerfeld-dashboard cd zellerfeld-dashboard  # Install dependencies npm install  # Start dev server npm run dev`

---

## 🔧 Implementation Notes

### 🧠 Data Source

Data is loaded from `data.ts` using a simulated async function in `orderService.ts`.

### 🎛️ Filtering

- - Implemented with **controlled components**
-
- - Multi-select filters (Status, Type, etc.) use **shadcn ToggleGroup**
-
- - `Days Since Order` filter uses **single select** (as selecting `<30` implies `<5`, `<15`, etc.)
-

### ↕️ Sorting

- - Click any column header to toggle ascending/descending order.
-
- - Sort config stored in Redux for persistence within session.
-

### 💾 Presets

- - Two built-in presets available.
-
- - Users can save the current configuration via UI.
-
- - **Note:** Custom presets are stored in app state but not persisted to local storage.
-

## 💻 Screenshots

> Replace with actual links/images in markdown format:

---

## 🌐 Deployment

Deployed via **Vercel**  
🔗 Live Demo

---

## ⚠️ Known Limitations

- - Custom preset saving is **not persisted** to localStorage (can be added with minimal logic).
-
- - Currently no pagination or infinite scroll (not required by challenge).
-
-

---

## 🧠 Learning Focus

This project highlights:

- - Component-driven architecture
-
- - Type-safe state management
-
- - Real-world UI patterns: filtering, sorting, saving configs
-
- - Performance optimization
-
- - Clean and testable code
-

---

## 🤝 Contact

> Feel free to reach out for a walkthrough or code discussion.
