export interface WordPair {
  id: number;
  basque: string;
  spanish: string;
  synonyms_basque?: string;
  synonyms_spanish?: string;
}

export interface SuffixedWord {
  id: string;
  base: string; // Changed from 'egon' to support any base word
  suffix: string;
  fullBasque: string;
  spanish: string;
}
