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

  const handleSearch = (text: string): void => {
    setSearch(text);
  }
  const getMaxPage = (): number => {
    return Math.ceil(count / limit);
  }
  const handleFirstPage = (): void => {
    setPage(1);
  }
  const handlePreviousPage = (): void => {
    if (page === 1) {
      return;
    }

    if (page < 1) {
      setPage(1);
      return;
    }

    setPage(page - 1);
  }
  const handleNextPage = (): void => {
    const maxPage = getMaxPage();

    if (page === maxPage) {
      return;
    }

    if (page > maxPage) {
      setPage(maxPage);
      return;
    }

    setPage(page + 1);
  }
  const handleLastPage = (): void => {
    setPage(getMaxPage());
  }

  console.log(search);
  console.log(data);
  console.log(count);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/movie-categories?search=${search}&limit=10&page=${page}`)
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

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/movie-categories/count?search=${search}`)
    .then((response) => {
      console.log("count: ",search)
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
  }, [page, search]);

  return (
    <div className="flex">
      <SidebarAdmin currentOption={currentOption} setCurrentOption={setCurrentOption} />

      <DashboardAdmin
        currentOption={currentOption}
        handleSearch={handleSearch}
        page={page} maxPage={getMaxPage()}
        handleFirstPage={handleFirstPage} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} handleLastPage={handleLastPage}
        data={data} />
    </div>
  )
}