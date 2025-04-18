
import React from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';
import { getCandidateProfile } from '@/data/realCandidates';

interface CandidateProfileModalProps {
  candidateId: string;
  isOpen: boolean;
  onClose: () => void;
}

const CandidateProfileModal: React.FC<CandidateProfileModalProps> = ({
  candidateId,
  isOpen,
  onClose
}) => {
  const candidateProfile = React.useMemo(() => {
    return getCandidateProfile(candidateId);
  }, [candidateId]);
  
  const skillsData = [
    { skill: 'Liderazgo', value: candidateProfile.skillsRating.leadership*30 },
    { skill: 'Comunicación', value: candidateProfile.skillsRating.communication*30 },
    { skill: 'Trabajo en Equipo', value: candidateProfile.skillsRating.teamwork*30 },
    { skill: 'Resolución de Problemas', value: candidateProfile.skillsRating.problemSolving*30 },
    { skill: 'Pensamiento Crítico', value: candidateProfile.skillsRating.criticalThinking*30 },
    { skill: 'Orientación a Resultados', value: candidateProfile.skillsRating.resultOrientation*30 }
  ];
  
  if (!isOpen) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="text-xl font-medium">
            {candidateProfile.name}
          </DialogTitle>
          <X className="cursor-pointer" onClick={onClose} />
        </DialogHeader>
        
        <div className="mt-6">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-zara-gray-200 flex items-center justify-center text-2xl font-medium mr-6">
              {candidateProfile.name.charAt(0)}
            </div>
            
            <div>
              <h2 className="text-xl font-medium">{candidateProfile.name}</h2>
              <p className="text-zara-gray-600">{candidateProfile.position}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4 uppercase">Competencias</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="skill" />
                    <PolarRadiusAxis angle={30} domain={[0, 5]} />
                    <Radar
                      name="Skills"
                      dataKey="value"
                      stroke="#000000"
                      fill="#000000"
                      fillOpacity={0.2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4 uppercase">Datos personales</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-zara-gray-600 text-sm">Antigüedad</p>
                  <p>{candidateProfile.personalDetails.tenure}</p>
                </div>
                
                <div>
                  <p className="text-zara-gray-600 text-sm">Disponibilidad de movilidad</p>
                  <p>{candidateProfile.personalDetails.mobility}</p>
                </div>
                
                <div>
                  <p className="text-zara-gray-600 text-sm">Formación</p>
                  <p>{candidateProfile.personalDetails.education}</p>
                </div>
                
                <div>
                  <p className="text-zara-gray-600 text-sm">Idiomas</p>
                  <ul className="list-disc list-inside">
                    {candidateProfile.personalDetails.languages.map((language, index) => (
                      <li key={index}>{language}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <p className="text-zara-gray-600 text-sm">Cursos completados</p>
                  <p>{candidateProfile.coursesCompleted}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CandidateProfileModal;
