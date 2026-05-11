import { onCLS, onINP, onLCP, Metric } from 'web-vitals';

function sendVitals(metric: Metric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
    return;
  }

  // Send to analytics in production
  if (typeof window !== 'undefined' && window.navigator.sendBeacon) {
    const data = {
      metric: metric.name,
      value: metric.value,
      id: metric.id,
      url: window.location.href,
      timestamp: new Date().toISOString(),
    };

    // In production, send to your analytics endpoint
    window.navigator.sendBeacon(
      '/api/vitals',
      JSON.stringify(data)
    );
  }
}

export function reportWebVitals() {
  try {
    onCLS(sendVitals);
    onINP(sendVitals);
    onLCP(sendVitals);
  } catch (err) {
    console.debug('Web Vitals measurement error:', err);
  }
}
