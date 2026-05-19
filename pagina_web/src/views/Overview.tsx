export const ProblemStatement = () => {
  return (
    <section className="relative bg-slate-950 px-6 py-24 text-gray-300 overflow-hidden">
      
      {/* Glow de fondo sutil para dar continuidad al diseño */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <article className="relative mx-auto max-w-3xl z-10">
        
        {/* Encabezado de la sección (Modificado con gradientes) */}
        <div className="mb-12 flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-purple-500/50"></div>
          <span className="text-sm font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            01. Problemática & Contexto
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-pink-500/50"></div>
        </div>

        {/* 1. El Problema */}
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl mb-6 text-center">
          La Ciberviolencia en la <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Era Digital</span>
        </h2>
        <p className="mb-12 text-lg leading-relaxed text-gray-400 text-center max-w-2xl mx-auto">
          Las redes sociales han democratizado la comunicación, pero también se han 
          convertido en un ecosistema donde la hostilidad puede amplificarse. Este proyecto 
          nace de la necesidad de cuantificar y entender cómo se manifiesta esta agresividad.
        </p>

        {/* 2. Definición (Diseño Glassmorphism Editorial) */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            Definiendo la Violencia de Género
          </h3>
          <blockquote className="relative border-l-4 border-purple-500 bg-slate-800/40 backdrop-blur-md p-8 rounded-r-2xl shadow-xl shadow-purple-900/10">
            {/* Comilla decorativa de fondo */}
            <span className="absolute text-8xl text-purple-500/10 -top-4 left-4 font-serif pointer-events-none">"</span>
            <p className="relative z-10 text-lg italic leading-relaxed text-gray-300">
              La violencia de género se refiere a los actos dañinos dirigidos contra una persona o un grupo de personas en razón de su género. Tiene su origen en la desigualdad y el abuso de poder, encontrando en el anonimato digital una nueva vía de propagación.
            </p>
          </blockquote>
        </div>

        {/* 3. Impacto */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-500"></span>
            El Impacto Real de la Violencia Virtual
          </h3>
          <p className="text-lg leading-relaxed text-gray-400 bg-slate-900/50 p-6 rounded-2xl border border-slate-800/80">
            La violencia digital no se queda en la pantalla. Genera un impacto psicológico 
            profundo, censura la participación y normaliza el lenguaje de odio. Al analizar 
            una muestra de tweets, buscamos identificar hacia qué lado está más inclinada 
            esta violencia para <strong className="text-purple-300 font-semibold">visibilizar el problema con datos duros</strong> y evidencia empírica.
          </p>
        </div>
        
      </article>
    </section>
  );
};