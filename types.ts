
export enum Sentiment {
  VERY_POSITIVE = 'Very Positive',
  POSITIVE = 'Positive',
  MIXED = 'Mixed',
  NEGATIVE = 'Negative',
  VERY_NEGATIVE = 'Very Negative'
}

export interface ReviewData {
  movieName: string;
  overallSentiment: Sentiment;
  emotions: string[];
  strengths: string[];
  weaknesses: string[];
  reviewText: string;
  rating: number;
  releaseYear?: string;
  genre?: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}
