import React from "react"
import InputWithVanish from "@/components/ui/Input/InputWithVanish"

export interface PlaceholdersAndVanishInputViewProp {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onInputChange: (value: string) => void
  title?: string
}

export function PlaceholdersAndVanishInputView({ onInputChange, onSubmit, title }: PlaceholdersAndVanishInputViewProp) {
  const placeholders = [
    "What's your favorite movie?",
    "Who is your favorite movie character?",
    "What's the best movie you've seen this year?",
    "Name a movie that made you cry.",
    "What's the most overrated movie in your opinion?"
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value)
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(e)
  }

  return (
    <div className="h-[20rem] flex flex-col justify-end items-center px-4">
      <h2 className="mb-5 sm:mb-10 text-2xl font-bold text-center sm:text-5xl text-white">
        {title || "Let Find You Next Favorite Movie"}
      </h2>
      <InputWithVanish
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  )
}