# 🗂️ Focus & Smile Extension - File Connection Map

## 📋 **Overview**
This document maps out all the connected files in the Focus & Smile Chrome extension, showing how components, utilities, and configurations work together.

---

## 🏗️ **Core Application Architecture**

### **Entry Points**
```
📁 Root Level
├── 🎯 App.tsx                    → Main React app component
├── 🎯 index.tsx                  → Popup entry point
├── 🎯 fullapp.tsx                → Full app entry point
├── 🎯 index.html                 → Popup HTML template
├── 🎯 fullapp.html               → Full app HTML template
└── 🎯 index-extension.html       → Extension HTML template
```

### **Main Application Flow**
```
App.tsx
├── imports → PopupView.tsx
├── imports → FullAppView.tsx
├── imports → SmilePopup.tsx
├── imports → TimerProvider (hooks/useTimer.tsx)
├── imports → QuotesProvider (hooks/useQuotes.tsx)
├── imports → ToastProvider (hooks/useToast.tsx)
├── imports → ApiKeyProvider (hooks/useApiKey.tsx)
├── imports → AppSettingsProvider (hooks/useAppSettings.tsx)
├── imports → AppModeProvider (hooks/useAppMode.tsx)
└── imports → initializeDesignSystem (utils/design-system.ts)
```

---

## 🎨 **Design System & Styling**

### **CSS Architecture**
```
📁 Styling System
├── 🎨 index.css                  → Main CSS entry point
│   └── imports → styles/design-system.css
├── 🎨 styles/design-system.css   → Material 3 design system
├── 🎨 tailwind.config.cjs        → Tailwind configuration
└── 🎨 postcss.config.cjs         → PostCSS configuration
```

### **Design System Utilities**
```
📁 utils/
├── 🛠️ design-system.ts           → Design system utilities & theme management
│   ├── exports → SESSION_TYPES
│   ├── exports → TYPOGRAPHY_SCALE
│   ├── exports → ELEVATION_LEVELS
│   ├── exports → ThemeManager
│   └── exports → initializeDesignSystem
└── 🛠️ lib/utils.ts               → General utility functions
```

---

## 🧩 **Component Architecture**

### **Main Views**
```
📁 components/
├── 🖼️ PopupView.tsx              → Chrome extension popup interface
│   ├── imports → EnhancedTimerCard
│   ├── imports → DotPattern
│   ├── imports → NumberTicker
│   └── imports → useTimer, useQuotes, useAppSettings
├── 🖼️ FullAppView.tsx            → Full dashboard application
│   ├── imports → TimerSection
│   ├── imports → QuoteCard
│   ├── imports → ApiKeySettingsModal
│   └── imports → useTimer, useQuotes, useAppSettings
└── 🖼️ SmilePopup.tsx             → Break time popup modal
    └── imports → useTimer, useAppSettings
```

### **Timer Components**
```
📁 components/
├── ⏱️ TimerDisplay.tsx           → Basic timer display
├── ⏱️ TimerSection.tsx           → Timer section for full app
└── 📁 enhanced/
    ├── ⏱️ EnhancedTimerCard.tsx  → Enhanced timer with Magic UI
    ├── ⏱️ EnhancedTimerDisplay.tsx → Enhanced timer display
    ├── 🎮 EnhancedControlButtons.tsx → Enhanced control buttons
    └── 🎉 CelebrationEffects.tsx → Celebration animations
```

### **Quote Management Components**
```
📁 components/
├── 💭 QuoteCard.tsx              → Individual quote display card
├── 💭 QuoteSection.tsx           → Quote management section
├── 💭 QuoteBoard.tsx             → Quote board display
├── 💭 AiTextAssist.tsx           → AI text assistance
├── 💭 AiImageQuote.tsx           → AI image quote generation
├── 💭 BulkActionsBar.tsx         → Bulk quote operations
└── 💭 SessionRecap.tsx           → Session recap display
```

### **Modal & Settings Components**
```
📁 components/
├── ⚙️ ApiKeySettingsModal.tsx    → API key configuration modal
└── 🧪 SmilePopupTest.tsx         → Smile popup testing component
```

---

## 🎭 **Magic UI Components**

### **Magic UI Library**
```
📁 components/magicui/
├── ✨ border-beam.tsx            → Animated border effects
├── ✨ confetti.tsx               → Confetti celebration effects
├── ✨ dot-pattern.tsx            → Dot pattern backgrounds
├── ✨ magic-card.tsx             → Magic card component
├── ✨ number-ticker.tsx          → Animated number transitions
└── ✨ shimmer-button.tsx         → Shimmer button effects
```

---

## 🎯 **Material 3 Components**

