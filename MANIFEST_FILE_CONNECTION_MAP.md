# 📋 Manifest.json File Connection Map

## 🎯 **Manifest.json Analysis**

### **Extension Metadata**
- **Name**: Focus & Smile 2.2
- **Version**: 2.2.0
- **Manifest Version**: 3 (Chrome Extension Manifest V3)
- **Permissions**: `["storage"]`

### **Entry Points Defined in Manifest**
```json
{
  "action": {
    "default_popup": "index.html"
  },
  "web_accessible_resources": [
    {
      "resources": ["fullapp.html", "fullapp.js", "icons/*"],
      "matches": ["<all_urls>"]
    }
  ],
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png", 
    "128": "icons/icon128.png"
  }
}
```

## 📁 **File Structure & Connections**

### **🎯 POPUP INTERFACE**
```
manifest.json → "default_popup": "index.html"
├── index.html (built from index-extension.html)
│   ├── popup.css (bundled CSS)
│   └── popup.js (bundled JavaScript)
│       └── index.tsx (entry point)
│           ├── App.tsx (main application)
│           ├── ./index.css (base styles)
│           └── ./styles/design-system.css (design system)
```

### **🖥️ FULL APP INTERFACE**
```
manifest.json → web_accessible_resources: ["fullapp.html", "fullapp.js"]
├── fullapp.html
│   └── fullapp.js (bundled JavaScript)
│       └── fullapp.tsx (entry point)
│           ├── App.tsx (shared main application)
│           └── ./styles/design-system.css (design system)
```

### **🎨 ICONS**
```
manifest.json → icons: {...}
├── icons/icon16.png (16x16 toolbar icon)
├── icons/icon48.png (48x48 extension management)
└── icons/icon128.png (128x128 Chrome Web Store)

Additional icons in dist:
├── icons/icon16.svg
├── icons/icon48.svg
└── icons/icon128.svg
```

## 🔗 **Detailed File Dependencies**

### **📱 Popup Flow (index.html)**
```
index.html
├── popup.css (contains all bundled styles)
│   ├── index.css (base Tailwind styles)
│   ├── styles/design-system.css (Material 3 design system)
│   └── All component styles (bundled by Vite)
└── popup.js (contains all bundled JavaScript)
    └── index.tsx
        ├── React & ReactDOM
        ├── App.tsx
        │   ├── PopupView.tsx (when isPopup = true)
        │   │   ├── useTimer hook
        │   │   ├── useApiKey hook
        │   │   ├── EnhancedCircularTimer (modern-ui)
        │   │   ├── ModernButton (modern-ui)
        │   │   ├── DotPattern (magicui)
        │   │   ├── NumberTicker (magicui)
        │   │   └── ApiKeySettingsModal
        │   ├── SmilePopup (always rendered)
        │   └── Context Providers:
        │       ├── AppModeProvider
        │       ├── AppSettingsProvider
        │       ├── ToastProvider
        │       ├── ApiKeyProvider
        │       ├── TimerProvider
        │       └── QuotesProvider
        ├── index.css
        └── styles/design-system.css
```

### **🖥️ Full App Flow (fullapp.html)**
```
fullapp.html
├── Inline CSS (modern reset & base styles)
└── fullapp.js (contains all bundled JavaScript)
    └── fullapp.tsx
        ├── React & ReactDOM
        ├── App.tsx (shared with popup)
        │   ├── ModernFullAppView.tsx (when isFullApp = true)
        │   │   ├── useTimer hook
        │   │   ├── useApiKey hook
        │   │   ├── Modern UI Components:
        │   │   │   ├── EnhancedCircularTimer
        │   │   │   ├── ModernButton
        │   │   │   ├── ModernNavigation
        │   │   │   ├── GlassMorphismCard
        │   │   │   ├── ModernStatsCard
        │   │   │   ├── ModernNotification
        │   │   │   └── StatusIndicator
        │   │   ├── Magic UI Components:
        │   │   │   ├── DotPattern
        │   │   │   └── NumberTicker
        │   │   ├── Legacy Components:
        │   │   │   ├── TimerSection
        │   │   │   ├── QuoteSection
        │   │   │   ├── SessionRecap
        │   │   │   └── ApiKeySettingsModal
        │   │   └── SmilePopup
        │   └── Same Context Providers as popup
        └── styles/design-system.css
```

## 🧩 **Component Dependencies**

### **🎨 Modern UI Components**
```
components/modern-ui/
├── index.ts (exports all modern components)
├── EnhancedCircularTimer.tsx
│   ├── ModernProgressRing.tsx
│   ├── AnimatedCounter.tsx
│   ├── StatusIndicator.tsx
│   ├── GlassMorphismCard.tsx
│   └── utils/design-system.ts
├── ModernButton.tsx
├── ModernNavigation.tsx
├── GlassMorphismCard.tsx
├── ModernStatsCard.tsx
├── ModernNotification.tsx
├── ModernCard.tsx
├── ModernQuoteCard.tsx
├── ModernProgressRing.tsx
├── AnimatedCounter.tsx
├── StatusIndicator.tsx
└── FloatingActionButton.tsx
```

### **✨ Magic UI Components**
```
components/magicui/
├── dot-pattern.tsx (background patterns)
├── number-ticker.tsx (animated numbers)
├── confetti.tsx (celebration effects)
├── magic-card.tsx (interactive cards)
├── border-beam.tsx (animated borders)
└── shimmer-button.tsx (shimmer effects)
```

