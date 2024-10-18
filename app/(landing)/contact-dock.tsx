"use client"

import {FloatingDock} from "@/components/ui/floating-dock";
import {Github, MailIcon, RssIcon} from "lucide-react";
const links = [
  {
    title: "Mail",
    icon: (
      <MailIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "mailto:kt@ktlab.io",
  },

  {
    title: "GitHub",
    icon: (
      <Github className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "https://github.com/ktkongtong",
  },
  {
    title: "RSS",
    icon: (
      <RssIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/feed",
  },
];

export function ContactDock() {
  return (
    <FloatingDock
      mobileClassName="translate-y-20" // only for demo, remove for production
      items={links}
    />
  )
}