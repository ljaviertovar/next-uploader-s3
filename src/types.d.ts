import { FileUploadFileRejectDetails } from '@chakra-ui/react'
import { LucideIcon } from 'lucide-react'

export type NavItem = {
  label: string
  href: string
  icon: LucideIcon
}

type RejectedFileDetails = {
  file: File;
  errors: FileUploadFileRejectDetails;
};