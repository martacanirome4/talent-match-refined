import { Candidate, MatchDetails, CandidateProfile  } from '@/types/candidate';

export const realCandidates: Candidate[] = [
  {
    id: "1601774",
    name: "Desconocido",
    position: "Desconocido",
    location: "Madrid",
    tenure: "9 años",
    coursesCompleted: 80,
    education: "Ciclos formativos de grado medio o superior",
    languages: ['Inglés  (Medio)'],
    mobility: "INTERNACIONAL Y NACIONAL",
    skills: [{ name: 'Comunicacion', level: 0.1372149121046274 }, { name: 'Trabajo En Equipo', level: 0.0944608935282082 }, { name: 'Orientacion Resultados', level: 0.1209490625618464 }],
    basePercentage: 50,
    matchPercentage: 50
  },
  {
    id: "1643443",
    name: "Desconocido",
    position: "Desconocido",
    location: "Madrid",
    tenure: "6 años",
    coursesCompleted: 39,
    education: "MBA",
    languages: ['Español (Alto)'],
    mobility: "INTERNACIONAL Y NACIONAL",
    skills: [{ name: 'Comunicacion', level: 0.0918258620871567 }, { name: 'Trabajo En Equipo', level: 0.1580530545015999 }, { name: 'Orientacion Resultados', level: 0.1500027236730848 }],
    basePercentage: 50,
    matchPercentage: 50
  },
  {
    id: "134406",
    name: "Desconocido",
    position: "Desconocido",
    location: "Madrid",
    tenure: "18 años",
    coursesCompleted: 42,
    education: "Titulación universitaria de grado superior",
    languages: ['Español (Dominio completo)'],
    mobility: "INTERNACIONAL Y NACIONAL",
    skills: [{ name: 'Comunicacion', level: 0.0804878485429299 }, { name: 'Trabajo En Equipo', level: 0.2550527319760833 }, { name: 'Orientacion Resultados', level: 0.4689721471205864 }],
    basePercentage: 50,
    matchPercentage: 50
  },
  {
    id: "1643293",
    name: "Desconocido",
    position: "Desconocido",
    location: "Barcelona",
    tenure: "7 años",
    coursesCompleted: 39,
    education: "Grado (Bolonia)",
    languages: ['Catalán  (Dominio completo)'],
    mobility: "INTERNACIONAL",
    skills: [{ name: 'Liderazgo', level: 0.2499886731911664 }, { name: 'Comunicacion', level: 0.0997277705735506 }, { name: 'Trabajo En Equipo', level: 0.091329826858549 }, { name: 'Orientacion Resultados', level: 0.1249958519307296 }],
    basePercentage: 37,
    matchPercentage: 42
  },
  {
    id: "1669997",
    name: "Desconocido",
    position: "Desconocido",
    location: "Madrid",
    tenure: "6 años",
    coursesCompleted: 30,
    education: "Ciclos formativos de grado medio o superior",
    languages: ['Francés (Bajo)'],
    mobility: "INTERNACIONAL Y NACIONAL",
    skills: [{ name: 'Comunicacion', level: 0.1385792677434583 }, { name: 'Trabajo En Equipo', level: 0.1573012906108414 }],
    basePercentage: 50,
    matchPercentage: 42
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
    case '1601774':
      matchDetails.matchedSkills = ['comunicacion', 'trabajo_en_equipo', 'orientacion_resultados'];
      matchDetails.missingSkills = ['liderazgo', 'resolucion_problemas', 'pensamiento_critico'];
      matchDetails.compatibilityReason = `Compatibilidad basada en experiencia y competencias clave del perfil de candidato.`;
      break;
    case '1643443':
      matchDetails.matchedSkills = ['comunicacion', 'trabajo_en_equipo', 'orientacion_resultados'];
      matchDetails.missingSkills = ['liderazgo', 'resolucion_problemas', 'pensamiento_critico'];
      matchDetails.compatibilityReason = `Compatibilidad basada en experiencia y competencias clave del perfil de candidato.`;
      break;
    case '134406':
      matchDetails.matchedSkills = ['comunicacion', 'trabajo_en_equipo', 'orientacion_resultados'];
      matchDetails.missingSkills = ['liderazgo', 'resolucion_problemas', 'pensamiento_critico'];
      matchDetails.compatibilityReason = `Compatibilidad basada en experiencia y competencias clave del perfil de candidato.`;
      break;
    case '1643293':
      matchDetails.matchedSkills = ['liderazgo', 'comunicacion', 'trabajo_en_equipo', 'orientacion_resultados'];
      matchDetails.missingSkills = ['resolucion_problemas', 'pensamiento_critico'];
      matchDetails.compatibilityReason = `Compatibilidad basada en experiencia y competencias clave del perfil de candidato.`;
      break;
    case '1669997':
      matchDetails.matchedSkills = ['comunicacion', 'trabajo_en_equipo'];
      matchDetails.missingSkills = ['liderazgo', 'resolucion_problemas', 'orientacion_resultados', 'pensamiento_critico'];
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
    '1601774': {
      id: '1601774',
      skillsRating: {
        leadership: 0.0,
        communication: 0.1372149121046274,
        teamwork: 0.0944608935282082,
        problemSolving: 0.0,
        criticalThinking: 0.1209490625618464,
        resultOrientation: 0.0
      },
      personalDetails: {
        tenure: "9 años",
        mobility: "INTERNACIONAL Y NACIONAL",
        education: "Ciclos formativos de grado medio o superior",
        languages: ['Francés (Bajo)']
      }
    },
    '1643443': {
      id: '1643443',
      skillsRating: {
        leadership: 0.0,
        communication: 0.0918258620871567,
        teamwork: 0.1580530545015999,
        problemSolving: 0.0,
        criticalThinking: 0.1500027236730848,
        resultOrientation: 0.0
      },
      personalDetails: {
        tenure: "6 años",
        mobility: "INTERNACIONAL Y NACIONAL",
        education: "Ciclos formativos de grado medio o superior",
        languages: ['Francés (Bajo)']
      }
    },
    '134406': {
      id: '134406',
      skillsRating: {
        leadership: 0.0,
        communication: 0.0804878485429299,
        teamwork: 0.2550527319760833,
        problemSolving: 0.0,
        criticalThinking: 0.4689721471205864,
        resultOrientation: 0.0
      },
      personalDetails: {
        tenure: "18 años",
        mobility: "INTERNACIONAL Y NACIONAL",
        education: "Ciclos formativos de grado medio o superior",
        languages: ['Francés (Bajo)']
      }
    },
    '1643293': {
      id: '1643293',
      skillsRating: {
        leadership: 0.2499886731911664,
        communication: 0.0997277705735506,
        teamwork: 0.091329826858549,
        problemSolving: 0.0,
        criticalThinking: 0.1249958519307296,
        resultOrientation: 0.0
      },
      personalDetails: {
        tenure: "7 años",
        mobility: "INTERNACIONAL Y NACIONAL",
        education: "Ciclos formativos de grado medio o superior",
        languages: ['Francés (Bajo)']
      }
    },
    '1669997': {
      id: '1669997',
      skillsRating: {
        leadership: 0.0,
        communication: 0.1385792677434583,
        teamwork: 0.1573012906108414,
        problemSolving: 0.0,
        criticalThinking: 0.0,
        resultOrientation: 0.0
      },
      personalDetails: {
        tenure: "6 años",
        mobility: "INTERNACIONAL Y NACIONAL",
        education: "Ciclos formativos de grado medio o superior",
        languages: ['Francés (Bajo)']
      }
    },
  };
  
  return {
    ...candidate,
    ...profiles[candidateId]
  };
};
