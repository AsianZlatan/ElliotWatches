import type { Metadata } from "next";
import "./globals.css";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserOrOrganizationSite = repositoryName.endsWith(".github.io");
const basePath =
  process.env.GITHUB_ACTIONS === "true" && !isUserOrOrganizationSite
    ? `/${repositoryName}`
    : "";

export const metadata: Metadata = {
  title: {
    default: "Elliot Watches — каталог часов",
    template: "%s | Elliot Watches",
  },
  description: "Личная коллекция Elliot Watches: знаковые часы, бренды и актуальные модельные линии.",
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
