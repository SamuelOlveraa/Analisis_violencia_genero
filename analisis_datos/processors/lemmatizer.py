"""
Módulo para lematización de texto
Responsabilidad: Convertir palabras a su forma base preservando negaciones
"""
import spacy # Herramienta de NLP para lematización
import logging 

logger = logging.getLogger(__name__)

class Lemmatizer:
    """Lematiza el texto en español"""
    
    def __init__(self, model_name: str):
        """
        Inicializa el lematizador y ajusta las stopwords
        """
        try:
            # Cargamos el modelo de procesamiento de lenguaje natural
            self.nlp = spacy.load(model_name)
            # Estas palabras son críticas para análisis de sentimiento
            # Si las eliminamos, perderemos información importante
            palabras_a_salvar = ['no', 'nunca', 'jamas', 'tampoco', 'muy', 'poco', 'nada']
            # Decimos a spacy que estas palabras NO son stopwords
            for palabra in palabras_a_salvar:
                self.nlp.vocab[palabra].is_stop = False
                
            logger.info(f"Modelo Spacy '{model_name}' cargado correctamente")
        except OSError as e:
            logger.error(f"Error al cargar modelo Spacy: {e}")
            logger.info(f"Instala con: python -m spacy download {model_name}")
            raise
    
    def lemmatize(self, texto: str) -> str:
        """
        Lematiza el texto
        """
        # Verificamos que el texto no sea vacío ni de tipo incorrecto
        if not isinstance(texto, str) or not texto.strip():
            logger.warning("Texto vacío o inválido para lematizar")
            return ""
        
        try:
            # Procesamos el texto completo con el modelo de spacy
            doc = self.nlp(texto)
            
            # Creamos lista de palabras lematizadas
            tokens_lematizados = [
                token.lemma_  # token.lemma_ es la forma base de la palabra
                for token in doc 
                if not token.is_stop and not token.is_punct
            ]
            
            # Unimos todas las palabras con espacios entre ellas
            resultado = " ".join(tokens_lematizados)
            logger.debug(f"Texto lematizado: {resultado[:50]}...")
            return resultado
            
        except Exception as e:
            logger.error(f"Error al lematizar: {e}")
            return ""