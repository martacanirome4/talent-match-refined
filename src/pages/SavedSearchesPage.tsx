
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Trash2, 
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from '@/components/ui/use-toast';

interface SavedSearch {
  vacancy: string;
  location: string;
  skills: {
    name: string;
    level: number;
  }[];
  date: string;
  candidateIds: string[];
}

const SavedSearchesPage = () => {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Cargar las búsquedas guardadas desde localStorage
    const searches = JSON.parse(localStorage.getItem('savedSearches') || '[]');
    setSavedSearches(searches);
  }, []);
  
  const handleViewResults = (search: SavedSearch) => {
    // En un escenario real, aquí cargaríamos los resultados de esta búsqueda específica
    // Por ahora, solo navegamos a la página de resultados
    navigate('/resultados');
  };
  
  const confirmDelete = (index: number) => {
    setDeleteIndex(index);
    setDeleteDialogOpen(true);
  };
  
  const handleDelete = () => {
    if (deleteIndex !== null) {
      // Eliminar la búsqueda del array
      const updatedSearches = [...savedSearches];
      updatedSearches.splice(deleteIndex, 1);
      
      // Actualizar localStorage
      localStorage.setItem('savedSearches', JSON.stringify(updatedSearches));
      setSavedSearches(updatedSearches);
      
      // Cerrar diálogo y mostrar notificación
      setDeleteDialogOpen(false);
      setDeleteIndex(null);
      
      toast({
        title: "Búsqueda eliminada",
        description: "La búsqueda ha sido eliminada correctamente.",
      });
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-light mb-8">Búsquedas guardadas</h1>
      
      {savedSearches.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-zara-gray-500 mb-4">No hay búsquedas guardadas</p>
          <Button 
            onClick={() => navigate('/')}
            className="bg-zara-black text-white hover:bg-zara-gray-800"
          >
            Realizar una nueva búsqueda
          </Button>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vacante</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead>Competencias</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Candidatos</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {savedSearches.map((search, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{search.vacancy}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    {search.location}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {search.skills.map((skill, idx) => (
                      <span key={idx} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-zara-gray-100">
                        {skill.name} ({skill.level})
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    {search.date}
                  </div>
                </TableCell>
                <TableCell>{search.candidateIds.length}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewResults(search)}
                      className="text-xs"
                    >
                      <Search size={14} className="mr-1" />
                      Ver
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => confirmDelete(index)}
                      className="text-xs text-red-500 border-red-300 hover:bg-red-50"
                    >
                      <Trash2 size={14} className="mr-1" />
                      Eliminar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      
      {/* Diálogo de confirmación para eliminar */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar esta búsqueda guardada? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleDelete}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SavedSearchesPage;
