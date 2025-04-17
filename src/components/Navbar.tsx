
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bookmark } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="w-full py-4 px-6 border-b border-zara-gray-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold uppercase tracking-wider">
          ZARA TALENT MATCH
        </Link>
        
        {location.pathname !== "/" && (
          <div className="flex items-center space-x-6">
            <Link 
              to="/busquedas-guardadas" 
              className="flex items-center text-sm uppercase tracking-wider"
            >
              <Bookmark size={18} className="mr-2" />
              Búsquedas guardadas
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