### **Material 3 Library**
```
📁 components/material3/
├── 🎨 Button.tsx                 → Material 3 button component
├── 🎨 Card.tsx                   → Material 3 card component
├── 🎨 Typography.tsx             → Material 3 typography system
└── 🎨 index.ts                   → Material 3 exports
```

---

## 🧰 **UI Component Library**

### **Shadcn/UI Components**
```
📁 components/ui/
├── 🔘 button.tsx                 → Base button component
├── 🃏 card.tsx                   → Base card component
├── 🚨 alert.tsx                  → Alert component
├── 🏷️ badge.tsx                  → Badge component
├── 🖼️ avatar.tsx                 → Avatar component
├── 📝 input.tsx                  → Input component
├── 🏷️ label.tsx                  → Label component
├── 📊 progress.tsx               → Progress bar component
├── 🎚️ slider.tsx                 → Slider component
├── 🔄 switch.tsx                 → Switch component
├── 📑 tabs.tsx                   → Tabs component
├── 📝 textarea.tsx               → Textarea component
├── 🎭 dialog.tsx                 → Dialog modal component
├── 📜 scroll-area.tsx            → Scroll area component
├── 🎯 tooltip.tsx                → Tooltip component
├── 🎪 hover-card.tsx             → Hover card component
├── 📋 form.tsx                   → Form component
├── 🔽 select.tsx                 → Select dropdown component
├── ➖ separator.tsx              → Separator component
├── 📄 sheet.tsx                  → Sheet component
├── 💀 skeleton.tsx               → Skeleton loading component
├── 🔄 toggle.tsx                 → Toggle component
└── ⏳ Spinner.tsx                → Loading spinner component
```

---

## 🎣 **Hooks & State Management**

### **Custom Hooks**
```
📁 hooks/
├── ⏱️ useTimer.tsx               → Timer state management
│   ├── manages → timer state, session types, durations
│   └── connects to → Chrome storage API
├── 💭 useQuotes.tsx              → Quote management
│   ├── manages → quote CRUD operations
│   ├── connects to → geminiService.ts
│   └── connects to → Chrome storage API
├── 🔑 useApiKey.tsx              → API key management
│   └── connects to → Chrome storage API
├── ⚙️ useAppSettings.tsx         → App settings management
│   └── connects to → Chrome storage API
├── 🎭 useAppMode.tsx             → App mode detection (popup vs full app)
│   └── detects → URL parameters and window context
└── 🍞 useToast.tsx               → Toast notification system
    └── manages → notification state
```

---

## 🔧 **Services & APIs**

### **External Services**
```
📁 services/
└── 🤖 geminiService.ts           → Google Gemini AI integration
    ├── connects to → Google Gemini API
    ├── used by → useQuotes.tsx
    └── manages → AI quote generation, image creation
```

---

## 🎯 **Icons & Assets**

### **Icon Components**
```
📁 components/icons/
├── ❌ CancelIcon.tsx             → Cancel/close icon
├── ✅ CheckCircleIcon.tsx        → Success check icon
├── ✏️ EditIcon.tsx               → Edit/pencil icon
├── 📤 ExportIcon.tsx             → Export icon
├── 👁️ EyeIcon.tsx                → Visibility icon
├── 🙈 EyeSlashIcon.tsx           → Hide/invisible icon
├── 🔑 KeyIcon.tsx                → API key icon
├── ⏸️ PauseIcon.tsx              → Pause control icon
├── ▶️ PlayIcon.tsx               → Play control icon
├── 🔄 ResetIcon.tsx              → Reset icon
├── 💾 SaveIcon.tsx               → Save icon
├── ⚙️ SettingsIcon.tsx           → Settings gear icon
├── 📤 ShareIcon.tsx              → Share icon
├── ⏭️ SkipIcon.tsx               → Skip forward icon
├── ⭐ StarFilledIcon.tsx         → Filled star (favorite)
├── ☆ StarOutlineIcon.tsx        → Outline star (not favorite)
├── 🗑️ TrashIcon.tsx              → Delete/trash icon
└── ❌ XCircleIcon.tsx            → Close circle icon
```

### **Static Assets**
```
📁 icons/
├── 🖼️ icon16.png                 → 16x16 extension icon
├── 🖼️ icon16.svg                 → 16x16 SVG icon
├── 🖼️ icon48.png                 → 48x48 extension icon
├── 🖼️ icon48.svg                 → 48x48 SVG icon
├── 🖼️ icon128.png                → 128x128 extension icon
└── 🖼️ icon128.svg                → 128x128 SVG icon
```

---

## ⚙️ **Configuration Files**

