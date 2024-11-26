import { MovieCategory } from "./movie_category";

export type PixelData = {
  x: number;
  y: number;
  color: [number, number, number, number];
}

export type AnimationData = {
  x: number;
  y: number;
  r: number;
  color: string;
}

export type Movie = {
  id: string
  name: string
  initialDate: string
  thumbnailImage: string
  trailerVideoUrl: string
  description: string
}

export type InputFormData = MovieCategory | Movie | undefined