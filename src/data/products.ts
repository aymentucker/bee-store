// DATA: Edit this file to change products, prices, descriptions, images, and specifications

export interface Product {
    id: number;
    slug: string;
    name: string;
    shortDescription: string;
    description: string;
    categorySlug: string;
    price: number;
    inStock: boolean;
    tags: string[];
    images: string[];
    specs: Record<string, string>;
    isNew?: boolean;
}

export const products: Product[] = [
    // Apiary Equipment
    {
        id: 1,
        slug: "stainless-steel-smoker",
        name: "مدخنة ستانلس ستيل كبيرة",
        shortDescription: "مدخنة احترافية من الفولاذ المقاوم للصدأ",
        description: "مدخنة عالية الجودة مصنوعة من الستانلس ستيل بتصميم متين ودائم. تستخدم لتهدئة النحل أثناء الفحص والعمل في الخلية.",
        categorySlug: "apiary-equipment",
        price: 450,
        inStock: true,
        tags: ["مدخنة", "ستانلس ستيل", "احترافي"],
        images: [
            "https://images.unsplash.com/photo-1591863109878-47ddbb79e086?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1589669068229-6f9b42c29ac7?w=800&h=600&fit=crop"
        ],
        specs: {
            "المادة": "ستانلس ستيل 304",
            "الحجم": "كبير - 28 سم",
            "الوزن": "800 جرام",
            "مع درع حماية": "نعم"
        },
        isNew: true
    },
    {
        id: 2,
        slug: "bee-brush",
        name: "فرشاة نحل ناعمة",
        shortDescription: "فرشاة بشعيرات ناعمة لإبعاد النحل بلطف",
        description: "فرشاة مصممة خصيصاً لإبعاد النحل عن الإطارات بشكل لطيف دون إيذائها. شعيرات ناعمة وطويلة.",
        categorySlug: "apiary-equipment",
        price: 85,
        inStock: true,
        tags: ["فرشاة", "أدوات"],
        images: [
            "https://images.unsplash.com/photo-1560963775-49d9c84632c4?w=800&h=600&fit=crop"
        ],
        specs: {
            "المادة": "خشب وشعيرات طبيعية",
            "الطول": "35 سم",
            "الوزن": "120 جرام"
        }
    },
    {
        id: 3,
        slug: "hive-tool",
        name: "عتلة خلية نحل متعددة الاستخدامات",
        shortDescription: "أداة أساسية لفتح وفحص الخلايا",
        description: "عتلة قوية مصنوعة من الفولاذ، تستخدم لفتح الصناديق وتحريك الإطارات وتنظيف البراويز.",
        categorySlug: "apiary-equipment",
        price: 65,
        inStock: true,
        tags: ["عتلة", "أدوات أساسية"],
        images: [
            "https://images.unsplash.com/photo-1589669068229-6f9b42c29ac7?w=800&h=600&fit=crop"
        ],
        specs: {
            "المادة": "فولاذ مقوى",
            "الطول": "25 سم",
            "اللون": "أحمر"
        }
    },
    {
        id: 4,
        slug: "queen-excluder",
        name: "حاجز ملكات معدني",
        shortDescription: "حاجز يمنع الملكة من الدخول للعاسلة",
        description: "حاجز ملكات مصنوع من شبك معدني عالي الجودة، يسمح للشغالات بالمرور ويمنع الملكة من وضع البيض في صناديق العسل.",
        categorySlug: "apiary-equipment",
        price: 120,
        inStock: true,
        tags: ["حاجز ملكات", "معدني"],
        images: [
            "https://images.unsplash.com/photo-1587049352847-41e89870e703?w=800&h=600&fit=crop"
        ],
        specs: {
            "المادة": "معدن مجلفن",
            "المقاس": "لانجستروث قياسي",
            "الأبعاد": "50 × 42 سم"
        }
    },

    // Bee Hives
    {
        id: 5,
        slug: "langstroth-10-frame-hive",
        name: "خلية لانجستروث 10 براويز خشبية",
        shortDescription: "خلية كاملة من الخشب الطبيعي",
        description: "خلية لانجستروث كاملة مصنوعة من خشب الصنوبر عالي الجودة، تحتوي على صندوقين حضنة وعاسلة واحدة مع غطاء وقاعدة.",
        categorySlug: "bee-hives",
        price: 1200,
        inStock: true,
        tags: ["لانجستروث", "خلية كاملة", "خشب"],
        images: [
            "https://images.unsplash.com/photo-1576083073960-b1e61b086be8?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1587049352847-41e89870e703?w=800&h=600&fit=crop"
        ],
        specs: {
            "المادة": "خشب صنوبر",
            "عدد البراويز": "10 براويز",
            "الأبعاد": "50 × 42 × 24 سم",
            "المحتويات": "صندوقين حضنة + عاسلة + غطاء + قاعدة"
        },
        isNew: true
    },
    {
        id: 6,
        slug: "plastic-frame-set",
        name: "طقم براويز بلاستيك 10 قطع",
        shortDescription: "براويز بلاستيكية متينة وسهلة التنظيف",
        description: "مجموعة من 10 براويز بلاستيكية عالية الجودة، قابلة لإعادة الاستخدام وسهلة التنظيف، مع شمع أساس مدمج.",
        categorySlug: "bee-hives",
        price: 350,
        inStock: true,
        tags: ["براويز", "بلاستيك"],
        images: [
            "https://images.unsplash.com/photo-1587049352857-37ccb0268b5a?w=800&h=600&fit=crop"
        ],
        specs: {
            "المادة": "بلاستيك غذائي",
            "العدد": "10 براويز",
            "النوع": "لانجستروث قياسي",
            "اللون": "أصفر"
        }
    },
    {
        id: 7,
        slug: "wooden-frames-pack",
        name: "براويز خشبية 20قطعة",
        shortDescription: "براويز خشبية تقليدية بجودة ممتازة",
        description: "عبوة 20 إطار خشبي من خشب الصنوبر المعالج، جاهزة لتركيب شمع الأساس والأسلاك.",
        categorySlug: "bee-hives",
        price: 280,
        inStock: true,
        tags: ["براويز", "خشب"],
        images: [
            "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=800&h=600&fit=crop"
        ],
        specs: {
            "المادة": "خشب صنوبر",
            "العدد": "20 برواز",
            "الحجم": "لانجستروث عميق",
            "الحالة": "جاهزة للتجميع"
        }
    },
    {
        id: 8,
        slug: "nucleus-hive-box",
        name: "صندوق نواة 5 براويز",
        shortDescription: "صندوق نواة خشبي صغير",
        description: "صندوق نواة (نُوي) لانجستروث يستوعب 5 براويز، مثالي لتربية الملكات أو تقسيم الطوائف.",
        categorySlug: "bee-hives",
        price: 380,
        inStock: true,
        tags: ["نواة", "صندوق صغير"],
        images: [
            "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&h=600&fit=crop"
        ],
        specs: {
            "المادة": "خشب صنوبر",
            "السعة": "5 براويز",
            "الأبعاد": "46 × 23 × 24 سم",
            "مع غطاء": "نعم"
        }
    },

    // Foundation Wax
    {
        id: 9,
        slug: "natural-foundation-wax-sheets",
        name: "شمع أساس طبيعي 50 ورقة",
        shortDescription: "شمع أساس نقي 100% عيون سداسية",
        description: "أوراق شمع أساس طبيعي نقي بنسبة 100%، مطبوع بعيون سداسية محددة لتسهيل بناء الأقراص الشمعية.",
        categorySlug: "foundation-wax",
        price: 280,
        inStock: true,
        tags: ["شمع أساس", "طبيعي"],
        images: [
            "https://images.unsplash.com/photo-1587049352857-37ccb0268b5a?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1587049352847-41e89870e703?w=800&h=600&fit=crop"
        ],
        specs: {
            "النقاوة": "100% شمع نحل طبيعي",
            "الكمية": "50 ورقة",
            "المقاس": "41 × 20 سم",
            "السُمك": "قياسي"
        },
        isNew: true
    },
    {
        id: 10,
        slug: "wax-wire-spool",
        name: "بكرة سلك شمع 500 جرام",
        shortDescription: "سلك معدني لتثبيت شمع الأساس",
        description: "سلك رفيع من الفولاذ المقاوم للصدأ، يستخدم لتثبيت أوراق شمع الأساس داخل البراويز الخشبية.",
        categorySlug: "foundation-wax",
        price: 95,
        inStock: true,
        tags: ["سلك", "أدوات"],
        images: [
            "https://images.unsplash.com/photo-1587049352846-4a222e784169?w=800&h=600&fit=crop"
        ],
        specs: {
            "المادة": "فولاذ مقاوم للصدأ",
            "الوزن": "500 جرام",
            "القطر": "0.5 مم"
        }
    },
    {
        id: 11,
        slug: "electric-wax-embedder",
        name: "آلة غرس شمع كهربائية",
        shortDescription: "جهاز لتثبيت السلك في شمع الأساس بالكهرباء",
        description: "جهاز كهربائي يعمل على تسخين السلك لغرسه في شمع الأساس بسهولة وسرعة.",
        categorySlug: "foundation-wax",
        price: 420,
        inStock: false,
        tags: ["أدوات كهربائية", "غرس"],
        images: [
            "https://images.unsplash.com/photo-1589669068229-6f9b42c29ac7?w=800&h=600&fit=crop"
        ],
        specs: {
            "الجهد": "220 فولت",
            "القدرة": "50 واط",
            "الوزن": "1.2 كجم"
        }
    },

    // Beekeeper Clothing
    {
        id: 12,
        slug: "full-beekeeping-suit",
        name: "بدلة نحال كاملة مع قناع",
        shortDescription: "بدلة واقية كاملة بقناع مدمج",
        description: "بدلة حماية كاملة من قماش قطني سميك، مع قناع شبكي ثلاثي الطبقات وسحابات محكمة الإغلاق.",
        categorySlug: "beekeeper-clothing",
        price: 550,
        inStock: true,
        tags: ["بدلة كاملة", "حماية"],
        images: [
            "https://images.unsplash.com/photo-1560963775-49d9c84632c4?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&h=600&fit=crop"
        ],
        specs: {
            "المادة": "قطن سميك",
            "اللون": "أبيض",
            "المقاسات المتوفرة": "M, L, XL, XXL",
            "القناع": "شبك ثلاثي الطبقات"
        },
        isNew: true
    },
    {
        id: 13,
        slug: "ventilated-jacket",
        name: "جاكيت نحال مهوى",
        shortDescription: "جاكيت بقناع مع تهوية ممتازة",
        description: "جاكيت خفيف الوزن مع نظام تهوية متطور، مثالي للعمل في الأجواء الحارة. قناع شبكي بزاوية رؤية واسعة.",
        categorySlug: "beekeeper-clothing",
        price: 380,
        inStock: true,
        tags: ["جاكيت", "مهوى"],
        images: [
            "https://images.unsplash.com/photo-1591863109878-47ddbb79e086?w=800&h=600&fit=crop"
        ],
        specs: {
            "المادة": "بوليستر مهوى",
            "اللون": "أبيض",
            "المقاسات": "M, L, XL",
            "التهوية": "شبك على الجوانب والظهر"
        }
    },
    {
        id: 14,
        slug: "leather-gloves",
        name: "قفازات جلد طبيعي مبطنة",
        shortDescription: "قفازات جلدية سميكة للحماية الكاملة",
        description: "قفازات من الجلد الطبيعي مع بطانة قطنية، تحمي اليدين بشكل كامل من لسعات النحل.",
        categorySlug: "beekeeper-clothing",
        price: 180,
        inStock: true,
        tags: ["قفازات", "جلد"],
        images: [
            "https://images.unsplash.com/photo-1587049352846-4a222e784169?w=800&h=600&fit=crop"
        ],
        specs: {
            "المادة": "جلد طبيعي + بطانة قطن",
            "الطول": "حتى الكوع",
            "المقاسات": "M, L, XL"
        }
    },

    // Packaging
    {
        id: 15,
        slug: "glass-honey-jars-250g",
        name: "برطمانات زجاج 250 جرام - 24 قطعة",
        shortDescription: "برطمانات زجاجية شفافة بأغطية ذهبية",
        description: "مجموعة من 24 برطمان زجاجي عالي الجودة، سعة 250 جرام، مع أغطية معدنية ذهبية محكمة الإغلاق.",
        categorySlug: "packaging",
        price: 260,
        inStock: true,
        tags: ["برطمانات", "زجاج"],
        images: [
            "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1587049352857-37ccb0268b5a?w=800&h=600&fit=crop"
        ],
        specs: {
            "المادة": "زجاج شفاف",
            "السعة": "250 جرام",
            "العدد": "24 برطمان",
            "الغطاء": "معدني ذهبي محكم"
        }
    },
    {
        id: 16,
        slug: "plastic-honey-bucket-5kg",
        name: "سطل عسل بلاستيك 5 كجم",
        shortDescription: "سطل بلاستيكي غذائي بغطاء محكم",
        description: "سطل من البلاستيك الغذائي الآمن، سعة 5 كيلوجرام، مع غطاء محكم الإغلاق، مثالي لتخزين العسل.",
        categorySlug: "packaging",
        price: 45,
        inStock: true,
        tags: ["سطل", "بلاستيك"],
        images: [
            "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&h=600&fit=crop"
        ],
        specs: {
            "المادة": "بلاستيك غذائي PP",
            "السعة": "5 كيلوجرام",
            "اللون": "أبيض شفاف",
            "مع مقبض": "نعم"
        }
    },
    {
        id: 17,
        slug: "honey-labels-stickers",
        name: "ملصقات عسل لاصقة 100 قطعة",
        shortDescription: "ملصقات جاهزة للطباعة بتصميم جذاب",
        description: "مجموعة من 100 ملصق لاصق بتصميم احترافي، جاهزة للكتابة عليها أو طباعة معلومات المنتج.",
        categorySlug: "packaging",
        price: 85,
        inStock: true,
        tags: ["ملصقات", "تعبئة"],
        images: [
            "https://images.unsplash.com/photo-1587049352847-41e89870e703?w=800&h=600&fit=crop"
        ],
        specs: {
            "المادة": "ورق لاصق لامع",
            "العدد": "100 ملصق",
            "الشكل": "دائري ومستطيل",
            "المقاس": "متنوع"
        }
    },
    {
        id: 18,
        slug: "honey-strainer-double",
        name: "مصفاة عسل مزدوجة ستانلس ستيل",
        shortDescription: "مصفاة بطبقتين لتصفية العسل من الشوائب",
        description: "مصفاة عسل احترافية من الستانلس ستيل بشبكتين مختلفتين للحصول على عسل نقي وصافي.",
        categorySlug: "packaging",
        price: 320,
        inStock: true,
        tags: ["مصفاة", "ستانلس ستيل"],
        images: [
            "https://images.unsplash.com/photo-1589669068229-6f9b42c29ac7?w=800&h=600&fit=crop"
        ],
        specs: {
            "المادة": "ستانلس ستيل 304",
            "الطبقات": "طبقتين تصفية",
            "القطر": "30 سم",
            "الارتفاع": "25 سم"
        }
    },

    // Queen Rearing
    {
        id: 19,
        slug: "queen-rearing-kit",
        name: "طقم تربية الملكات الشامل",
        shortDescription: "طقم كامل لإنتاج وتربية ملكات النحل",
        description: "طقم شامل يحتوي على جميع الأدوات اللازمة لتربية الملكات: كؤوس، إطار تطعيم، أقفاص ملكات، وأدوات نقل اليرقات.",
        categorySlug: "queen-rearing",
        price: 680,
        inStock: true,
        tags: ["تربية ملكات", "طقم شامل"],
        images: [
            "https://images.unsplash.com/photo-1568526381923-caf3fd520382?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1576083073960-b1e61b086be8?w=800&h=600&fit=crop"
        ],
        specs: {
            "المحتويات": "100 كأس + إطار + 10 أقفاص + أدوات نقل",
            "المادة": "بلاستيك غذائي + خشب",
            "مناسب لـ": "المبتدئين والمحترفين"
        },
        isNew: true
    },
    {
        id: 20,
        slug: "queen-cages-pack",
        name: "أقفاص ملكات بلاستيك 20 قطعة",
        shortDescription: "أقفاص شحن وحفظ الملكات",
        description: "مجموعة من 20 قفص بلاستيكي لحفظ وشحن ملكات النحل، مع مكان للحاضنة ومحبس تغذية.",
        categorySlug: "queen-rearing",
        price: 95,
        inStock: true,
        tags: ["أقفاص ملكات"],
        images: [
            "https://images.unsplash.com/photo-1587049352846-4a222e784169?w=800&h=600&fit=crop"
        ],
        specs: {
            "المادة": "بلاستيك شفاف",
            "العدد": "20 قفص",
            "النوع": "قفص شحن قياسي",
            "مع حاضنة": "نعم"
        }
    },
    {
        id: 21,
        slug: "grafting-tool",
        name: "أداة تطعيم يرقات احترافية",
        shortDescription: "أداة دقيقة لنقل اليرقات من العيون السداسية",
        description: "أداة تطعيم من البلاستيك الطبي بطرف مرن وناعم، تسهل نقل اليرقات الصغيرة بدقة ودون إيذائها.",
        categorySlug: "queen-rearing",
        price: 75,
        inStock: false,
        tags: ["تطعيم", "أدوات"],
        images: [
            "https://images.unsplash.com/photo-1591863109878-47ddbb79e086?w=800&h=600&fit=crop"
        ],
        specs: {
            "المادة": "بلاستيك طبي",
            "الطول": "15 سم",
            "الطرف": "مرن قابل للثني",
            "اللون": "أبيض"
        }
    },
    {
        id: 22,
        slug: "queen-cups-100pack",
        name: "كؤوس ملكات بلاستيك 100 قطعة",
        shortDescription: "كؤوس جاهزة لتطعيم اليرقات",
        description: "مجموعة 100 كأس ملكة بلاستيكية بحجم قياسي، جاهزة للتثبيت في إطار التطعيم واستقبال اليرقات.",
        categorySlug: "queen-rearing",
        price: 120,
        inStock: true,
        tags: ["كؤوس ملكات"],
        images: [
            "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=800&h=600&fit=crop"
        ],
        specs: {
            "المادة": "بلاستيك غذائي",
            "العدد": "100 كأس",
            "القطر": "9 مم",
            "اللون": "بيج طبيعي"
        }
    },

    // Honey
    {
        id: 23,
        slug: "sidr-honey-1kg",
        name: "عسل سدر جبلي 1 كيلو",
        shortDescription: "عسل سدر طبيعي من الجبال بجودة فاخرة",
        description: "عسل سدر جبلي فاخر، يتم جمعه من أشجار السدر البرية في الجبال. غني بالفوائد الصحية ومميز بمذاقه الفريد وقوامه الكثيف.",
        categorySlug: "honey",
        price: 320,
        inStock: true,
        tags: ["عسل سدر", "جبلي", "فاخر"],
        images: [
            "https://images.unsplash.com/photo-1587049352846-4a222e784169?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1587049352857-37ccb0268b5a?w=800&h=600&fit=crop"
        ],
        specs: {
            "النوع": "عسل سدر جبلي طبيعي",
            "الوزن": "1 كيلوجرام",
            "المصدر": "جبال المملكة",
            "النقاوة": "100%"
        },
        isNew: true
    },
    {
        id: 24,
        slug: "acacia-honey-500g",
        name: "عسل الطلح 500 جرام",
        shortDescription: "عسل طلح بري خفيف وصافي",
        description: "عسل الطلح البري ذو اللون الفاتح والطعم الخفيف. مثالي لمن يفضل العسل الخفيف، ويحتوي على فوائد صحية متعددة.",
        categorySlug: "honey",
        price: 85,
        inStock: true,
        tags: ["عسل طلح", "خفيف"],
        images: [
            "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=800&h=600&fit=crop"
        ],
        specs: {
            "النوع": "عسل طلح بري",
            "الوزن": "500 جرام",
            "اللون": "فاتح ذهبي",
            "النقاوة": "100%"
        }
    },
    {
        id: 25,
        slug: "wildflower-honey-750g",
        name: "عسل زهور برية 750 جرام",
        shortDescription: "عسل من رحيق الزهور البرية المتنوعة",
        description: "عسل طبيعي من رحيق مجموعة متنوعة من الزهور البرية. غني بالفيتامينات والمعادن ومذاقه متوازن ولذيذ.",
        categorySlug: "honey",
        price: 95,
        inStock: true,
        tags: ["عسل زهور", "طبيعي"],
        images: [
            "https://images.unsplash.com/photo-1587049352846-4a222e784169?w=800&h=600&fit=crop"
        ],
        specs: {
            "النوع": "عسل زهور برية",
            "الوزن": "750 جرام",
            "المصدر": "مناحل محلية",
            "النقاوة": "100%"
        }
    },
    {
        id: 26,
        slug: "orange-blossom-honey-500g",
        name: "عسل زهر البرتقال 500 جرام",
        shortDescription: "عسل برتقال بنكهة زهرية مميزة",
        description: "عسل زهر البرتقال الطبيعي بنكهته الزهرية المميزة ورائحته العطرية الجميلة. خفيف ولذيذ ومحبوب من الجميع.",
        categorySlug: "honey",
        price: 75,
        inStock: true,
        tags: ["عسل برتقال", "زهري"],
        images: [
            "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=800&h=600&fit=crop"
        ],
        specs: {
            "النوع": "عسل زهر البرتقال",
            "الوزن": "500 جرام",
            "اللون": "كهرماني فاتح",
            "النقاوة": "100%"
        }
    },

    // Honey Products
    {
        id: 27,
        slug: "bee-pollen-250g",
        name: "حبوب اللقاح 250 جرام",
        shortDescription: "حبوب لقاح النحل الطبيعية الغنية بالبروتين",
        description: "حبوب لقاح طبيعية يجمعها النحل من الزهور، غنية بالبروتينات والفيتامينات والمعادن. تعزز المناعة وتزيد الطاقة.",
        categorySlug: "honey-products",
        price: 120,
        inStock: true,
        tags: ["حبوب لقاح", "بروتين", "مناعة"],
        images: [
            "https://images.unsplash.com/photo-1587049352857-37ccb0268b5a?w=800&h=600&fit=crop"
        ],
        specs: {
            "المنتج": "حبوب لقاح نحل طبيعية",
            "الوزن": "250 جرام",
            "الاستخدام": "ملعقة صباحاً",
            "الحفظ": "مكان جاف وبارد"
        },
        isNew: true
    },
    {
        id: 28,
        slug: "propolis-extract-30ml",
        name: "صمغ النحل (البروبوليس) 30 مل",
        shortDescription: "مستخلص طبيعي من صمغ النحل بخصائص علاجية",
        description: "صمغ النحل أو البروبوليس، مضاد طبيعي للبكتيريا والفطريات. يستخدم لتقوية المناعة والقضاء على الالتهابات.",
        categorySlug: "honey-products",
        price: 150,
        inStock: true,
        tags: ["بروبوليس", "علاجي", "مناعة"],
        images: [
            "https://images.unsplash.com/photo-1589669068229-6f9b42c29ac7?w=800&h=600&fit=crop"
        ],
        specs: {
            "المنتج": "مستخلص بروبوليس",
            "الحجم": "30 مل",
            "التركيز": "عالي",
            "الاستخدام": "قطرات في الماء أو العسل"
        }
    },
    {
        id: 29,
        slug: "royal-jelly-100g",
        name: "غذاء ملكات النحل 100 جرام",
        shortDescription: "غذاء ملكات النحل الطازج الغني بالفوائد",
        description: "غذاء ملكات النحل الطازج، منتج فاخر غني بالبروتينات والأحماض الأمينية. يعزز الطاقة والحيوية ويحسن الصحة العامة.",
        categorySlug: "honey-products",
        price: 280,
        inStock: false,
        tags: ["غذاء ملكات", "فاخر", "طاقة"],
        images: [
            "https://images.unsplash.com/photo-1587049352846-4a222e784169?w=800&h=600&fit=crop"
        ],
        specs: {
            "المنتج": "غذاء ملكات طازج",
            "الوزن": "100 جرام",
            "الحفظ": "في الثلاجة",
            "مدة الصلاحية": "6 أشهر"
        },
        isNew: true
    },
    {
        id: 30,
        slug: "beeswax-candles-set",
        name: "شموع شمع النحل الطبيعية - طقم 4 قطع",
        shortDescription: "شموع معطرة طبيعية 100% من شمع النحل",
        description: "طقم من 4 شموع مصنوعة من شمع النحل الطبيعي النقي. تنشر رائحة العسل الطبيعية وتنقي الهواء بشكل طبيعي.",
        categorySlug: "honey-products",
        price: 65,
        inStock: true,
        tags: ["شموع", "شمع نحل", "طبيعي"],
        images: [
            "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=800&h=600&fit=crop"
        ],
        specs: {
            "المادة": "شمع نحل 100%",
            "العدد": "4 شموع",
            "الحجم": "صغير ومتوسط",
            "مدة الاحتراق": "8 ساعات للشمعة"
        }
    }
];

export function getProductBySlug(slug: string): Product | undefined {
    return products.find(product => product.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
    return products.filter(product => product.categorySlug === categorySlug);
}

export function getFeaturedProducts(limit: number = 8): Product[] {
    return products.slice(0, limit);
}
