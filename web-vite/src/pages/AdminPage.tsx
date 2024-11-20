import DashboardAdmin from "@/components/dashBoard/DashboardAdmin";
import { SidebarAdmin } from "@/components/SidebarAdmin";
import { useEffect, useState } from "react";

export default function AdminPage(): JSX.Element {
  const [currentOption, setCurrentOption] = useState("dashboard");
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const [count, setCount] = useState<number>(0);
  const [data, setData] = useState([]);

  console.log(import.meta.env);
  console.log(import.meta.env.VITE_API_BASE_URL);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/movie-categories?search=&limit=10&page=1`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setData(data.data);
    })
    .catch((error) => {
      console.error(error);
    });

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/movie-categories/count?search=`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setCount(data.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }, [])

  return (
    <div className="flex">
      <SidebarAdmin currentOption={currentOption} setCurrentOption={setCurrentOption} />

      <DashboardAdmin currentOption={currentOption} data={data} />
    </div>
  )
}