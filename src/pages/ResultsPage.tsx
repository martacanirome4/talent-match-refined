
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
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import CandidateCard from '@/components/CandidateCard';
import CandidateProfileModal from '@/components/CandidateProfileModal';
import MatchDetailsModal from '@/components/MatchDetailsModal';
import { mockCandidates } from '@/data/mockCandidates';
import { toast } from '@/components/ui/use-toast';
import { Candidate } from '@/types/candidate';
import FilterPanel from '@/components/FilterPanel';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const ResultsPage = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [showMatchDetails, setShowMatchDetails] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleSaveSearch = () => {
    // Get current search parameters (in a real app, these would come from the search form)
    const searchData = {
      vacancy: "Dependiente/a",
      location: "Madrid",
      skills: [
        { name: "Comunicación", level: 3 },
        { name: "Trabajo en equipo", level: 2 },
        { name: "Atención al cliente", level: 3 }
      ],
      date: new Date().toISOString(),
      candidateIds: candidates.map(c => c.id)
    };
    
    // Save to localStorage
    const savedSearches = JSON.parse(localStorage.getItem('savedSearches') || '[]');
    savedSearches.push(searchData);
    localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
    
    toast({
      title: "Búsqueda guardada",
      description: "La búsqueda ha sido guardada correctamente.",
    });
  };
  
  const handleExportResults = () => {
    // Create CSV content
    const headers = ["Nombre", "Puesto actual", "Ubicación", "Match", "Antigüedad", "Cursos", "Idiomas", "Movilidad", "Competencias"];
    
    const rows = candidates.map(candidate => [
      candidate.name,
      candidate.position,
      candidate.location,
      `${candidate.matchPercentage}%`,
      candidate.tenure,
      candidate.coursesCompleted,
      candidate.languages,
      candidate.mobility ? "Sí" : "No",
      candidate.skills.map(s => s.name).join(", ")
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `candidatos_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Resultados exportados",
      description: "Los resultados han sido exportados en formato CSV.",
    });
  };
  
  const handleNewSearch = () => {
    navigate('/');
  };
  
  const handleFilterChange = (filters: any) => {
    // Aquí implementaríamos la lógica real de filtrado basada en los valores del panel de filtros
    console.log("Filtros aplicados:", filters);
    // Para simulación, solo cerramos el panel
    setIsFilterOpen(false);
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
          
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="outline"
                className="flex items-center text-sm border border-zara-gray-300 hover:bg-zara-gray-100"
              >
                <Sliders size={16} className="mr-2" />
                FILTROS
              </Button>
            </SheetTrigger>
            <SheetContent>
              <FilterPanel onApplyFilters={handleFilterChange} />
            </SheetContent>
          </Sheet>
          
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
