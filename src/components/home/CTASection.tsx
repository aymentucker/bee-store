import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

// TEXT CONTENT: Edit the heading, description, and WhatsApp number below
export function CTASection() {
    const whatsappNumber = "966XXXXXXXXX" // Replace with actual number
    const whatsappMessage = "مرحباً، أود الاستفسار عن معدات النحل"

    return (
        <section className="py-16 bg-gradient-to-l from-[var(--secondary)] via-[var(--background)] to-[var(--muted)]">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        هل تحتاج لمساعدة في اختيار المعدات المناسبة؟
                    </h2>
                    <p className="text-lg text-[var(--muted-foreground)] mb-8">
                        تواصل معنا عبر الواتساب وسيساعدك فريقنا في اختيار أفضل المعدات لمنحلك
                    </p>
                    <Button
                        asChild
                        size="lg"
                        className="shadow-lg hover:shadow-xl transition-shadow bg-green-600 hover:bg-green-700 text-white"
                    >
                        <a
                            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <MessageCircle className="ml-2 h-5 w-5" />
                            <span>تواصل عبر الواتساب</span>
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    )
}
