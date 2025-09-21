# 📁 Complete File Path Connection Map

## 🎯 **Manifest.json File References**

### **📄 Source Files**
```
./manifest.json
```

### **🏗️ Built Files (dist/)**
```
./dist/manifest.json
./dist/index.html (from ./index-extension.html)
./dist/popup.css (bundled)
./dist/popup.js (bundled)
./dist/fullapp.html (from ./fullapp.html)
./dist/fullapp.js (bundled)
./dist/icons/icon16.png
./dist/icons/icon48.png
./dist/icons/icon128.png
./dist/icons/icon16.svg
./dist/icons/icon48.svg
./dist/icons/icon128.svg
```

## 🔗 **Complete File Path Dependencies**

### **📱 POPUP INTERFACE FLOW**

#### **Entry Point**
```
./manifest.json → "default_popup": "index.html"
├── ./dist/index.html (built from ./index-extension.html)
│   ├── ./dist/popup.css (bundled styles)
│   └── ./dist/popup.js (bundled JavaScript)
```

#### **Source Chain**
```
./index.tsx (popup entry point)
├── ./App.tsx (main application)
├── ./index.css (base styles)
└── ./styles/design-system.css (design system)
```

#### **Component Dependencies**
```
./App.tsx
├── ./components/PopupView.tsx (when isPopup = true)
│   ├── ./hooks/useTimer.tsx
│   ├── ./hooks/useApiKey.tsx
│   ├── ./components/modern-ui/EnhancedCircularTimer.tsx
│   ├── ./components/modern-ui/ModernButton.tsx
│   ├── ./components/magicui/dot-pattern.tsx
│   ├── ./components/magicui/number-ticker.tsx
│   └── ./components/ApiKeySettingsModal.tsx
├── ./components/SmilePopup.tsx (always rendered)
└── Context Providers:
    ├── ./hooks/useAppMode.tsx (AppModeProvider)
    ├── ./hooks/useAppSettings.tsx (AppSettingsProvider)
    ├── ./hooks/useToast.tsx (ToastProvider)
    ├── ./hooks/useApiKey.tsx (ApiKeyProvider)
    ├── ./hooks/useTimer.tsx (TimerProvider)
    └── ./hooks/useQuotes.tsx (QuotesProvider)
```

### **🖥️ FULL APP INTERFACE FLOW**

#### **Entry Point**
```
./manifest.json → web_accessible_resources: ["fullapp.html", "fullapp.js"]
├── ./dist/fullapp.html (from ./fullapp.html)
└── ./dist/fullapp.js (bundled JavaScript)
```

#### **Source Chain**
```
./fullapp.tsx (full app entry point)
├── ./App.tsx (shared main application)
└── ./styles/design-system.css (design system)
```

#### **Component Dependencies**
```
./App.tsx
├── ./components/ModernFullAppView.tsx (when isFullApp = true)
│   ├── ./hooks/useTimer.tsx
│   ├── ./hooks/useApiKey.tsx
│   ├── Modern UI Components:
│   │   ├── ./components/modern-ui/EnhancedCircularTimer.tsx
│   │   ├── ./components/modern-ui/ModernButton.tsx
│   │   ├── ./components/modern-ui/ModernNavigation.tsx
│   │   ├── ./components/modern-ui/GlassMorphismCard.tsx
│   │   ├── ./components/modern-ui/ModernStatsCard.tsx
│   │   ├── ./components/modern-ui/ModernNotification.tsx
│   │   └── ./components/modern-ui/StatusIndicator.tsx
│   ├── Magic UI Components:
│   │   ├── ./components/magicui/dot-pattern.tsx
│   │   └── ./components/magicui/number-ticker.tsx
│   ├── Legacy Components:
│   │   ├── ./components/TimerSection.tsx
│   │   ├── ./components/QuoteSection.tsx
│   │   ├── ./components/SessionRecap.tsx
│   │   └── ./components/ApiKeySettingsModal.tsx
│   └── ./components/SmilePopup.tsx
└── Same Context Providers as popup
```

## 🧩 **Detailed Component File Paths**

