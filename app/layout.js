import "./globals.css";

export const metadata = {
  title: "Reveal V2 - Space Analysis System",
  description: "Reveal V2 Space Analysis System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}