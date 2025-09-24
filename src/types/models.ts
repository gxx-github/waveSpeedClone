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
  // 新增：是否必填 & 通用选项
  required?: boolean;
  options?: Array<string | number>;
}

export interface ModelParams {
  [key: string]: ModelParam;
}

// 新后端原始模型结构（/api/model 返回）
export interface BackendModelParam {
  type: 'string' | 'integer' | 'number' | 'boolean';
  range: null | Array<string | number>;
  default: any;
  required: boolean;
}

export interface ApiModel {
  id: string | number;
  // 兼容老字段 name，新字段 model_name
  name?: string;
  model_name?: string;
  provider?: string;
  title?: string;
  description?: string; // 新字段中直接叫 description
  describe?: string;    // 兼容老字段
  price?: number;       // 兼容老字段
  base_price?: number;  // 新字段
  type?: string;        // 新返回如 "image-to-video"
  tag?: string[];       // 兼容老字段
  tags?: string[];      // 新字段
  thumbnail?: string;   // 兼容老字段
  index_url?: string;   // 兼容老字段
  cover_url?: string;   // 新字段（可为视频或图片）
  examples?: string[];
  category?: string;
  featured?: boolean;
  hot?: boolean;
  commercial?: boolean;
  partner?: boolean;
  // 新字段：params 为后端的动态参数定义
  params?: Record<string, BackendModelParam>;
  playground?: Record<string, any>;
  // 后端字段命名
  company?: string;
  collections?: string;
  url?: string;
}
