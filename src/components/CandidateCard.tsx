
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Candidate } from '@/types/candidate';

interface CandidateCardProps {
  candidate: Candidate;
  onViewProfile: () => void;
  onViewMatch: () => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ 
  candidate, 
  onViewProfile,
  onViewMatch
}) => {
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };
  
  return (
    <div className="border-t border-zara-gray-200 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full bg-zara-gray-200 flex items-center justify-center text-xl font-medium mr-6">
            {candidate.avatar ? (
              <img 
                src={candidate.avatar} 
                alt={candidate.name} 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              getInitial(candidate.name)
            )}
          </div>
          
          <div>
            <h3 
              className="text-lg font-medium mb-1 cursor-pointer hover:underline" 
              onClick={onViewProfile}
            >
              {candidate.name}
            </h3>
            <p className="text-zara-gray-600 mb-2">{candidate.position}</p>
            
            <div className="flex flex-wrap">
              {candidate.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <button 
            onClick={onViewMatch}
            className="text-xl font-medium mb-2 flex items-center hover:underline cursor-pointer"
          >
            {candidate.matchPercentage}%
            <ChevronDown size={18} className="ml-1" />
          </button>
          
          <Button 
            variant="ghost"
            className="text-sm text-zara-gray-600 hover:text-zara-black hover:bg-transparent p-0 h-auto"
            onClick={onViewProfile}
          >
            VER PERFIL
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
