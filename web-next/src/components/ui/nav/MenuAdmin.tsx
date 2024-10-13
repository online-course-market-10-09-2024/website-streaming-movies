"use client"

import { useState } from "react"
import ButtonAdminOption from "@/components/ui/Button/ButtonAdminOption"


export default function MenuAdmin(): JSX.Element {
  const [hideMenu, setHideMenu] = useState<boolean>(false)

  const clickHideMenu = () => {
    setHideMenu(!hideMenu)
  }

  return (
    <nav className="top-0 stikcy w-fit h-screen flex">
      <div className={`flex flex-col ${hideMenu ? "hidden" : ""}`}>
        <h1 className="px-5 py-10 text-2xl font-bold text-center">Admin Menu</h1>
        <div className="flex flex-col">
          <ButtonAdminOption name="Category" />
          <ButtonAdminOption name="Director" />
          <ButtonAdminOption name="Movie" />
        </div>
      </div>

      <button className="px-2" onClick={clickHideMenu}>{ hideMenu ? ">" : "<"}</button>
    </nav>
  )
}