export type Language = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ja';

export interface Translations {
  app: {
    title: string;
    subtitle: string;
    sessionsToday: string;
    version: string;
  };
  timer: {
    focus: string;
    break: string;
    rest: string;
    session: string;
    workSession: string;
    shortBreak: string;
    longBreak: string;
  };
  controls: {
    start: string;
    pause: string;
    reset: string;
    skip: string;
    settings: string;
    viewStats: string;
  };
  notifications: {
    sessionComplete: string;
    timeForBreak: string;
    timeToFocus: string;
    wellDone: string;
  };
  settings: {
    apiKeyRequired: string;
    apiKeyDescription: string;
    configureApi: string;
    pomodoroTimer: string;
    title: string;
  };
  accessibility: {
    resetTimer: string;
    pauseTimer: string;
    startTimer: string;
    skipSession: string;
    timerControls: string;
  };
  stats: {
    view: string;
  };
  api: {
    disabled: string;
    required: string;
    setupMessage: string;
  };
  progress: {
    label: string;
  };
  theme: {
    light: string;
    dark: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    app: {
      title: 'Focus & Smile',
      subtitle: 'AI-Powered Productivity',
      sessionsToday: 'sessions today',
      version: 'v1.0.0'
    },
    timer: {
      focus: 'Focus',
      break: 'Break',
      rest: 'Rest',
      session: 'Session',
      workSession: 'Work Session',
      shortBreak: 'Short Break',
      longBreak: 'Long Break'
    },
    controls: {
      start: 'Start',
      pause: 'Pause',
      reset: 'Reset',
      skip: 'Skip',
      settings: 'Settings',
      viewStats: 'View Stats'
    },
    notifications: {
      sessionComplete: 'Session completed! 🎉',
      timeForBreak: 'Time for a break! ☕',
      timeToFocus: 'Time to focus! 🎯',
      wellDone: 'Well done! Keep it up! 💪'
    },
    settings: {
      apiKeyRequired: 'API Key Required',
      apiKeyDescription: 'Set your Gemini API key to unlock AI-powered features and personalized quotes',
      configureApi: 'Configure API Settings',
      pomodoroTimer: 'Pomodoro Timer',
      title: 'Settings'
    },
    accessibility: {
      resetTimer: 'Reset timer',
      pauseTimer: 'Pause timer',
      startTimer: 'Start timer',
      skipSession: 'Skip to next session',
      timerControls: 'Timer controls'
    },
    stats: {
      view: 'View Stats'
    },
    api: {
      disabled: 'AI Features Disabled:',
      required: 'API Key Required',
      setupMessage: 'Set your Gemini API key in settings to enable AI-powered insights.'
    },
    progress: {
      label: 'Progress:'
    },
    theme: {
      light: 'Light mode',
      dark: 'Dark mode'
    }
  },
  es: {
    app: {
      title: 'Enfoque y Sonrisa',
      subtitle: 'Productividad con IA',
      sessionsToday: 'sesiones hoy',
      version: 'v1.0.0'
    },
    timer: {
      focus: 'Enfoque',
      break: 'Descanso',
      rest: 'Descanso',
      session: 'Sesión',
      workSession: 'Sesión de Trabajo',
      shortBreak: 'Descanso Corto',
      longBreak: 'Descanso Largo'
    },
    controls: {
      start: 'Iniciar',
      pause: 'Pausar',
      reset: 'Reiniciar',
      skip: 'Saltar',
      settings: 'Ajustes',
      viewStats: 'Ver Estadísticas'
    },
    notifications: {
      sessionComplete: '¡Sesión completada! 🎉',
      timeForBreak: '¡Tiempo de descanso! ☕',
      timeToFocus: '¡Tiempo de enfoque! 🎯',
      wellDone: '¡Bien hecho! ¡Sigue así! 💪'
    },
    settings: {
      apiKeyRequired: 'Clave API Requerida',
      apiKeyDescription: 'Configura tu clave API de Gemini para desbloquear funciones de IA y citas personalizadas',
      configureApi: 'Configurar Ajustes de API',
      pomodoroTimer: 'Temporizador Pomodoro',
      title: 'Ajustes'
    },
    accessibility: {
      resetTimer: 'Reiniciar temporizador',
      pauseTimer: 'Pausar temporizador',
      startTimer: 'Iniciar temporizador',
      skipSession: 'Saltar a la siguiente sesión',
      timerControls: 'Controles del temporizador'
    },
    stats: {
      view: 'Ver Estadísticas'
    },
    api: {
      disabled: 'Funciones de IA Desactivadas:',
      required: 'Clave API Requerida',
      setupMessage: 'Configura tu clave API de Gemini en ajustes para activar funciones de IA.'
    },
    progress: {
      label: 'Progreso:'
    },
    theme: {
      light: 'Modo claro',
      dark: 'Modo oscuro'
    }
  },
  fr: {
    app: {
      title: 'Concentration et Sourire',
      subtitle: 'Productivité IA',
      sessionsToday: 'sessions aujourd\'hui',
      version: 'v1.0.0'
    },
    timer: {
      focus: 'Concentration',
      break: 'Pause',
      rest: 'Repos',
      session: 'Session',
      workSession: 'Session de Travail',
      shortBreak: 'Pause Courte',
      longBreak: 'Pause Longue'
    },
    controls: {
      start: 'Démarrer',
      pause: 'Pause',
      reset: 'Réinitialiser',
      skip: 'Passer',
      settings: 'Paramètres',
      viewStats: 'Voir les Statistiques'
    },
    notifications: {
      sessionComplete: 'Session terminée! 🎉',
      timeForBreak: 'Temps de pause! ☕',
      timeToFocus: 'Temps de concentration! 🎯',
      wellDone: 'Bien joué! Continuez! 💪'
    },
    settings: {
      apiKeyRequired: 'Clé API Requise',
      apiKeyDescription: 'Définissez votre clé API Gemini pour débloquer les fonctionnalités IA et les citations personnalisées',
      configureApi: 'Configurer les Paramètres API',
      pomodoroTimer: 'Minuteur Pomodoro',
      title: 'Paramètres'
    },
    accessibility: {
      resetTimer: 'Réinitialiser la minuterie',
      pauseTimer: 'Mettre en pause la minuterie',
      startTimer: 'Démarrer la minuterie',
      skipSession: 'Passer à la session suivante',
      timerControls: 'Contrôles de la minuterie'
    },
    stats: {
      view: 'Voir les Statistiques'
    },
    api: {
      disabled: 'Fonctionnalités IA Désactivées:',
      required: 'Clé API Requise',
      setupMessage: 'Définissez votre clé API Gemini dans les paramètres pour activer les fonctionnalités IA.'
    },
    progress: {
      label: 'Progrès:'
    },
    theme: {
      light: 'Mode clair',
      dark: 'Mode sombre'
    }
  },
  de: {
    app: {
      title: 'Fokus & Lächeln',
      subtitle: 'KI-gesteuerte Produktivität',
      sessionsToday: 'Sitzungen heute',
      version: 'v1.0.0'
    },
    timer: {
      focus: 'Fokus',
      break: 'Pause',
      rest: 'Erholung',
      session: 'Sitzung',
      workSession: 'Arbeitssitzung',
      shortBreak: 'Kurze Pause',
      longBreak: 'Lange Pause'
    },
    controls: {
      start: 'Starten',
      pause: 'Pause',
      reset: 'Zurücksetzen',
      skip: 'Überspringen',
      settings: 'Einstellungen',
      viewStats: 'Statistiken Anzeigen'
    },
    notifications: {
      sessionComplete: 'Sitzung abgeschlossen! 🎉',
      timeForBreak: 'Zeit für eine Pause! ☕',
      timeToFocus: 'Zeit zum Fokussieren! 🎯',
      wellDone: 'Gut gemacht! Weiter so! 💪'
    },
    settings: {
      apiKeyRequired: 'API-Schlüssel Erforderlich',
      apiKeyDescription: 'Stellen Sie Ihren Gemini API-Schlüssel ein, um KI-Funktionen und personalisierte Zitate freizuschalten',
      configureApi: 'API-Einstellungen Konfigurieren',
      pomodoroTimer: 'Pomodoro-Timer',
      title: 'Einstellungen'
    },
    accessibility: {
      resetTimer: 'Timer zurücksetzen',
      pauseTimer: 'Timer pausieren',
      startTimer: 'Timer starten',
      skipSession: 'Zur nächsten Sitzung springen',
      timerControls: 'Timer-Steuerungen'
    },
    stats: {
      view: 'Statistiken Anzeigen'
    },
    api: {
      disabled: 'KI-Funktionen Deaktiviert:',
      required: 'API-Schlüssel Erforderlich',
      setupMessage: 'Stellen Sie Ihren Gemini API-Schlüssel in den Einstellungen ein, um KI-Funktionen zu aktivieren.'
    },
    progress: {
      label: 'Fortschritt:'
    },
    theme: {
      light: 'Heller Modus',
      dark: 'Dunkler Modus'
    }
  },
  zh: {
    app: {
      title: '专注与微笑',
      subtitle: 'AI驱动的生产力',
      sessionsToday: '今日会话',
      version: 'v1.0.0'
    },
    timer: {
      focus: '专注',
      break: '休息',
      rest: '休息',
      session: '会话',
      workSession: '工作会话',
      shortBreak: '短暂休息',
      longBreak: '长时间休息'
    },
    controls: {
      start: '开始',
      pause: '暂停',
      reset: '重置',
      skip: '跳过',
      settings: '设置',
      viewStats: '查看统计'
    },
    notifications: {
      sessionComplete: '会话完成！🎉',
      timeForBreak: '休息时间到了！☕',
      timeToFocus: '专注时间到了！🎯',
      wellDone: '做得好！继续努力！💪'
    },
    settings: {
      apiKeyRequired: '需要API密钥',
      apiKeyDescription: '设置您的Gemini API密钥以解锁AI功能和个性化引用',
      configureApi: '配置API设置',
      pomodoroTimer: '番茄钟计时器',
      title: '设置'
    },
    accessibility: {
      resetTimer: '重置计时器',
      pauseTimer: '暂停计时器',
      startTimer: '开始计时器',
      skipSession: '跳到下一个会话',
      timerControls: '计时器控制'
    },
    stats: {
      view: '查看统计'
    },
    api: {
      disabled: 'AI功能已禁用：',
      required: '需要API密钥',
      setupMessage: '在设置中设置您的Gemini API密钥以启用AI功能。'
    },
    progress: {
      label: '进度：'
    },
    theme: {
      light: '浅色模式',
      dark: '深色模式'
    }
  },
  ja: {
    app: {
      title: 'フォーカス＆スマイル',
      subtitle: 'AI駆動の生産性',
      sessionsToday: '今日のセッション',
      version: 'v1.0.0'
    },
    timer: {
      focus: 'フォーカス',
      break: '休憩',
      rest: '休息',
      session: 'セッション',
      workSession: '作業セッション',
      shortBreak: '短い休憩',
      longBreak: '長い休憩'
    },
    controls: {
      start: '開始',
      pause: '一時停止',
      reset: 'リセット',
      skip: 'スキップ',
      settings: '設定',
      viewStats: '統計を見る'
    },
    notifications: {
      sessionComplete: 'セッション完了！🎉',
      timeForBreak: '休憩時間です！☕',
      timeToFocus: 'フォーカスタイム！🎯',
      wellDone: 'よくできました！頑張って！💪'
    },
    settings: {
      apiKeyRequired: 'APIキーが必要',
      apiKeyDescription: 'AI機能とパーソナライズされた引用を有効にするためにGemini APIキーを設定してください',
      configureApi: 'API設定を構成',
      pomodoroTimer: 'ポモドーロタイマー',
      title: '設定'
    },
    accessibility: {
      resetTimer: 'タイマーをリセット',
      pauseTimer: 'タイマーを一時停止',
      startTimer: 'タイマーを開始',
      skipSession: '次のセッションにスキップ',
      timerControls: 'タイマーコントロール'
    },
    stats: {
      view: '統計を見る'
    },
    api: {
      disabled: 'AI機能が無効になっています：',
      required: 'APIキーが必要',
      setupMessage: 'AI機能を有効にするために設定でGemini APIキーを設定してください。'
    },
    progress: {
      label: '進捗：'
    },
    theme: {
      light: 'ライトモード',
      dark: 'ダークモード'
    }
  }
};

