import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProductSpecsProps {
    specs: Record<string, string>;
}

export function ProductSpecs({ specs }: ProductSpecsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>المواصفات التقنية</CardTitle>
            </CardHeader>
            <CardContent>
                <dl className="space-y-3">
                    {Object.entries(specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between border-b border-[var(--border)] pb-2 last:border-0">
                            <dt className="font-semibold text-[var(--muted-foreground)]">{key}</dt>
                            <dd className="text-[var(--foreground)]">{value}</dd>
                        </div>
                    ))}
                </dl>
            </CardContent>
        </Card>
    )
}
