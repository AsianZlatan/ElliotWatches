import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "В наличии",
  description: "Актуальные складские позиции Elliot Watches с фильтрами по брендам и фабрикам.",
};

export default function InStockLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
