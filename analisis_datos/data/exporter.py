"""
Módulo para exportación de datos
Responsabilidad: Guardar resultados en archivos
"""
import pandas as pd
import logging

logger = logging.getLogger(__name__)


class DataExporter:
    """Exporta datos procesados a archivos"""
    
    @staticmethod
    def save_results(df: pd.DataFrame, file_path: str, 
                    include_index: bool = False) -> None:
        """
        Guarda resultados en CSV
        
        Args:
            df: DataFrame con resultados
            file_path: Ruta del archivo de salida
            include_index: Si incluir índice
            
        Raises:
            Exception: Si hay error en escritura
        """
        try:
            df.to_csv(file_path, index=include_index)
            logger.info(f"Archivo guardado en: {file_path}")
            logger.info(f"Total de registros: {len(df)}")
        except Exception as e:
            logger.error(f"Error al guardar archivo: {e}")
            raise
