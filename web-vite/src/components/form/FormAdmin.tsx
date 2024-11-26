import { CurrentOptionEnum, FormStatusEnum } from "@/libs/enum"
import { Button } from "../ui/button"
import { FormEvent, useEffect, useState } from "react"

import { ReplaceHyphenWithSpace, ToTitle } from "@/libs/string"
import { Input } from "../ui/input"
import { Calendar } from "@/components/ui/calendar"
import { InputFormData, Movie } from "@/libs/types"
import { MovieCategory } from "@/libs/movie_category"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

type ChildProps = {
  data: any
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

function InputMovie(props: ChildProps) {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof Movie
  ) => {
    props.setData((prevData) => ({
      ...prevData,
      [field]: event.target.value,
    }));
  };

  const handleDateChange = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      props.setData((prevData) => {
        // Ensure prevData is of type Movie and copy all fields
        if (prevData && "id" in prevData && "thumbnailImage" in prevData) {
          return {
            ...prevData,
            initialDate: selectedDate.toISOString().split("T")[0], // Update initialDate
          };
        }
        // Return prevData if it doesn't match the expected shape
        return prevData;
      });
    }
  };

  return (
    <div>
      {props.formStatus === FormStatusEnum.INSERT && (
        <>
          <div>
            <label>Name:</label>
            <Input
              type="text"
              value={props.data?.name || ""}
              onChange={(e) => handleChange(e, "name")}
            />
          </div>

          <div>
            <label>Thumbnail image:</label>
            <Input
              type="text"
              value={props.data?.thumbnailImage || ""}
              onChange={(e) => handleChange(e, "thumbnailImage")}
            />
          </div>

          <div>
            <label>Initial date:</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !props.data?.initialDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {props.data?.initialDate ? format(props.data?.initialDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={props.data?.initialDate ? new Date(props.data.initialDate) : undefined}
                  onSelect={handleDateChange}
                  className="rounded-md border"
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label>Trailer Video Url:</label>
            <Input
              type="text"
              value={props.data?.trailerVideoUrl || ""}
              onChange={(e) => handleChange(e, "trailerVideoUrl")}
            />
          </div>
          
          <div>
            <label>Description:</label>
            <Input
              type="text"
              value={props.data?.description || ""}
              onChange={(e) => handleChange(e, "description")}
            />
          </div>
        </>
      )}

      {props.formStatus === FormStatusEnum.UPDATE && (
        <>
          <div>
            <label>Id:</label>
            <Input
              readOnly={true}
              type="text"
              value={props.data?.id || ""}
              onChange={(e) => handleChange(e, "id")}
            />
          </div>

          <div>
            <label>Name:</label>
            <Input
              type="text"
              value={props.data?.name || ""}
              onChange={(e) => handleChange(e, "name")}
            />
          </div>

          <div>
            <label>Thumbnail image:</label>
            <Input
              type="text"
              value={props.data?.thumbnailImage || ""}
              onChange={(e) => handleChange(e, "thumbnailImage")}
            />
          </div>

          <div>
            <label>Initial date:</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !props.data?.initialDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {props.data?.initialDate ? format(props.data?.initialDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={props.data?.initialDate ? new Date(props.data.initialDate) : undefined}
                  onSelect={handleDateChange}
                  className="rounded-md border"
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label>Trailer Video Url:</label>
            <Input
              type="text"
              value={props.data?.trailerVideoUrl || ""}
              onChange={(e) => handleChange(e, "trailerVideoUrl")}
            />
          </div>
          
          <div>
            <label>Description:</label>
            <Input
              type="text"
              value={props.data?.description || ""}
              onChange={(e) => handleChange(e, "description")}
            />
          </div>
        </>
      )}

      {props.formStatus === FormStatusEnum.REMOVE && (
        <>
          <div>
            <label>Id:</label>
            <Input
              readOnly={true}
              type="text"
              value={props.data?.id || ""}
              onChange={(e) => handleChange(e, "id")}
            />
          </div>

          <div>
            <label>Name:</label>
            <Input
              readOnly={true}
              type="text"
              value={props.data?.name || ""}
              onChange={(e) => handleChange(e, "name")}
            />
          </div>

          <div>
            <label>Thumbnail image:</label>
            <Input
              readOnly={true}
              type="text"
              value={props.data?.thumbnailImage || ""}
              onChange={(e) => handleChange(e, "thumbnailImage")}
            />
          </div>

          <div>
            <label>Initial date:</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !props.data?.initialDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {props.data?.initialDate ? format(props.data?.initialDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={props.data?.initialDate ? new Date(props.data.initialDate) : undefined}
                  onSelect={handleDateChange}
                  className="rounded-md border"
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label>Trailer Video Url:</label>
            <Input
              readOnly={true}
              type="text"
              value={props.data?.trailerVideoUrl || ""}
              onChange={(e) => handleChange(e, "trailerVideoUrl")}
            />
          </div>
          
          <div>
            <label>Description:</label>
            <Input
              readOnly={true}
              type="text"
              value={props.data?.description || ""}
              onChange={(e) => handleChange(e, "description")}
            />
          </div>
        </>
      )}
    </div>
  );
}

type Props = {
  dataInput: any
  currentOption: string
  formStatus: FormStatusEnum
  handleFormStatus: (status: FormStatusEnum) => void
}

export default function FormAdmin(props: Props) {
  const [data, setData] = useState<any>(props.dataInput);
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!data) {
      console.error("Form data is undefined. Cannot submit.");
      return;
    }

    if (props.formStatus === FormStatusEnum.INSERT) {
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
    } else if (props.formStatus === FormStatusEnum.UPDATE) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/${props.currentOption}`, {
          method: "PATCH",
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
    } else if (props.formStatus === FormStatusEnum.REMOVE) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/${props.currentOption}/${data.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
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
  }

  useEffect(() => {
    if (props.currentOption === CurrentOptionEnum.MOVIE_CATEGORY) {
      setData(props.dataInput as MovieCategory);
    } else if (props.currentOption === CurrentOptionEnum.MOVIE) {
      setData(props.dataInput as Movie);
    }
  }, [props.currentOption]);  

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

          {props.currentOption === CurrentOptionEnum.MOVIE &&
            <InputMovie data={data} setData={setData} formStatus={props.formStatus} />
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
