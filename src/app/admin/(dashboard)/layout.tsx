import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute>
            <div className="flex min-h-screen w-full bg-muted/40">
                <AdminSidebar />
                <div className="flex flex-col flex-1">
                    <header className="flex h-14 items-center gap-4 border-b bg-background px-6 lg:h-[60px]">
                        <div className="w-full flex-1">
                            <h1 className="text-lg font-semibold">لوحة التحكم</h1>
                        </div>
                    </header>
                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}
