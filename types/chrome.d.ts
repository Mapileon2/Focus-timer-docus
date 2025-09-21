// Chrome Extension API types
declare global {
  interface Window {
    chrome?: typeof chrome;
  }
}

declare namespace chrome {
  namespace tabs {
    interface CreateProperties {
      url: string;
      active?: boolean;
    }
    
    function create(createProperties: CreateProperties): void;
  }
  
  namespace runtime {
    function getURL(path: string): string;
  }
}

export {};