import React from 'react';
import styled, { keyframes } from 'styled-components';
import { api } from '../api/client';
import { Input, Textarea } from '../styles/GlobalStyles';
import type { ModelParam } from '../types/models';
import { Info, FolderOpen, Trash2, RotateCcw, Loader2 } from 'lucide-react';
import { CustomSelect } from './Select';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const SpinningIcon = styled(Loader2)`
  animation: ${spin} 1s linear infinite;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  position: relative;
`;

const TooltipIcon = styled.span`
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: help;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  &:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 0.5rem;
    padding: 0.5rem;
    font-size: 0.8rem;
    white-space: nowrap;
    z-index: 1000;
    margin-top: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const Select = styled.div``;

const NumberInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Slider = styled.input`
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: ${({ theme }) => theme.colors.border};
  outline: none;
  -webkit-appearance: none;
  appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }

  &::-webkit-slider-track {
    -webkit-appearance: none;
    appearance: none;
    height: 6px;
    border-radius: 3px;
    background: ${({ theme }) => theme.colors.border};
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    border: none;
  }
`;

const SliderValue = styled.span`
  min-width: 3rem;
  text-align: center;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
`;

const CheckboxLabel = styled.label`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;
`;

const RandomizeButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ImageUploadContainer = styled.div`
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.surface};
`;

const InputWithUpload = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const UploadButton = styled.label<{ $loading?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  cursor: ${({ $loading }) => $loading ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  opacity: ${({ $loading }) => $loading ? 0.6 : 1};

  &:hover { 
    border-color: ${({ theme, $loading }) => $loading ? theme.colors.border : theme.colors.primary};
    background: ${({ theme, $loading }) => $loading ? theme.colors.surface : theme.colors.primary};
    color: ${({ $loading }) => $loading ? 'inherit' : 'white'};
  }

  svg {
    flex-shrink: 0;
  }
`;

const PreviewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.75rem;
`;

const Thumb = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.2rem;
  transition: all 0.2s ease;
  
  &:hover {
    color: #ef4444;
  }

  svg {
    flex-shrink: 0;
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

interface DynamicParamFieldProps {
  paramName: string;
  paramConfig: ModelParam;
  value: any;
  onChange: (value: any) => void;
  disabled?: boolean;
  error?: string;
}

const DynamicParamField: React.FC<DynamicParamFieldProps> = ({
  paramName,
  paramConfig,
  value,
  onChange,
  disabled = false,
  error
}) => {
  const { type, tooltip, multiline, min, max, step, display, resolution, aspect_ratio } = paramConfig;
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  console.log('paramConfig for', paramName, paramConfig);
  const handleRandomize = () => {
    if (type === 'INT' || type === 'FLOAT') {
      const minVal = min || 0;
      const maxVal = max || 100;
      const randomValue = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
      onChange(randomValue);
    }
  };

  const renderField = () => {
    // 优先处理 Range 选项（新的参数格式）
    if (Array.isArray((paramConfig as any).Range) && (paramConfig as any).Range.length > 0) {
      // 特殊处理 seed 参数
      if (paramName.toLowerCase() === 'seed') {
        const range = (paramConfig as any).Range;
        const minVal = range[0];
        const maxVal = range[1];
        
        const handleSeedRandomize = () => {
          // 生成 minVal 到 maxVal 之间的随机整数
          const randomSeed = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
          onChange(randomSeed);
        };
        
        return (
          <InputContainer>
            <NumberInput
              type="number"
              min={minVal}
              max={maxVal}
              step={1}
              value={value === -1 ? '-1' : (value || '-1')}
              onChange={(e) => {
                const val = e.target.value;
                onChange(val === '' ? -1 : Number(val));
              }}
              placeholder="Enter seed (-1 for random)"
              disabled={disabled}
            />
            <RandomizeButton
              type="button"
              onClick={handleSeedRandomize}
              disabled={disabled}
              title="Generate random seed"
            >
              <RotateCcw size={16} />
            </RandomizeButton>
          </InputContainer>
        );
      }
      
      // 如果是数字类型且有Range，且display为slider，则使用滑块
      if ((type === 'FLOAT' || type === 'INT') && display === 'slider' && min !== undefined && max !== undefined) {
        return (
          <SliderContainer>
            <Slider
              type="range"
              min={min}
              max={max}
              step={step || 1}
              value={value !== undefined && value !== null ? value : (paramConfig.default !== undefined ? paramConfig.default : min)}
              onChange={(e) => onChange(Number(e.target.value))}
              disabled={disabled}
            />
            <SliderValue>{value !== undefined && value !== null ? value : (paramConfig.default !== undefined ? paramConfig.default : min)}</SliderValue>
          </SliderContainer>
        );
      }
      // 否则使用下拉选择框
      const opts = (paramConfig as any).Range.map((opt: any) => ({ value: String(opt), label: String(opt) }));
      return (
        <Select>
          <CustomSelect
            value={String(value ?? paramConfig.default ?? (opts[0]?.value || ''))}
            onChange={(v) => onChange(v)}
            options={opts}
            disabled={disabled}
          />
        </Select>
      );
    }

    // 处理旧的 options/select 格式
    if (Array.isArray(paramConfig.options) && paramConfig.options.length > 0) {
      const opts = paramConfig.options.map((opt) => ({ value: String(opt), label: String(opt) }));
      return (
        <Select>
          <CustomSelect
            value={String(value ?? paramConfig.default ?? (opts[0]?.value || ''))}
            onChange={(v) => onChange(v)}
            options={opts}
            disabled={disabled}
          />
        </Select>
      );
    }

    switch (type) {
      case 'ARRAY':
        // 特殊处理图片相关的ARRAY参数
        if (paramName.toLowerCase() === 'images' || 
            paramName.toLowerCase() === 'source_image' || 
            paramName.toLowerCase() === 'target_image') {
          const images = Array.isArray(value) ? value : [];
          const handleImageAdd = async (file: File) => {
            if (!file || isUploading) return;
            
            setIsUploading(true);
            try {
              const resp: any = await api.uploadFile(file);
              const url = typeof resp === 'string' ? resp : (resp?.download_url || resp?.url || resp?.data || '');
              if (url) {
                onChange([...images, url]);
              } else {
                // 回退到本地预览
                const reader = new FileReader();
                reader.onload = () => {
                  const result = typeof reader.result === 'string' ? reader.result : '';
                  onChange([...images, result]);
                };
                reader.readAsDataURL(file);
              }
            } catch (e) {
              // 失败也回退到本地预览
              const reader = new FileReader();
              reader.onload = () => {
                const result = typeof reader.result === 'string' ? reader.result : '';
                onChange([...images, result]);
              };
              reader.readAsDataURL(file);
            } finally {
              setIsUploading(false);
            }
          };
          
          return (
            <ImageUploadContainer>
              <InputWithUpload>
                <Input
                  type="text"
                  value=""
                  onChange={(e) => {
                    if (e.target.value.trim()) {
                      onChange([...images, e.target.value.trim()]);
                      e.target.value = '';
                    }
                  }}
                  placeholder={`Enter ${paramName} URL or upload files...`}
                  disabled={disabled}
                  style={{ flex: 1 }}
                />
                <UploadButton $loading={isUploading}>
                  {isUploading ? (
                    <SpinningIcon size={18} />
                  ) : (
                    <FolderOpen size={18} />
                  )}
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    multiple
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    onClick={(e) => {
                      (e.currentTarget as HTMLInputElement).value = '';
                    }}
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      files.forEach(file => handleImageAdd(file));
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    disabled={disabled || isUploading}
                  />
                </UploadButton>
              </InputWithUpload>
              {images.length > 0 && (
                <div style={{ marginTop: '0.75rem' }}>
                  {images.map((img, index) => (
                    <PreviewContainer key={index} style={{ marginBottom: '0.5rem' }}>
                      <Thumb src={img} alt={`preview ${index + 1}`} />
                      <DeleteButton
                        onClick={() => onChange(images.filter((_, i) => i !== index))}
                        title={`Delete ${paramName}`}
                      >
                        <Trash2 size={16} />
                      </DeleteButton>
                    </PreviewContainer>
                  ))}
                </div>
              )}
            </ImageUploadContainer>
          );
        }
        
        // 其他ARRAY类型的处理
        return (
          <Input
            type="text"
            value={Array.isArray(value) ? value.join(', ') : (value || '')}
            onChange={(e) => {
              const items = e.target.value.split(',').map(item => item.trim()).filter(item => item);
              onChange(items);
            }}
            placeholder={`Enter ${paramName} (comma separated)...`}
            disabled={disabled}
          />
        );

      case 'STRING':
        // 特殊处理 image 参数
        if (paramName.toLowerCase() === 'image') {
          const src = (value || '').toString();
          const handleFile = async (file: File) => {
            if (!file || isUploading) return;
            
            setIsUploading(true);
            try {
              const resp: any = await api.uploadFile(file);
              const url = typeof resp === 'string' ? resp : (resp?.download_url || resp?.url || resp?.data || '');
              if (url) {
                onChange(String(url));
              } else {
                // 回退到本地预览
                const reader = new FileReader();
                reader.onload = () => {
                  const result = typeof reader.result === 'string' ? reader.result : '';
                  onChange(result);
                };
                reader.readAsDataURL(file);
              }
            } catch (e) {
              // 失败也回退到本地预览
              const reader = new FileReader();
              reader.onload = () => {
                const result = typeof reader.result === 'string' ? reader.result : '';
                onChange(result);
              };
              reader.readAsDataURL(file);
            } finally {
              setIsUploading(false);
            }
          };
          return (
            <ImageUploadContainer>
              <InputWithUpload>
                <Input
                  type="text"
                  value={value || ''}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder="Enter image URL or upload a file..."
                  disabled={disabled}
                  style={{ flex: 1 }}
                />
                <UploadButton $loading={isUploading}>
                  {isUploading ? (
                    <SpinningIcon size={18} />
                  ) : (
                    <FolderOpen size={18} />
                  )}
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    onClick={(e) => {
                      (e.currentTarget as HTMLInputElement).value = '';
                    }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFile(file);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    disabled={disabled || isUploading}
                  />
                </UploadButton>
              </InputWithUpload>
              {src && (src.startsWith('http') || src.startsWith('data:')) && (
                <PreviewContainer>
                  <Thumb src={src} alt="preview" />
                  <DeleteButton
                    onClick={() => onChange('')}
                    title="Delete image"
                  >
                    <Trash2 size={16} />
                  </DeleteButton>
                </PreviewContainer>
              )}
            </ImageUploadContainer>
          );
        }

        // 特殊处理 audio 参数
        if (paramName.toLowerCase() === 'audio') {
          const src = (value || paramConfig.default || '').toString();
          const isAudioUrl = (url: string) => {
            return /\.(mp4|mp3|wav|mpeg|wave)$/i.test(url) || 
                   url.includes('audio') || 
                   url.includes('sound') ||
                   url.includes('music');
          };
          
          // 如果当前没有值但有默认值，且默认值看起来像音频文件，则使用默认值
          if (!value && paramConfig.default && isAudioUrl(String(paramConfig.default))) {
            onChange(String(paramConfig.default));
          }
          
          const handleFile = async (file: File) => {
            if (!file || isUploading) return;
            
            setIsUploading(true);
            try {
              const resp: any = await api.uploadFile(file);
              const url = typeof resp === 'string' ? resp : (resp?.download_url || resp?.url || resp?.data || '');
              if (url) {
                onChange(String(url));
              } else {
                // 回退到本地预览
                const reader = new FileReader();
                reader.onload = () => {
                  const result = typeof reader.result === 'string' ? reader.result : '';
                  onChange(result);
                };
                reader.readAsDataURL(file);
              }
            } catch (e) {
              // 失败也回退到本地预览
              const reader = new FileReader();
              reader.onload = () => {
                const result = typeof reader.result === 'string' ? reader.result : '';
                onChange(result);
              };
              reader.readAsDataURL(file);
            } finally {
              setIsUploading(false);
            }
          };
          return (
            <ImageUploadContainer>
              <InputWithUpload>
                <Input
                  type="text"
                  value={value || ''}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={paramConfig.default && isAudioUrl(String(paramConfig.default)) 
                    ? `Default: ${String(paramConfig.default).substring(0, 30)}...` 
                    : "Enter audio URL or upload a file..."}
                  disabled={disabled}
                  style={{ flex: 1 }}
                />
                <UploadButton $loading={isUploading}>
                  {isUploading ? (
                    <SpinningIcon size={18} />
                  ) : (
                    <FolderOpen size={18} />
                  )}
                  <input
                    type="file"
                    accept="audio/wav,audio/mp3,audio/wave,audio/mpeg"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    onClick={(e) => {
                      (e.currentTarget as HTMLInputElement).value = '';
                    }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFile(file);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    disabled={disabled || isUploading}
                  />
                </UploadButton>
              </InputWithUpload>
              {src && (src.startsWith('http') || src.startsWith('data:') || isAudioUrl(src)) && (
                <PreviewContainer>
                  <div style={{ 
                    width: '80px', 
                    height: '80px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    background: '#f3f4f6',
                    borderRadius: '6px',
                    border: '1px solid #e5e7eb',
                    fontSize: '12px',
                    color: '#6b7280'
                  }}>
                    Audio File
                  </div>
                  <DeleteButton
                    onClick={() => onChange('')}
                    title="Delete audio"
                  >
                    <Trash2 size={16} />
                  </DeleteButton>
                </PreviewContainer>
              )}
            </ImageUploadContainer>
          );
        }

        // 对于其他图片相关的字段，增加本地上传能力（与 URL 文本输入并存）
        {
          const isImageLike = /(^image(s)?$|img|photo|input_image|images?)/i.test(paramName);
          if (!multiline && isImageLike) {
            const src = (value || '').toString();
            const handleFile = async (file: File) => {
              if (!file || isUploading) return;
              
              setIsUploading(true);
              try {
                const resp: any = await api.uploadFile(file);
                const url = typeof resp === 'string' ? resp : (resp?.download_url || resp?.url || resp?.data || '');
                if (url) {
                  onChange(String(url));
                } else {
                  // 回退到本地预览
                  const reader = new FileReader();
                  reader.onload = () => {
                    const result = typeof reader.result === 'string' ? reader.result : '';
                    onChange(result);
                  };
                  reader.readAsDataURL(file);
                }
              } catch (e) {
                // 失败也回退到本地预览
                const reader = new FileReader();
                reader.onload = () => {
                  const result = typeof reader.result === 'string' ? reader.result : '';
                  onChange(result);
                };
                reader.readAsDataURL(file);
              } finally {
                setIsUploading(false);
              }
            };
            return (
              <ImageUploadContainer>
                <InputWithUpload>
                  <Input
                    type="text"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={`Enter image url...`}
                    disabled={disabled}
                    style={{ flex: 1 }}
                  />
                  <UploadButton $loading={isUploading}>
                    {isUploading ? (
                      <SpinningIcon size={18} />
                    ) : (
                      <FolderOpen size={18} />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      ref={fileInputRef}
                      onClick={(e) => {
                        // 先清空 value，确保选择相同文件也能触发 onChange
                        (e.currentTarget as HTMLInputElement).value = '';
                      }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFile(file);
                        // 读取后立即清空，避免二次选择同一文件无反应
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      disabled={disabled || isUploading}
                    />
                  </UploadButton>
                </InputWithUpload>
                {src && (src.startsWith('http') || src.startsWith('data:')) && (
                  <PreviewContainer>
                    <Thumb src={src} alt="preview" />
                    <DeleteButton
                      onClick={() => onChange('')}
                      title="Delete image"
                    >
                      <Trash2 size={16} />
                    </DeleteButton>
                  </PreviewContainer>
                )}
              </ImageUploadContainer>
            );
          }
        }
        // 对于 prompt 和 text 字段，使用 textarea
        if (paramName.toLowerCase() === 'prompt' || paramName.toLowerCase() === 'text') {
          return (
            <Textarea
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={`Enter ${paramName}...`}
              rows={paramName.toLowerCase() === 'prompt' ? 6 : 4}
              disabled={disabled}
            />
          );
        }
        // 其他STRING类型使用输入框
        return (
          <Input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Enter ${paramName}...`}
            disabled={disabled}
          />
        );

      case 'INT':
      case 'FLOAT':
        // 特殊处理 seed 参数
        if (paramName.toLowerCase() === 'seed') {
          const handleSeedRandomize = () => {
            // seed 参数的特殊随机化：在 -1 到 2147483647 范围内随机生成
            const randomSeed = Math.floor(Math.random() * (2147483647 - (-1) + 1)) + (-1);
            onChange(randomSeed);
          };
          
          return (
            <InputContainer>
              <NumberInput
                type="number"
                min={-1}
                max={2147483647}
                step={1}
                value={value === -1 ? '-1' : (value || '-1')}
                onChange={(e) => {
                  const val = e.target.value;
                  onChange(val === '' ? -1 : Number(val));
                }}
                placeholder="Enter seed (-1 for random)"
                disabled={disabled}
              />
              <RandomizeButton
                type="button"
                onClick={handleSeedRandomize}
                disabled={disabled}
                title="Generate random seed (-1 to 2147483647)"
              >
                <RotateCcw size={16} />
              </RandomizeButton>
            </InputContainer>
          );
        }

        if (display === 'slider' && min !== undefined && max !== undefined) {
          return (
            <SliderContainer>
              <Slider
                type="range"
                min={min}
                max={max}
                step={step || 1}
                value={value !== undefined && value !== null ? value : (paramConfig.default !== undefined ? paramConfig.default : min)}
                onChange={(e) => onChange(Number(e.target.value))}
                disabled={disabled}
              />
              <SliderValue>{value !== undefined && value !== null ? value : (paramConfig.default !== undefined ? paramConfig.default : min)}</SliderValue>
            </SliderContainer>
          );
        }
        return (
          <InputContainer>
            <NumberInput
              type="number"
              min={min}
              max={max}
              step={step || 1}
              value={value || ''}
              onChange={(e) => onChange(Number(e.target.value))}
              placeholder={paramConfig.default?.toString()}
              disabled={disabled}
            />
            <RandomizeButton
              type="button"
              onClick={handleRandomize}
              disabled={disabled}
              title="Randomize value"
            >
              <RotateCcw size={16} />
            </RandomizeButton>
          </InputContainer>
        );

      case 'BOOLEAN':
        return (
          <CheckboxContainer>
            <Checkbox
              type="checkbox"
              checked={value || false}
              onChange={(e) => onChange(e.target.checked)}
              disabled={disabled}
            />
            <CheckboxLabel>
              {tooltip || `Enable ${paramName}`}
            </CheckboxLabel>
          </CheckboxContainer>
        );

      default:
        // 处理特殊的选择类型
        if (resolution) {
          const opts = resolution.map((res) => ({ value: res, label: res }));
          return (
            <Select>
              <CustomSelect
                value={String(value || paramConfig.default || opts[0]?.value || '')}
                onChange={(v) => onChange(v)}
                options={opts}
                disabled={disabled}
              />
            </Select>
          );
        }

        if (aspect_ratio) {
          const opts = aspect_ratio.map((ratio) => ({ value: ratio, label: ratio }));
          return (
            <Select>
              <CustomSelect
                value={String(value || paramConfig.default || opts[0]?.value || '')}
                onChange={(v) => onChange(v)}
                options={opts}
                disabled={disabled}
              />
            </Select>
          );
        }

        return (
          <Input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Enter ${paramName}...`}
            disabled={disabled}
          />
        );
    }
  };

  return (
    <FormGroup>
      <Label>
        {paramName}{paramConfig.required ? ' *' : ''}
        {tooltip && (
          <TooltipIcon data-tooltip={tooltip}>
            <Info size={14} />
          </TooltipIcon>
        )}
      </Label>
      {renderField()}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormGroup>
  );
};

export default DynamicParamField;
