interface MiniBarChartProps {
  title: string;
  data: Array<{ label: string; value: number }>;
  maxValue?: number;
}

export function MiniBarChart({ title, data, maxValue }: MiniBarChartProps) {
  const resolvedMax = maxValue ?? Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <span className="text-xs text-slate-500">7 days</span>
      </div>
      <div className="space-y-4">
        {data.map((item) => {
          const width = Math.max((item.value / resolvedMax) * 100, 8);
          return (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">{item.label}</span>
                <span className="font-medium text-slate-900">{item.value}</span>
              </div>
              <div className="h-3 rounded-full bg-slate-100">
                <div className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: `${width}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