### **Build & Development**
```
📁 Root Configuration
├── 📦 package.json               → Dependencies and scripts
├── 📦 package-lock.json          → Dependency lock file
├── ⚙️ vite.config.ts             → Main Vite configuration
├── ⚙️ vite.popup.config.ts       → Popup-specific Vite config
├── ⚙️ vite.fullapp.config.ts     → Full app Vite config
├── 📝 tsconfig.json              → TypeScript configuration
├── 🎨 tailwind.config.cjs        → Tailwind CSS configuration
├── 🎨 postcss.config.cjs         → PostCSS configuration
└── 🧩 components.json            → Shadcn/UI configuration
```

### **Extension Configuration**
```
📁 Extension Files
├── 📋 manifest.json              → Chrome extension manifest
├── 📋 metadata.json              → Extension metadata
└── 🚫 .gitignore                 → Git ignore rules
```

### **Type Definitions**
```
📁 types/
├── 📝 types.ts                   → Main type definitions
└── 📝 chrome.d.ts                → Chrome extension type definitions
```

---

## 🎯 **Kiro Spec System**

### **Specification Files**
```
📁 .kiro/specs/focus-smile-3-redesign/
├── 📋 requirements.md            → Feature requirements
├── 🎨 design.md                  → Design specifications
└── ✅ tasks.md                   → Implementation tasks
```

### **Kiro Settings**
```
📁 .kiro/settings/
├── ⚙️ mcp.json                   → Model Context Protocol settings
└── ⚙️ magicui.json               → Magic UI configuration
```

---

## 🔗 **Key File Relationships**

### **Critical Dependencies**
```
App.tsx
├── 🔗 hooks/useTimer.tsx
├── 🔗 hooks/useQuotes.tsx
├── 🔗 hooks/useApiKey.tsx
├── 🔗 utils/design-system.ts
└── 🔗 components/PopupView.tsx
    ├── 🔗 components/enhanced/EnhancedTimerCard.tsx
    ├── 🔗 components/magicui/dot-pattern.tsx
    └── 🔗 components/magicui/number-ticker.tsx
```

### **State Flow**
```
Chrome Storage API
├── 🔗 hooks/useTimer.tsx         → Timer state persistence
├── 🔗 hooks/useQuotes.tsx        → Quote data persistence
├── 🔗 hooks/useApiKey.tsx        → API key storage
└── 🔗 hooks/useAppSettings.tsx   → Settings persistence
```

### **Service Integration**
```
services/geminiService.ts
├── 🔗 hooks/useQuotes.tsx        → AI quote generation
└── 🔗 components/AiTextAssist.tsx → AI assistance features
```

---

## 📊 **Build Output**

### **Distribution Files**
```
📁 dist/
├── 🎯 popup.js                   → Compiled popup bundle
├── 🎯 popup.css                  → Compiled popup styles
├── 🎯 fullapp.js                 → Compiled full app bundle
├── 🎯 index.html                 → Popup HTML
├── 🎯 fullapp.html               → Full app HTML
├── 📋 manifest.json              → Extension manifest
└── 📁 icons/                     → Copied icon assets
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

## 🎯 **Development Workflow**

### **Key Scripts (package.json)**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "npm run build:popup && npm run build:fullapp",
    "build:popup": "vite build --config vite.popup.config.ts",
    "build:fullapp": "vite build --config vite.fullapp.config.ts"
  }
}
```

### **Import Patterns**
```typescript
// Design System
import { initializeDesignSystem } from './utils/design-system'

// Hooks
import { useTimer } from './hooks/useTimer'
import { useQuotes } from './hooks/useQuotes'

// Components
import PopupView from './components/PopupView'
import { EnhancedTimerCard } from './components/enhanced/EnhancedTimerCard'

// Magic UI
import { NumberTicker } from './components/magicui/number-ticker'
import { DotPattern } from './components/magicui/dot-pattern'

// Material 3
import { Button, Card, Typography } from './components/material3'

// UI Components
import { Button } from './components/ui/button'
import { Card } from './components/ui/card'
```

---

## 🎯 **Summary**

The Focus & Smile extension follows a well-structured architecture with:

- **🏗️ Modular Components**: Clear separation between views, enhanced components, and UI libraries
- **🎨 Design System**: Centralized Material 3 design system with theme management
- **🎣 State Management**: Custom hooks for different data domains
- **🔧 Service Layer**: External API integration through dedicated services
- **⚙️ Build System**: Multi-target Vite configuration for popup and full app
- **📋 Type Safety**: Comprehensive TypeScript definitions
- **🎯 Spec-Driven Development**: Kiro specification system for feature development

This architecture enables maintainable, scalable development while supporting both the Chrome extension popup and full dashboard application modes.