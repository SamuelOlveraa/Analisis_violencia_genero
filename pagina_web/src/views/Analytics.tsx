// src/views/Analytics.tsx
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
// Importamos el JSON directamente (Vite lo maneja automáticamente)
import rawData from '../data/results.json';
// Importamos el tipo para asegurar la estructura
import type { AnalysisResults } from '../types/analysis.types.ts';

// Procesamos el array para generar el resumen que espera la vista
const rawArray = rawData as AnalysisResults;
const data = {
  summary: {
    total: rawArray.length,
    positivo: rawArray.filter(t => t.sentimiento === 'positivo').length,
    negativo: rawArray.filter(t => t.sentimiento === 'negativo').length,
    neutral: rawArray.filter(t => t.sentimiento === 'neutral').length,
  }
};

export const Analytics = () => {
  
  // Datos para las gráficas
  const chartData = [
    { name: 'Positivo', value: data.summary.positivo },
    { name: 'Negativo (Violento)', value: data.summary.negativo },
    { name: 'Neutral', value: data.summary.neutral },
  ];
  
  // Colores para el pastel y barras:
  // Verde (Positivo), Fucsia/Rosa (Negativo/Violencia), Gris (Neutral)
  const COLORS = ['#22c55e', '#d946ef', '#ffffff'];

  const porcentajeViolencia = ((data.summary.negativo / data.summary.total) * 100).toFixed(1);

  return (
    <section className="relative bg-slate-950 px-6 py-24 text-gray-300 overflow-hidden">
      
      {/* Glow de fondo para dar profundidad */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <article className="relative mx-auto max-w-6xl z-10">
        
        {/* Encabezado con gradiente */}
        <div className="mb-12 flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-purple-500/50"></div>
          <span className="text-sm font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            03.Analisis & Resultados
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-pink-500/50"></div>
        </div>

        {/* Título Principal */}
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl mb-6 text-center">
          Resultados del Análisis de <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Sentimientos</span>
        </h2>

        {/* Sello de Autenticidad Metodológica */}
        <div className="bg-slate-900/80 border border-purple-500/30 p-5 rounded-xl mb-12 text-center max-w-3xl mx-auto shadow-lg shadow-purple-500/5">
          <p className="text-sm text-gray-300 leading-relaxed">
           Estos datos son el resultado directo de nuestro pipeline en Python. Se procesaron un total de <span className="text-white font-bold px-2 py-0.5 bg-slate-800 rounded">{data.summary.total} tweets</span> utilizando el modelo de NLP (BERT), el cual clasificó los textos en tres categorías de sentimiento para detectar indicios de agresión.
          </p>
        </div>

        {/* Grid de Gráficas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          
          {/* Gráfica 1: Distribución General (PieChart) */}
          <div className="group bg-slate-800/40 backdrop-blur-md p-8 rounded-2xl border border-slate-700/50 shadow-xl transition-all duration-300 hover:border-purple-500/30 hover:bg-slate-800/60">
            <h3 className="text-xl font-bold text-white mb-2 text-center group-hover:text-purple-300 transition-colors">
              Distribución de Sentimientos
            </h3>
            <p className="text-sm text-gray-400 text-center mb-6">
              Proporción general de la muestra procesada.
            </p>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                      borderColor: 'rgba(217, 70, 239, 0.3)', 
                      borderRadius: '12px', 
                      color: '#f8fafc',
                      backdropFilter: 'blur(8px)'
                    }}
                    itemStyle={{color: '#fff'}}
                  />
                  <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfica 2: Cantidades Absolutas (BarChart) */}
          <div className="group bg-slate-800/40 backdrop-blur-md p-8 rounded-2xl border border-slate-700/50 shadow-xl transition-all duration-300 hover:border-pink-500/30 hover:bg-slate-800/60">
            <h3 className="text-xl font-bold text-white mb-2 text-center group-hover:text-pink-300 transition-colors">
              Volumen por Categoría
            </h3>
            <p className="text-sm text-gray-400 text-center mb-6">
              Cantidad exacta de tweets detectados por el modelo.
            </p>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                      borderColor: 'rgba(236, 72, 153, 0.3)', 
                      borderRadius: '12px', 
                      color: '#f8fafc',
                      backdropFilter: 'blur(8px)'
                    }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Insight de Texto Automático */}
        <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-pink-500/30 p-6 rounded-2xl shadow-xl flex items-start gap-4">
          <div className="p-3 bg-pink-500/20 rounded-lg text-pink-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-1">Resultados</h4>
            <p className="text-gray-300 leading-relaxed">
              Basado en los resultados de nuestra inteligencia artificial, el <strong className="text-pink-400">{porcentajeViolencia}%</strong> de la muestra analizada ({data.summary.negativo} tweets) tiene un sentimiento negativo que puede categorizarse como violencia o agresión digital. Esto demuestra una clara tendencia en el lenguaje utilizado en las redes sociales estudiadas.
            </p>
          </div>
        </div>
        
      </article>
    </section>
  );
};