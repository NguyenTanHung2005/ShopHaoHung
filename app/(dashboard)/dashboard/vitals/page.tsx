import React from 'react';

export default function VitalsDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Web Vitals Dashboard (Demo)</h1>
      <p className="text-slate-600">Web Vitals metrics are posted to <code>/api/vitals</code>. In this demo the endpoint logs to server console. Integrate a metrics store or analytics service to visualize metrics in production.</p>
      <ul className="list-disc pl-6">
        <li>Endpoint: <code>/api/vitals</code></li>
        <li>Metrics: LCP, FID, CLS</li>
        <li>Collection: sendBeacon from <code>lib/web-vitals.ts</code></li>
      </ul>
    </div>
  );
}
