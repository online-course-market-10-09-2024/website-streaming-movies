import React, { useState } from "react";
import { DataTableAdmin } from "@/components/tables/DataTableAdmin";
import { FormStatusEnum } from "@/libs/enum";
import FormAdmin from "../form/FormAdmin";

type Props = {
  currentOption: string
  handleSearch: (text: string) => void
  page: number
  maxPage: number
  handleFirstPage: () => void
  handlePreviousPage: () => void
  handleNextPage: () => void
  handleLastPage: () => void
  data: any
}

export default function AdminDashboard(props: Props): JSX.Element {
  const [formStatus, setFormStatus] = useState<FormStatusEnum>(FormStatusEnum.INACTIVE);
  
  const handleFormStatus = (status: FormStatusEnum) => {
    setFormStatus(status);
  }

  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full">
        <h2 className="text-xl font-bold mb-4">
          {props.currentOption.charAt(0).toUpperCase() + props.currentOption.slice(1)}
        </h2>

        <DataTableAdmin
          handleFormStatus={handleFormStatus}
          handleSearch={props.handleSearch}
          page={props.page} maxPage={props.maxPage}
          handleFirstPage={props.handleFirstPage} handlePreviousPage={props.handlePreviousPage} handleNextPage={props.handleNextPage} handleLastPage={props.handleLastPage}
          data={props.data}
        />

        {formStatus !== FormStatusEnum.INACTIVE && (
          <FormAdmin currentOption={props.currentOption} formStatus={formStatus} handleFormStatus={handleFormStatus} />
        )}
      </div>
    </div>
  );
};