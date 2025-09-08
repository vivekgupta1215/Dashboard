import { useDispatch } from "react-redux";
import { setSearchQuery } from "../store/dashboardSlice";

export default function SearchBar(){
  const dispatch = useDispatch();
  return (
    <input aria-label="Search widgets" type="text" placeholder="Search widgets..." onChange={(e)=>dispatch(setSearchQuery(e.target.value))} className="border rounded-lg px-3 py-2 flex-1" />
  );
}