### **🎨 Modern UI Components**
```
./components/modern-ui/index.ts (main export file)
├── ./components/modern-ui/EnhancedCircularTimer.tsx
│   ├── ./components/modern-ui/ModernProgressRing.tsx
│   ├── ./components/modern-ui/AnimatedCounter.tsx
│   ├── ./components/modern-ui/StatusIndicator.tsx
│   ├── ./components/modern-ui/GlassMorphismCard.tsx
│   ├── ./utils/design-system.ts
│   └── ./types.ts
├── ./components/modern-ui/ModernButton.tsx
│   └── ./utils/design-system.ts
├── ./components/modern-ui/ModernNavigation.tsx
│   ├── ./components/modern-ui/ModernButton.tsx
│   ├── ./components/modern-ui/StatusIndicator.tsx
│   └── ./utils/design-system.ts
├── ./components/modern-ui/GlassMorphismCard.tsx
│   └── ./utils/design-system.ts
├── ./components/modern-ui/ModernStatsCard.tsx
│   ├── ./components/modern-ui/AnimatedCounter.tsx
│   ├── ./components/modern-ui/ModernProgressRing.tsx
│   ├── ./components/modern-ui/GlassMorphismCard.tsx
│   └── ./utils/design-system.ts
├── ./components/modern-ui/ModernNotification.tsx
│   ├── ./components/modern-ui/ModernButton.tsx
│   └── ./utils/design-system.ts
├── ./components/modern-ui/ModernCard.tsx
│   └── ./utils/design-system.ts
├── ./components/modern-ui/ModernQuoteCard.tsx
│   ├── ./components/modern-ui/ModernCard.tsx
│   ├── ./components/modern-ui/ModernButton.tsx
│   ├── ./components/modern-ui/StatusIndicator.tsx
│   ├── ./types.ts
│   └── ./utils/design-system.ts
├── ./components/modern-ui/ModernProgressRing.tsx
│   └── ./utils/design-system.ts
├── ./components/modern-ui/AnimatedCounter.tsx
│   └── ./utils/design-system.ts
├── ./components/modern-ui/StatusIndicator.tsx
│   └── ./utils/design-system.ts
└── ./components/modern-ui/FloatingActionButton.tsx
    └── ./utils/design-system.ts
```

### **✨ Magic UI Components**
```
./components/magicui/dot-pattern.tsx
├── ./utils/design-system.ts
└── React dependencies

./components/magicui/number-ticker.tsx
├── ./utils/design-system.ts
└── React dependencies

./components/magicui/confetti.tsx
├── ./components/ui/button.tsx
└── React dependencies

./components/magicui/magic-card.tsx
├── ./utils/design-system.ts
└── React dependencies

./components/magicui/border-beam.tsx
├── ./utils/design-system.ts
└── React dependencies

./components/magicui/shimmer-button.tsx
├── ./components/ui/button.tsx
└── React dependencies
```

### **🎛️ Shadcn UI Components**
```
./components/ui/alert.tsx
├── ./utils/design-system.ts (cn function)
└── React dependencies

./components/ui/avatar.tsx
├── ./utils/design-system.ts
└── React dependencies

./components/ui/badge.tsx
├── ./utils/design-system.ts
└── React dependencies

./components/ui/button.tsx
├── ./utils/design-system.ts
└── React dependencies

./components/ui/card.tsx
├── ./utils/design-system.ts
└── React dependencies

./components/ui/dialog.tsx
├── ./utils/design-system.ts
└── React dependencies

./components/ui/form.tsx
├── ./utils/design-system.ts
├── ./components/ui/label.tsx
└── React Hook Form dependencies

./components/ui/hover-card.tsx
├── ./utils/design-system.ts
└── React dependencies

./components/ui/input.tsx
├── ./utils/design-system.ts
└── React dependencies

./components/ui/label.tsx
├── ./utils/design-system.ts
└── React dependencies

./components/ui/progress.tsx
├── ./utils/design-system.ts
└── React dependencies

./components/ui/scroll-area.tsx
├── ./utils/design-system.ts
└── React dependencies

./components/ui/select.tsx
├── ./utils/design-system.ts
└── React dependencies

./components/ui/separator.tsx
├── ./utils/design-system.ts
└── React dependencies

./components/ui/sheet.tsx
├── ./utils/design-system.ts
└── React dependencies

./components/ui/skeleton.tsx
├── ./utils/design-system.ts
└── React dependencies

./components/ui/slider.tsx
├── ./utils/design-system.ts
└── React dependencies

./components/ui/Spinner.tsx
├── ./utils/design-system.ts
└── React dependencies

./components/ui/switch.tsx
├── ./utils/design-system.ts
└── React dependencies

./components/ui/tabs.tsx
├── ./utils/design-system.ts
└── React dependencies

./components/ui/textarea.tsx
├── ./utils/design-system.ts
└── React dependencies

./components/ui/toggle.tsx
├── ./utils/design-system.ts
└── React dependencies

./components/ui/tooltip.tsx
├── ./utils/design-system.ts
└── React dependencies
```

