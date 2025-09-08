import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWidget, removeWidget } from "../store/dashboardSlice";
import { WIDGET_CATALOG } from "../config/catalog";

export default function WidgetModal({ open, onClose, categoryId }) {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.dashboard.categories);
  const category = categories.find(c => c.id === categoryId) || { widgets: [] };
  const existingIds = new Set(category.widgets.map(w => w.id));

  const [activeTab, setActiveTab] = useState(WIDGET_CATALOG.tabs[0].id);
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const tab = WIDGET_CATALOG.tabs.find(t => t.id === activeTab);
    if (!tab) return [];
    return tab.widgets.filter(w => w.title.toLowerCase().includes(query.toLowerCase()));
  }, [activeTab, query]);

  if (!open) return null;

  const toggle = (widget) => {
    if (existingIds.has(widget.id)) {
      dispatch(removeWidget({ categoryId, widgetId: widget.id }));
      existingIds.delete(widget.id);
    } else {
      dispatch(addWidget({ categoryId, widget: { id: widget.id, title: widget.title, type: widget.type } }));
      existingIds.add(widget.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-[800px] max-w-[95vw]">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold text-lg">Manage Widgets</h3>
          <button className="text-gray-500" onClick={onClose}>✕</button>
        </div>

        <div className="px-4 pt-2">
          <div className="flex gap-4 border-b mb-3">
            {WIDGET_CATALOG.tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 -mb-px ${activeTab === tab.id ? "border-b-2 border-indigo-600 font-semibold" : "text-gray-500"}`}>
                {tab.label}
              </button>
            ))}
          </div>

          <input placeholder="Search widgets..." className="w-full border rounded-lg px-3 py-2 mb-3" value={query} onChange={(e)=>setQuery(e.target.value)} />

          <div className="max-h-72 overflow-auto pr-2">
            {list.map(w => (
              <label key={w.id} className="flex items-center justify-between p-2 border rounded mb-2">
                <div>
                  <div className="font-medium">{w.title}</div>
                  <div className="text-xs text-gray-500">{w.description}</div>
                </div>
                <input type="checkbox" checked={existingIds.has(w.id)} onChange={()=>toggle(w)} />
              </label>
            ))}
            {list.length === 0 && <div className="text-sm text-gray-500 py-6 text-center">No widgets match your search.</div>}
          </div>
        </div>

        <div className="p-4 border-t flex justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded bg-indigo-600 text-white">Done</button>
        </div>
      </div>
    </div>
  );
}