import type { Metadata } from "next";
import "./globals.css";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserOrOrganizationSite = repositoryName.endsWith(".github.io");
const basePath =
  process.env.GITHUB_ACTIONS === "true" && !isUserOrOrganizationSite
    ? `/${repositoryName}`
    : "";

export const metadata: Metadata = {
  title: "Внутренний складской реестр EW",
  description: "Реестр складских позиций EW: артикулы, остатки, категории и зоны хранения.",
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
