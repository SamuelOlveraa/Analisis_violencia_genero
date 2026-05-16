"""
Módulo para carga de datos
Responsabilidad: Leer archivos CSV de manera segura y estandarizar las columnas para que el resto del programa no falle.
"""
#Herramientas para leer archivos y manejar errores
import pandas as pd          
import logging               
from typing import Optional     

# Creamos un "logger" específico para ver que ocurre en este modulo
logger = logging.getLogger(__name__)

class DataLoader:
    """
    Clase DataLoader (Cargador de Datos)
    Actúa como la recepción: recibe el CSV crudo, extrae lo que necesitamos y lo entrega ordenado.
    """
    
    # @staticmethod significa que no necesitamos instanciar la clase (DataLoader()) para usarla.
    # Podemos llamarla directamente así: DataLoader.load_tweets('archivo.csv')
    @staticmethod
    def load_tweets(
        file_path: str,              # Ruta del archivo (ej: 'mis_datos.csv')
        id_column: str = 'ID',       # El nombre oficial que le daremos a la columna de identificadores
        text_column: str = 'text',   # El nombre oficial que le daremos a la columna de los mensajes
        encoding: str = 'latin1'     # El formato de lectura. 'latin1' previene que el programa explote al leer letras como la 'ñ' o acentos.
    ) -> pd.DataFrame:               # Indicamos que la función devolverá una tabla (DataFrame) de Pandas
        """
        Lee un archivo CSV y busca inteligentemente las columnas de ID y texto, 
        incluso si los títulos vienen en desorden o con mayúsculas/minúsculas.
        """
        try:
            # Avisamos en consola que vamos a empezar a trabajar
            logger.info(f"Intentando cargar tweets desde: {file_path}")
            
            # PASO 1: LEER EL ARCHIVO
            # pd.read_csv toma el archivo de tu computadora y lo convierte en una tabla manejable en memoria.
            df = pd.read_csv(file_path, encoding=encoding)
            
            # PASO 2: VALIDACIÓN BÁSICA
            # Si el archivo existe pero no tiene filas, lanzamos una alerta y detenemos todo.
            if df.empty:
                raise ValueError("El archivo CSV fue encontrado, pero está completamente vacío.")

            # PASO 3: ESTANDARIZAR TÍTULOS
            # Guardamos una lista con los nombres de las columnas, pero convertidos a minúsculas.
            cols_lower = [str(c).lower() for c in df.columns]
            
            # PASO 4: BÚSQUEDA INTELIGENTE DE COLUMNAS
            # CASO A: El CSV tiene columnas llamadas 'id' y 'text'
            if 'id' in cols_lower and 'text' in cols_lower:
                logger.info("Detectadas columnas 'id' y 'text'. Extrayendo datos...")
                
                # Buscamos el nombre exacto (original) de esas columnas para poder extraerlas
                real_id_col = df.columns[cols_lower.index('id')]
                real_text_col = df.columns[cols_lower.index('text')]
                
                # Extraemos SOLO esas dos columnas ignorando el resto.
                # Usamos .copy() para crear una copia limpia en memoria y evitar advertencias de Pandas.
                df = df[[real_id_col, real_text_col]].copy()
                
                # Renombramos las columnas a nuestro estándar interno ('ID' y 'text')
                df.columns = [id_column, text_column]
            
            # CASO B: El CSV tiene columnas 'id' y 'tweet' (muy común al descargar de Twitter)
            elif 'id' in cols_lower and 'tweet' in cols_lower:
                logger.info("Detectadas columnas 'id' y 'tweet'. Extrayendo datos...")
                
                real_id_col = df.columns[cols_lower.index('id')]
                real_text_col = df.columns[cols_lower.index('tweet')]
                
                df = df[[real_id_col, real_text_col]].copy()
                df.columns = [id_column, text_column]
            
            # CASO C: PLAN DE EMERGENCIA (Fallback)
            # No encontró columnas con esos nombres. Asumimos que el CSV no tiene títulos
            # o los tiene mal puestos, así que intentamos tomar las primeras dos columnas.
            else:
                logger.info("No se detectaron los títulos esperados. Usando el plan B: tomar las primeras dos columnas...")
                
                # Volvemos a leer el archivo, pero header=None le dice a Pandas que la primera fila NO son títulos.
                df = pd.read_csv(file_path, header=None, encoding=encoding)
                
                # Si el archivo tiene menos de 2 columnas, es imposible analizarlo (necesitamos un ID y un Mensaje)
                if df.shape[1] < 2:
                    raise ValueError(f"El archivo debe tener al menos 2 columnas, pero solo tiene {df.shape[1]}")
                
                # .iloc[:, :2] es una rebanada. Significa: "Trae todas las filas (:), pero solo las columnas de la 0 a la 1 (:2)"
                df = df.iloc[:, :2].copy()
                df.columns = [id_column, text_column]
            
            # PASO 5: ÉXITO
            logger.info(f"¡Éxito! Se cargaron {len(df)} tweets listos para ser analizados.")
            return df
            
        # MANEJO DE ERRORES: ¿Qué hacemos si algo explota?
        
        except FileNotFoundError as e:
            # Si escribiste mal el nombre del archivo en config.py o no lo has creado
            logger.error(f"¡Error! No se encontró el archivo: {file_path}. Asegúrate de que exista.")
            raise # El 'raise' detiene el programa por completo para evitar errores peores más adelante.
            
        except Exception as e:
            # Si ocurre cualquier otro error
            logger.error(f"Ocurrió un error inesperado al leer el CSV: {e}")
            raise