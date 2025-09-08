import Widget from "./Widget";
import { useSelector } from "react-redux";
import { useState } from "react";
import WidgetModal from "./WidgetModal";

export default function Category({ category }) {
  const searchQuery = useSelector((state) => state.dashboard.searchQuery);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredWidgets = category.widgets.filter((w) =>
    w.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (w.title && w.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">{category.name}</h2>
        <button onClick={() => setModalOpen(true)} className="px-3 py-1.5 rounded-lg bg-gray-900 text-white text-sm">+ Add / Remove Widgets</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredWidgets.map((widget) => (
          <Widget key={widget.id} widget={widget} categoryId={category.id} />
        ))}
      </div>

      <WidgetModal open={modalOpen} onClose={()=>setModalOpen(false)} categoryId={category.id} />
    </div>
  );
}