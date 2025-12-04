import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// TEXT CONTENT: Edit the Arabic font settings here if you want to use a different font or weight
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
  display: "swap",
});

// TEXT CONTENT: Edit metadata here to change the site title and description
export const metadata: Metadata = {
  title: "كتالوج معدات النحل - كل ما تحتاجه لمناحلك",
  description: "كتالوج شامل لمعدات المناحل، صناديق النحل، شمع الأساس، ملابس ومعدات النحل بجودة عالية وتصميم منظم وسهل التصفح.",
  keywords: "معدات النحل، صناديق النحل، شمع الأساس، ملابس النحال، أدوات النحل، تربية النحل",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.variable} font-cairo antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

