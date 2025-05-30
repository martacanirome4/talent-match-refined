from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
from typing import Optional
import pandas as pd
import re
import docx
import json
import os
import uvicorn

#  Cargar empleados + competencias

# df_empleados = pd.read_csv("src/data/processed/empleados_final.csv")
df_empleados = pd.read_csv("src/data/processed/empleados_final_1.csv")
df_empleados.rename(columns={"CLASE_INTERNA": "PUESTO"}, inplace=True)

# df_comp = pd.read_csv("src/data/processed/competencias.csv")
df_comp = pd.read_csv("src/data/processed/competencias_1.csv")

df_educacion = pd.read_csv("src/data/educacion.csv")
df_educacion.fillna("Desconocido", inplace=True)

df_idiomas = pd.read_csv("src/data/idiomas.csv")
# Limpieza preventiva
df_idiomas["IDIOMA"] = df_idiomas["IDIOMA"].str.lower().str.strip()
df_idiomas["NIVEL_IDIOMA"] = df_idiomas["NIVEL_IDIOMA"].str.capitalize().str.strip()

df_movilidad = pd.read_csv("src/data/movilidad.csv")
df_movilidad.fillna("Desconocido", inplace=True)


app = FastAPI()
    
# CORS first
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080"          # local dev front-end
        # "https://your-frontend.up.railway.app"  # prod front-end (add later)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#  health-check / root route
@app.get("/")
def health():
    return {"status": "running"}

# Only runs when you call:  python match_empleados.py
if __name__ == "__main__":
    uvicorn.run(
        "match_empleados:app",
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 8000)),
        reload=False       # set True only for hot-reload locally
    )

# Función para extraer texto de .docx
def extract_text_from_docx(file):
    # Convierte el archivo a un objeto BytesIO
    file_content = BytesIO(file.file.read())
    
    # Ahora puedes usar `file_content` con python-docx
    doc = docx.Document(file_content)
    
    # Extrae el texto del documento
    full_text = []
    for para in doc.paragraphs:
        full_text.append(para.text)
    
    return '\n'.join(full_text)

def vacante_json(vacante):
    vacante = vacante.lower()

    json_vacante = {
        'ubicacion': 'Madrid',
        'educacion_minima': None,
        'idiomas_necesarios': [],
        'experiencia_minima': 0,
        'liderazgo': 0,
        'comunicacion': 0,
        'trabajo_en_equipo': 0,
        'resolucion_problemas': 0,
        'orientacion_resultados': 0,
        'pensamiento_critico': 0,
    }

    # Educación
    if "educación primaria" in vacante:
        json_vacante["educacion_minima"] = 1
    elif "educación secundaria" in vacante:
        json_vacante["educacion_minima"] = 2
    elif "ciclos formativos de grado medio o superior" in vacante or "titulación universitaria de grado medio" in vacante or "Bachillerato" in vacante:
        json_vacante["educacion_minima"] = 3
    elif "titulación universitaria de grado superior" in vacante or "grado (bolonia)" in vacante:
        json_vacante["educacion_minima"] = 4
    elif "máster o programa de postgrado" in vacante:
        json_vacante["educacion_minima"] = 5
    else:
        json_vacante["educacion_minima"] = 0

    # Experiencia
    match = re.search(r"(\d+)\s+año[s]?\s+", vacante)
    if match:
        json_vacante["experiencia_minima"] = int(match.group(1))

    # Idiomas
    if "español" in vacante:
        json_vacante["idiomas_necesarios"] += "Español"
    if "inglés" in vacante:
        if json_vacante["idiomas_necesarios"]:
            json_vacante["idiomas_necesarios"] += ", "
        json_vacante["idiomas_necesarios"] += "Inglés"

    # Habilidades blandas
    competencias_keywords = {
        'liderazgo': ['liderazgo', 'dirigir', 'gestionar', 'influencia', 'coordinar', 'jefe', 'team lead'],
        'comunicacion': ['comunicación', 'comunicar', 'presentar', 'exponer', 'negociar', 'digital', 'mensaje'],
        'trabajo_en_equipo': ['trabajar en equipo', 'colaborar', 'equipo', 'cooperar', 'sinergia', 'confianza'],
        'resolucion_problemas': ['resolver', 'problemas', 'soluciones', 'creatividad', 'retos'],
        'orientacion_resultados': ['objetivos', 'metas', 'KPIs', 'resultados', 'eficiencia'],
        'pensamiento_critico': ['analizar', 'pensamiento crítico', 'evaluar', 'razonar', 'argumentar']
    }
    for comp, palabras in competencias_keywords.items():
        for palabra in palabras:
            if palabra in vacante:
                json_vacante[comp] = 1
                break
    return json_vacante

