"""
Script principal - Orquestación del pipeline de análisis de sentimientos
"""
import sys
import numpy as np  # Necesario para el manejo de valores nulos (NaN)
from config import config

# Importar utilidades
from utils.logger import setup_logger
from utils.validators import validate_dataframe, validate_sentiment_column

# Importar procesadores
from processors.text_cleaner import TextCleaner
from processors.lemmatizer import Lemmatizer
from processors.sentiment import SentimentAnalyzer

# Importar data handlers
from data.loader import DataLoader
from data.exporter import DataExporter

# Importar visualización
from visualization.charts import ChartGenerator


# Configurar logger global
logger = setup_logger(__name__, config.LOG_LEVEL)


class TweetAnalysisPipeline:
    """Pipeline completo de análisis de sentimientos en tweets"""
    
    def __init__(self):
        """Inicializa componentes del pipeline"""
        logger.info("Inicializando pipeline de análisis...")
        
        try:
            self.cleaner = TextCleaner()
            self.lemmatizer = Lemmatizer(config.MODEL_SPACY)
            self.sentiment_analyzer = SentimentAnalyzer(
                config.MODEL_BERT, 
                max_length=config.MAX_TEXT_LENGTH
            )
            logger.info("Componentes inicializados exitosamente")
            
        except Exception as e:
            logger.error(f"Error al inicializar componentes: {e}")
            raise
    
    def run(self, input_file: str = None, output_file: str = None) -> None:
        """
        Ejecuta el pipeline completo
        
        Args:
            input_file: Ruta del archivo de entrada (por defecto: config)
            output_file: Ruta del archivo de salida (por defecto: config)
        """
        # Usar configuración si no se especificó
        input_file = input_file or config.INPUT_FILE
        output_file = output_file or config.OUTPUT_FILE
        chart_file = config.CHART_FILE
        
        try:
            logger.info("=" * 60)
            logger.info("INICIO DE ANÁLISIS DE SENTIMIENTOS")
            logger.info("=" * 60)
            
            # 1. CARGAR DATOS
            logger.info(f"PASO 1: Cargando datos de {input_file}")
            df = DataLoader.load_tweets(input_file)
            validate_dataframe(df, required_columns=['text'])
            
            # 2. LIMPIEZA
            logger.info("PASO 2: Limpiando tweets")
            df['tweet_limpio'] = df['text'].map(self.cleaner.clean)
            logger.info(f"  ✓ {len(df)} tweets limpiados")
            
            # 3. LEMATIZACIÓN
            logger.info("PASO 3: Lematizando tweets")
            df['tweet_lema'] = df['tweet_limpio'].map(self.lemmatizer.lemmatize)
            logger.info(f"  ✓ {len(df)} tweets procesados")
            
            # 3.5 FILTRAR VACÍOS (Evita errores en el modelo de sentimientos)
            logger.info("PASO 3.5: Filtrando registros sin contenido útil")
            total_previo = len(df)
            # Convertir strings vacíos o con puros espacios a NaN
            df['tweet_lema'] = df['tweet_lema'].replace(r'^\s*$', np.nan, regex=True)
            # Eliminar las filas con NaN y resetear el índice para evitar desajustes
            df = df.dropna(subset=['tweet_lema']).reset_index(drop=True)
            logger.info(f"  ✓ Se descartaron {total_previo - len(df)} tweets vacíos (ruido/stopwords)")
            logger.info(f"  ✓ Total listos para análisis: {len(df)}")
            
            # 4. ANÁLISIS DE SENTIMIENTOS
            logger.info("PASO 4: Analizando sentimientos")
            df['sentimiento'] = df['tweet_lema'].map(self.sentiment_analyzer.analyze)
            validate_sentiment_column(df)
            logger.info(f"  ✓ {len(df)} sentimientos analizados")
            
            # 5. EXPORTAR RESULTADOS
            logger.info("PASO 5: Exportando resultados")
            DataExporter.save_results(df, output_file)
            
            # 6. MOSTRAR ESTADÍSTICAS
            logger.info("PASO 6: Generando estadísticas")
            self._print_statistics(df)
            
            # 7. GENERAR GRÁFICOS
            logger.info("PASO 7: Generando visualización")
            conteo = df['sentimiento'].value_counts()
            
           #Construir la lista de colores en el orden correcto
            colores_ordenados = [config.CHART_COLORS.get(sentimiento, 'gray') for sentimiento in conteo.index]
            
            ChartGenerator.generate_sentiment_chart(
                conteo,
                chart_file,
                figsize=config.CHART_FIGSIZE,
                colors=colores_ordenados  # Le pasamos la lista ya procesada
            )
            
            logger.info("=" * 60)
            logger.info("✓ ANÁLISIS COMPLETADO EXITOSAMENTE")
            logger.info("=" * 60)
            
        except Exception as e:
            logger.error(f"Error durante la ejecución del pipeline: {e}")
            raise
    
    @staticmethod
    def _print_statistics(df) -> None:
        """Imprime estadísticas del análisis"""
        conteo = df['sentimiento'].value_counts()
        total = len(df)
        
        logger.info("\n" + "=" * 60)
        logger.info("ESTADÍSTICAS DE SENTIMIENTOS")
        logger.info("=" * 60)
        
        for sentimiento, cantidad in conteo.items():
            porcentaje = (cantidad / total) * 100
            logger.info(f"  {sentimiento.upper():10} : {cantidad:5} ({porcentaje:5.1f}%)")
        
        logger.info(f"  {'TOTAL':10} : {total:5} (100.0%)")
        logger.info("=" * 60 + "\n")


def main():
    """Función principal"""
    try:
        pipeline = TweetAnalysisPipeline()
        pipeline.run()
        
    except KeyboardInterrupt:
        logger.warning("Proceso cancelado por el usuario")
        sys.exit(1)
    except Exception as e:
        logger.critical(f"Error crítico: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()