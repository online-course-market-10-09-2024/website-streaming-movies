import { FormStatusEnum } from "@/libs/enum"
import { Button } from "../ui/button"
import { FormEvent } from "react"

import { ReplaceHyphenWithSpace, ToTitle } from "@/libs/string"

type Props = {
  currentOption: string
  formStatus: FormStatusEnum
  handleFormStatus: (status: FormStatusEnum) => void
}

export default function FormAdmin(props: Props) {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full"
      >
        <h2 className="text-xl font-bold mb-4">{ToTitle(props.formStatus)} {ToTitle(ReplaceHyphenWithSpace(props.currentOption))}</h2>

        <div className="flex flex-col space-y-4">
          {/* Add your form inputs here */}
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
