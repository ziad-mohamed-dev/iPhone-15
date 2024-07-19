import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Apple iPhone",
  description: "Apple iPhone Clone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/images/apple.svg" />
      </head>
      <body className={inter.className} style={{ overflowY: "hidden" }}>
        {children}
      </body>
    </html>
  );
}
