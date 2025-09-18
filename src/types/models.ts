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

// API参数类型定义
export interface ModelParam {
  type: 'STRING' | 'INT' | 'FLOAT' | 'BOOLEAN';
  default: any;
  tooltip?: string;
  multiline?: boolean;
  min?: number;
  max?: number;
  step?: number;
  display?: 'number' | 'slider' | 'select';
  resolution?: string[];
  aspect_ratio?: string[];
  control_after_generate?: boolean;
}

export interface ModelParams {
  [key: string]: ModelParam;
}

export interface ApiModel {
  id: string;
  name: string;
  provider: string;
  title: string;
  description: string;
  price: number;
  type: 'video' | 'image' | 'audio';
  tag: string[];
  thumbnail: string;
  examples?: string[];
  category: string;
  featured?: boolean;
  hot?: boolean;
  commercial?: boolean;
  partner?: boolean;
  params?: ModelParams;
}
