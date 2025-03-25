export interface BirdDto {
  birdCode?: number;
  name: string;
  type: string;
  color: string;
  dateCreate: string; //YYYY-MM-DD
  description: string;
}

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T | null;
}
