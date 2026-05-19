# 🌐 Frontend: Análisis de Violencia de Género

Aplicación web interactiva desarrollada para visualizar de forma dinámica e intuitiva los resultados del pipeline de Procesamiento de Lenguaje Natural (NLP) sobre la detección y análisis de violencia de género en redes sociales.

Este componente funciona como la interfaz visual ("la cara pública") del proyecto, permitiendo a los usuarios interactuar con los hallazgos sin necesidad de ejecutar scripts en la terminal.

---

## 🚀 Características Principales

* **Arquitectura Moderna:** Construida con **React 19**, **TypeScript** y **Vite** para garantizar un desarrollo ágil y un rendimiento óptimo en producción.
* **Visualización de Datos Dinámica:** Integración con **Recharts** para renderizar gráficos interactivos a partir del procesamiento de datos.
* **Componentes Estilizados:** Interfaz de usuario limpia, responsiva y accesible, diseñada para facilitar la comprensión de métricas complejas.
* **Tipado Estricto:** Uso de TypeScript para modelar la estructura de los datos del pipeline, minimizando errores en tiempo de ejecución.

---

## 🔄 Sincronización con el Backend (Python)

El flujo de datos del proyecto completo se divide en dos etapas claramente estructuradas:

1. **Procesamiento de Datos (Backend):** El pipeline de Python (`main.py` ubicado en la carpeta de análisis de datos) extrae, limpia y procesa los tweets del dataset, ejecutando el análisis de sentimiento y modelado de lenguaje. Al finalizar, exporta un archivo centralizado llamado `results.json`.
2. **Visualización Interactiva (Frontend):** Esta aplicación web consume de forma directa el archivo `results.json`, encargándose de mapear, interpretar y transformar esos registros estructurados en las gráficas e *insights* que se muestran en la pantalla.

---

## 🛠️ Instalación y Configuración Local

Sigue estos pasos para clonar el repositorio y levantar el entorno de desarrollo en tu máquina local:

### 1. Prerrequisitos
Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior recomendada) y `npm`.

### 2. Navegar a la carpeta del frontend
Desde la raíz del proyecto, muévete al directorio de la aplicación web:
```bash
cd pagina-web