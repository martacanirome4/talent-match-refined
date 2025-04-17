
import React from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { getMatchDetails } from '@/data/mockCandidates';

interface MatchDetailsModalProps {
  candidateId: string;
  isOpen: boolean;
  onClose: () => void;
}

const MatchDetailsModal: React.FC<MatchDetailsModalProps> = ({
  candidateId,
  isOpen,
  onClose
}) => {
  const matchDetails = React.useMemo(() => {
    return getMatchDetails(candidateId);
  }, [candidateId]);
  
  if (!isOpen) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="text-xl font-medium">
            Compatibilidad de {matchDetails.candidateName}
          </DialogTitle>
          <X className="cursor-pointer" onClick={onClose} />
        </DialogHeader>
        
        <div className="mt-6 space-y-6">
          <div>
            <p className="text-lg mb-2">Porcentaje general: {matchDetails.matchPercentage}%</p>
            <Progress value={matchDetails.matchPercentage} className="h-2 bg-zara-gray-200" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">Habilidades</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                {matchDetails.matchedSkills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Oportunidades de mejora</h3>
              {matchDetails.missingSkills.length > 0 ? (
                <ul className="list-disc list-inside text-sm space-y-1">
                  {matchDetails.missingSkills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm">Ninguna</p>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Trayectoria compatible</h3>
            <p className="text-sm">{matchDetails.compatibilityReason}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MatchDetailsModal;
