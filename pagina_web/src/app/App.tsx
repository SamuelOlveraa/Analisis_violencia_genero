
import { Hero } from '../views/Hero';
import { ProblemStatement } from '../views/Overview'; // Asegúrate de que el nombre del archivo coincida con lo que creaste
import { DataPipeline } from '../views/DataPipeline';
import { Analytics } from '../views/Analytics';
import { Insights } from '../views/Insights';

function App() {
  return (
    // Cambiamos el color de selección de texto a morado/rosa para mantener el tema
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* Navbar Premium con Glassmorphism extremo */}
      <nav className="fixed top-0 w-full border-b border-white/5 bg-slate-950/60 p-4 backdrop-blur-xl z-50 transition-all duration-300">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          
          {/* Logo / Título con Gradiente */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="text-xl font-black text-white tracking-tight">
              Violencia de <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Género</span>
            </span>
          </div>

          {/* Botón de GitHub Premium */}
          <a 
            href="https://github.com/SamuelOlveraa/Analisis_violencia_genero/tree/main/analisis_datos" 
            target="_blank" 
            rel="noreferrer" 
            className="group flex items-center gap-2 rounded-full border border-slate-700/50 bg-slate-800/50 px-4 py-2 text-sm font-medium text-gray-300 backdrop-blur-sm transition-all hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="transition-transform group-hover:scale-110" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            Ver Código
          </a>
        </div>
      </nav>

      {/* Agregamos un padding-top para que el navbar fijo no tape el Hero */}
      <main className="pt-16">
        <Hero />
        <ProblemStatement />
        <DataPipeline /> 
        <Analytics />
        <Insights />
      </main>

      {/* Un pequeño footer para cerrar la página elegante */}
      <footer className="border-t border-slate-800/50 bg-slate-950 py-8 text-center">
        <p className="text-sm text-gray-500">
          Desarrollado para análisis académico y portafolio profesional.
        </p>
      </footer>
    </div>
  );
}

export default App;