import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";
import { UserProvider } from "./context/user";
import { UIProvider } from "./context/scraper-modal";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - ${siteConfig.subdescription}`,
    template: `%s - ${siteConfig.name} - ${siteConfig.subdescription} `,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="de">
      <head />
      <body className={clsx("min-h-screen text-foreground font-sans antialiased", fontSans.variable)}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <UserProvider>
            <UIProvider>
              <div className="relative flex min-h-screen flex-col">
                <Navbar />

                <main className="container mx-auto max-w-7xl flex-1 px-6">{children}</main>

                <Footer />
              </div>
            </UIProvider>
          </UserProvider>
        </Providers>
      </body>
    </html>
  );
}
