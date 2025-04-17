
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronUp, 
  Download, 
  Save,
  X,
  Sliders
} from 'lucide-react';
import { 
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/button';
import CandidateCard from '@/components/CandidateCard';
import CandidateProfileModal from '@/components/CandidateProfileModal';
import MatchDetailsModal from '@/components/MatchDetailsModal';
import { mockCandidates } from '@/data/mockCandidates';
import { toast } from '@/components/ui/use-toast';
import { Candidate } from '@/types/candidate';

const ResultsPage = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [showMatchDetails, setShowMatchDetails] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const navigate = useNavigate();
  
  const handleSaveSearch = () => {
    toast({
      title: "Búsqueda guardada",
      description: "La búsqueda ha sido guardada correctamente.",
    });
  };
  
  const handleExportResults = () => {
    toast({
      title: "Resultados exportados",
      description: "Los resultados han sido exportados en formato CSV.",
    });
  };
  
  const handleNewSearch = () => {
    navigate('/');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-light">Candidatos ({candidates.length})</h1>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={handleSaveSearch}
            className="flex items-center text-sm border border-zara-gray-300 hover:bg-zara-gray-100"
          >
            <Save size={16} className="mr-2" />
            GUARDAR
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleExportResults}
            className="flex items-center text-sm border border-zara-gray-300 hover:bg-zara-gray-100"
          >
            <Download size={16} className="mr-2" />
            EXPORTAR
          </Button>
          
          <Button 
            variant="outline"
            className="flex items-center text-sm border border-zara-gray-300 hover:bg-zara-gray-100"
          >
            <Sliders size={16} className="mr-2" />
            FILTROS
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleNewSearch}
            className="flex items-center text-sm border border-zara-gray-300 hover:bg-zara-gray-100"
          >
            <X size={16} className="mr-2" />
            NUEVA BÚSQUEDA
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {candidates.map((candidate) => (
          <CandidateCard 
            key={candidate.id}
            candidate={candidate}
            onViewProfile={() => setSelectedCandidate(candidate.id)}
            onViewMatch={() => setShowMatchDetails(candidate.id)}
          />
        ))}
      </div>
      
      {/* Modal para ver el perfil completo */}
      {selectedCandidate && (
        <CandidateProfileModal 
          candidateId={selectedCandidate}
          isOpen={!!selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}
      
      {/* Modal para ver detalles del match */}
      {showMatchDetails && (
        <MatchDetailsModal 
          candidateId={showMatchDetails}
          isOpen={!!showMatchDetails}
          onClose={() => setShowMatchDetails(null)}
        />
      )}
    </div>
  );
};

export default ResultsPage;
