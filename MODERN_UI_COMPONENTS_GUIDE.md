# Modern UI Components Library

## 🎨 Overview

A comprehensive collection of modern, production-ready UI components inspired by leading design systems and current web design trends. These components feature glass morphism effects, smooth animations, responsive design patterns, and accessibility-first approach.

## 🚀 Key Features

- **Glass Morphism Effects**: Translucent backgrounds with backdrop blur
- **Smooth Animations**: Micro-interactions and state transitions
- **Responsive Design**: Mobile-first approach with flexible layouts
- **Dark Mode Support**: Seamless light/dark theme switching
- **Accessibility**: WCAG AA compliance with keyboard navigation
- **TypeScript**: Full type safety and IntelliSense support

## 📦 Components

### Core Components

#### GlassMorphismCard
Modern card component with glass morphism effects.

```tsx
import { GlassMorphismCard } from './modern-ui';

<GlassMorphismCard variant="prominent" blur="lg">
  <p>Content with glass effect</p>
</GlassMorphismCard>
```

**Props:**
- `variant`: 'default' | 'subtle' | 'prominent'
- `blur`: 'sm' | 'md' | 'lg'
- `opacity`: number (0-1)

#### ModernButton
Versatile button component with multiple variants and animations.

```tsx
import { ModernButton } from './modern-ui';

<ModernButton 
  variant="gradient" 
  size="lg" 
  icon={<span>🚀</span>}
  loading={isLoading}
>
  Launch App
</ModernButton>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'ghost' | 'gradient' | 'glass'
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `icon`: React.ReactNode
- `iconPosition`: 'left' | 'right'
- `loading`: boolean
- `fullWidth`: boolean

### Data Display Components

#### ModernProgressRing
Circular progress indicator with gradient support and animations.

```tsx
import { ModernProgressRing } from './modern-ui';

<ModernProgressRing
  progress={75}
  size={120}
  color="#4285F4"
  gradient={true}
  animated={true}
>
  <span>75%</span>
</ModernProgressRing>
```

**Props:**
- `progress`: number (0-100)
- `size`: number (default: 120)
- `strokeWidth`: number (default: 8)
- `color`: string (hex color)
- `gradient`: boolean
- `animated`: boolean

#### AnimatedCounter
Smooth number animation component with formatting options.

```tsx
import { AnimatedCounter } from './modern-ui';

<AnimatedCounter
  value={1234}
  duration={1000}
  prefix="$"
  suffix="USD"
  decimals={2}
  separator=","
/>
```

**Props:**
- `value`: number
- `duration`: number (ms, default: 1000)
- `prefix`: string
- `suffix`: string
- `decimals`: number
- `separator`: string

#### StatusIndicator
Visual status indicator with animated states.

```tsx
import { StatusIndicator } from './modern-ui';

<StatusIndicator
  status="active"
  size="md"
  label="Online"
  showLabel={true}
  animated={true}
/>
```

**Props:**
- `status`: 'active' | 'inactive' | 'paused' | 'completed' | 'error' | 'warning'
- `size`: 'sm' | 'md' | 'lg'
- `label`: string
- `showLabel`: boolean
- `animated`: boolean

### Enhanced Components

#### EnhancedCircularTimer
Advanced circular timer with session information and progress tracking.

```tsx
import { EnhancedCircularTimer } from './modern-ui';

<EnhancedCircularTimer
  timerState={timerState}
  isActive={isActive}
  settings={settings}
  size={280}
  variant="glass"
  showSessionInfo={true}
/>
```

**Props:**
- `timerState`: TimerState object
- `isActive`: boolean
- `settings`: Settings object
- `size`: number (default: 280)
- `variant`: 'default' | 'glass' | 'minimal'
- `showSessionInfo`: boolean

#### ModernQuoteCard
Elegant quote display card with interactive features.

```tsx
import { ModernQuoteCard } from './modern-ui';

<ModernQuoteCard
  quote={quoteObject}
  variant="glass"
  showActions={true}
  onToggleFavorite={handleFavorite}
  onShare={handleShare}
  onDelete={handleDelete}
/>
```

**Props:**
- `quote`: Quote object
- `variant`: 'default' | 'glass' | 'minimal'
- `showActions`: boolean
- `onToggleFavorite`: (id: string) => void
- `onShare`: (quote: Quote) => void
- `onDelete`: (id: string) => void

#### ModernStatsCard
Comprehensive statistics display with progress tracking.

```tsx
import { ModernStatsCard } from './modern-ui';

<ModernStatsCard
  title="Daily Progress"
  stats={statsArray}
  variant="gradient"
  layout="grid"
  showProgress={true}
  progressValue={75}
/>
```

**Props:**
- `title`: string
- `stats`: StatItem[]
- `variant`: 'default' | 'glass' | 'gradient'
- `layout`: 'grid' | 'list'
- `showProgress`: boolean
- `progressValue`: number

#### ModernNotification
Toast notification system with auto-dismiss and actions.

```tsx
import { ModernNotification } from './modern-ui';

<ModernNotification
  title="Success!"
  message="Your session has been completed."
  type="success"
  duration={5000}
  position="top-right"
  actions={[
    { label: 'View Stats', onClick: handleViewStats },
    { label: 'Dismiss', onClick: handleDismiss, variant: 'ghost' }
  ]}
