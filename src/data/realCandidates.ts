import { Candidate, MatchDetails, CandidateProfile  } from '@/types/candidate';

export const realCandidates: Candidate[] = [
  {
  id: "1668993",
  name: "Empleado 8993",
  position: "03. Department Manager",
  location: "Madrid",
  tenure: "6 años",
  coursesCompleted: 1,
  education: 0.0,
  languages: ["Desconocido"],
  mobility: "0.0",
  skills: [{ name: 'Liderazgo', level: 0.119056526735277 }, { name: 'Comunicacion', level: 0.1240994359762759 }, { name: 'Trabajo En Equipo', level: 0.0854306234593137 }, { name: 'Orientacion Resultados', level: 0.1092537256416497 }],
  basePercentage: 37,
  matchPercentage: 78
},
  {
  id: "1285964",
  name: "Empleado 5964",
  position: "02. Deputy Manager",
  location: "Madrid",
  tenure: "11 años",
  coursesCompleted: 1,
  education: 0.0,
  languages: ["ingl\u00e9s (Medio)"],
  mobility: "0.0",
  skills: [{ name: 'Liderazgo', level: 0.1156253440531649 }, { name: 'Comunicacion', level: 0.1234185526833469 }, { name: 'Trabajo En Equipo', level: 0.042917298910847 }, { name: 'Resolucion Problemas', level: 0.0875138966046283 }, { name: 'Orientacion Resultados', level: 0.1962456663253175 }],
  basePercentage: 37,
  matchPercentage: 78
},
  {
  id: "111845",
  name: "Empleado 1845",
  position: "01. Store Manager",
  location: "Madrid",
  tenure: "19 años",
  coursesCompleted: 1,
  education: 0.0,
  languages: ["Desconocido"],
  mobility: "0.0",
  skills: [{ name: 'Liderazgo', level: 0.1796708924240928 }, { name: 'Comunicacion', level: 0.1640242314395211 }, { name: 'Trabajo En Equipo', level: 0.1399552774195937 }, { name: 'Orientacion Resultados', level: 0.304947278572577 }],
  basePercentage: 37,
  matchPercentage: 78
},
  {
  id: "1611457",
  name: "Empleado 1457",
  position: "11. Head Cashier",
  location: "Madrid",
  tenure: "8 años",
  coursesCompleted: 1,
  education: 0.0,
  languages: ["ingl\u00e9s (Bajo)"],
  mobility: "0.0",
  skills: [{ name: 'Liderazgo', level: 0.1402705873177268 }, { name: 'Comunicacion', level: 0.0886747409303186 }, { name: 'Trabajo En Equipo', level: 0.0594473186646574 }, { name: 'Orientacion Resultados', level: 0.1287210763041948 }],
  basePercentage: 37,
  matchPercentage: 78
},
  {
  id: "1641928",
  name: "Empleado 1928",
  position: "01. Store Manager",
  location: "Las Palmas",
  tenure: "7 años",
  coursesCompleted: 1,
  education: 0.0,
  languages: ["Desconocido"],
  mobility: "0.0",
  skills: [{ name: 'Liderazgo', level: 0.1355721738756548 }, { name: 'Comunicacion', level: 0.1852638050666223 }, { name: 'Trabajo En Equipo', level: 0.1499281503910088 }, { name: 'Resolucion Problemas', level: 0.144535322553944 }, { name: 'Orientacion Resultados', level: 0.1297465826685395 }],
  basePercentage: 12,
  matchPercentage: 64
}
];

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
  switch(candidateId) {
    case '1668993':
      matchDetails.matchedSkills = ['liderazgo', 'comunicacion', 'trabajo_en_equipo', 'orientacion_resultados'];
      matchDetails.missingSkills = ['resolucion_problemas', 'pensamiento_critico'];
      matchDetails.compatibilityReason = `Compatibilidad basada en experiencia y competencias clave del perfil de candidato.`;
      break;
    case '1285964':
      matchDetails.matchedSkills = ['liderazgo', 'comunicacion', 'trabajo_en_equipo', 'resolucion_problemas', 'orientacion_resultados'];
      matchDetails.missingSkills = ['pensamiento_critico'];
      matchDetails.compatibilityReason = `Compatibilidad basada en experiencia y competencias clave del perfil de candidato.`;
      break;
    case '111845':
      matchDetails.matchedSkills = ['liderazgo', 'comunicacion', 'trabajo_en_equipo', 'orientacion_resultados'];
      matchDetails.missingSkills = ['resolucion_problemas', 'pensamiento_critico'];
      matchDetails.compatibilityReason = `Compatibilidad basada en experiencia y competencias clave del perfil de candidato.`;
      break;
    case '1611457':
      matchDetails.matchedSkills = ['liderazgo', 'comunicacion', 'trabajo_en_equipo', 'orientacion_resultados'];
      matchDetails.missingSkills = ['resolucion_problemas', 'pensamiento_critico'];
      matchDetails.compatibilityReason = `Compatibilidad basada en experiencia y competencias clave del perfil de candidato.`;
      break;
    case '1641928':
      matchDetails.matchedSkills = ['liderazgo', 'comunicacion', 'trabajo_en_equipo', 'resolucion_problemas', 'orientacion_resultados'];
      matchDetails.missingSkills = ['pensamiento_critico'];
      matchDetails.compatibilityReason = `Compatibilidad basada en experiencia y competencias clave del perfil de candidato.`;
      break;
    default:
      matchDetails.matchedSkills = ['Habilidad 1', 'Habilidad 2'];
      matchDetails.missingSkills = ['Habilidad faltante'];
      matchDetails.compatibilityReason = 'Razón de compatibilidad genérica.';
  }
  
  return matchDetails;
};