### **🎛️ UI Components (Shadcn/ui)**
```
components/ui/
├── alert.tsx
├── avatar.tsx
├── badge.tsx
├── button.tsx
├── card.tsx
├── dialog.tsx
├── form.tsx
├── hover-card.tsx
├── input.tsx
├── label.tsx
├── progress.tsx
├── scroll-area.tsx
├── select.tsx
├── separator.tsx
├── sheet.tsx
├── skeleton.tsx
├── slider.tsx
├── Spinner.tsx
├── switch.tsx
├── tabs.tsx
├── textarea.tsx
├── toggle.tsx
└── tooltip.tsx
```

### **🔧 Hooks & Utilities**
```
hooks/
├── useTimer.tsx (timer state management)
├── useApiKey.tsx (API key management)
├── useQuotes.tsx (quotes management)
├── useToast.tsx (toast notifications)
├── useAppSettings.tsx (app settings)
└── useAppMode.tsx (popup vs fullapp detection)

utils/
├── design-system.ts (design tokens & utilities)
└── Other utility files...

styles/
└── design-system.css (Material 3 CSS framework)
```

### **📄 Legacy Components**
```
components/
├── PopupView.tsx (popup interface)
├── FullAppView.tsx (original full app - not used)
├── ModernFullAppView.tsx (modern full app)
├── TimerSection.tsx (timer controls)
├── QuoteSection.tsx (quote management)
├── SessionRecap.tsx (session statistics)
├── SmilePopup.tsx (smile popup modal)
├── ApiKeySettingsModal.tsx (API settings)
├── QuoteCard.tsx (individual quote display)
├── TimerDisplay.tsx (timer display)
└── Other legacy components...
```

## 🎯 **Runtime File Loading**

### **Popup (400x600px)**
1. **Chrome loads**: `index.html`
2. **Browser loads**: `popup.css` + `popup.js`
3. **JavaScript executes**: `index.tsx` → `App.tsx` → `PopupView.tsx`
4. **Components render**: Modern UI components with glass morphism
5. **Design system**: CSS custom properties applied via JavaScript

### **Full App (New Tab)**
1. **User clicks**: "Open Full App" button
2. **Chrome opens**: `fullapp.html` in new tab
3. **Browser loads**: `fullapp.js` (CSS bundled inside)
4. **JavaScript executes**: `fullapp.tsx` → `App.tsx` → `ModernFullAppView.tsx`
5. **Components render**: Complete dashboard with modern navigation
6. **Design system**: CSS custom properties applied via JavaScript

## 📊 **File Size Analysis**

### **Built Files (dist/)**
```
├── index.html (2.1 KB) - Popup HTML
├── popup.css (55.70 KB) - All styles bundled
├── popup.js (811.69 KB) - All popup JavaScript
├── fullapp.html (3.8 KB) - Full app HTML with inline CSS
├── fullapp.js (819.68 KB) - All full app JavaScript
├── manifest.json (0.8 KB) - Extension manifest
└── icons/ (various sizes) - Extension icons
```

### **Compression (Gzipped)**
```
├── popup.css: 55.70 KB → 10.21 KB (82% reduction)
├── popup.js: 811.69 KB → 227.26 KB (72% reduction)
└── fullapp.js: 819.68 KB → 228.78 KB (72% reduction)
```

## 🔐 **Security & Permissions**

### **Content Security Policy**
```json
"content_security_policy": {
  "extension_pages": "script-src 'self'; object-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com;"
}
```

### **External Resources Allowed**
- ✅ **Google Fonts CSS**: `https://fonts.googleapis.com`
- ✅ **Google Fonts Files**: `https://fonts.gstatic.com`
- ❌ **No other external scripts** (security compliant)

### **Web Accessible Resources**
- `fullapp.html` - Can be opened in new tabs
- `fullapp.js` - Required for full app functionality
- `icons/*` - Extension icons accessible to web pages

## 🎯 **Key Connections Summary**

### **Entry Points**
1. **Popup**: `manifest.json` → `index.html` → `popup.js` → `index.tsx`
2. **Full App**: User action → `fullapp.html` → `fullapp.js` → `fullapp.tsx`

### **Shared Components**
- **App.tsx**: Main application logic (shared between popup and full app)
- **Context Providers**: State management (shared)
- **Modern UI Components**: Design system components (shared)
- **Hooks**: Business logic (shared)

### **Unique Components**
- **PopupView.tsx**: Popup-specific interface
- **ModernFullAppView.tsx**: Full app-specific interface

### **Design System**
- **styles/design-system.css**: Material 3 CSS framework
- **utils/design-system.ts**: JavaScript utilities and tokens
- **Modern UI Components**: Implementation of design system

---

## 🎊 **Summary**

The Focus & Smile 3.0 extension has a **well-structured architecture** with:

- **2 Entry Points**: Popup and Full App
- **Shared Core**: App.tsx, hooks, and modern UI components
- **Modern Design System**: Complete Material 3 implementation
- **Optimized Bundles**: Efficient code splitting and compression
- **Security Compliant**: CSP-compliant with minimal external dependencies

All files are properly connected and the extension is ready for production! 🚀