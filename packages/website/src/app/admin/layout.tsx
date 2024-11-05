import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/app/admin/sidebar";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";

export default async function AdminLayout({
                                            children,
                                          }: {
  children: React.ReactNode
}) {
  const user = await currentUser()
  if (!user || !user.publicMetadata.siteOwner) {
    redirect('/')
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-full">
        {children}
      </main>
    </SidebarProvider>
  )
}