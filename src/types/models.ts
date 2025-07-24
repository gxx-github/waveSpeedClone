export interface Model {
  id: string;
  name: string;
  provider: string;
  title: string;
  description: string;
  price: number;
  type: 'video' | 'image' | 'audio';
  tags: string[];
  thumbnail: string;
  examples?: string[];
  category: string;
  featured?: boolean;
  hot?: boolean;
  commercial?: boolean;
  partner?: boolean;
}

export interface ModelCollection {
  id: string;
  name: string;
  description: string;
  icon: string;
  models: Model[];
}

export interface VideoEffect {
  id: string;
  name: string;
  thumbnail: string;
  hot?: boolean;
}
