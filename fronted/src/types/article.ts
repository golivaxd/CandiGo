export interface Article {
  title: string | { id: string; name: string };
  description?: string;
  url?: string;
  source?: string;
  urlToImage?: string;
  publishedAt?: string;
}