import { CurrentOptionEnum, FormStatusEnum } from "@/libs/enum"
import { Button } from "../ui/button"
import { FormEvent, useState } from "react"

import { ReplaceHyphenWithSpace, ToTitle } from "@/libs/string"
import { Input } from "../ui/input"
import { InputFormData } from "@/libs/types"
import { MovieCategory } from "@/libs/movie_category"

type ChildProps = {
  data: InputFormData
  setData: React.Dispatch<React.SetStateAction<InputFormData>>;
  formStatus: FormStatusEnum
}

function InputMovieCategory(props: ChildProps) {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof MovieCategory
  ) => {
    props.setData((prevData) => ({
      ...prevData,
      [field]: event.target.value,
    }));
  };

  return (
    <div>
      {props.formStatus === FormStatusEnum.INSERT && (
        <>
          <label>Name:</label>
          <Input
            type="text"
            value={props.data?.name || ""}
            onChange={(e) => handleChange(e, "name")}
          />
        </>
      )}

      {props.formStatus === FormStatusEnum.UPDATE && (
        <>
          <label>Id:</label>
          <Input
            type="text"
            value={props.data?.id || ""}
            onChange={(e) => handleChange(e, "id")}
          />

          <label>Name:</label>
          <Input
            type="text"
            value={props.data?.name || ""}
            onChange={(e) => handleChange(e, "name")}
          />
        </>
      )}

      {props.formStatus === FormStatusEnum.REMOVE && (
        <>
          <label>Id:</label>
          <Input type="text" value={props.data?.id || ""} readOnly={true} />

          <label>Name:</label>
          <Input type="text" value={props.data?.name || ""} readOnly={true} />
        </>
      )}
    </div>
  );
}

type Props = {
  currentOption: string
  formStatus: FormStatusEnum
  handleFormStatus: (status: FormStatusEnum) => void
}

export default function FormAdmin(props: Props) {
  const [data, setData] = useState<InputFormData>(undefined);
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!data) {
      console.error("Form data is undefined. Cannot submit.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/${props.currentOption}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Data successfully submitted:", result);
        // Handle success (e.g., reset form, close modal, etc.)
        props.handleFormStatus(FormStatusEnum.INACTIVE); // Close form
        setData(undefined); // Reset form data
      } else {
        console.error("Failed to submit data:", response.statusText);
      }
    } catch (error) {
      console.error("Error during submission:", error);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full"
      >
        <h2 className="text-xl font-bold mb-4">{ToTitle(props.formStatus)} {ToTitle(ReplaceHyphenWithSpace(props.currentOption))}</h2>

        <div className="flex flex-col space-y-4">
          {props.currentOption === CurrentOptionEnum.MOVIE_CATEGORY &&
            <InputMovieCategory data={data} setData={setData} formStatus={props.formStatus} />
          }
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <Button 
            onClick={() => props.handleFormStatus(FormStatusEnum.INACTIVE)}
          >
            Close
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  )
}
