import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Mí | <JonaScript_ />",
  description: "Conoce a la persona detrás de las historias.",
};

export default function AboutPage() {
  return (
    <article className="prose prose-lg max-w-none">
      <header className="mb-12 border-b border-gray-200 pb-8 mt-4 text-center">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-black mb-6 leading-tight">
          Sobre Mí
        </h1>
      </header>
      
      <div className="font-lora text-lg leading-relaxed space-y-6 lg:px-12 text-gray-800">
        <p>
          Bienvenido a <strong>&lt;JonaScript_ /&gt;</strong>. Este espacio es mi diario digital, un experimento de introspección donde publico reflexiones, aprendizajes y experiencias mínimas rodeadas de código.
        </p>
        <p>
          Vivimos en un mundo saturado de información y de colores estridentes. Por eso, decidí que esta página utilizara una paleta en escala de grises, para que el foco estuviese únicamente en las palabras.
        </p>
        <p>
          <em>"Lo que no se escribe, el viento se lo lleva"</em> - O al menos, así me siento cuando las ideas flotan en mi cabeza sin un ancla de tinta (o de píxeles).
        </p>

      </div>
    </article>
  );
}
