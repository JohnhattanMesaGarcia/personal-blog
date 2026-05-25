export default function Footer() {
  return (
    <footer className="mt-auto py-12 text-center text-gray-400 text-sm border-t border-[#e5e7eb]">
      <p>&copy; {new Date().getFullYear()} &lt;JonaScript_ /&gt;. Todos los derechos reservados.</p>
      <p className="mt-2">Historias mínimas y reflexiones en escala de grises.</p>
    </footer>
  );
}
