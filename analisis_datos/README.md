# Pipeline de Análisis de Sentimientos 📊

¡Bienvenido/a al proyecto! Este repositorio contiene un sistema automatizado para analizar sentimientos en tweets.

## 🧠 ¿Cómo funciona el Pipeline? (Explicación Sencilla)

 Su trabajo principal es tomar miles de comentarios crudos (tweets) y descubrir qué emociones o sentimientos ocultan. 

El proceso ocurre en **5 pasos automáticos**:

1. **📥 1. Carga de Datos:** El programa lee un archivo de Excel/CSV (como `tweets_limpieza.csv`) donde tienes una lista con todos los comentarios que quieres analizar.
2. **🧼 2. Limpieza (TextCleaner):** Los comentarios de internet suelen venir sucios. Esta etapa quita las menciones (como @usuario), los hashtags (#), enlaces web (http://...), emojis, comillas y espacios extra. Deja el texto puro.
3. **✂️ 3. Lematización (Lemmatizer):** Aquí el programa simplifica las palabras a su raíz. Por ejemplo, transforma "corriendo", "corrí" y "correremos" simplemente a "correr". Esto ayuda a la inteligencia artificial a no confundirse con las conjugaciones.
4. **🤖 4. Análisis de Sentimiento (SentimentAnalyzer):** ¡El cerebro de la operación! Usamos un modelo de Inteligencia Artificial Avanzada (BERT) que lee el texto ya limpio y le asigna una etiqueta: **"Positivo", "Negativo" o "Neutral"**.
5. **📊 5. Exportación y Gráficos:** Finalmente, guarda un nuevo archivo Excel/CSV con los resultados y genera automáticamente una gráfica visual para que puedas ver fácilmente el porcentaje de cada sentimiento. 


