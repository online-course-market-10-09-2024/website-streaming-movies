import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import CategoryIcon from "./icons/CategoryIcon";
import UserIcon from "./icons/UserIcon";

type Props = {
  currentOption: string
  setCurrentOption: (input: string) => void
}

export function SidebarAdmin(props: Props) {
  const links = [
    {
      label: "Movie Category",
      id: "Movie Category",
      icon: (
        <CategoryIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Movie Director",
      id: "Movie Director",
      icon: (
        <UserIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      id: "settings",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      id: "logout",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);

  const handleNavigation = (pageId: string) => {
    props.setCurrentOption(pageId);
  };

  return (
    <div className="h-screen bg-gray-100 dark:bg-neutral-800">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="h-full">
          <div className="flex flex-col h-full justify-between">
            <div className="space-y-4">
              {open ? <Logo /> : <LogoIcon />}
              <nav className="flex flex-col gap-2">
                {links.map((link, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleNavigation(link.id)}
                    className="cursor-pointer"
                  >
                    <SidebarLink link={{ ...link, href: "#" }} />
                  </div>
                ))}
              </nav>
            </div>
            <div className="mt-auto">
              <SidebarLink
                link={{
                  label: "Manu Arora",
                  href: "#",
                  icon: (
                    <img
                      src="/api/placeholder/50/50"
                      className="h-7 w-7 flex-shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
              />
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}

// Logo components remain the same as in your code
export const Logo = () => {
  return (
    <p className="font-normal flex space-x-2 items-center text-sm text-black dark:text-white py-1 relative z-20 cursor-pointer">
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre"
      >
        Admin Dashboard
      </motion.span>
    </p>
  );
};

export const LogoIcon = () => {
  return (
    <p className="font-normal flex space-x-2 items-center text-sm text-black dark:text-white py-1 relative z-20 cursor-pointer">
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </p>
  );
};