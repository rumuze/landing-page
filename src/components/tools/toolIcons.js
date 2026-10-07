import { Braces, CalendarDays, FileText, ImageDown, Link2, MessageCircle, Megaphone, QrCode, Receipt, Search } from 'lucide-react';

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
};
