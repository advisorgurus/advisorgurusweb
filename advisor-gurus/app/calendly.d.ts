// global.d.ts or calendly.d.ts
export {};

declare global {
  interface Window {
    Calendly: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}
