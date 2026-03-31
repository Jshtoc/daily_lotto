import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daily Lotto - 로또 번호 추첨",
  description: "매일 행운의 로또 번호를 추첨해보세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
