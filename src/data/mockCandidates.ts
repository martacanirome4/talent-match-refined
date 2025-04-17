
import { Candidate, MatchDetails, CandidateProfile } from '@/types/candidate';

export const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Carlos Martínez',
    position: 'Encargado de sección en Zara Madrid',
    location: 'Madrid',
    tenure: '3 años',
    coursesCompleted: 12,
    education: 'Grado en Administración de Empresas',
    languages: 2,
    mobility: true,
    skills: [
      { name: 'Resolución de conflictos', level: 3 },
      { name: 'Inglés', level: 3 },
      { name: 'Trabajo en equipo', level: 3 }
    ],
    matchPercentage: 100
  },
  {
    id: '2',
    name: 'Carmen Rodríguez',
    position: 'Encargada en Zara Sevilla',
    location: 'Sevilla',
    tenure: '5 años',
    coursesCompleted: 15,
    education: 'Grado en Marketing',
    languages: 3,
    mobility: true,
    skills: [
      { name: 'Gestión de stock', level: 3 },
      { name: 'Liderazgo', level: 3 },
      { name: 'Comunicación', level: 2 }
    ],
    matchPercentage: 100
  },
  {
    id: '3',
    name: 'Javier Moreno',
    position: 'Visual Merchandiser en Zara Málaga',
    location: 'Málaga',
    tenure: '2 años',
    coursesCompleted: 8,
    education: 'Grado en Diseño',
    languages: 2,
    mobility: false,
    skills: [
      { name: 'Creatividad', level: 3 },
      { name: 'Diseño gráfico', level: 2 },
      { name: 'Adaptabilidad', level: 3 }
    ],
    matchPercentage: 98
  },
  {
    id: '4',
    name: 'Laura Sánchez',
    position: 'Visual Merchandiser en Zara Valencia',
    location: 'Valencia',
    tenure: '1 año',
    coursesCompleted: 6,
    education: 'Grado en Bellas Artes',
    languages: 1,
    mobility: true,
    skills: [
      { name: 'Creatividad', level: 3 },
      { name: 'Diseño de interiores', level: 3 },
      { name: 'Adaptabilidad', level: 2 }
    ],
    matchPercentage: 92
  },
  {
    id: '5',
    name: 'Roberto Sánchez',
    position: 'Dependiente en Zara Bilbao',
    location: 'Bilbao',
    tenure: '6 meses',
    coursesCompleted: 4,
    education: 'Bachillerato',
    languages: 3,
    mobility: true,
    skills: [
      { name: 'Empatía', level: 3 },
      { name: 'TPV', level: 2 },
      { name: 'Adaptabilidad', level: 3 }
    ],
    matchPercentage: 89
  }
];

export const getMatchDetails = (candidateId: string): MatchDetails => {
  const candidate = mockCandidates.find(c => c.id === candidateId);
  
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
  
  // Datos ficticios según el candidato
  switch(candidateId) {
    case '1':
      matchDetails.matchedSkills = ['Gestión de equipos', 'Inglés C1', 'Orientación al detalle', 'Visual merchandising', 'Experiencia en retail'];
      matchDetails.missingSkills = ['Conocimiento avanzado de e-commerce'];
      matchDetails.compatibilityReason = 'Excelente compatibilidad con la posición de Encargado por su trayectoria progresiva y su experiencia en gestión de equipos.';
      break;
    case '2':
      matchDetails.matchedSkills = ['Liderazgo', 'Comunicación efectiva', 'Gestión de inventario', 'Francés B2', 'Inglés C1'];
      matchDetails.missingSkills = ['Experiencia internacional'];
      matchDetails.compatibilityReason = 'Gran candidata para puestos de responsabilidad por su capacidad de gestión y sus habilidades de comunicación con el equipo.';
      break;
    case '3':
      matchDetails.matchedSkills = ['Creatividad', 'Visual merchandising', 'Conocimiento de tendencias', 'Manejo de software de diseño'];
      matchDetails.missingSkills = ['Experiencia en coordinación de equipos', 'Inglés avanzado'];
      matchDetails.compatibilityReason = 'Perfil creativo ideal para visual merchandising por su formación en diseño y su experiencia previa en tienda.';
      break;
    case '4':
      matchDetails.matchedSkills = ['Diseño de espacios', 'Creatividad', 'Conocimiento de producto', 'Atención al detalle'];
      matchDetails.missingSkills = ['Experiencia en grandes superficies', 'Segundo idioma'];
      matchDetails.compatibilityReason = 'Candidata con gran potencial creativo y buen ojo para los escaparates y la distribución de producto en tienda.';
      break;
    case '5':
      matchDetails.matchedSkills = ['Atención al cliente', 'Manejo de TPV', 'Multilingüe', 'Adaptabilidad'];
      matchDetails.missingSkills = ['Experiencia en visual merchandising', 'Formación específica en moda'];
      matchDetails.compatibilityReason = 'Buen candidato para atención al cliente por su facilidad de comunicación y dominio de idiomas.';
      break;
    default:
      matchDetails.matchedSkills = ['Habilidad 1', 'Habilidad 2', 'Habilidad 3'];
      matchDetails.missingSkills = ['Habilidad faltante 1', 'Habilidad faltante 2'];
      matchDetails.compatibilityReason = 'Razón de compatibilidad genérica.';
  }
  
  return matchDetails;
};

