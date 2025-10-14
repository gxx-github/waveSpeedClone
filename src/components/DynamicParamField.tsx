import type React from 'react';
import styled from 'styled-components';
import { api } from '../api/client';
import { Input, Textarea } from '../styles/GlobalStyles';
import type { ModelParam } from '../types/models';

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
  font-size: 0.9rem;
  
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

const Select = styled.select`
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

const UploadButton = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-size: 1.2rem;

  &:hover { 
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary};
    color: white;
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
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.2rem;
  
  &:hover {
    color: #ef4444;
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

  const handleRandomize = () => {
    if (type === 'INT' || type === 'FLOAT') {
      const minVal = min || 0;
      const maxVal = max || 100;
      const randomValue = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
      onChange(randomValue);
    }
  };

  const renderField = () => {
    // 优先处理 options/select
    if (Array.isArray(paramConfig.options) && paramConfig.options.length > 0) {
      return (
        <Select
          value={value ?? paramConfig.default}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        >
          {paramConfig.options.map((opt) => (
            <option key={String(opt)} value={String(opt)}>
              {String(opt)}
            </option>
          ))}
        </Select>
      );
    }

    switch (type) {
      case 'STRING':
        // 对于图片相关的字段，增加本地上传能力（与 URL 文本输入并存）
        {
          const isImageLike = /(^image(s)?$|img|photo|input_image|images?)/i.test(paramName);
          if (!multiline && isImageLike) {
            const src = (value || '').toString();
            const handleFile = async (file: File) => {
              if (!file) return;
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
                  <UploadButton>
                    📁
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFile(file);
                      }}
                      disabled={disabled}
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
                      🗑️
                    </DeleteButton>
                  </PreviewContainer>
                )}
              </ImageUploadContainer>
            );
          }
        }
        // 对于 prompt 字段，强制使用 textarea
        if (multiline || paramName.toLowerCase() === 'prompt') {
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
        if (display === 'slider' && min !== undefined && max !== undefined) {
          return (
            <SliderContainer>
              <Slider
                type="range"
                min={min}
                max={max}
                step={step || 1}
                value={value || paramConfig.default}
                onChange={(e) => onChange(Number(e.target.value))}
                disabled={disabled}
              />
              <SliderValue>{value || paramConfig.default}</SliderValue>
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
              ↻
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
          return (
            <Select
              value={value || paramConfig.default}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
            >
              {resolution.map((res) => (
                <option key={res} value={res}>
                  {res}
                </option>
              ))}
            </Select>
          );
        }

        if (aspect_ratio) {
          return (
            <Select
              value={value || paramConfig.default}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
            >
              {aspect_ratio.map((ratio) => (
                <option key={ratio} value={ratio}>
                  {ratio}
                </option>
              ))}
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
            ℹ️
          </TooltipIcon>
        )}
      </Label>
      {renderField()}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormGroup>
  );
};

export default DynamicParamField;
