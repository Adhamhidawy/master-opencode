export interface CheatSheetCategory {
  id: string;
  title: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  rows: { key: string; description: string }[];
}

export type CheatSheetData = CheatSheetCategory[];
