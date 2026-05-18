"""
Script de pruebas para validar componentes individuales
Ejecuta: python test_components.py

Este archivo contiene funciones simples que se usan para comprobar
si cada parte del proyecto funciona correctamente.
Cada prueba imprime en consola los casos de prueba y los resultados.
"""
import sys
import logging
from utils.logger import setup_logger

# El logger ayuda a registrar errores si alguna prueba falla.
logger = setup_logger(__name__, "DEBUG")


def test_text_cleaner():
    """Prueba el módulo de limpieza de texto."""
    # Esta función crea ejemplos de texto con ruido y comprueba
    # que el limpiador elimine menciones, URLs, hashtags, emojis y espacios extra.
    print("\n" + "="*60)
    print("TEST 1: TextCleaner")
    print("="*60)
    
    from processors.text_cleaner import TextCleaner
    
    cleaner = TextCleaner()
    
    test_cases = [
        "Hola @usuario, esto es un tweet 🎉 https://link.com #trending 123",
        "   Espacios múltiples   entre   palabras   ",
        "TEXTO EN MAYÚSCULAS",
        "",
    ]
    
    for i, texto in enumerate(test_cases, 1):
        resultado = cleaner.clean(texto)
        print(f"  Test {i}:")
        print(f"    Input : '{texto}'")
        print(f"    Output: '{resultado}'")
        print()


def test_lemmatizer():
    """Prueba el módulo de lematización."""
    # Aquí se valida que el lematizador transforme palabras a su forma base.
    print("\n" + "="*60)
    print("TEST 2: Lemmatizer")
    print("="*60)
    
    from processors.lemmatizer import Lemmatizer
    from config import config
    
    try:
        lemmatizer = Lemmatizer(config.MODEL_SPACY)
        
        test_cases = [
            "corriendo rápidamente hacia el futuro",
            "los gatos y los perros juegan",
            "",
        ]
        
        for i, texto in enumerate(test_cases, 1):
            resultado = lemmatizer.lemmatize(texto)
            print(f"  Test {i}:")
            print(f"    Input : '{texto}'")
            print(f"    Output: '{resultado}'")
            print()
            
    except OSError as e:
        # Si falta el modelo de spaCy, se muestra un mensaje útil.
        print(f"  ⚠️  Error: {e}")
        print("  Instala con: python -m spacy download es_core_news_sm")


def test_sentiment_analyzer():
    """Prueba el analizador de sentimientos."""
    # Se evalúa si el analizador devuelve un sentimiento para textos positivos,
    # negativos y neutrales.
    print("\n" + "="*60)
    print("TEST 3: SentimentAnalyzer")
    print("="*60)
    
    from processors.sentiment import SentimentAnalyzer
    from config import config
    
    try:
        analyzer = SentimentAnalyzer(config.MODEL_BERT)
        
        test_cases = [
            "Me encanta este producto es excelente",
            "Esto es terrible y muy malo",
            "Es un producto normal nada especial",
            "",
        ]
        
        for i, texto in enumerate(test_cases, 1):
            resultado = analyzer.analyze(texto)
            print(f"  Test {i}:")
            print(f"    Input     : '{texto}'")
            print(f"    Sentimento: {resultado}")
            print()
            
    except Exception as e:
        # Captura errores generales como falta de modelo o problema de inicialización.
        print(f"  ⚠️  Error: {e}")


def test_validators():
    """Prueba los validadores."""
    # Se comprueba que el validador acepte un DataFrame correcto y rechace uno vacío.
    print("\n" + "="*60)
    print("TEST 4: Validators")
    print("="*60)
    
    import pandas as pd
    from utils.validators import validate_dataframe, validate_sentiment_column
    
    # Test 1: DataFrame válido
    df_valid = pd.DataFrame({
        'tweet': ['Hello', 'World'],
        'sentiment': ['positivo', 'neutral']
    })
    
    try:
        validate_dataframe(df_valid, required_columns=['tweet'])
        print("  ✓ DataFrame válido pasó validación")
    except Exception as e:
        print(f"  ✗ Error: {e}")
    
    # Test 2: DataFrame vacío
    df_empty = pd.DataFrame()
    try:
        validate_dataframe(df_empty)
        print("  ✗ DataFrame vacío no debería pasar")
    except ValueError as e:
        print(f"  ✓ DataFrame vacío rechazado correctamente: {e}")


def test_data_loader():
    """Prueba el cargador de datos (necesita archivo CSV)."""
    # Se intenta cargar el archivo definido en la configuración y se informa si falla.
    print("\n" + "="*60)
    print("TEST 5: DataLoader")
    print("="*60)
    
    from data.loader import DataLoader
    from config import config
    
    try:
        df = DataLoader.load_tweets(config.INPUT_FILE)
        print(f"  ✓ Archivo cargado: {len(df)} filas, {len(df.columns)} columnas")
        print(f"  Columnas: {list(df.columns)}")
    except FileNotFoundError:
        print(f"  ⚠️  Archivo no encontrado: {config.INPUT_FILE}")
        print("     Crea un archivo CSV con columnas 'ID' y 'tweet'")
    except Exception as e:
        print(f"  ⚠️  Error: {e}")


def run_all_tests():
    """Ejecuta todas las pruebas."""
    # Esta función llama a todas las pruebas en orden y muestra un resumen final.
    print("\n\n")
    print("╔" + "="*58 + "╗")
    print("║" + " "*10 + "PRUEBAS DE COMPONENTES" + " "*27 + "║")
    print("╚" + "="*58 + "╝")
    
    try:
        test_text_cleaner()
        test_lemmatizer()
        test_sentiment_analyzer()
        test_validators()
        test_data_loader()
        
        print("\n" + "="*60)
        print("✓ PRUEBAS COMPLETADAS")
        print("="*60 + "\n")
        
    except Exception as e:
        # Si alguna prueba falla inesperadamente, se registra el error y se sale.
        logger.error(f"Error durante las pruebas: {e}")
        sys.exit(1)


if __name__ == "__main__":
    # Punto de entrada del script cuando se ejecuta directamente.
    run_all_tests()
