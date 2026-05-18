"""
Módulo para análisis de sentimientos
Responsabilidad: Clasificar sentimiento de tweets usando BERT multilingüe
"""
from transformers import pipeline
import logging
import re

logger = logging.getLogger(__name__)

class SentimentAnalyzer:
    """Analiza sentimientos usando BERT multilingüe"""
    
    # Mapeo de etiquetas BERT a sentimientos
    SENTIMENT_MAP = {
        1: 'negativo',
        2: 'negativo',
        3: 'neutral',
        4: 'positivo',
        5: 'positivo'
    }
    
    def __init__(self, model_name: str, max_length: int = 512):
        """
        Inicializa el analizador de sentimientos
        """
        try:
            # Se especifica que use solo CPU por defecto, o detecta GPU si la hay.
            # Crea el pipeline que usaremos para obtener la predicción.
            # Esto descargará el modelo si no está presente localmente.
            self.analyzer = pipeline("sentiment-analysis", model=model_name)
            self.max_length = max_length
            logger.info(f"Modelo de sentimientos '{model_name}' cargado")
        except Exception as e:
            logger.error(f"Error al cargar modelo de sentimientos: {e}")
            raise
    
    def analyze(self, texto: str) -> str:
        """
        Analiza el sentimiento del texto
        """
        if not isinstance(texto, str) or not texto.strip():
            logger.warning("Texto vacío o inválido para análisis de sentimiento")
            return 'neutral'
        
        try:
           
            # Ejecuta el pipeline: devuelve una lista de predicciones,
            # cada una con 'label' y 'score'. Tomamos la primera.
            resultado = self.analyzer(texto, truncation=True, max_length=self.max_length)[0]
            etiqueta = resultado['label']  # p.ej. 'LABEL_1' o '5 star'
            score = resultado['score']    # probabilidad/confianza
            
           
            # Extraemos número de la etiqueta si existe (p.ej. 'LABEL_2' -> 2)
            match = re.search(r'\d+', etiqueta)
            if match:
                numero_etiqueta = int(match.group())
            else:
                logger.warning(f"Formato de etiqueta desconocido: {etiqueta}. Usando neutral.")
                numero_etiqueta = 3
            
            # Mapear a sentimiento
            # Convertimos el número a una de las tres categorías.
            sentimiento = self.SENTIMENT_MAP.get(numero_etiqueta, 'neutral')
            
            # Información útil para debugging: etiqueta cruda y score.
            logger.debug(f"Sentimiento: {sentimiento} (etiqueta: {etiqueta}, score: {score:.2f})")
            return sentimiento
            
        except Exception as e:
            logger.error(f"Error al analizar sentimiento: {e} - Texto: {texto[:30]}...")
            return 'neutral'