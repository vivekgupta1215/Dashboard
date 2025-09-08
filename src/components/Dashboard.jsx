import { useSelector, useDispatch } from "react-redux";
import Category from "./Category";
import { addCategory } from "../store/dashboardSlice";
import { useState } from "react";
import SearchBar from "./SearchBar";

export default function Dashboard(){
  const categories = useSelector((state)=>state.dashboard.categories);
  const dispatch = useDispatch();
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      dispatch(addCategory(newCategory));
      setNewCategory("");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Executive Dashboard</h1>
        <p className="text-gray-600">Manage widgets by category, add graphs, and search the library.</p>
      </header>

      <div className="flex gap-3 mb-6">
        <SearchBar />
        <input type="text" placeholder="New Category Name" value={newCategory} onChange={(e)=>setNewCategory(e.target.value)} className="border rounded-lg px-3 py-2 w-64" />
        <button onClick={handleAddCategory} className="bg-green-600 text-white px-4 py-2 rounded-lg">+ Add Category</button>
      </div>

      {categories.map((category)=>(
        <Category key={category.id} category={category} />
      ))}
    </div>
  );
}