export const getCandidateProfile = (candidateId: string): CandidateProfile => {
  const candidate = realCandidates.find(c => c.id === candidateId);
  
  if (!candidate) {
    throw new Error('Candidato no encontrado');
  }
  
  const profiles: {[key: string]: Omit<CandidateProfile, keyof Candidate> & {id: string}} = {
    '1668993': {
      id: '1668993',
      skillsRating: {
        leadership: 0.119056526735277,
        communication: 0.1240994359762759,
        teamwork: 0.0854306234593137,
        problemSolving: 0.0,
        criticalThinking: 0.1092537256416497,
        resultOrientation: 0.0
      },
      personalDetails: {
        tenure: "6 años",
        mobility: "0.0",
        education: 0.0,
        languages: ["Desconocido"]
      }
    },
    '1285964': {
      id: '1285964',
      skillsRating: {
        leadership: 0.1156253440531649,
        communication: 0.1234185526833469,
        teamwork: 0.042917298910847,
        problemSolving: 0.0875138966046283,
        criticalThinking: 0.1962456663253175,
        resultOrientation: 0.0
      },
      personalDetails: {
        tenure: "11 años",
        mobility: "0.0",
        education: 0.0,
        languages: ["Desconocido"]
      }
    },
    '111845': {
      id: '111845',
      skillsRating: {
        leadership: 0.1796708924240928,
        communication: 0.1640242314395211,
        teamwork: 0.1399552774195937,
        problemSolving: 0.0,
        criticalThinking: 0.304947278572577,
        resultOrientation: 0.0
      },
      personalDetails: {
        tenure: "19 años",
        mobility: "0.0",
        education: 0.0,
        languages: ["Desconocido"]
      }
    },
    '1611457': {
      id: '1611457',
      skillsRating: {
        leadership: 0.1402705873177268,
        communication: 0.0886747409303186,
        teamwork: 0.0594473186646574,
        problemSolving: 0.0,
        criticalThinking: 0.1287210763041948,
        resultOrientation: 0.0
      },
      personalDetails: {
        tenure: "8 años",
        mobility: "0.0",
        education: 0.0,
        languages: ["Desconocido"]
      }
    },
    '1641928': {
      id: '1641928',
      skillsRating: {
        leadership: 0.1355721738756548,
        communication: 0.1852638050666223,
        teamwork: 0.1499281503910088,
        problemSolving: 0.144535322553944,
        criticalThinking: 0.1297465826685395,
        resultOrientation: 0.0
      },
      personalDetails: {
        tenure: "7 años",
        mobility: "0.0",
        education: 0.0,
        languages: ["Desconocido"]
      }
    },
  };
  
  return {
    ...candidate,
    ...profiles[candidateId]
  };
};
