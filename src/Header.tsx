import React from 'react';

interface HeaderProps {
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header>
      <button onClick={() => onNavigate('recept-lista')}>Receptek</button>
      <button onClick={() => onNavigate('uj-recept')}>Új recept</button>
      <button onClick={() => onNavigate('kedvencek')}>Kedvencek</button>
      <button onClick={() => onNavigate('bevásárló-lista')}>Bevásárló lista</button>
    </header>
  );
};

export default Header;
