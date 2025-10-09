import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ReferenceLine, ResponsiveContainer, LabelList,
} from "recharts"; import { Cell } from "recharts";
import { ColorBand, pickBand } from "../lib/color";

export type ChartRow = {
  key: string;
  label: string;
  ratio: number;     // �_�̒����i�~�{���j
  z: number;         // �΍��l�p�i�E���x���ɕ��L�j
};

export default function ResultChart({
  rows,
  bands,
}: {
  rows: ChartRow[];
  bands: ColorBand[];
}) {
  const data = rows.map((r) => ({
    name: r.label,
    ratio: r.ratio,
    z: r.z,
    color: pickBand(bands, r.ratio).color,
    rightLabel: `�~${r.ratio.toFixed(2)}�E�΍��lH ${Math.round(50 + r.z * 10)}`, // ��������H=50+10z
  }));

  return (
    <div className="chart-card" style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 8, right: 40, bottom: 8, left: 8 }}
          barCategoryGap={12}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" domain={[0, "dataMax"]} />
          <YAxis type="category" dataKey="name" width={88} />
          <ReferenceLine x={1} stroke="#999" strokeDasharray="5 5" />
          <Bar dataKey="ratio" isAnimationActive={false}>
            <LabelList dataKey="rightLabel" position="right" />
            {data.map((entry, index) => (
              <Cell key={`c-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