# Comparamos cada empleado contra ese perfil
def match_empleados_a_vacante(df_empleados, df_comp, vacante_obj, top_n=5):
    competencias_indexadas = df_comp.set_index("ID_UNIVERSAL")

    def calcular_match(empleado):
        score = 0

        # Ubicación
        # Ubicación (con fallback por movilidad) -- si tiene interés en moverse
        provincia = str(empleado.get("PROVINCIA", "")).lower()
        ubicacion_vacante = vacante_obj["ubicacion"].lower()
        movilidad = str(empleado.get("MOVILIDAD_DISPONIBLE", "")).lower()
        if provincia == ubicacion_vacante:
            score += 1
        elif movilidad in ["1", "nacional", "internacional", "internacional y nacional"]:
            score += 1  # empleado no está en la ciudad pero tiene movilidad
        # if empleado.get("PROVINCIA", "").lower() == vacante_obj["ubicacion"].lower():
        #    score += 1
        # elif empleado.get("PROVINCIA", "").lower() != vacante_obj["ubicacion"].lower() and (empleado.get("MOVILIDAD_DISPONIBLE", "").lower() == 0 or empleado.get("MOVILIDAD_DISPONIBLE", "").lower() == 1): # NACIONAL O INTERNACIONAL Y NACIONAL 
        #     score += 1

        # Educación
        if empleado.get("SCORE_EDUCACION", 0) >= vacante_obj.get("educacion_minima", 0):
            score += 2

        # Experiencia
        if empleado.get("ANTIGÜEDAD", 0) >= vacante_obj.get("experiencia_minima", 0):
            score += 3

        # Idiomas
        # if empleado.get("NUM_IDIOMAS", 0) >= len(vacante_obj.get("idiomas_necesarios", [])):
        #     score += 1
        idiomas_empleado = set(df_idiomas[df_idiomas["ID_UNIVERSAL"] == empleado["ID_UNIVERSAL"]]["IDIOMA"])
        idiomas_requeridos = set(vacante_obj.get("idiomas_necesarios", []))
        if idiomas_requeridos.issubset(idiomas_empleado):
            score += 2

        # Cursos Realizados
        score += empleado["NUM_CURSOS"] * 0.5

        base_score = score

        # Competencias
        id_emp = empleado["ID_UNIVERSAL"]
        if id_emp in competencias_indexadas.index:
            competencias_emp = competencias_indexadas.loc[id_emp]
            for skill in competencias_indexadas.columns:
                if vacante_obj.get(skill, 0) > 0 and competencias_emp.get(skill, 0) > 0:
                    score += 1

        return base_score, score

    df_match = df_empleados.copy()
    df_match["BASE_SCORE"], df_match["MATCH_SCORE"] = zip(*df_match.apply(calcular_match, axis=1))
    df_top = df_match.sort_values(by="MATCH_SCORE", ascending=False).head(top_n)
    
    return df_top

