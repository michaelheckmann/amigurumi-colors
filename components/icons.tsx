import {
  BoxSelect,
  Check,
  ChevronsUpDown,
  Loader2,
  PaintBucket,
  Palette,
  type Icon as LucideIcon,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  logo: Palette,
  spinner: Loader2,
  check: Check,
  chevronsUpDown: ChevronsUpDown,
  emptyColors: BoxSelect,
  defaultColors: PaintBucket,
}
