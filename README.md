# 📊 Sistema de Análisis de Sentimientos y Visualización Web

Este proyecto integra un **pipeline de procesamiento de lenguaje natural (NLP)** con una **aplicación web interactiva**, permitiendo analizar grandes volúmenes de texto (tweets) y visualizar los resultados de forma clara e intuitiva.

---

# 🧠 Arquitectura General del Proyecto

El sistema está dividido en **dos componentes principales** que trabajan en conjunto:

---
## 1. 📥 Procesamiento de Datos (Backend - Python)

El pipeline se encarga de transformar datos crudos en información útil.

### 🔹 Etapas del pipeline:

1. **Carga de Datos**  
   Se leen archivos CSV o Excel con los tweets a analizar.

2. **Limpieza de Texto (TextCleaner)**  
   Se eliminan:
   - Menciones (@usuario)  
   - Hashtags (#)  
   - URLs  
   - Emojis y caracteres especiales  

3. **Lematización (Lemmatizer)**  
   Se reducen palabras a su forma base:  
   _"corriendo" → "correr"_

4. **Análisis de Sentimiento (SentimentAnalyzer)**  
   Se utiliza un modelo basado en **BERT** para clasificar cada texto en:
   - Positivo  
   - Negativo  
   - Neutral  

5. **Exportación de Resultados**  
   Se genera un archivo clave:
   results.json
---

## 2. 🌐 Visualización (Frontend - React)

La aplicación web consume los resultados generados por el pipeline.

### 🔹 ¿Qué hace el frontend?

- Lee el archivo `results.json`
- Interpreta los datos procesados
- Genera visualizaciones dinámicas

### 🔹 Características principales:

- ⚛️ React 19 + TypeScript + Vite  
- 📊 Gráficas interactivas con Recharts  
- 🎨 Interfaz limpia y responsiva  
- 🔒 Tipado fuerte para evitar errores  

---

# 🔗 Conexión entre Backend y Frontend

La integración entre ambos componentes es simple pero poderosa:

### 📌 Punto clave:
El archivo `results.json`

- Es generado por el pipeline en Python  
- Es consumido directamente por el frontend  

### 🔄 Flujo de conexión:

1. Ejecutas el pipeline (`main.py`)
2. Se genera/actualiza `results.json`
3. El frontend lee ese archivo
4. Se actualizan automáticamente las gráficas

---

