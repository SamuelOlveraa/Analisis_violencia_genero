"""
Módulo para configuración de logging
Responsabilidad: Centralizar configuración de logs
"""
import logging
import sys
from config import config  # <-- Cambiado a minúsculas


def setup_logger(name: str, level: str = None) -> logging.Logger:
    """
    Configura un logger con formato estándar
    
    Args:
        name: Nombre del logger (usualmente __name__)
        level: Nivel de log (DEBUG, INFO, WARNING, ERROR, CRITICAL)
               Si no se proporciona, usa la configuración global
    
    Returns:
        Logger configurado
    """
    # Usar la variable de entorno resuelta
    if level is None:
        level = config.LOG_LEVEL  # <-- Cambiado a minúsculas
    
    # Crear logger
    logger = logging.getLogger(name)
    
    # Evitar duplicación si ya tiene handlers
    if logger.hasHandlers():
        return logger
    
    # Establecer nivel
    logger.setLevel(getattr(logging, level.upper()))
    
    # Crear handler de consola
    handler = logging.StreamHandler(sys.stdout)
    handler.setLevel(getattr(logging, level.upper()))
    
    # Crear formateador usando la variable resuelta
    formatter = logging.Formatter(config.LOG_FORMAT)  # <-- Cambiado a minúsculas
    handler.setFormatter(formatter)
    
    # Agregar handler al logger
    logger.addHandler(handler)
    
    return logger