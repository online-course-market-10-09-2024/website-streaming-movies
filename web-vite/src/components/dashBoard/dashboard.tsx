import React from "react"
import { HeroParallaxView } from "@/components/ui/parallax/HeroParallaxView"
import { SparklesSearchBarView } from "@/components/ui/sparkle/sparklesSearchBarView"

export const Dashboard = () => {
  return (
    <div className="bg-black min-h-screen w-full">
      <SparklesSearchBarView />
      <HeroParallaxView />
    </div>
  )
}