### **🔧 Hooks & Utilities**
```
./hooks/useTimer.tsx
├── ./types.ts
├── ./constants.ts
└── React dependencies

./hooks/useApiKey.tsx
├── ./constants.ts
└── React dependencies

./hooks/useQuotes.tsx
├── ./types.ts
├── ./constants.ts
└── React dependencies

./hooks/useToast.tsx
└── React dependencies

./hooks/useAppSettings.tsx
├── ./constants.ts
└── React dependencies

./hooks/useAppMode.tsx
└── React dependencies

./utils/design-system.ts
├── ./types.ts (for session types)
└── No external dependencies

./styles/design-system.css
└── Google Fonts imports (external)
```

### **📄 Legacy/Core Components**
```
./components/PopupView.tsx
├── ./hooks/useTimer.tsx
├── ./hooks/useApiKey.tsx
├── ./components/ui/button.tsx
├── ./components/ui/tooltip.tsx
├── ./components/ui/alert.tsx
├── ./components/icons/KeyIcon.tsx
├── ./components/ApiKeySettingsModal.tsx
├── ./components/modern-ui/EnhancedCircularTimer.tsx
├── ./components/modern-ui/ModernButton.tsx
├── ./components/magicui/dot-pattern.tsx
└── ./components/magicui/number-ticker.tsx

./components/FullAppView.tsx (legacy - not used)
├── ./components/TimerSection.tsx
├── ./components/QuoteSection.tsx
├── ./components/SessionRecap.tsx
├── ./components/SmilePopup.tsx
├── ./components/ApiKeySettingsModal.tsx
├── ./hooks/useApiKey.tsx
├── ./components/ui/button.tsx
├── ./components/ui/badge.tsx
├── ./components/ui/alert.tsx
├── ./components/icons/KeyIcon.tsx
├── ./components/ui/switch.tsx
└── ./components/ui/tabs.tsx

./components/ModernFullAppView.tsx (current full app)
├── ./hooks/useApiKey.tsx
├── ./hooks/useTimer.tsx
├── ./components/TimerSection.tsx
├── ./components/QuoteSection.tsx
├── ./components/SessionRecap.tsx
├── ./components/SmilePopup.tsx
├── ./components/ApiKeySettingsModal.tsx
├── All Modern UI Components (see above)
├── ./components/magicui/dot-pattern.tsx
├── ./components/magicui/number-ticker.tsx
└── ./utils/design-system.ts

./components/TimerSection.tsx
├── ./hooks/useTimer.tsx
├── ./components/TimerDisplay.tsx
├── ./components/ui/button.tsx
├── ./components/ui/card.tsx
├── ./components/ui/badge.tsx
├── ./components/icons/PlayIcon.tsx
├── ./components/icons/PauseIcon.tsx
├── ./components/icons/ResetIcon.tsx
├── ./components/icons/SkipIcon.tsx
├── ./components/icons/SettingsIcon.tsx
├── ./constants.ts
├── ./types.ts
├── ./components/ui/dialog.tsx
├── ./components/ui/progress.tsx
├── ./components/ui/input.tsx
└── ./components/ui/select.tsx

./components/QuoteSection.tsx
├── ./hooks/useQuotes.tsx
├── ./hooks/useApiKey.tsx
├── ./components/QuoteCard.tsx
├── ./components/QuoteBoard.tsx
├── ./components/AiTextAssist.tsx
├── ./components/AiImageQuote.tsx
├── ./components/BulkActionsBar.tsx
├── ./components/ui/card.tsx
├── ./components/ui/input.tsx
├── ./components/ui/select.tsx
├── ./types.ts
├── ./SmilePopupSettings.tsx
└── ./components/ui/tabs.tsx

./components/SessionRecap.tsx
├── ./hooks/useTimer.tsx
├── ./hooks/useQuotes.tsx
├── ./components/ui/button.tsx
├── ./components/ui/Spinner.tsx
├── ./components/ui/card.tsx
└── ./types.ts

./components/SmilePopup.tsx
├── ./hooks/useTimer.tsx
├── ./hooks/useQuotes.tsx
├── ./hooks/useApiKey.tsx
├── ./components/ui/button.tsx
├── ./components/ui/card.tsx
├── ./components/ui/input.tsx
├── ./components/ui/textarea.tsx
├── ./services/geminiService.ts
├── ./types.ts
└── ./constants.ts

./components/ApiKeySettingsModal.tsx
├── ./hooks/useApiKey.tsx
├── ./components/ui/button.tsx
├── ./components/ui/card.tsx
├── ./services/geminiService.ts
└── ./constants.ts

./components/QuoteCard.tsx
├── ./types.ts
├── ./components/ui/button.tsx
├── ./components/ui/card.tsx
└── ./utils/design-system.ts

./components/TimerDisplay.tsx
├── ./types.ts
└── React dependencies
```

