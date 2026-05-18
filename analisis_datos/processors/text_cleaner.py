"""
Módulo para limpieza de texto
Responsabilidad: Eliminar ruido de tweets (URLs, menciones, hashtags, RTs, etc.)
"""
import re
import logging

logger = logging.getLogger(__name__)


class TextCleaner:
    """Limpia el texto removiendo ruido"""
    
    # Patrones regex para limpieza
    PATTERNS = {
        'urls': r"http\S+",
        'mentions': r"@\w+",
        'hashtags': r"#\w+",
        'rt': r"\brt\b",           
        'special_chars': r"[^\w\s]",
        'numbers': r"\d+"
    }
    
    @staticmethod
    def clean(texto: str) -> str:
        """
        Limpia el texto removiendo ruido
        """
        if not isinstance(texto, str):
            logger.warning(f"Texto no es string: {type(texto)}")
            return ""
        
        if not texto.strip():
            logger.warning("Texto vacío recibido")
            return ""
        
        # Convertimos a minúsculas PRIMERO para que el regex atrape 'RT', 'Rt', 'rT', etc.
        texto = texto.lower()
        
        # Aplicar limpiezas secuenciales
        texto = re.sub(TextCleaner.PATTERNS['urls'], "", texto)
        texto = re.sub(TextCleaner.PATTERNS['mentions'], "", texto)
        texto = re.sub(TextCleaner.PATTERNS['hashtags'], "", texto)
        texto = re.sub(TextCleaner.PATTERNS['rt'], "", texto)  # Aplicamos limpieza de RT
        texto = re.sub(TextCleaner.PATTERNS['special_chars'], "", texto)
        texto = re.sub(TextCleaner.PATTERNS['numbers'], "", texto)
        
        # Normalizar espacios
        texto = " ".join(texto.split())
        texto = texto.strip()
        
        logger.debug(f"Texto limpiado: {texto[:50]}...")
        return texto