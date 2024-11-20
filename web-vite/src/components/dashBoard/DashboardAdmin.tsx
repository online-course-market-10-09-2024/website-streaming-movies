import React from "react";
import { DataTableAdmin } from "@/components/tables/DataTableAdmin";

type Props = {
  currentOption: string
  page: number
  maxPage: number
  data: any
}

export default function AdminDashboard(props: Props): JSX.Element {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full">
        <h2 className="text-xl font-bold mb-4">
          {props.currentOption.charAt(0).toUpperCase() + props.currentOption.slice(1)}
        </h2>

        <DataTableAdmin page={props.page} maxPage={props.maxPage} data={props.data} />
      </div>
    </div>
  );
};