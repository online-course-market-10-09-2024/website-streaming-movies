import React from "react";
import { FloatingNav } from "@/components/ui/nav/floating-navbar";
import {IconMovie, IconUser} from "@tabler/icons-react";
export function FloatingNavView() {
  const navItems_1 = [
    {
      name: "Money",
      link: "/",
      icon: <IconMovie className="h-4 w-4 text-neutral-50 dark:text-white" />,
    },
    {
      name: "Login",
      link: "/login",
      icon: <IconUser className="h-4 w-4 text-neutral-50 dark:text-white" />,
    },
  ];
  return (
      <FloatingNav navItems={navItems_1} />
  );
}
