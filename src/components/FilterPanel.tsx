
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  MessageSquare, 
  Users, 
  Wrench, 
  Lightbulb
} from 'lucide-react';

interface FilterPanelProps {
  onApplyFilters: (filters: SkillFilters) => void;
}

interface SkillFilters {
  leadership: number;
  communication: number;
  teamwork: number;
  problemSolving: number;
  criticalThinking: number;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState<SkillFilters>({
    leadership: 1,
    communication: 1,
    teamwork: 1,
    problemSolving: 1,
    criticalThinking: 1
  });
  
  const handleSliderChange = (skill: keyof SkillFilters, value: number[]) => {
    setFilters(prev => ({
      ...prev,
      [skill]: value[0]
    }));
  };
  
  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };
  
  return (
    <div className="p-1">
      <h2 className="text-xl font-medium mb-6">Filtros y pesos de habilidades</h2>
      <p className="text-sm text-zara-gray-600 mb-6">
        Ajuste la importancia de cada habilidad para esta vacante específica (1-3)
      </p>
      
      <div className="space-y-8">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              <Label>Liderazgo</Label>
            </div>
            <span className="font-medium">{filters.leadership}</span>
          </div>
          <Slider 
            value={[filters.leadership]} 
            min={1} 
            max={3} 
            step={1}
            onValueChange={(value) => handleSliderChange('leadership', value)}
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              <Label>Comunicación</Label>
            </div>
            <span className="font-medium">{filters.communication}</span>
          </div>
          <Slider 
            value={[filters.communication]} 
            min={1} 
            max={3} 
            step={1}
            onValueChange={(value) => handleSliderChange('communication', value)} 
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              <Label>Trabajo en equipo</Label>
            </div>
            <span className="font-medium">{filters.teamwork}</span>
          </div>
          <Slider 
            value={[filters.teamwork]} 
            min={1} 
            max={3} 
            step={1}
            onValueChange={(value) => handleSliderChange('teamwork', value)} 
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Wrench className="mr-2 h-5 w-5" />
              <Label>Resolución de problemas</Label>
            </div>
            <span className="font-medium">{filters.problemSolving}</span>
          </div>
          <Slider 
            value={[filters.problemSolving]} 
            min={1} 
            max={3} 
            step={1}
            onValueChange={(value) => handleSliderChange('problemSolving', value)} 
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="mr-2 h-5 w-5" />
              <Label>Pensamiento crítico</Label>
            </div>
            <span className="font-medium">{filters.criticalThinking}</span>
          </div>
          <Slider 
            value={[filters.criticalThinking]} 
            min={1} 
            max={3} 
            step={1}
            onValueChange={(value) => handleSliderChange('criticalThinking', value)} 
          />
        </div>
      </div>
      
      <div className="mt-8">
        <Button 
          onClick={handleApplyFilters}
          className="w-full bg-zara-black text-white hover:bg-zara-gray-800"
        >
          Aplicar filtros
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;