### **🎨 Enhanced Components (Legacy)**
```
./components/enhanced/CelebrationEffects.tsx
├── ./components/magicui/confetti.tsx
└── React dependencies

./components/enhanced/EnhancedTimerCard.tsx
├── ./components/enhanced/CelebrationEffects.tsx
├── ./components/magicui/magic-card.tsx
├── ./components/magicui/border-beam.tsx
├── ./components/enhanced/EnhancedControlButtons.tsx
├── ./types.ts
├── ./utils/design-system.ts
└── React dependencies

./components/enhanced/EnhancedControlButtons.tsx
├── ./components/magicui/shimmer-button.tsx
├── ./utils/design-system.ts
└── React dependencies
```

### **🎨 Material 3 Components (Legacy)**
```
./components/material3/Card.tsx
├── ./utils/design-system.ts
└── React dependencies

./components/material3/Button.tsx
├── ./utils/design-system.ts
└── React dependencies
```

### **🎯 Icons**
```
./components/icons/KeyIcon.tsx
./components/icons/PlayIcon.tsx
./components/icons/PauseIcon.tsx
./components/icons/ResetIcon.tsx
./components/icons/SkipIcon.tsx
./components/icons/SettingsIcon.tsx
```

### **⚙️ Services**
```
./services/geminiService.ts
├── ./constants.ts
└── External API dependencies
```

### **📊 Configuration Files**
```
./constants.ts
./types.ts
./index.css
./tailwind.config.js
./tsconfig.json
./package.json
./vite.config.ts
./vite.popup.config.ts
./vite.fullapp.config.ts
./components.json
```

## 🏗️ **Build Process File Mapping**

### **Vite Configuration**
```
./vite.config.ts (main config)
├── ./vite.popup.config.ts (popup build)
└── ./vite.fullapp.config.ts (full app build)
```

### **Static Copy Process**
```
./vite.config.ts → viteStaticCopy
├── ./manifest.json → ./dist/manifest.json
├── ./icons/* → ./dist/icons/*
├── ./index-extension.html → ./dist/index.html
└── ./fullapp.html → ./dist/fullapp.html
```

### **Bundle Process**
```
Popup Build:
./index.tsx → ./dist/popup.js (with all dependencies)
./index.css + ./styles/design-system.css → ./dist/popup.css

Full App Build:
./fullapp.tsx → ./dist/fullapp.js (with all dependencies)
./styles/design-system.css → bundled in JS
```

## 🎯 **Runtime File Loading Sequence**

### **Popup Loading**
```
1. Chrome loads: ./dist/manifest.json
2. User clicks extension: Chrome loads ./dist/index.html
3. Browser loads: ./dist/popup.css
4. Browser loads: ./dist/popup.js
5. React renders: PopupView component tree
6. Design system: CSS custom properties applied
```

