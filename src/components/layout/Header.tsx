import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="border-b border-[#e5e7eb] py-8 px-4 sm:px-6 lg:px-8 bg-[#fafafa]">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <Link href="/" className="mb-4 sm:mb-0">
          <h1 className="text-3xl font-bold tracking-tight text-black hover:text-gray-600 transition-colors">
            &lt;JonaScript_ /&gt;
          </h1>
        </Link>
        <nav>
          <ul className="flex items-center space-x-2 text-sm uppercase tracking-widest text-black font-bold">
            <li>
              <Link href="/" className="block px-3 py-2 border-2 border-transparent hover:border-black hover:bg-gray-200 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-0.5 transition-all">
                Diario
              </Link>
            </li>
            <li>
              <Link href="/about" className="block px-3 py-2 border-2 border-transparent hover:border-black hover:bg-gray-200 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-0.5 transition-all">
                Sobre Mí
              </Link>
            </li>
            <li>
              <Link href="/search" className="block px-3 py-2 border-2 border-transparent hover:border-black hover:bg-gray-200 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-0.5 transition-all">
                Buscar
              </Link>
            </li>
            {session?.user && (
              <li>
                <Link href="/admin" className="block px-3 py-2 bg-black text-white hover:bg-white hover:text-black border-2 border-black hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-0.5 transition-all ml-4">
                  PANEL
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
