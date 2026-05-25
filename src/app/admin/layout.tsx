import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    // Si no hay sesión, puedes redirigir a un login hecho a mano o al proveedor predeterminado.
    redirect("/api/auth/signin");
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-2xl text-black font-bold">Panel de Administración</h1>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-600">Hola, {session.user?.name || session.user?.email}</span>
          <Link href="/api/auth/signout" className="text-red-600 hover:text-red-800 underline">
            Cerrar Sesión
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
