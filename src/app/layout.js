import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],  // Adjust weights as needed
  variable: '--font-roboto-mono',  // Define a CSS variable for the font
});

export const metadata = {
  title: "Welcome 👋🏻",
  description: "Jeremy's portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={robotoMono.className}>{children}</body>
    </html>
  );
}
