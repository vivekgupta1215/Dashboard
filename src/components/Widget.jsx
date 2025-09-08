import { useDispatch } from "react-redux";
import { removeWidget } from "../store/dashboardSlice";
import { WIDGET_INDEX } from "../config/catalog";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend
} from "recharts";

const COLORS = ["#1D4ED8", "#93C5FD", "#EF4444", "#F59E0B", "#10B981", "#6366F1"];

const Donut = ({ data }) => (
  <ResponsiveContainer width="100%" height={220}>
    <PieChart>
      <Pie
        data={data}
        cx="50%" cy="50%"
        innerRadius={55}
        outerRadius={85}
        paddingAngle={2}
        dataKey="value"
        nameKey="name"
        label
      >
        {data.map((_, i) => (
          <Cell key={i} fill={COLORS[i % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);

const Bars = ({ data }) => (
  <ResponsiveContainer width="100%" height={240}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#6366F1" />
    </BarChart>
  </ResponsiveContainer>
);

const StackedProgress = ({ data }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div>
      {/* Single stacked progress bar */}
      <div className="w-full h-5 flex rounded-full overflow-hidden border">
        {data.map((d, idx) => {
          const percent = total ? (d.value / total) * 100 : 0;
          return (
            <div
              key={idx}
              style={{
                width: `${percent}%`,
                backgroundColor: d.color
              }}
              title={`${d.name}: ${d.value}`}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-3 text-sm">
        {data.map((d, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span
              className="inline-block w-4 h-4 rounded"
              style={{ backgroundColor: d.color }}
            ></span>
            <span>{d.name} ({d.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const List = ({ data }) => (
  <ul className="divide-y">
    {data.map((row, idx) => (
      <li key={idx} className="py-2 flex justify-between">
        <span className="text-gray-700">{row.name}</span>
        <span className="font-semibold">{row.value}</span>
      </li>
    ))}
  </ul>
);

const KPI = ({ data }) => (
  <div className="flex items-baseline space-x-3">
    <div className="text-4xl font-extrabold">{data.value}</div>
    <div className="text-sm text-gray-500">{data.trend}</div>
  </div>
);

export default function Widget({ widget, categoryId }) {
  const dispatch = useDispatch();
  const meta = WIDGET_INDEX.get(widget.id);

  if (!meta) {
    return (
      <div className="bg-white shadow p-4 rounded-xl">
        <h3 className="font-bold mb-1">{widget.title}</h3>
        <p className="text-gray-500 text-sm">Unknown widget.</p>
      </div>
    );
  }

  const render = () => {
    switch (meta.type) {
      case "stacked-progress": return <StackedProgress data={meta.data} />;
      case "donut": return <Donut data={meta.data} />;
      case "bar": return <Bars data={meta.data} />;
      case "list": return <List data={meta.data} />;
      case "kpi": return <KPI data={meta.data} />;
      default: return <p className="text-gray-600">No Graph data available!</p>;
    }
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-xl relative">
      <button
        onClick={() => dispatch(removeWidget({ categoryId, widgetId: widget.id }))}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
        title="Remove"
      >
        ✕
      </button>
      <h3 className="font-semibold mb-1">{meta.title}</h3>
      <p className="text-xs text-gray-500 mb-3">{meta.description}</p>
      {render()}
    </div>
  );
}
