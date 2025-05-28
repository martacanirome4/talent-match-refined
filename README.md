# 🧠 INDITEX_TechChallenge – MVP: Matching Empleados y Vacantes

Este proyecto desarrolla un MVP funcional para **identificar los empleados con mayor afinidad a una vacante interna** en Inditex, utilizando datos reales anonimizados, e integrando información histórica, competencias, y procesado de texto libre, como parte del reto planteado por el equipo de People Tech en Inditex.

# Dark-Matter API  🚀
[![Last commit](https://img.shields.io/github/last-commit/martacanirome4/talent-match-refined)](https://github.com/martacanirome4/talent-match-refined/commits/main)
[![License](https://img.shields.io/github/license/martacanirome4/talent-match-refined)](LICENSE)

## Project info

**URL**: https://lovable.dev/projects/d7c63c9d-b840-4db4-bdce-f673bf224c68

---

## 🚀 Objetivo

Diseñar un sistema que:

1. 🧼 Preprocesa y modela la información de empleados desde distintas fuentes (evaluaciones, formación, educación, etc.)
2. 📊 Extrae competencias desde texto libre (feedback, cursos) mediante TF-IDF y keywords.
3. 🧠 Calcula un **perfil de competencias** por empleado.
4. 🎯 Procesa vacantes (desde BD o texto libre) extrayendo requisitos.
5. 🔁 Realiza el match entre vacante y empleados.
6. 🖥️ Visualiza resultados en un entorno web desarrollado con **Lovable + Vite + Tailwind**.

---

## 🧪 Cómo funciona

- El archivo `match_empleados.py` procesa empleados y vacantes, calculando una puntuación de afinidad según competencias, experiencia, educación y movilidad.
- Las rutas de FastAPI permiten subir una vacante (texto libre o archivo .docx), procesarla y devolver los mejores candidatos.
- El frontend hace llamadas a la API para renderizar resultados en tiempo real: perfiles, afinidad y desglose por competencias.

---

## 📁 Estructura (resumen)

```
TALENT-MATCH-REFINED/
├── src/                     # Frontend Lovable + Vite
├── public/                  # Archivos estáticos
├── match_empleados.py       # Lógica de matching
├── Vacante.docx             # Ejemplo de vacante
├── requirements.txt         # Dependencias Python
├── vite.config.ts           # Configuración frontend
└── .gitignore
```

---

## 🧩 Tecnologías utilizadas

- **Python 3.11**
- `pandas`, `nltk`, `docx`, `re`
- `FastAPI` + `Uvicorn` para API REST
- **Lovable** (basado en Vite, TailwindCSS y React) para interfaz
- `TypeScript`, `Tailwind`, `Vite` para el frontend moderno

---

## ⚙️ Instalación y ejecución local

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu_usuario/Inditex_TechChallenge.git
cd Inditex_TechChallenge
```

### 2. Crear y activar el entorno virtual
(Es necesario tener Python instalado)
```bash
python -m venv .venv
source .venv/bin/activate  # En Windows: .venv\Scripts\activate
```

### 3. Instalar dependencias

```bash
pip install -r requirements.txt
```

---

## 🧠 Ejecución del sistema

### 1. Levantar el backend (FastAPI)

```bash
uvicorn match_empleados:app --reload --port 8000
```

Esto expone un endpoint en:
```
POST http://localhost:8000/api/return_candidates_ts
```

Permite subir un `.docx` o texto libre para generar los candidatos compatibles.

### 2. Levantar el frontend (React)

```bash
npm install
npm run dev
```

Accede desde: [http://localhost:8080](http://localhost:8080)

---

## ✨ ¿Qué incluye el MVP?

### ✅ Modelado de empleados

- Integración de competencias, educación, experiencia, idiomas y movilidad
- Preprocesamiento robusto y normalización
- Generación de perfiles vectorizados por empleado

### ✅ Procesamiento de vacantes

- Entrada libre o desde archivo `.docx`
- Extracción de requisitos: educación, idiomas, experiencia y competencias
- Generación automática de un "perfil ideal"

### ✅ Matching empleado-vacante

- Rule-based interpretativo
- Comparación de competencias + experiencia + ubicación
- Generación de un score con desglose

### ✅ Visualización

- Top 5 empleados recomendados
- Ficha detallada por empleado
- Gráfico radar de competencias
- Motivo del match y competencias faltantes
---

## 🖼️ Capturas de la interfaz
<img width="1435" alt="captura3" src="https://github.com/user-attachments/assets/52f1ded3-8fac-45f2-b207-14323cc76fce" />
<img width="1438" alt="captura7" src="https://github.com/user-attachments/assets/edd4efe4-8cc7-4a55-ba12-dfbe4db86088" />
<img width="1434" alt="captura5" src="https://github.com/user-attachments/assets/31eb3393-110d-4f64-9498-b442868cea84" />

---

## 🔐 Notas sobre privacidad

- Todos los datos utilizados están **anonimizados**
- No se utilizan datos reales identificables de empleados

---

## 🌱 Futuras mejoras

- Uso de modelos semánticos (SBERT, embeddings)
- Pesos dinámicos según tipo de vacante
- Matching inverso (empleado → vacantes compatibles)
- Panel administrativo para carga de datos
- Ajuste fino con feedback del usuario

---

## 👩‍💻 Equipo

- 👩‍💻 **Carolina López de la Mancha** – Datos y exploración
- 👩‍💻 **Jimena Caballero Pascual** – Frontend
- 👩‍💻 **Lucía Yan Wu** – Motor de matching y visión a futuro
- 👩‍💻 **Marta Canino Romero** – Modelado y resultados

💼 Proyecto para el reto Inditex People Tech Challenge 2025

---
## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/d7c63c9d-b840-4db4-bdce-f673bf224c68) and click on Share -> Publish.

OR follow these steps:

1. Create a virtual environment:  ```python -m venv .venv```
2. Install necessary libraries: ```pip install -r requirements.txt```
3. Install the necessary dependencies: ```npm i```
4. Start the development server with auto-reloading and an instant preview: ```npm run dev```
5. On a new terminal initalize backend: ```uvicorn match_empleados:app --reload --port 8000```

---

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)


## 🧬 Licencia

Este repositorio es parte de un reto técnico y no contiene datos reales personales. No contiene datos sensibles.
## Key contributions
- **Exploratory Data Analysis:** cleaned 25 k+ candidate-vacancy records and built pandas / Seaborn notebooks that surfaced the four features most predictive of hiring success.
- **Talent-Match Engine (co-author):** implemented cosine-similarity ranking, co-implemented TF-IDF vectoriser.
- **UI & UX improvements:** refactored React front-end components, solved front-end back-end communication.

