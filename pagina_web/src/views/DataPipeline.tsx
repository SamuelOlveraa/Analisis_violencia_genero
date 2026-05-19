// src/views/DataPipeline.tsx
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const DataPipeline = () => {
  // Código principal completo y fiel a tu lógica de producción
  const mainCode = `try:
    logger.info("INICIO DE ANÁLISIS DE SENTIMIENTOS")
    
    # 1. CARGAR DATOS
    df = DataLoader.load_tweets(input_file)
    validate_dataframe(df, required_columns=['text'])
    
    # 2. LIMPIEZA
    df['tweet_limpio'] = df['text'].map(self.cleaner.clean)
    
    # 3. LEMATIZACIÓN
    df['tweet_lema'] = df['tweet_limpio'].map(self.lemmatizer.lemmatize)
    
    # 3.5 FILTRAR VACÍOS (Evita errores en el modelo)
    df['tweet_lema'] = df['tweet_lema'].replace(r'^\\s*$', np.nan, regex=True)
    df = df.dropna(subset=['tweet_lema']).reset_index(drop=True)
    
    # 4. ANÁLISIS DE SENTIMIENTOS
    df['sentimiento'] = df['tweet_lema'].map(self.sentiment_analyzer.analyze)
    validate_sentiment_column(df)
    
    # 5. EXPORTAR RESULTADOS
    DataExporter.save_results(df, output_file)
    
    # 6 & 7. ESTADÍSTICAS Y GRÁFICOS
    self._print_statistics(df)
    conteo = df['sentimiento'].value_counts()
    colores_ordenados = [config.CHART_COLORS.get(s, 'gray') for s in conteo.index]
    
    ChartGenerator.generate_sentiment_chart(
        conteo, chart_file, figsize=config.CHART_FIGSIZE, colors=colores_ordenados
    )
    logger.info("✓ ANÁLISIS COMPLETADO EXITOSAMENTE")
except Exception as e:
    logger.error(f"Error en el pipeline: {e}")`;

  // Mapeo detallado basado en tu arquitectura real
  const pipelineSteps = [
    {
      num: "1",
      title: "Carga y Validación de Datos",
      desc: "El pipeline inicia leyendo el archivo estructurado. Inmediatamente ejecuta un control de calidad estricto verificando que la columna esencial ('text') esté presente antes de consumir cómputo.",
      snippet: "df = DataLoader.load_tweets(input_file)\nvalidate_dataframe(df, required_columns=['text'])",
      tag: "Resiliencia de Datos",
      tagColor: "text-emerald-400 bg-emerald-950/40 border-emerald-500/20"
    },
    {
      num: "2",
      title: "Limpieza Homogénea (TextCleaner)",
      desc: "Se aplica un mapeo sobre los tweets para remover el ruido de las redes sociales: menciones, URLs, caracteres especiales y emojis, aislando el mensaje textual en la columna 'tweet_limpio'.",
      snippet: "df['tweet_limpio'] = df['text'].map(self.cleaner.clean)",
      tag: "Reducción de Ruido",
      tagColor: "text-purple-400 bg-purple-950/40 border-purple-500/20"
    },
    {
      num: "3",
      title: "Lematización Estructural",
      desc: "Reduce cada palabra mapeada a su raíz lingüística (lema). Esto unifica el vocabulario (ej. 'violentadas' o 'violencia' se estandarizan) permitiendo que el modelo comprenda semánticamente el texto.",
      snippet: "df['tweet_lema'] = df['tweet_limpio'].map(self.lemmatizer.lemmatize)",
      tag: "Normalización NLP",
      tagColor: "text-pink-400 bg-pink-950/40 border-pink-500/20"
    },
    {
      num: "3.5",
      title: "Filtro de Vacíos y Ruido Crítico",
      desc: "Un paso clave de optimización: tras limpiar y remover stopwords, muchos tweets quedan vacíos. Se transforman los espacios en blanco a valores nulos (NaN) y se descartan para evitar falsos positivos o errores de ejecución en el modelo de IA.",
      snippet: "df['tweet_lema'] = df['tweet_lema'].replace(r'^\\s*$', np.nan, regex=True)\ndf = df.dropna(subset=['tweet_lema']).reset_index(drop=True)",
      tag: "Filtro de Calidad",
      tagColor: "text-amber-400 bg-amber-950/40 border-amber-500/20"
    },
    {
      num: "4",
      title: "Inferencia del Sentimiento (Modelo BERT)",
      desc: "La columna limpia y normalizada es procesada por el clasificador avanzado. Al finalizar, una función de validación asegura que las etiquetas generadas correspondan estrictamente a los criterios del negocio.",
      snippet: "df['sentimiento'] = df['tweet_lema'].map(self.sentiment_analyzer.analyze)\nvalidate_sentiment_column(df)",
      tag: "Deep Learning",
      tagColor: "text-sky-400 bg-sky-950/40 border-sky-500/20"
    },
    {
      num: "5",
      title: "Persistencia, Métricas y Visualización Dinámica",
      desc: "Los resultados se exportan para la persistencia del sistema. Posteriormente, se extrae la distribución de los sentimientos y se inyecta la paleta de colores configurada en el sistema para generar gráficos precisos y listos para la interfaz web.",
      snippet: "DataExporter.save_results(df, output_file)\nconteo = df['sentimiento'].value_counts()\ncolores_ordenados = [config.CHART_COLORS.get(s) for s in conteo.index]",
      tag: "Analítica Visual",
      tagColor: "text-purple-400 bg-purple-950/40 border-purple-500/20"
    }
  ];

  return (
    <section className="relative bg-slate-900 px-6 py-24 text-gray-300 overflow-hidden">
      {/* Luces de fondo (Glows ambientales) */}
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -left-40 w-[600px] h-[600px] bg-pink-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <article className="relative mx-auto max-w-6xl z-10">
        
        {/* Encabezado de Sección */}
        <div className="mb-16 flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-purple-500/30"></div>
          <span className="text-sm font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            02. Arquitectura & Flujo del Pipeline
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-pink-500/30"></div>
        </div>

        <div className="text-center mb-20">
          <h3 className="text-4xl font-black text-white mb-4 tracking-tight">
           Procesamiento de Datos <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Paso a Paso</span>
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Explicación detallada de las etapas modulares que transforman los tweets brutos en datos estructurados y listos para el análisis.
          </p>
        </div>

        {/* CONTENEDOR PRINCIPAL: Se divide en sección explicativa y código completo */}
        <div className="space-y-24">
          
          {/* BLOQUE DE PASOS INTERACTIVOS (Ocupa todo el ancho, alternando layouts para evitar espacios vacíos) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {pipelineSteps.map((step) => (
              <div 
                key={step.num} 
                className="group bg-slate-950/40 backdrop-blur-sm border border-slate-800/80 p-6 rounded-2xl relative flex flex-col justify-between transition-all duration-300 hover:border-purple-500/30 hover:bg-slate-950/70"
              >
                <div>
                  {/* Badge de Paso y Tag */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-purple-300">
                      PASO {step.num}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${step.tagColor}`}>
                      {step.tag}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">
                    {step.desc}
                  </p>
                </div>

                {/* Mini terminal de código correspondiente al paso */}
                <div className="rounded-xl overflow-hidden border border-slate-900 shadow-inner">
                  <div className="bg-slate-950 px-3 py-1.5 flex items-center justify-between text-[10px] font-mono text-gray-500 border-b border-slate-900">
                    <span>Bloque de Ejecución</span>
                    <span className="text-purple-400/50">Python</span>
                  </div>
                  <SyntaxHighlighter 
                    language="python" 
                    style={vscDarkPlus} 
                    customStyle={{ margin: 0, padding: '0.85rem', background: '#05070c', fontSize: '0.75rem' }}
                  >
                    {step.snippet}
                  </SyntaxHighlighter>
                </div>
              </div>
            ))}
          </div>

          {/* CÓDIGO CORE COMPLETO (Sección inferior unificada como cierre técnico de la arquitectura) */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
             <h3 className="text-4xl font-black text-white mb-4 tracking-tight">
               El Ciclo de Vida del <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Dato en NLP</span>
            </h3>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
    Desde la ingesta del archivo CSV hasta la inferencia del modelo de inteligencia artificial: así interactúan los componentes de nuestro sistema.
  </p>
            </div>
            
            <div className="group rounded-2xl overflow-hidden shadow-2xl border border-slate-800 transition-all duration-300 hover:border-pink-500/30">
              
              {/* Barra superior de la Terminal Principal */}
              <div className="bg-slate-950 px-5 py-3.5 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/30 group-hover:bg-red-500 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/30 group-hover:bg-yellow-500 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/30 group-hover:bg-green-500 transition-colors"></div>
                  <span className="ml-2 text-xs text-pink-300/70 font-mono">main.py</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                  Production Ready
                </div>
              </div>

              {/* Bloque de código completo */}
              <div className="text-xs sm:text-sm font-mono">
                <SyntaxHighlighter 
                  language="python" 
                  style={vscDarkPlus} 
                  customStyle={{ 
                    margin: 0, 
                    padding: '1.75rem', 
                    background: '#070a12',
                    lineHeight: '1.6'
                  }}
                >
                  {mainCode}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>

        </div>
      </article>
    </section>
  );
};