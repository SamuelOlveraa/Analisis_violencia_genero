#!/bin/bash

# Script de utilidades para el pipeline de análisis de sentimientos
# Uso: chmod +x run.sh  (solo la primera vez)
#      ./run.sh help    (para ver opciones)

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funciones
print_header() {
    echo -e "\n${BLUE}===================================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}===================================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# Comandos
install_deps() {
    print_header "Instalando dependencias"
    
    if ! command -v pip &> /dev/null; then
        print_error "pip no está instalado"
        return 1
    fi
    
    print_info "Instalando paquetes Python..."
    pip install -r requirements.txt
    
    print_info "Descargando modelo de Spacy..."
    python -m spacy download es_core_news_sm
    
    print_success "Dependencias instaladas"
}

run_main() {
    print_header "Ejecutando análisis de sentimientos"
    python main.py
}

run_tests() {
    print_header "Ejecutando pruebas de componentes"
    python test_components.py
}

show_structure() {
    print_header "Estructura del proyecto"
    
    cat << EOF
analisis_datos/
├── main.py                    # Orquestador de análisis
├── config.py                  # Configuración
├── requirements.txt           # Dependencias
├── README.md                  # Documentación
├── run.sh                     # Este script
│
├── processors/                # MÓDULO DE ANÁLISIS
│   ├── text_cleaner.py
│   ├── lemmatizer.py
│   └── sentiment.py
│
├── data/                      # Manejo de datos
│   ├── loader.py
│   └── exporter.py
│
├── visualization/            # Visualización
│   └── charts.py
│
└── utils/                     # Utilidades
    ├── logger.py
    └── validators.py

ENTRADA:  tweets_limpieza.csv (debe ser proporcionado en esta carpeta)
SALIDA:   tweets_analizadosV2.csv
GRÁFICO:  grafica_sentimientosv2.png
EOF
}

show_help() {
    cat << EOF
${BLUE}Utilidades del Pipeline de Análisis de Sentimientos${NC}

${GREEN}Uso:${NC}
    ./run.sh [COMANDO] [ARGS]

${GREEN}Comandos disponibles:${NC}
    ${YELLOW}install${NC}        Instala todas las dependencias
    ${YELLOW}run${NC}            Ejecuta el análisis completo
    ${YELLOW}test${NC}           Prueba componentes individuales
    ${YELLOW}structure${NC}      Muestra la estructura del proyecto
    ${YELLOW}check${NC}          Verifica que esté todo instalado
    ${YELLOW}clean${NC}          Elimina archivos generados
    ${YELLOW}help${NC}           Muestra esta ayuda

${GREEN}Flujo completo:${NC}
    1. Asegúrate de tener tu archivo tweets_limpieza.csv listo en el directorio
    2. ./run.sh install                  Instalar dependencias
    3. ./run.sh run                      Ejecutar análisis

${BLUE}Primeros pasos:${NC}
    1. chmod +x run.sh
    2. ./run.sh install
    3. Coloca tu tweets_limpieza.csv en el directorio
    4. ./run.sh run
EOF
}

check_installation() {
    print_header "Verificando instalación"
    
    local all_ok=true
    
    # Verificar Python
    if command -v python3 &> /dev/null; then
        print_success "Python 3 instalado: $(python3 --version)"
    else
        print_error "Python 3 no está instalado"
        all_ok=false
    fi
    
    # Verificar paquetes Python
    if python3 -c "import pandas" 2>/dev/null; then
        print_success "pandas instalado"
    else
        print_warning "pandas no instalado (ejecuta: ./run.sh install)"
        all_ok=false
    fi
    
    if python3 -c "import spacy" 2>/dev/null; then
        print_success "spacy instalado"
    else
        print_warning "spacy no instalado (ejecuta: ./run.sh install)"
        all_ok=false
    fi
    
    if python3 -c "import transformers" 2>/dev/null; then
        print_success "transformers instalado"
    else
        print_warning "transformers no instalado (ejecuta: ./run.sh install)"
        all_ok=false
    fi
    
    # Verificar archivos
    if [ -f "tweets_limpieza.csv" ]; then
        print_success "Archivo de entrada encontrado: tweets_limpieza.csv"
    else
        print_warning "Archivo de entrada no encontrado: tweets_limpieza.csv"
        print_info "Crea un archivo CSV con columnas 'ID' y 'tweet'"
    fi
    
    if [ "$all_ok" = true ]; then
        print_success "\n✓ Todo está listo para ejecutar"
    fi
}

clean_output() {
    print_header "Limpiando archivos generados"
    
    rm -f tweets_analizadosV2.csv
    print_success "Eliminado: tweets_analizadosV2.csv"
    
    rm -f grafica_sentimientosv2.png
    print_success "Eliminado: grafica_sentimientosv2.png"
    
    find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
    print_success "Eliminados caché de Python"
    
    print_success "Limpieza completada"
}

# Main switch
case "${1:-help}" in
    install)
        install_deps
        ;;
    run)
        run_main
        ;;
    test)
        run_tests
        ;;
    structure)
        show_structure
        ;;
    check)
        check_installation
        ;;
    clean)
        clean_output
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        print_error "Comando desconocido: $1"
        echo ""
        show_help
        exit 1
        ;;
esac