### **Full App Loading**
```
1. User clicks "Open Full App": Chrome opens ./dist/fullapp.html
2. Browser loads: ./dist/fullapp.js (CSS bundled inside)
3. React renders: ModernFullAppView component tree
4. Design system: CSS custom properties applied
```

## 📁 **Complete Directory Structure**
```
./
├── manifest.json
├── index-extension.html
├── fullapp.html
├── index.tsx
├── fullapp.tsx
├── App.tsx
├── index.css
├── types.ts
├── constants.ts
├── vite.config.ts
├── vite.popup.config.ts
├── vite.fullapp.config.ts
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── components.json
├── styles/
│   └── design-system.css
├── utils/
│   └── design-system.ts
├── hooks/
│   ├── useTimer.tsx
│   ├── useApiKey.tsx
│   ├── useQuotes.tsx
│   ├── useToast.tsx
│   ├── useAppSettings.tsx
│   └── useAppMode.tsx
├── services/
│   └── geminiService.ts
├── components/
│   ├── PopupView.tsx
│   ├── FullAppView.tsx (legacy)
│   ├── ModernFullAppView.tsx
│   ├── TimerSection.tsx
│   ├── QuoteSection.tsx
│   ├── SessionRecap.tsx
│   ├── SmilePopup.tsx
│   ├── ApiKeySettingsModal.tsx
│   ├── QuoteCard.tsx
│   ├── TimerDisplay.tsx
│   ├── modern-ui/
│   │   ├── index.ts
│   │   ├── EnhancedCircularTimer.tsx
│   │   ├── ModernButton.tsx
│   │   ├── ModernNavigation.tsx
│   │   ├── GlassMorphismCard.tsx
│   │   ├── ModernStatsCard.tsx
│   │   ├── ModernNotification.tsx
│   │   ├── ModernCard.tsx
│   │   ├── ModernQuoteCard.tsx
│   │   ├── ModernProgressRing.tsx
│   │   ├── AnimatedCounter.tsx
│   │   ├── StatusIndicator.tsx
│   │   └── FloatingActionButton.tsx
│   ├── magicui/
│   │   ├── dot-pattern.tsx
│   │   ├── number-ticker.tsx
│   │   ├── confetti.tsx
│   │   ├── magic-card.tsx
│   │   ├── border-beam.tsx
│   │   └── shimmer-button.tsx
│   ├── ui/
│   │   ├── alert.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   ├── hover-card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── progress.tsx
│   │   ├── scroll-area.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── skeleton.tsx
│   │   ├── slider.tsx
│   │   ├── Spinner.tsx
│   │   ├── switch.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   ├── toggle.tsx
│   │   └── tooltip.tsx
│   ├── enhanced/
│   │   ├── CelebrationEffects.tsx
│   │   ├── EnhancedTimerCard.tsx
│   │   └── EnhancedControlButtons.tsx
│   ├── material3/
│   │   ├── Card.tsx
│   │   └── Button.tsx
│   └── icons/
│       ├── KeyIcon.tsx
│       ├── PlayIcon.tsx
│       ├── PauseIcon.tsx
│       ├── ResetIcon.tsx
│       ├── SkipIcon.tsx
│       └── SettingsIcon.tsx
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   ├── icon128.png
│   ├── icon16.svg
│   ├── icon48.svg
│   └── icon128.svg
└── dist/ (built files)
    ├── manifest.json
    ├── index.html
    ├── popup.css
    ├── popup.js
    ├── fullapp.html
    ├── fullapp.js
    └── icons/
        ├── icon16.png
        ├── icon48.png
        ├── icon128.png
        ├── icon16.svg
        ├── icon48.svg
        └── icon128.svg
```

---

## 🎊 **Summary**

This complete file path map shows **every file connection** in the Focus & Smile 3.0 extension with:

- **📁 Full file paths** for all 100+ source files
- **🔗 Dependency chains** showing how files connect
- **🏗️ Build process mapping** from source to dist
- **⚡ Runtime loading sequences** for both popup and full app
- **📊 Complete directory structure** with all files organized

The extension has a **well-organized architecture** with clear separation of concerns and efficient dependency management! 🚀✨