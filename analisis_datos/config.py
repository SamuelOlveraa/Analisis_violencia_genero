"""
Configuración centralizada de la aplicación
"""

class Config:
    """Configuración global de la aplicación"""
    
    # Archivos: Define cómo se llaman los archivos que el programa va a leer y los que va a generar.
    INPUT_FILE = "tweets_limpieza.csv"
    OUTPUT_FILE = "../pagina-web/Violencia-genero/src/data/results.json"
    CHART_FILE = "grafica_sentimientosv2.png"
    
    # Modelos NLP
    MODEL_SPACY = "es_core_news_sm" #lematización
    MODEL_BERT = "nlptown/bert-base-multilingual-uncased-sentiment" #análisis de sentimientos
    
    # Parámetros
    MAX_TEXT_LENGTH = 512 # límite máximo de "tokens" (fragmentos de palabras) que pueden leer a la vez
    
    # Logging: Define el nivel de detalle y el formato de los mensajes de registro.
    LOG_LEVEL = "INFO"
    LOG_FORMAT = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    
    # Gráficos: Define el tamaño y los colores para las visualizaciones de sentimientos.
    CHART_FIGSIZE = (6, 4)
    CHART_COLORS = {
        'positivo': '#2ecc71',  
        'negativo': '#e74c3c',  
        'neutral': '#95a5a6'    
    }

# Instancia única de configuración
config = Config()
