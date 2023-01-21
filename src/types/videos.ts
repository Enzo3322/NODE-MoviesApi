export interface VideoRequest {
  name: string;
  duration: string;
  description: number;
  category_id: string;
}

export interface VideoUpdateReq {
  id: string;
  name: string;
  duration: number;
  description: string;
}
