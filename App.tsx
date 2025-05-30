
import React from 'react';
import WordSuffixGame from './components/WordSuffixGame'; // Ruta relativa correcta

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-hitzkale-base to-hitzkale-light-bg text-hitzkale-dark-text font-sans">
      <header className="py-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-hitzkale-primary mb-2">Hitzkale - Hizkiak eta Atzizkiak</h1>
        <p className="text-lg text-hitzkale-medium-text">Arakatu euskal hitzen atzizkiak eta haien esanahiak.</p>
      </header>
      <main className="flex-grow w-full max-w-5xl mx-auto">
        <WordSuffixGame />
      </main>
      <footer className="text-center py-6 w-full mt-auto">
        <p className="text-sm text-hitzkale-medium-text">
          © 2025 Hitzkale - Euskara Ikasteko Tresnak. Ikasketa on!
        </p>
      </footer>
    </div>
  );
};

export default App;
