import { NextRequest, NextResponse } from 'next/server';

interface VitalMetric {
  metric: string;
  value: number;
  id: string;
  url: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: VitalMetric = await request.json();

    // Log Web Vitals data
    console.log('[Web Vitals]', {
      metric: data.metric,
      value: data.value.toFixed(2),
      url: data.url,
      timestamp: data.timestamp,
    });

    // In production, send to analytics service (e.g., Google Analytics, DataDog, etc.)
    // Example:
    // await analytics.trackWebVitals({
    //   metric: data.metric,
    //   value: data.value,
    //   url: data.url,
    //   userAgent: request.headers.get('user-agent'),
    //   timestamp: data.timestamp,
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Web Vitals Error]', error);
    return NextResponse.json({ error: 'Failed to track vitals' }, { status: 500 });
  }
}
