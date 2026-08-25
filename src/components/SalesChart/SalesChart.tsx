'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipContentProps,
} from 'recharts';
import styles from './SalesChart.module.scss';

export interface SalesDataPoint {
  day: string;
  total: number;
}

interface SalesChartProps {
  data: SalesDataPoint[];
  title?: string;
}

function CustomTooltip({ active, payload, label }: TooltipContentProps) {
  if (!active || !payload || payload.length === 0) return null;

  const value = Number(payload[0].value);
  const formatted = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className={styles.tooltip}>
      <span className={styles.tooltipDay}>{label}</span>
      <span className={styles.tooltipValue}>{formatted}</span>
    </div>
  );
}

export function SalesChart({ data, title = 'Vendas — últimos 7 dias' }: SalesChartProps) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>{title}</span>

      <div className={styles.chartArea}>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data} margin={{ top: 10, right: 12, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.25} />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="0"
              vertical={false}
              stroke="var(--color-border)"
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}
              tickFormatter={(value) => `${value / 1000}k`}
            />

            <Tooltip content={CustomTooltip} cursor={{ stroke: 'var(--color-accent)', strokeWidth: 1 }} />

            <Area
              type="monotone"
              dataKey="total"
              stroke="var(--color-accent)"
              strokeWidth={2}
              fill="url(#salesFill)"
              dot={{ r: 3, fill: 'var(--color-bg)', stroke: 'var(--color-accent)', strokeWidth: 2 }}
              activeDot={{ r: 5, fill: 'var(--color-bg)', stroke: 'var(--color-accent)', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
