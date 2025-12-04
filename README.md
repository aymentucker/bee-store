# كتالوج معدات النحل | Beekeeping Equipment Catalog

موقع كتالوج ثابت لعرض معدات ومستلزمات تربية النحل، مبني باستخدام Next.js مع دعم كامل للغة العربية والاتجاه من اليمين إلى اليسار (RTL).

A static catalog website for beekeeping equipment and supplies, built with Next.js with full Arabic language and RTL support.

## 🚀 المميزات | Features

- ✅ موقع ثابت بالكامل (بدون قاعدة بيانات) | Fully static (no database)
- ✅ دعم كامل للغة العربية والاتجاه RTL | Full Arabic language and RTL support
- ✅ خط Cairo من Google Fonts | Cairo font from Google Fonts
- ✅ نظام ألوان عسلي/كهرماني | Honey/amber color scheme
- ✅ وضع فاتح/داكن | Light/dark mode
- ✅ تصميم متجاوب (Mobile-first) | Responsive design (Mobile-first)
- ✅ رسوم متحركة باستخدام Framer Motion | Animations with Framer Motion
- ✅ مكونات shadcn/ui | shadcn/ui components
- ✅ 6 فئات رئيسية | 6 main categories
- ✅ 22 منتج تجريبي | 22 sample products
- ✅ تصفية وبحث في المنتجات | Product filtering and search
- ✅ صفحات تفاصيل المنتجات | Product detail pages
- ✅ معرض صور للمنتجات | Product image gallery
- ✅ أزرار واتساب واتصال | WhatsApp and call buttons

## 📦 التقنيات المستخدمة | Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Theme**: next-themes
- **Font**: Cairo (Google Fonts)

## 🏃‍♂️ تشغيل المشروع | Getting Started

### التثبيت | Installation

```bash
# تثبيت الحزم
npm install

# تشغيل خادم التطوير
npm run dev
```

افتح المتصفح على [http://localhost:3000](http://localhost:3000)

Open your browser to [http://localhost:3000](http://localhost:3000)

### البناء للإنتاج | Build for Production

```bash
# بناء المشروع
npm run build

# تشغيل المشروع المبني
npm start
```

## 📁 هيكل المشروع | Project Structure

```
src/
├── app/                      # صفحات Next.js | Next.js pages
│   ├── layout.tsx           # التخطيط الرئيسي | Root layout
│   ├── page.tsx             # الصفحة الرئيسية | Home page
│   ├── products/            # صفحات المنتجات | Products pages
│   ├── categories/[slug]/   # صفحات الفئات | Category pages
│   ├── about/               # صفحة عن المتجر | About page
│   └── contact/             # صفحة التواصل | Contact page
├── components/              # المكونات | Components
│   ├── layout/             # مكونات التخطيط | Layout components
│   ├── home/               # مكونات الصفحة الرئيسية | Home components
│   ├── products/           # مكونات المنتجات | Product components
│   └── ui/                 # مكونات UI الأساسية | Base UI components
├── data/                   # البيانات الثابتة | Static data
│   ├── categories.ts       # بيانات الفئات | Categories data
│   ├── products.ts         # بيانات المنتجات | Products data
│   └── image-sources.md    # مصادر الصور | Image sources
└── lib/                    # الوظائف المساعدة | Utility functions
```

## ✏️ التخصيص | Customization

### تعديل البيانات | Editing Data

#### المنتجات | Products

افتح `/src/data/products.ts` وعدل بيانات المنتجات:

Open `/src/data/products.ts` and edit product data:

```typescript
export const products: Product[] = [
  {
    id: 1,
    slug: "product-slug",
    name: "اسم المنتج",
    shortDescription: "وصف مختصر",
    description: "وصف مفصل",
    categorySlug: "category-slug",
    price: 100,
    inStock: true,
    tags: ["كلمة مفتاحية"],
    images: ["url-to-image"],
    specs: {
      "المفتاح": "القيمة"
    }
  }
]
```

#### الفئات | Categories

افتح `/src/data/categories.ts` وعدل بيانات الفئات:

Open `/src/data/categories.ts` and edit category data.

### تعديل الألوان والخطوط | Editing Colors and Fonts

#### الألوان | Colors

افتح `/src/app/globals.css` وعدل متغيرات الألوان:

Open `/src/app/globals.css` and edit color variables in the `:root` and `.dark` sections.

#### الخط | Font

افتح `/src/app/layout.tsx` لتغيير الخط:

Open `/src/app/layout.tsx` to change the font:

```typescript
import { Cairo } from "next/font/google"; // استبدل بخط آخر | Replace with another font

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
});
```

### تعديل النصوص في الصفحات | Editing Page Text

كل صفحة تحتوي على تعليقات `// TEXT CONTENT:` توضح أماكن تعديل النصوص.

Each page contains `// TEXT CONTENT:` comments indicating where to edit text.

### تعديل أرقام الواتساب والهاتف | Editing WhatsApp and Phone Numbers

ابحث عن `966XXXXXXXXX` في المشروع واستبدلها بأرقامك الفعلية:

Search for `966XXXXXXXXX` in the project and replace with your actual numbers:

- `/src/components/home/CTASection.tsx`
- `/src/app/products/[slug]/page.tsx`

### استبدال الصور | Replacing Images

الصور الحالية من Unsplash. لاستبدالها:

Current images are from Unsplash. To replace them:

1. افتح `/src/data/categories.ts` و `/src/data/products.ts`
2. استبدل روابط `imageUrl` و `images` بروابط صورك
3. يمكنك استخدام صور محلية في `/public/images/`

Or:

1. Open `/src/data/categories.ts` and `/src/data/products.ts`
2. Replace `imageUrl` and `images` URLs with your own
3. You can use local images in `/public/images/`

## 🎨 تخصيص الثيم | Theme Customization

الثيم الحالي يستخدم نظام ألوان عسلي/كهرماني. لتغييره:

The current theme uses a honey/amber color scheme. To change it:

1. افتح `/src/app/globals.css`
2. عدل القيم في `--primary`, `--secondary`, `--accent`
3. حدّث الألوان في كل من `:root` و `.dark`

## 📱 الصفحات المتوفرة | Available Pages

- `/` - الصفحة الرئيسية | Home page
- `/products` - جميع المنتجات | All products
- `/categories/[slug]` - صفحة الفئة | Category page
- `/products/[slug]` - تفاصيل المنتج | Product details
- `/about` - عن المتجر | About us
- `/contact` - تواصل معنا | Contact us

## 🔧 الإعدادات | Configuration

### Next.js Config

تحديثات مقترحة في `next.config.ts` لدعم الصور الخارجية:

Suggested updates in `next.config.ts` for external images:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
    },
  ],
}
```

## 📄 الترخيص | License

هذا المشروع مفتوح المصدر ومتاح للاستخدام الحر.

This project is open source and available for free use.

## 🙏 الشكر | Credits

- **الصور**: Unsplash | **Images**: Unsplash
- **الأيقونات**: Lucide React | **Icons**: Lucide React
- **المكونات**: shadcn/ui | **Components**: shadcn/ui

---

تم البناء بـ ❤️ باستخدام Next.js و Cairo Font

Built with ❤️ using Next.js and Cairo Font
