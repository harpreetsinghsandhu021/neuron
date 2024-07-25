declare module "vader-sentiment" {
  export interface SentimentAnalysisResult {
    compound: number; // Overall sentiment score
    pos: number; // Positive sentiment score
    neu: number; // Neutral sentiment score
    neg: number; // Negative sentiment score
  }

  export class VADER {
    polarity_scores(text: string): SentimentAnalysisResult;
  }
}
