"""
Módulo para generación de gráficos
Responsabilidad: Visualizar resulados de análisis
"""
import matplotlib.pyplot as plt
import pandas as pd
import logging
from typing import Optional

logger = logging.getLogger(__name__)


class ChartGenerator:
    """Genera gráficos de análisis"""
    
    @staticmethod
    def generate_sentiment_chart(sentiment_counts: pd.Series, 
                                output_path: str,
                                figsize: tuple = (6, 4),
                                colors: list = None) -> None:
        """
        Genera gráfico de distribución de sentimientos
        
        Args:
            sentiment_counts: Series con conteos de sentimientos
            output_path: Ruta de salida del gráfico
            figsize: Tamaño de la figura (ancho, alto)
            colors: Lista de colores [positivo, negativo, neutral]
        """
        try:
            if sentiment_counts.empty:
                logger.warning("Sin datos para graficar")
                return
            
            if colors is None:
                colors = ['green', 'red', 'gray']
            
            logger.info("Generando gráfico de sentimientos")
            
            plt.figure(figsize=figsize)
            sentiment_counts.plot(kind='bar', color=colors)
            
            plt.title('Distribución de Sentimientos', fontsize=14, fontweight='bold')
            plt.xlabel('Sentimiento', fontsize=12)
            plt.ylabel('Cantidad de Tweets', fontsize=12)
            plt.xticks(rotation=0)
            plt.tight_layout()
            
            # Guardar y cerrar
            plt.savefig(output_path, dpi=100, bbox_inches='tight')
            logger.info(f"Gráfico guardado en: {output_path}")
            
            plt.show()
            
        except Exception as e:
            logger.error(f"Error al generar gráfico: {e}")
            raise
