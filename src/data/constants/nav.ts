import { File, UploadIcon } from "lucide-react";

import { NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Files",
    href: "/files",
    icon: File
  },
  {
    label: "Uploader",
    href: "/uploader",
    icon: UploadIcon
  },
]
