// DATA: Edit this file to change categories, their names, descriptions, and images

export interface Category {
    id: number;
    slug: string;
    name: string;
    description: string;
    imageUrl: string;
}

export const categories: Category[] = [
    {
        id: 1,
        slug: "apiary-equipment",
        name: "معدات المناحل",
        description: "جميع المعدات الأساسية لإدارة وصيانة المناحل بكفاءة عالية",
        imageUrl: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&h=600&fit=crop"
    },
    {
        id: 2,
        slug: "bee-hives",
        name: "صناديق النحل",
        description: "صناديق خشبية وبلاستيكية عالية الجودة بمقاسات متنوعة",
        imageUrl: "https://images.unsplash.com/photo-1576083073960-b1e61b086be8?w=800&h=600&fit=crop"
    },
    {
        id: 3,
        slug: "foundation-wax",
        name: "شمع الأساس",
        description: "شمع أساس طبيعي بجودة عالية لبناء الأقراص الشمعية",
        imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784169?w=800&h=600&fit=crop"
    },
    {
        id: 4,
        slug: "beekeeper-clothing",
        name: "ملابس النحال",
        description: "ملابس واقية مريحة للحماية الكاملة أثناء العمل مع النحل",
        imageUrl: "https://images.unsplash.com/photo-1560963775-49d9c84632c4?w=800&h=600&fit=crop"
    },
    {
        id: 5,
        slug: "packaging",
        name: "أدوات التعبئة والتغليف",
        description: "عبوات وبرطمانات وأدوات تعبئة العسل ومنتجات النحل",
        imageUrl: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=800&h=600&fit=crop"
    },
    {
        id: 6,
        slug: "queen-rearing",
        name: "مستلزمات تربية الملكات",
        description: "أدوات ومعدات متخصصة لتربية وإنتاج ملكات النحل",
        imageUrl: "https://images.unsplash.com/photo-1568526381923-caf3fd520382?w=800&h=600&fit=crop"
    },
    {
        id: 7,
        slug: "honey",
        name: "العسل",
        description: "أنواع متنوعة من العسل الطبيعي عالي الجودة",
        imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784169?w=800&h=600&fit=crop"
    },
    {
        id: 8,
        slug: "honey-products",
        name: "منتجات العسل",
        description: "منتجات مشتقة من العسل والنحل مثل حبوب اللقاح والعكبر",
        imageUrl: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=800&h=600&fit=crop"
    }
];

export function getCategoryBySlug(slug: string): Category | undefined {
    return categories.find(category => category.slug === slug);
}