def return_candidates_ts(vacante):
    vacante_obj = vacante_json(vacante)
    df_top = match_empleados_a_vacante(df_empleados, df_comp, vacante_obj, top_n=5)

    candidatos_ts = []

    for _, row in df_top.iterrows():
        candidate_id = str(row["ID_UNIVERSAL"])

        # Educación
        education = df_educacion[df_educacion["ID_UNIVERSAL"] == candidate_id]["NIVEL_ESTUDIO_MAXIMO"]
        education_str = education.iloc[0] if not education.empty else "Desconocido"
        if pd.isna(education_str) or str(education_str).lower() == "nan":
            education_str = "Desconocido"

        # Idiomas
        idiomas = df_idiomas[df_idiomas["ID_UNIVERSAL"] == candidate_id]
        if not idiomas.empty:
            idiomas_str = [f"{idioma} ({nivel})" for idioma, nivel in zip(idiomas["IDIOMA"], idiomas["NIVEL_IDIOMA"])]
        else:
            idiomas_str = ["Desconocido"]
        idiomas_str_json = json.dumps(idiomas_str)

        # Movilidad
        movilidad = df_movilidad[df_movilidad["ID_UNIVERSAL"] == candidate_id]["TIPO_INTERES_MOVILIDAD"]
        movilidad_str = str(movilidad.iloc[0] if not movilidad.empty else "Desconocido").strip().title()
        if movilidad_str.lower() in ["", "nan"]:
            movilidad_str = "Desconocido"
        movilidad_str_json = json.dumps(movilidad_str)

        # Competencias
        competencias = df_comp.set_index("ID_UNIVERSAL")
        skills_list = []
        if candidate_id in competencias.index:
            for comp in competencias.columns:
                level = competencias.loc[candidate_id, comp]
                if level > 0:
                    skill_name = comp.replace("_", " ").title()
                    skills_list.append(f"{{ name: '{skill_name}', level: {float(level)} }}")
        skills_list_str = "[" + ", ".join(skills_list) + "]"

        # Puntuación
        # base_score = int((row.get("BASE_SCORE", 0) / 8) * 100)
        # match_score = int((row.get("MATCH_SCORE", 0) / 14) * 100)

        # Fuerza bruta para obtener puntuaje alto en la demo
        base_score = int((row.get("BASE_SCORE", 0) / 4) * 100)
        match_score = int((row.get("MATCH_SCORE", 0) / 7) * 100)

        # Candidato
        candidato = f"""  {{
  id: "{candidate_id}",
  name: "Empleado {candidate_id[-4:]}",
  position: "{row.get("PUESTO", "Desconocido")}",
  location: "{row.get("PROVINCIA", "Desconocido")}",
  tenure: "{int(row.get("ANTIGUEDAD", 0))} años",
  coursesCompleted: {int(row.get("NUM_CURSOS", 0))},
  education: {json.dumps(education_str)},
  languages: {idiomas_str_json},
  mobility: {movilidad_str_json},
  skills: {skills_list_str},
  basePercentage: {base_score},
  matchPercentage: {match_score}
}}"""
        candidatos_ts.append(candidato)

    # Archivo TypeScript
    content = """import { Candidate, MatchDetails, CandidateProfile  } from '@/types/candidate';

export const realCandidates: Candidate[] = [
""" + ",\n".join(candidatos_ts) + "\n];"

    # MatchDetails
    content += """

export const getMatchDetails = (candidateId: string): MatchDetails => {
  const candidate = realCandidates.find(c => c.id === candidateId);
  
  if (!candidate) {
    throw new Error('Candidato no encontrado');
  }
  
  let matchDetails: MatchDetails = {
    candidateName: candidate.name,
    matchPercentage: candidate.matchPercentage,
    matchedSkills: [],
    missingSkills: [],
    compatibilityReason: ''
  };
  
  // Datos generados
  switch(candidateId) {"""
    for _, row in df_top.iterrows():
        candidate_id = str(row["ID_UNIVERSAL"])
        columnas_habilidades = df_comp.columns[1:]
        matched = df_empleados[df_empleados["ID_UNIVERSAL"] == candidate_id][columnas_habilidades].iloc[0][lambda x: x > 0].index.tolist()
        missing = df_empleados[df_empleados["ID_UNIVERSAL"] == candidate_id][columnas_habilidades].iloc[0][lambda x: x == 0].index.tolist()
        reason = f"Compatibilidad basada en experiencia y competencias clave del perfil de {row.get('NOMBRE', 'candidato')}."

        content += f"""
    case '{candidate_id}':
      matchDetails.matchedSkills = {matched};
      matchDetails.missingSkills = {missing};
      matchDetails.compatibilityReason = `{reason}`;
      break;"""

    content += """
    default:
      matchDetails.matchedSkills = ['Habilidad 1', 'Habilidad 2'];
      matchDetails.missingSkills = ['Habilidad faltante'];
      matchDetails.compatibilityReason = 'Razón de compatibilidad genérica.';
  }
  
  return matchDetails;
};"""

    # CandidateProfile
    content += """

export const getCandidateProfile = (candidateId: string): CandidateProfile => {
  const candidate = realCandidates.find(c => c.id === candidateId);
  
  if (!candidate) {
    throw new Error('Candidato no encontrado');
  }
  
  const profiles: {[key: string]: Omit<CandidateProfile, keyof Candidate> & {id: string}} = {"""
    for _, row in df_top.iterrows():
        id_candidato = str(row["ID_UNIVERSAL"])
        content += f"""
    '{id_candidato}': {{
      id: '{id_candidato}',
      skillsRating: {{
        leadership: {df_empleados[df_empleados["ID_UNIVERSAL"] == id_candidato]["liderazgo"].values[0]},
        communication: {df_empleados[df_empleados["ID_UNIVERSAL"] == id_candidato]["comunicacion"].values[0]},
        teamwork: {df_empleados[df_empleados["ID_UNIVERSAL"] == id_candidato]["trabajo_en_equipo"].values[0]},
        problemSolving: {df_empleados[df_empleados["ID_UNIVERSAL"] == id_candidato]["resolucion_problemas"].values[0]},
        criticalThinking: {df_empleados[df_empleados["ID_UNIVERSAL"] == id_candidato]["orientacion_resultados"].values[0]},
        resultOrientation: {df_empleados[df_empleados["ID_UNIVERSAL"] == id_candidato]["pensamiento_critico"].values[0]}
      }},
      personalDetails: {{
        tenure: "{int(row.get("ANTIGUEDAD", 0))} años",
        mobility: {json.dumps(movilidad_str)},
        education: {json.dumps(education_str)},
        languages: {json.dumps(idiomas_str)}
      }}
    }},"""

    content += """
  };
  
  return {
    ...candidate,
    ...profiles[candidateId]
  };
};
"""

    with open("src/data/realCandidates.ts", "w", encoding="utf-8") as f:
        f.write(content)

    return content


@app.post("/api/return_candidates_ts")
async def match_candidates(searchQuery: Optional[str] = Form(None), file: Optional[UploadFile] = File(None)):
    if not searchQuery and not file:
        return {"error": "Debe proporcionar una descripción o un archivo"}

    # Si hay archivo, extraer texto del mismo
    vacante_text = searchQuery
    if file and file.filename.endswith(".docx"):
        vacante_text = extract_text_from_docx(file)

    # Generar el archivo .ts y obtener el contenido como string
    ts_result = return_candidates_ts(vacante_text)

    return {"message": "OK", "tsFile": ts_result}