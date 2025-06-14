
import { Download, Youtube, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-red-500 to-blue-600 p-2 rounded-lg">
              <Youtube className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-blue-600 bg-clip-text text-transparent">
              TubeBaixar
            </span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-gray-700 hover:text-red-500 transition-colors font-medium">
              Início
            </a>
            <a href="#como-funciona" className="text-gray-700 hover:text-red-500 transition-colors font-medium">
              Como Funciona
            </a>
            <a href="#recursos" className="text-gray-700 hover:text-red-500 transition-colors font-medium">
              Recursos
            </a>
            <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
              <Download className="h-4 w-4 mr-2" />
              Baixar Agora
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-4">
              <a href="#inicio" className="text-gray-700 hover:text-red-500 transition-colors font-medium">
                Início
              </a>
              <a href="#como-funciona" className="text-gray-700 hover:text-red-500 transition-colors font-medium">
                Como Funciona
              </a>
              <a href="#recursos" className="text-gray-700 hover:text-red-500 transition-colors font-medium">
                Recursos
              </a>
              <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 w-full">
                <Download className="h-4 w-4 mr-2" />
                Baixar Agora
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
