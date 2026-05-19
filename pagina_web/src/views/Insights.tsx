// src/views/Insights.tsx
import rawData from '../data/results.json';
import type { AnalysisResults } from '../types/analysis.types.ts';

const rawArray = rawData as AnalysisResults;
const data = {
  summary: {
    total: rawArray.length,
    positivo: rawArray.filter(t => t.sentimiento === 'positivo').length,
    negativo: rawArray.filter(t => t.sentimiento === 'negativo').length,
    neutral: rawArray.filter(t => t.sentimiento === 'neutral').length,
  }
};

export const Insights = () => {
  return (
    <section className="relative bg-slate-950 px-6 py-24 text-gray-300 overflow-hidden border-t border-white/5">
      
      {/* Glow de fondo final para cerrar la página */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <article className="relative mx-auto max-w-5xl z-10">
        
        {/* Encabezado con gradiente */}
        <div className="mb-12 flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-purple-500/50"></div>
          <span className="text-sm font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            04. Discusión y Conclusiones
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-pink-500/50"></div>
        </div>

        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl mb-12 text-center">
          Hallazgos del <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Análisis</span>
        </h2>

        <div className="mb-16">
          
          {/* Texto de Conclusión */}
          <div className="space-y-6 text-lg leading-relaxed text-gray-400 max-w-4xl mx-auto">
            
            {/* Caja destacada para el insight principal */}
            <p className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 shadow-lg text-center">
              Tras procesar la muestra de <strong className="text-white">{data.summary.total} tweets</strong>, el modelo de NLP reveló una 
              tendencia preocupante: el <strong className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-black text-3xl mx-1">{((data.summary.negativo / data.summary.total) * 100).toFixed(0)}%</strong> de la conversación analizada 
              fue clasificada con sentimiento negativo, indicando hostilidad o violencia digital.
            </p>
            
            <p className="px-4 text-center mt-6">
              Los datos demuestran que la agresión está profundamente arraigada en la <strong className="text-purple-300">conversación cotidiana de redes sociales</strong>. 
              Esto sugiere una normalización de la violencia en plataformas digitales, donde el anonimato actúa como un catalizador para la polarización.
            </p>
            
            {/* Próximos pasos estilizados */}
            <div className="px-6 py-4 border-l-2 border-pink-500/50 mt-8 bg-slate-900/40 rounded-r-xl w-full max-w-3xl mx-auto text-left">
              <strong className="text-white block mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                Siguientes pasos en la investigación
              </strong> 
              <span className="text-base text-gray-400">Para iteraciones futuras de este proyecto, se implementarán técnicas de extracción de entidades nombradas (NER) para poder categorizar exactamente el tipo de agresión (verbal, acoso, amenazas) y extraer las palabras clave más utilizadas por los agresores.</span>
            </div>
          </div>

        </div>

        {/* Footer / Call to action (Botón Glow) */}
        <div className="mt-20 flex flex-col items-center text-center">
          <p className="text-gray-400 mb-8 max-w-lg">
            Este proyecto demuestra la implementación de un pipeline completo de datos, desde la extracción estructurada hasta la visualización en una interfaz web moderna.
          </p>
          
          <a 
            href="https://github.com/SamuelOlveraa/Analisis_violencia_genero/tree/main/analisis_datos" 
            target="_blank" 
            rel="noreferrer"
            className="relative group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-purple-500/25 transition-all hover:scale-105 hover:shadow-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="transition-transform group-hover:-rotate-12" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            Ver Repositorio Completo en GitHub
            {/* Div oculto que crea el brillo exterior en hover */}
            <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
          </a>
        </div>

      </article>
    </section>
  );
};