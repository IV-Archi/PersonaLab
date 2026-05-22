import type { Metadata } from "next";
import ThemeProvider from "@/components/ThemeProvider";
import { UserProvider } from "@/components/UserContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "persona lab — personalized learning with AI",
  description: "persona lab helps students learn at their own pace with adaptive explanations, guided practice, instant feedback, and multilingual AI support.",
  keywords: ["AI learning", "personalized education", "online tutor", "Kazakhstan education", "SDG 4"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('pl-theme');if(!t)t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',t);})();`,
          }}
        />
      </head>
      <body>
        <UserProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
