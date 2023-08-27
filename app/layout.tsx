import "./globals.css";
import { Providers } from "./provider";

export const metadata = {
  title: "Car Hub",
  description: "Discover world's best car showcase application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
