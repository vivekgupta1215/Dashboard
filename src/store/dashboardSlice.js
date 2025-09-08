import { createSlice } from "@reduxjs/toolkit";
import { WIDGET_CATALOG } from "../config/catalog";

const categoriesFromCatalog = () =>
  WIDGET_CATALOG.tabs.map(tab => ({
    id: tab.id.toLowerCase(),
    name: `${tab.label} Dashboard`,
    widgets: tab.widgets.filter(w => w.default).map(w => ({
      id: w.id,
      title: w.title,
      type: w.type
    }))
  }));

const initialState = {
  categories: categoriesFromCatalog(),
  searchQuery: ""
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find(c => c.id === categoryId);
      if (category && !category.widgets.some(w => w.id === widget.id)) {
        category.widgets.push(widget);
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(c => c.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter(w => w.id !== widgetId);
      }
    },
    addCategory: (state, action) => {
      state.categories.push({
        id: Date.now().toString(),
        name: action.payload,
        widgets: []
      });
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    }
  }
});

export const { addWidget, removeWidget, addCategory, setSearchQuery } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;