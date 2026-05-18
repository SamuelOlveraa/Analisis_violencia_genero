"""
Módulo para validación de datos
Responsabilidad: Actuar como Control de Calidad. Validar que la estructura 
y el contenido de los datos sean correctos antes y después del análisis.
"""
import pandas as pd     # Herramienta principal para manejar nuestras tablas de datos
import logging          # Sistema para imprimir mensajes ordenados en la consola

logger = logging.getLogger(__name__)


def validate_dataframe(df: pd.DataFrame, required_columns: list = None) -> None:
    """
    Valida que la tabla de datos (DataFrame) cumpla con los requisitos mínimos
    para poder trabajar con ella.
    """
    # 1. ¿La tabla siquiera existe? 
    # 'None' significa que hubo un error al cargar y la variable está vacía en memoria.
    if df is None:
        raise ValueError("Error Crítico: El DataFrame es 'None' (nulo). No se pasaron datos.")
    
    # 2. ¿La tabla tiene información?
    # Puede que el archivo exista, pero si no tiene ni una sola fila de datos, no sirve.
    if df.empty:
        raise ValueError("Error Crítico: El DataFrame está completamente vacío.")
    
    # 3. ¿Tiene las columnas que necesitamos?
    if required_columns:
        missing = set(required_columns) - set(df.columns)
        
        if missing:
            # Si 'missing' tiene algo adentro, significa que faltan columnas. Detenemos todo.
            raise ValueError(f"Error: Faltan las siguientes columnas obligatorias: {missing}")
    
    # Si pasa todas las validaciones anteriores sin lanzar errores, el archivo es válido.
    logger.debug(f"Control de calidad superado: Tabla válida con {len(df)} filas y {len(df.columns)} columnas.")


def validate_sentiment_column(df: pd.DataFrame, column: str = 'sentimiento') -> None:
    """
    Revisa la tabla final (después del análisis de la IA) para asegurar 
    que no haya inventado sentimientos extraños (como 'feliz' o 'enojado').
    Solo permitimos 'positivo', 'negativo' o 'neutral'.
    """
    # Definimos las únicas tres palabras que nuestro sistema acepta
    valid_sentiments = {'positivo', 'negativo', 'neutral'}
    
    # 1. Verificamos que la columna realmente exista en la tabla
    if column not in df.columns:
        raise ValueError(f"Error: La columna '{column}' no existe en la tabla de resultados.")
    
    # 2. BÚSQUEDA DE INTRUSOS (Truco de Pandas)

    invalid = df[~df[column].isin(valid_sentiments)][column].unique()
    
    # 3. Si encontramos valores intrusos (len > 0), disparamos la alarma
    if len(invalid) > 0:
        # Lanza el error crítico para detener el pipeline y proteger la integridad
        # de la gráfica (para que no intente graficar un color para un sentimiento que no existe)
        raise ValueError(f"Alarma de Calidad: Se encontraron sentimientos inválidos o mal escritos: {invalid}")
    
    # Todo perfecto
    logger.debug("Validación de sentimientos completada. 100% de los datos son correctos.")