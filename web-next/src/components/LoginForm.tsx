'use client'

import React, { FormEvent, useState } from "react"

export default function LoginForm(): JSX.Element {
  const [account, setAccount] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleSubmitLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Form submitted with account:', account, 'and password:', password)
  }

  return (
    <form 
      className="m-auto w-[450px] border p-10 flex flex-col gap-y-5"
      onSubmit={handleSubmitLogin}
    >
      <input
        className="w-full border px-2 py-2 text-black"
        type="text"
        placeholder="Username or email"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
      />
      <input
        className="w-full border px-2 py-2 text-black"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200 mt-5"
      >
        Login
      </button>
    </form>
  )
}
