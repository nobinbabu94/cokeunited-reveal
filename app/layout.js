import { AuthProvider } from "./components/AuthProvider";
import AuthWrapper from "./components/AuthWrapper";

import "./globals.css";
import "./styles/analytic.css";

export const metadata = {
  title: "Reveal",
  description: "Reveal Space Analysis System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AuthWrapper>
            {children}
          </AuthWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}