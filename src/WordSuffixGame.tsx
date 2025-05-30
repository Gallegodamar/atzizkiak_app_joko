import React, { useState, useEffect } from 'react';
import { WordPair, SuffixedWord } from './types';
import { euskaraWords } from './data';
import { euskaraVerbs } from './verbData';

const allWordsData: WordPair[] = [...euskaraWords, ...euskaraVerbs];

const extractSuffixedForms = (base: string, wordList: WordPair[]): SuffixedWord[] => {
  if (!base.trim()) return [];

  const forms: SuffixedWord[] = [];
  const seenForms = new Set<string>();
  const lowerCaseBase = base.toLowerCase();

  wordList.forEach(item => {
    if (
      typeof item.basque === 'string' &&
      item.basque.toLowerCase().startsWith(lowerCaseBase) &&
      item.basque.length > base.length
    ) {
      const potentialSuffix = item.basque.substring(base.length);
      if (
        potentialSuffix.trim().length > 0 &&
        !potentialSuffix.startsWith(' ') &&
        !potentialSuffix.startsWith('-') &&
        !potentialSuffix.includes(' ')
      ) {
        const fullBasqueForm = item.basque;
        if (!seenForms.has(fullBasqueForm.toLowerCase())) {
          forms.push({
            id: item.id.toString(),
            base,
            suffix: potentialSuffix,
            fullBasque: fullBasqueForm,
            spanish: item.spanish,
          });
          seenForms.add(fullBasqueForm.toLowerCase());
        }
      }
    }
  });
  return forms.sort((a, b) => a.suffix.localeCompare(b.suffix));
};

const WordSuffixGame: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [baseWord, setBaseWord] = useState<string | null>(null);
  const [suffixedForms, setSuffixedForms] = useState<SuffixedWord[]>([]);
  const [selectedForm, setSelectedForm] = useState<SuffixedWord | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearchSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSelectedForm(null);

    const currentBase = inputValue.trim();
    setBaseWord(currentBase);

    if (!currentBase) {
      setSuffixedForms([]);
      setIsLoading(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 100));

    try {
      const newForms = extractSuffixedForms(currentBase, allWordsData);
      setSuffixedForms(newForms);
      if (newForms.length > 0) {
        setSelectedForm(newForms[0]);
      } else {
        setSelectedForm(null);
      }
    } catch (e) {
      setError('Errorea gertatu da hitzak bilatzean.');
      setSuffixedForms([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading && !error && suffixedForms.length > 0) {
      if (!selectedForm || (baseWord && selectedForm.base.toLowerCase() !== baseWord.toLowerCase())) {
        setSelectedForm(suffixedForms[0]);
      }
    } else if (!isLoading && suffixedForms.length === 0 && baseWord && baseWord.trim() !== '') {
      setSelectedForm(null);
    }
  }, [suffixedForms, isLoading, error, baseWord]);

  const handleSuffixClick = (form: SuffixedWord) => {
    setSelectedForm(form);
  };

  const formatSpanishMeaning = (spanish: string) => {
    if (!spanish) return <p className="text-hitzkale-medium-text">Esanahia ez dago eskuragarri.</p>;
    return spanish.split('//').map((part, index) => (
      <p key={index} className="mb-1">{part.trim()}</p>
    ));
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-100px)] space-y-4">
      <form onSubmit={handleSearchSubmit} className="p-4 bg-hitzkale-card-bg shadow-md rounded-lg flex flex-col sm:flex-row gap-3 items-center">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Sartu euskal hitz bat (adib. 'egon', 'ekarri')"
          className="flex-grow p-3 border border-hitzkale-border rounded-md text-lg w-full sm:w-auto"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto bg-hitzkale-primary hover:bg-hitzkale-secondary text-white font-semibold py-3 px-6 rounded-md"
        >
          {isLoading ? 'Bilatzen...' : 'Bilatu'}
        </button>
      </form>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {baseWord && !isLoading && (
        <div className="flex flex-col md:flex-row gap-4 flex-grow overflow-hidden bg-hitzkale-card-bg shadow-xl rounded-lg p-4">
          <div className="md:w-1/3 p-2">
            <h2 className="text-4xl font-bold text-hitzkale-primary break-words text-center md:text-left">{baseWord}</h2>
          </div>

          <div className="md:w-1/3 p-2 overflow-y-auto max-h-64 md:max-h-none border-y md:border-y-0 md:border-x border-hitzkale-border">
            <h3 className="text-2xl font-semibold text-hitzkale-secondary mb-2">Atzizkiak:</h3>
            {suffixedForms.length > 0 ? (
              <div className="space-y-2">
                {suffixedForms.map((form) => (
                  <button
                    key={form.id}
                    onClick={() => handleSuffixClick(form)}
                    className={`w-full text-left p-2 rounded-md ${
                      selectedForm?.id === form.id
                        ? 'bg-hitzkale-primary text-white'
                        : 'bg-hitzkale-light-bg hover:bg-hitzkale-accent hover:text-white'
                    }`}
                  >
                    -{form.suffix} ({form.fullBasque})
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-hitzkale-medium-text">Ez da hitz horrekin lotutako atzizkirik aurkitu.</p>
            )}
          </div>

          <div className="md:w-1/3 p-2">
            <h3 className="text-2xl font-semibold text-hitzkale-secondary mb-2">Esanahia:</h3>
            {selectedForm ? (
              <div className="space-y-2">
                <p className="text-2xl font-bold text-hitzkale-primary">{selectedForm.fullBasque}</p>
                <div className="text-lg text-hitzkale-dark-text">{formatSpanishMeaning(selectedForm.spanish)}</div>
              </div>
            ) : suffixedForms.length > 0 ? (
              <p className="italic text-hitzkale-medium-text">Aukeratu atzizki bat bere esanahia ikusteko.</p>
            ) : (
              <p className="italic text-hitzkale-medium-text">Ez dago esanahirik erakusteko.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WordSuffixGame;