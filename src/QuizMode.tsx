import React, { useState, useEffect } from 'react';
import { WordPair } from './types';
import { euskaraWords } from './data';
import { euskaraVerbs } from './verbData';

const allWords: WordPair[] = [...euskaraWords, ...euskaraVerbs];

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function getShuffledOptions(correct: string, all: string[]): string[] {
  const options = new Set<string>();
  options.add(correct);
  while (options.size < 4) {
    const random = all[getRandomInt(all.length)];
    if (random && random !== correct) {
      options.add(random);
    }
  }
  return Array.from(options).sort(() => Math.random() - 0.5);
}

const QuizMode: React.FC = () => {
  const [question, setQuestion] = useState<WordPair | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [correct, setCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const q = allWords[getRandomInt(allWords.length)];
    const allMeanings = allWords.map(w => w.spanish);
    const opt = getShuffledOptions(q.spanish, allMeanings);
    setQuestion(q);
    setOptions(opt);
    setSelected(null);
    setCorrect(null);
  };

  const handleSelect = (opt: string) => {
    setSelected(opt);
    setCorrect(opt === question?.spanish);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-hitzkale-card-bg rounded-lg shadow-md space-y-6">
      <h2 className="text-3xl font-bold text-hitzkale-secondary text-center">Quiz Interaktiboa</h2>
      {question && (
        <div className="space-y-4">
          <p className="text-xl text-center">Zer esan nahi du hitz honek?</p>
          <p className="text-5xl text-center text-hitzkale-primary font-extrabold">{question.basque}</p>
          <div className="grid gap-3">
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(opt)}
                className={`w-full p-3 rounded-md border ${
                  selected === opt
                    ? correct == null
                      ? 'bg-hitzkale-light-bg'
                      : opt === question.spanish
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'hover:bg-hitzkale-accent hover:text-white'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {correct !== null && (
            <div className="text-center mt-4">
              {correct ? (
                <p className="text-green-600 font-semibold">Zuzena!</p>
              ) : (
                <p className="text-red-600 font-semibold">Okerra! Erantzun zuzena: {question.spanish}</p>
              )}
              <button
                onClick={generateQuestion}
                className="mt-4 px-6 py-2 bg-hitzkale-primary text-white rounded-md"
              >
                Hurrengo galdera
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizMode;