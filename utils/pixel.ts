
// Utility to handle Facebook Pixel events safely

export const trackEvent = (eventName: string, data?: any) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, data);
  } else {
    // Optional: Log warning in development if pixel isn't loaded
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Facebook Pixel not loaded. Event '${eventName}' was not tracked.`);
    }
  }
};
