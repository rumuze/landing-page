import { Braces, Ruler, Smile, FileCode, FileSpreadsheet, CalendarDays, FileText, ImageDown, Link2, MessageCircle, Megaphone, Palette, QrCode, Receipt, ScrollText, Search, Share2, SquarePen, Type } from 'lucide-react';

/** The icon shown for each tool, by tool id. */
export const TOOL_ICONS = {
  qr: QrCode,
  whatsapp: MessageCircle,
  utm: Link2,
  serp: Search,
  hijri: CalendarDays,
  schema: Braces,
  brief: FileText,
  vat: Receipt,
  adbudget: Megaphone,
  imagecompress: ImageDown,
  signature: SquarePen,
  palette: Palette,
  social: Share2,
  wordcount: Type,
  seofiles: ScrollText,
  invoice: FileSpreadsheet,
  json: FileCode,
  favicon: Smile,
  cssunits: Ruler,
};
