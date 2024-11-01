import AdminDashboard from "@/components/dashBoard/DashboardAdmin";
import { SidebarAdmin } from "@/components/SidebarAdmin";
import React, { useState } from "react";

export default function AdminPage(): JSX.Element {
  const [currentOption, setCurrentOption] = useState("dashboard");

  return (
    <div className="flex">
      <SidebarAdmin currentOption={currentOption} setCurrentOption={setCurrentOption} />
      <AdminDashboard currentOption={currentOption} />
    </div>
  )
}