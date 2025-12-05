import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlobalScripts } from "@/components/GlobalScripts";
import { SettingsProvider } from "@/lib/settings-context";
import { AuthProvider } from "@/lib/auth-context";
import { DynamicFont } from "@/components/DynamicFont";
import { VisitorTracker } from "@/components/VisitorTracker";

// TEXT CONTENT: Edit the Arabic font settings here if you want to use a different font or weight
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
  display: "swap",
});

// TEXT CONTENT: Edit metadata here to change the site title and description
export const metadata: Metadata = {
  metadataBase: new URL("https://bee-web.vercel.app"),
  title: {
    default: "كتالوج معدات النحل - كل ما تحتاجه لمناحلك",
    template: "%s | كتالوج معدات النحل",
  },
  description: "كتالوج شامل لمعدات المناحل، صناديق النحل، شمع الأساس، ملابس ومعدات النحل بجودة عالية وتصميم منظم وسهل التصفح.",
  keywords: ["معدات النحل", "صناديق النحل", "شمع الأساس", "ملابس النحال", "أدوات النحل", "تربية النحل", "عسل", "مناحل"],
  authors: [{ name: "Bee Web Catalog" }],
  creator: "Bee Web Catalog",
  publisher: "Bee Web Catalog",
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://bee-web.vercel.app",
    title: "كتالوج معدات النحل - كل ما تحتاجه لمناحلك",
    description: "كتالوج شامل لمعدات المناحل، صناديق النحل، شمع الأساس، ملابس ومعدات النحل بجودة عالية.",
    siteName: "كتالوج معدات النحل",
    images: [
      {
        url: "/og-image.jpg", // Make sure to add an og-image.jpg to public folder later or use a remote URL
        width: 1200,
        height: 630,
        alt: "كتالوج معدات النحل",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "كتالوج معدات النحل",
    description: "كتالوج شامل لمعدات المناحل، صناديق النحل، شمع الأساس، ملابس ومعدات النحل بجودة عالية.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "كتالوج معدات النحل",
  "url": "https://bee-web.vercel.app",
  "logo": "https://bee-web.vercel.app/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+966-50-000-0000",
    "contactType": "customer service",
    "areaServed": "SA",
    "availableLanguage": "Arabic"
  }
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
          <AuthProvider>
            <SettingsProvider>
              <DynamicFont />
              <VisitorTracker />
              <Navbar />
              <main className="min-h-screen">{children}</main>
              <Footer />
              <GlobalScripts />
            </SettingsProvider>
          </AuthProvider>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

