// src/types/analysis.types.ts

export interface TweetRecord {
  text?: string;
  tweet_limpio?: string;
  tweet_lema?: string;
  sentimiento: 'positivo' | 'negativo' | 'neutral' | string;
}

export type AnalysisResults = TweetRecord[];
