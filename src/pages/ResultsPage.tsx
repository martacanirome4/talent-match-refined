
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronUp, 
  Download, 
  Save,
  X,
  Sliders,
  FilePdf
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
import { Candidate, SkillFilter } from '@/types/candidate';
import FilterPanel from '@/components/FilterPanel';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface SkillFilters {
  leadership: number;
  communication: number;
  teamwork: number;
  problemSolving: number;
  criticalThinking: number;
}

const ResultsPage = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [showMatchDetails, setShowMatchDetails] = useState<string | null>(null);
  const [originalCandidates] = useState<Candidate[]>(mockCandidates);
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<SkillFilters>({
    leadership: 1,
    communication: 1,
    teamwork: 1,
    problemSolving: 1,
    criticalThinking: 1
  });
  const navigate = useNavigate();
  
  const handleSaveSearch = () => {
    // Get current search parameters (in a real app, these would come from the search form)
    const searchData = {
      id: `search-${Date.now()}`,
      vacancy: "Dependiente/a",
      location: "Madrid",
      skills: [
        { name: "Comunicación", level: activeFilters.communication },
        { name: "Trabajo en equipo", level: activeFilters.teamwork },
        { name: "Liderazgo", level: activeFilters.leadership },
        { name: "Resolución de problemas", level: activeFilters.problemSolving },
        { name: "Pensamiento crítico", level: activeFilters.criticalThinking }
      ],
      date: new Date().toLocaleDateString(),
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
    try {
      // Create a new PDF document
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(18);
      doc.text("Resultados de búsqueda - Zara Talent Match", 14, 20);
      
      // Add date
      doc.setFontSize(10);
      doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 30);
      
      // Create the table data
      const tableColumn = ["Nombre", "Puesto actual", "Ubicación", "Match", "Antigüedad", "Competencias"];
      const tableRows = candidates.map(candidate => [
        candidate.name,
        candidate.position,
        candidate.location,
        `${candidate.matchPercentage}%`,
        candidate.tenure,
        candidate.skills.map(s => s.name).join(", ")
      ]);
      
      // Add the table to the document
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 35,
        theme: 'grid',
        styles: { 
          fontSize: 9, 
          cellPadding: 3 
        },
        headStyles: {
          fillColor: [40, 40, 40],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        }
      });
      
      // Add filter information at the bottom
      doc.setFontSize(10);
      const filterY = doc.autoTable.previous.finalY + 10;
      doc.text("Filtros aplicados:", 14, filterY);
      doc.text(`• Liderazgo: ${activeFilters.leadership}`, 14, filterY + 5);
      doc.text(`• Comunicación: ${activeFilters.communication}`, 14, filterY + 10);
      doc.text(`• Trabajo en equipo: ${activeFilters.teamwork}`, 14, filterY + 15);
      doc.text(`• Resolución de problemas: ${activeFilters.problemSolving}`, 14, filterY + 20);
      doc.text(`• Pensamiento crítico: ${activeFilters.criticalThinking}`, 14, filterY + 25);
      
      // Save the document
      doc.save(`candidatos_${new Date().toLocaleDateString().replace(/\//g, '-')}.pdf`);
      
      toast({
        title: "Resultados exportados",
        description: "Los resultados han sido exportados en formato PDF.",
      });
    } catch (error) {
      console.error("Error al exportar a PDF:", error);
      toast({
        title: "Error al exportar",
        description: "Ha ocurrido un error al exportar los resultados.",
        variant: "destructive"
      });
    }
  };
  
  const handleNewSearch = () => {
    navigate('/');
  };
  
  const applyFilters = (filters: SkillFilters) => {
    console.log("Aplicando filtros:", filters);
    
    // Save the active filters
    setActiveFilters(filters);
    
    // Calculate new match percentages based on weights
    const filteredCandidates = originalCandidates.map(candidate => {
      // Map candidate skills to our filter categories
      const skillMap = new Map();
      candidate.skills.forEach(skill => {
        const name = skill.name.toLowerCase();
        if (name.includes('liderazgo')) skillMap.set('leadership', skill.level);
        if (name.includes('comunicación')) skillMap.set('communication', skill.level);
        if (name.includes('equipo')) skillMap.set('teamwork', skill.level);
        if (name.includes('problema')) skillMap.set('problemSolving', skill.level);
        if (name.includes('crítico')) skillMap.set('criticalThinking', skill.level);
      });
      
      // Calculate weighted match percentage
      let totalPoints = 0;
      let maxPoints = 0;
      
      Object.entries(filters).forEach(([key, weight]) => {
        const candidateLevel = skillMap.get(key) || 0;
        totalPoints += candidateLevel * weight;
        maxPoints += 3 * weight; // 3 is max skill level
      });
      
      const newMatchPercentage = Math.round((totalPoints / maxPoints) * 100);
      
      // Return updated candidate with new match percentage
      return {
        ...candidate,
        matchPercentage: newMatchPercentage
      };
    });
    
    // Sort by match percentage
    filteredCandidates.sort((a, b) => b.matchPercentage - a.matchPercentage);
    
    // Update state with new candidates list
    setCandidates(filteredCandidates);
    
    // Close the filter panel
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
            <FilePdf size={16} className="mr-2" />
            EXPORTAR PDF
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
              <FilterPanel onApplyFilters={applyFilters} initialFilters={activeFilters} />
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
