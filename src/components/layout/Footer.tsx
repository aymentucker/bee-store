import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t bg-[var(--card)] mt-16">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">كتالوج معدات النحل</h3>
                        <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
                            كتالوج شامل لجميع معدات وأدوات تربية النحل وإنتاج العسل. نوفر لك أفضل المنتجات بجودة عالية وأسعار منافسة.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">روابط سريعة</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
                                    الرئيسية
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
                                    المنتجات
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
                                    عن المتجر
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
                                    تواصل معنا
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">تواصل معنا</h3>
                        <ul className="space-y-3 text-sm text-[var(--muted-foreground)]">
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-[var(--primary)]" />
                                <span>+966 XX XXX XXXX</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-[var(--primary)]" />
                                <span>info@bee-equipment.com</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-[var(--primary)]" />
                                <span>الرياض، المملكة العربية السعودية</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t mt-8 pt-8 text-center text-sm text-[var(--muted-foreground)]">
                    <p>&copy; {new Date().getFullYear()} كتالوج معدات النحل. جميع الحقوق محفوظة.</p>
                </div>
            </div>
        </footer>
    )
}
