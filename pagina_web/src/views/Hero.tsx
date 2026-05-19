export const Hero = () => {
  return (
    // Añadimos overflow-hidden y position relative para contener el fondo brillante
    <section className="relative bg-slate-950 min-h-[75vh] flex flex-col justify-center items-center px-6 py-16 text-center overflow-hidden">
      
      {/* EFECTO VISUAL: Glow morado sutil de fondo (centrado) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Etiqueta superior (Cambiamos a morado y añadimos un pequeño pulso animado) */}
      <div className="relative mb-6 inline-flex items-center rounded-full bg-purple-900/30 px-4 py-1.5 text-sm font-medium text-purple-300 ring-1 ring-inset ring-purple-500/30">
        <span className="flex w-2 h-2 rounded-full bg-purple-500 mr-2 animate-pulse"></span>
        Proyecto de Análisis de Datos & NLP
      </div>

      {/* Título Principal (Aplicamos un degradado de texto a las palabras clave) */}
      <h1 className="relative max-w-4xl text-5xl font-extrabold tracking-tight text-white sm:text-7xl drop-shadow-md">
        Análisis de <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">VIOLENCIA DE GÉNERO</span> en Redes Sociales
      </h1>

      {/* Subtítulo */}
      <p className="relative mt-6 max-w-2xl text-lg leading-8 text-gray-300">
        Se realizo un estudio utilizando Procesamiento de Lenguaje Natural (NLP) para identificar 
        la inclinación y los patrones de agresión en la conversación digital.
      </p>

      {/* Tarjetas de métricas (Efecto Glassmorphism + Hover transitions) */}
      <div className="relative mt-12 flex flex-wrap justify-center gap-6">
  

        {/* Tarjeta 1 */}
        <div className="group flex flex-col rounded-xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-sm p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-pink-500/50 hover:bg-slate-800/60 w-44">
          <dt className="text-sm font-medium text-gray-400 uppercase tracking-wider">Tecnología</dt>
          <dd className="mt-2 text-4xl font-black text-white group-hover:text-pink-400 transition-colors">Python</dd>
          <span className="text-xs text-pink-400/80 mt-2 font-mono">BERT</span>
        </div>

      </div>
    </section>
  );
};