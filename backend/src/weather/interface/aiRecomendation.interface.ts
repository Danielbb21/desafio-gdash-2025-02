export interface AiRecommendation {
  summary: string;
  recommendations: {
    activity: string;
    reason: string;
  }[];
}