export const getCandidateProfile = (candidateId: string): CandidateProfile => {
  const candidate = mockCandidates.find(c => c.id === candidateId);
  
  if (!candidate) {
    throw new Error('Candidato no encontrado');
  }
  
  // Perfiles detallados ficticios
  const profiles: {[key: string]: Omit<CandidateProfile, keyof Candidate> & {id: string}} = {
    '1': {
      id: '1',
      skillsRating: {
        leadership: 4,
        communication: 5,
        teamwork: 5,
        problemSolving: 4,
        criticalThinking: 3,
        resultOrientation: 4
      },
      personalDetails: {
        tenure: '3 años y 2 meses',
        mobility: true,
        education: 'Grado en Administración de Empresas, Universidad Complutense de Madrid',
        languages: ['Español (Nativo)', 'Inglés (C1)']
      }
    },
    '2': {
      id: '2',
      skillsRating: {
        leadership: 5,
        communication: 4,
        teamwork: 4,
        problemSolving: 4,
        criticalThinking: 3,
        resultOrientation: 5
      },
      personalDetails: {
        tenure: '5 años y 6 meses',
        mobility: true,
        education: 'Grado en Marketing, Universidad de Sevilla',
        languages: ['Español (Nativo)', 'Inglés (B2)', 'Francés (B1)']
      }
    },
    '3': {
      id: '3',
      skillsRating: {
        leadership: 3,
        communication: 4,
        teamwork: 4,
        problemSolving: 5,
        criticalThinking: 4,
        resultOrientation: 3
      },
      personalDetails: {
        tenure: '2 años y 3 meses',
        mobility: false,
        education: 'Grado en Diseño, Escuela de Arte de Málaga',
        languages: ['Español (Nativo)', 'Inglés (B1)']
      }
    },
    '4': {
      id: '4',
      skillsRating: {
        leadership: 2,
        communication: 3,
        teamwork: 3,
        problemSolving: 4,
        criticalThinking: 4,
        resultOrientation: 3
      },
      personalDetails: {
        tenure: '1 año y 8 meses',
        mobility: true,
        education: 'Grado en Bellas Artes, Universidad Politécnica de Valencia',
        languages: ['Español (Nativo)']
      }
    },
    '5': {
      id: '5',
      skillsRating: {
        leadership: 2,
        communication: 4,
        teamwork: 4,
        problemSolving: 3,
        criticalThinking: 3,
        resultOrientation: 4
      },
      personalDetails: {
        tenure: '6 meses',
        mobility: true,
        education: 'Bachillerato, Instituto Txurdinaga de Bilbao',
        languages: ['Español (Nativo)', 'Euskera (Nativo)', 'Inglés (B2)']
      }
    }
  };
  
  return {
    ...candidate,
    ...profiles[candidateId]
  };
};
