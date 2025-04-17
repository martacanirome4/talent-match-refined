
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery && !fileName) {
      toast({
        title: "Información requerida",
        description: "Por favor, ingresa una descripción o sube un archivo",
        variant: "destructive",
      });
      return;
    }
    
    // En una aplicación real, aquí enviaríamos los datos al backend
    // Por ahora, simulamos y navegamos a la página de resultados
    navigate('/resultados');
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      if (!file.name.endsWith('.docx')) {
        toast({
          title: "Formato incorrecto",
          description: "Por favor, sube un archivo con formato .docx",
          variant: "destructive",
        });
        return;
      }
      
      setIsUploading(true);
      
      // Simulamos la carga del archivo
      setTimeout(() => {
        setFileName(file.name);
        setIsUploading(false);
        toast({
          title: "Archivo cargado",
          description: `${file.name} se ha procesado correctamente.`,
        });
      }, 1500);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-zara-black');
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-zara-black');
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-zara-black');
    
    const file = e.dataTransfer.files?.[0];
    
    if (file) {
      if (!file.name.endsWith('.docx')) {
        toast({
          title: "Formato incorrecto",
          description: "Por favor, sube un archivo con formato .docx",
          variant: "destructive",
        });
        return;
      }
      
      setIsUploading(true);
      
      // Simulamos la carga del archivo
      setTimeout(() => {
        setFileName(file.name);
        setIsUploading(false);
        toast({
          title: "Archivo cargado",
          description: `${file.name} se ha procesado correctamente.`,
        });
      }, 1500);
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <div className="min-h-[calc(100vh-76px)] flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-3xl font-light mb-12">ENCUENTRA TU CANDIDATO IDEAL</h1>
        
        <form onSubmit={handleSearch} className="mb-10">
          <div className="relative mb-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Dependienta en Málaga con alto nivel de inglés y buena capacidad de trabajo en equipo"
              className="zara-input text-center"
            />
          </div>
          
          <div 
            className="border-2 border-dashed border-zara-gray-300 rounded-sm p-8 mb-8 transition-colors duration-200 hover:border-zara-gray-500 cursor-pointer"
            onClick={triggerFileInput}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".docx"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />
            
            <div className="flex flex-col items-center justify-center">
              <Upload size={32} className="text-zara-gray-500 mb-4" />
              
              {isUploading ? (
                <p className="text-zara-gray-600">Procesando archivo...</p>
              ) : fileName ? (
                <p className="text-zara-gray-800">{fileName}</p>
              ) : (
                <>
                  <p className="text-zara-gray-800 mb-2">Drag and drop file here — Limit 200MB per file • DOCX</p>
                  <p className="text-zara-gray-500 text-sm">o haz click para seleccionar un archivo</p>
                </>
              )}
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="zara-button w-64"
          >
            BUSCAR CANDIDATOS
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Index;
