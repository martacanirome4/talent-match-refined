
export interface Skill {
  name: string;
  level: number; // 1-3, donde 3 es el nivel más alto
}

export interface Candidate {
  id: string;
  name: string;
  position: string;
  location: string;
  tenure: string;
  coursesCompleted: number;
  education: string;
  languages: number;
  mobility: boolean;
  skills: Skill[];
  matchPercentage: number;
  avatar?: string;
}

export interface MatchDetails {
  candidateName: string;
  matchPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
  compatibilityReason: string;
}

export interface CandidateProfile extends Candidate {
  skillsRating: {
    leadership: number;
    communication: number;
    teamwork: number;
    problemSolving: number;
    criticalThinking: number;
    resultOrientation: number;
  };
  personalDetails: {
    tenure: string;
    mobility: boolean;
    education: string;
    languages: string[];
  };
}