/>
```

**Props:**
- `title`: string
- `message`: string
- `type`: 'success' | 'error' | 'warning' | 'info'
- `duration`: number (ms, 0 for persistent)
- `position`: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
- `actions`: Action[]
- `showProgress`: boolean

## 🎨 Design Tokens

### Colors
- **Primary**: #4285F4 (Google Blue)
- **Secondary**: #34A853 (Google Green)
- **Tertiary**: #7E57C2 (Purple)
- **Success**: #10B981
- **Warning**: #F59E0B
- **Error**: #EF4444

### Typography
- **Primary**: Google Sans (headings, UI elements)
- **Secondary**: Roboto (body text)
- **Monospace**: JetBrains Mono (code, timers)

### Spacing Scale
- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)

### Border Radius
- **sm**: 0.5rem (8px)
- **md**: 0.75rem (12px)
- **lg**: 1rem (16px)
- **xl**: 1.5rem (24px)
- **2xl**: 2rem (32px)

## 🎭 Animation Guidelines

### Duration
- **Fast**: 150ms (micro-interactions)
- **Normal**: 300ms (state changes)
- **Slow**: 500ms (page transitions)
- **Extra Slow**: 1000ms (data animations)

### Easing
- **Ease Out**: Cubic-bezier(0, 0, 0.2, 1) - Default
- **Ease In**: Cubic-bezier(0.4, 0, 1, 1) - Entrances
- **Ease In Out**: Cubic-bezier(0.4, 0, 0.2, 1) - Smooth transitions

## 🔧 Usage Examples

### Basic Timer Interface
```tsx
import { 
  EnhancedCircularTimer, 
  ModernButton, 
  GlassMorphismCard 
} from './modern-ui';

function TimerInterface() {
  return (
    <GlassMorphismCard variant="prominent">
      <EnhancedCircularTimer
        timerState={timerState}
        isActive={isActive}
        settings={settings}
        variant="minimal"
      />
      <div className="flex gap-4 mt-6">
        <ModernButton variant="gradient" onClick={startTimer}>
          Start
        </ModernButton>
        <ModernButton variant="secondary" onClick={pauseTimer}>
          Pause
        </ModernButton>
      </div>
    </GlassMorphismCard>
  );
}
```

### Stats Dashboard
```tsx
import { ModernStatsCard, AnimatedCounter } from './modern-ui';

function StatsDashboard() {
  const stats = [
    { label: 'Sessions', value: 12, icon: '🎯', trend: 'up', trendValue: 15 },
    { label: 'Focus Time', value: 240, unit: 'min', icon: '⏱️', trend: 'up', trendValue: 8 }
  ];

  return (
    <ModernStatsCard
      title="Today's Progress"
      stats={stats}
      variant="glass"
      showProgress={true}
      progressValue={75}
    />
  );
}
```

### Notification System
```tsx
import { ModernNotification } from './modern-ui';

function NotificationExample() {
  return (
    <ModernNotification
      title="Session Complete!"
      message="Great job! You've completed a 25-minute focus session."
      type="success"
      actions={[
        { label: 'Start Break', onClick: startBreak, variant: 'primary' },
        { label: 'Continue', onClick: continueWork, variant: 'ghost' }
      ]}
    />
  );
}
```

## 🎯 Best Practices

### Performance
- Use `React.memo()` for components that don't change frequently
- Implement lazy loading for heavy components
- Optimize animations with `transform` and `opacity` properties
- Use `will-change` CSS property sparingly

### Accessibility
- Always provide `aria-label` for interactive elements
- Ensure keyboard navigation works properly
- Maintain color contrast ratios above 4.5:1
- Test with screen readers

### Responsive Design
- Use relative units (rem, em, %) instead of fixed pixels
- Implement mobile-first breakpoints
- Test on various screen sizes and orientations
- Consider touch targets (minimum 44px)

### Animation Guidelines
- Respect `prefers-reduced-motion` user preference
- Keep animations under 500ms for UI interactions
- Use easing functions for natural motion
- Provide loading states for async operations

## 🔮 Future Enhancements

### Planned Components
- **ModernDataTable**: Advanced table with sorting, filtering, pagination
- **ModernCalendar**: Interactive calendar with event management
- **ModernChart**: Data visualization components
- **ModernForm**: Form components with validation
- **ModernModal**: Advanced modal system with stacking

### Planned Features
- **Theme Customization**: Runtime theme switching
- **Component Variants**: More design variations
- **Animation Presets**: Pre-built animation sequences
- **Accessibility Improvements**: Enhanced screen reader support
- **Performance Optimizations**: Bundle size reduction

## 📚 Resources

### Design Inspiration
- [Material Design 3](https://m3.material.io/)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Figma Design System](https://www.figma.com/design-systems/)
- [Linear Design System](https://linear.app/design-system)

### Technical References
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Radix UI](https://www.radix-ui.com/) - Unstyled components
- [React Aria](https://react-spectrum.adobe.com/react-aria/) - Accessibility hooks

---

**Built with ❤️ for Focus & Smile 3.0**