export const getCurrentLanguage = (): Language => {
  try {
    const saved = localStorage.getItem('language') as Language;
    if (saved && translations[saved]) {
      return saved;
    }
  } catch (error) {
    console.warn('Could not access localStorage for language detection');
  }
  
  // Detect browser language
  const browserLang = navigator.language.split('-')[0];
  const supportedLangs = Object.keys(translations) as Language[];
  
  if (supportedLangs.includes(browserLang as Language)) {
    return browserLang as Language;
  }
  
  return 'en';
};

export const setLanguage = (lang: Language): void => {
  try {
    localStorage.setItem('language', lang);
    // Dispatch a custom event for components to react to language changes
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
  } catch (error) {
    console.warn('Could not save language preference');
  }
};

export const t = (key: string, lang: Language = getCurrentLanguage()): string => {
  const keys = key.split('.');
  let current: any = translations[lang];
  
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      console.warn(`Translation key not found: ${key} for language: ${lang}`);
      // Fallback to English
      current = translations.en;
      for (const k of keys) {
        if (current && typeof current === 'object' && k in current) {
          current = current[k];
        } else {
          return key; // Return the key itself as fallback
        }
      }
      return current as string;
    }
  }
  
  return current as string;
};

export const getDirection = (lang: Language): 'ltr' | 'rtl' => {
  const rtlLanguages: Language[] = ['ar', 'he', 'fa', 'ur'];
  return rtlLanguages.includes(lang) ? 'rtl' : 'ltr';
};

export const supportedLanguages: Language[] = ['en', 'es', 'fr', 'de', 'zh', 'ja'];