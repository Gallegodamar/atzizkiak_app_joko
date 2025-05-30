import React, { useState } from 'react';
import WordSuffixGame from './WordSuffixGame';
import QuizMode from './QuizMode';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'hiztegia' | 'quiz' | 'favorites' | 'stats'>('hiztegia');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-hitzkale-base to-hitzkale-light-bg text-hitzkale-dark-text font-sans">
      {/* Navigation */}
      <header className="bg-hitzkale-card-bg shadow-md sticky top-0 z-10">
        <nav className="flex flex-wrap justify-center gap-3 sm:gap-6 py-4 px-2">
          <button
            onClick={() => setActiveView('hiztegia')}
            className={\`text-lg font-medium px-3 py-2 rounded-md transition \${activeView === 'hiztegia' ? 'bg-hitzkale-primary text-white' : 'hover:bg-hitzkale-light-bg'}\`}
          >🔍 Hiztegia</button>
          <button
            onClick={() => setActiveView('favorites')}
            className={\`text-lg font-medium px-3 py-2 rounded-md transition \${activeView === 'favorites' ? 'bg-hitzkale-primary text-white' : 'hover:bg-hitzkale-light-bg'}\`}
          >⭐ Gogokoak</button>
          <button
            onClick={() => setActiveView('stats')}
            className={\`text-lg font-medium px-3 py-2 rounded-md transition \${activeView === 'stats' ? 'bg-hitzkale-primary text-white' : 'hover:bg-hitzkale-light-bg'}\`}
          >📊 Estatistikak</button>
          <button
            onClick={() => setActiveView('quiz')}
            className={\`text-lg font-medium px-3 py-2 rounded-md transition \${activeView === 'quiz' ? 'bg-hitzkale-primary text-white' : 'hover:bg-hitzkale-light-bg'}\`}
          >🧠 Quiz</button>
        </nav>
      </header>

      {/* Content */}
      <main className="flex-grow px-4 py-6">
        {activeView === 'hiztegia' && <WordSuffixGame />}
        {activeView === 'quiz' && <QuizMode />}
        {activeView === 'favorites' && (
          <div className="text-center text-xl text-hitzkale-medium-text">⭐ Gogokoen atala hemen egongo da.</div>
        )}
        {activeView === 'stats' && (
          <div className="text-center text-xl text-hitzkale-medium-text">📊 Estatistika atala hemen egongo da.</div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-hitzkale-medium-text text-sm bg-hitzkale-card-bg mt-auto">
        © 2025 Hitzkale - Euskara Ikasteko Tresnak. Ikasketa on!
      </footer>
    </div>
  );
};

export default App;