import React from "react";

import { Dashboard } from "@/components/dashBoard/dashboard";
import { FloatingNavView } from "@/components/ui/nav/FloatingNavView";

export default function HomePage(): JSX.Element {
  return (
    <div>
      <FloatingNavView />
      <Dashboard />
    </div>
  )
}