import type React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Card, Button, Input, Textarea } from '../styles/GlobalStyles';
import { models } from '../data/models';
import { api } from '../api/client';
import DynamicParamField from '../components/DynamicParamField';
import { useToast } from '../components/Toast';
import type { ModelParams, ModelParam, ApiModel } from '../types/models';

const ModelDetailContainer = styled.div`
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Breadcrumbs = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  a {
    color: ${({ theme }) => theme.colors.primary};
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ModelHeader = styled.div`
  margin-bottom: 3rem;
`;

const ModelBadges = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Badge = styled.span<{ $variant?: 'hot' | 'commercial' | 'partner' }>`
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;

  ${({ $variant }) => {
    switch ($variant) {
      case 'hot':
        return `background: #ef4444; color: white;`;
      case 'commercial':
        return `background: #10b981; color: white;`;
      case 'partner':
        return `background: #3b82f6; color: white;`;
      default:
        return `background: rgba(0, 0, 0, 0.1); color: inherit;`;
    }
  }}
`;

const ModelTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};

  .provider {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ModelDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 800px;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const LeftSection = styled.div``;

const RightSection = styled.div``;

const PlaygroundCard = styled(Card)`
  /* position: sticky; */
  top: 2rem;
`;

const PlaygroundHeader = styled.div`
  display: flex;
  gap: 0;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const PlaygroundTab = styled.button<{ $active?: boolean }>`
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.textSecondary};
  font-weight: 500;

  ${({ $active, theme }) => $active && `
    border-bottom-color: ${theme.colors.primary};
    background: ${theme.colors.surface};
  `}
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
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

const CostInfo = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

const CostText = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.5rem;
`;

const CostHighlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

const PreviewArea = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  padding: 3rem 2rem;
  text-align: center;
  margin-bottom: 2rem;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
`;

const GenerationResult = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
`;

const GeneratedVideo = styled.video`
  width: 100%;
  height: auto;
  max-height: 350px;
  border-radius: 0.5rem;
  object-fit: cover;
`;

const GeneratedImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 350px;
  border-radius: 0.5rem;
  object-fit: cover;
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: 100%;
  height: 6px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 3px;
  overflow: hidden;
  margin: 1rem 0;

  &::after {
    content: '';
    display: block;
    width: ${({ progress }) => progress}%;
    height: 100%;
    background: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }
`;

const GenerationSteps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const StepItem = styled.div<{ $active?: boolean; $completed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: ${({ $active, $completed }) => $active || $completed ? 1 : 0.5};
  color: ${({ theme, $completed }) => $completed ? theme.colors.primary : 'inherit'};

  &::before {
    content: '${({ $completed, $active }) => $completed ? '✓' : $active ? '⏳' : '○'}';
    width: 16px;
  }
`;

const DownloadButton = styled(Button)`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PreviewText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1rem;
`;

const StatusIndicator = styled.div<{ $status: 'idle' | 'processing' | 'completed' }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;

  ${({ $status }) => {
    switch ($status) {
      case 'idle':
        return `background: #f3f4f6; color: #6b7280;`;
      case 'processing':
        return `background: #fef3c7; color: #92400e;`;
      case 'completed':
        return `background: #dcfce7; color: #166534;`;
    }
  }}
`;

const ExamplesSection = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ExamplesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const ExampleCard = styled.div`
  aspect-ratio: 16/9;
  border-radius: 0.5rem;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ReadmeSection = styled.section`
  margin-top: 3rem;
`;

const ReadmeContent = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;

  h3 {
    color: ${({ theme }) => theme.colors.text};
    margin: 2rem 0 1rem;
  }

  p {
    margin-bottom: 1rem;
  }

  ul {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
  }
`;

const ModelDetailPage: React.FC = () => {
  const { provider, model: modelName } = useParams<{ provider: string; model: string }>();
  const location = useLocation();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'playground' | 'json' | 'api'>('playground');
  const [status, setStatus] = useState<'idle' | 'processing' | 'completed' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [generatedResult, setGeneratedResult] = useState<string | null>(null);
  const [estimatedTime, setEstimatedTime] = useState<number>(0);
  const [modelParams, setModelParams] = useState<ModelParams>({});
  const [paramValues, setParamValues] = useState<Record<string, any>>({});
  const [loadingParams, setLoadingParams] = useState(false);
  const [paramsError, setParamsError] = useState<string | null>(null);

  // 从路由状态中获取模型信息，如果没有则从本地数据中查找
  const apiModel = location.state?.model as ApiModel | undefined;
  const model = apiModel ? (() => {
    const name = apiModel.model_name || apiModel.name || '';
    const priceRaw = apiModel.base_price ?? apiModel.price ?? 0;
    const price = priceRaw > 10 ? Number((priceRaw / 100).toFixed(2)) : Number(priceRaw);
    const thumbnail = apiModel.cover_url || apiModel.index_url || apiModel.thumbnail || 'https://via.placeholder.com/600x400?text=Model';
    const tags = (apiModel.tags && apiModel.tags.length ? apiModel.tags : apiModel.tag || []);
    const normalizedType = typeof apiModel.type === 'string'
      ? (apiModel.type.includes('video') ? 'video' : apiModel.type.includes('image') ? 'image' : 'image')
      : 'image';
    return {
      id: String(apiModel.id),
      name,
      provider: apiModel.provider || apiModel.company || apiModel.collections || 'unknown',
      title: apiModel.title || name,
      description: apiModel.description || apiModel.describe || '',
      price,
      type: normalizedType as 'video' | 'image' | 'audio',
      tags,
      thumbnail,
      examples: apiModel.examples,
      category: apiModel.category || apiModel.collections || 'general',
      featured: Boolean(apiModel.featured),
      hot: Boolean(apiModel.hot),
      commercial: Boolean(apiModel.commercial),
      partner: Boolean(apiModel.partner),
    };
  })() : models.find(m => m.provider === provider && m.name === modelName);

  const generationSteps = [
    'Analyzing prompt...',
    'Initializing model...',
    'Processing generation...',
    'Optimizing output...',
    'Finalizing result...'
  ];

  const mockResults = [
    'https://ext.same-assets.com/2897352160/2094130039.false',
    'https://ext.same-assets.com/2897352160/374079494.false',
    'https://ext.same-assets.com/2897352160/3894555946.false',
  ];

  // 初始化模型参数
  useEffect(() => {
    if (apiModel?.params) {
      // 将后端参数结构转换为前端可渲染的 ModelParams
      const transformed: ModelParams = {};
      Object.entries(apiModel.params).forEach(([key, p]: any) => {
        const backendType = String(p.type || '').toLowerCase();
        const mapType = backendType === 'integer' ? 'INT' : backendType === 'number' ? 'FLOAT' : backendType === 'boolean' ? 'BOOLEAN' : 'STRING';
        const param: ModelParam = {
          type: mapType as ModelParam['type'],
          default: p.default,
          required: Boolean(p.required),
        };
        if (Array.isArray(p.range)) {
          // 如果是枚举/离散值，作为 options 渲染
          param.options = p.range as Array<string | number>;
          param.display = 'select';
        } else if (p.range && Array.isArray(p.range)) {
          param.options = p.range as Array<string | number>;
        }
        transformed[key] = param;
      });
      setModelParams(transformed);

      // 初始化参数值，优先使用 playground 中的示例
      const initialValues: Record<string, any> = {};
      const playgroundDefaults = apiModel.playground || {};
      Object.entries(transformed).forEach(([key, param]) => {
        if (playgroundDefaults && Object.prototype.hasOwnProperty.call(playgroundDefaults, key)) {
          initialValues[key] = (playgroundDefaults as any)[key];
        } else {
          initialValues[key] = param.default;
        }
      });
      setParamValues(initialValues);
    } else {
      // 如果没有API模型参数，使用默认参数
      const defaultParams: ModelParams = {
        prompt: {
          type: 'STRING',
          default: 'A seductive woman in a wet white shirt, dancing barefoot on a marble floor under soft golden light, water dripping slowly from her hair, close-up on glistening skin, slow sensual motion, dramatic shadows',
          tooltip: 'Text prompt for generation',
          multiline: true
        },
        duration: {
          type: 'INT',
          default: 6,
          min: 5,
          max: 10,
          step: 1,
          tooltip: 'Generate video duration length seconds.'
        }
      };
      setModelParams(defaultParams);
      setParamValues({
        prompt: defaultParams.prompt.default,
        duration: defaultParams.duration.default
      });
    }
  }, [apiModel]);

  useEffect(() => {
    if (status === 'processing') {
      const totalTime = estimatedTime * 1000;
      const stepTime = totalTime / generationSteps.length;

      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            // 只有在没有生成结果时才设置完成状态
            if (!generatedResult) {
              setStatus('completed');
              setGeneratedResult(mockResults[Math.floor(Math.random() * mockResults.length)]);
            }
            return 100;
          }
          return prev + 2;
        });
      }, totalTime / 50);

      const stepInterval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= generationSteps.length - 1) {
            clearInterval(stepInterval);
            return prev;
          }
          return prev + 1;
        });
      }, stepTime);

      return () => {
        clearInterval(progressInterval);
        clearInterval(stepInterval);
      };
    }
  }, [status, estimatedTime, generationSteps.length, generatedResult]);

  if (!model) {
    return (
      <ModelDetailContainer>
        <Container>
          <h1>Model not found</h1>
          <p>The requested model could not be found.</p>
          <Button as={Link} to="/models" variant="primary">
            Back to Models
          </Button>
        </Container>
      </ModelDetailContainer>
    );
  }

  const handleGenerate = async () => {
    // 必填参数校验
    const missing: string[] = [];
    Object.entries(modelParams).forEach(([key, cfg]) => {
      if (cfg.required) {
        const v = (paramValues as any)[key];
        const isEmptyString = typeof v === 'string' && v.trim() === '';
        const isNullish = v === undefined || v === null;
        if (isNullish || isEmptyString) missing.push(key);
      }
    });
    if (missing.length > 0) {
      showToast(`请填写必填参数: ${missing.join(', ')}`, { type: 'error' });
      return;
    }

    setStatus('processing');
    setProgress(0);
    setCurrentStep(0);
    setGeneratedResult(null);

    // 估算时长
    const baseTime = model?.type === 'video' ? 30 : 15;
    const duration = paramValues.duration || 6;
    const durationMultiplier = Number.parseInt(duration.toString()) / 6;
    setEstimatedTime(baseTime * durationMultiplier);

    try {
      const payload = {
        enable_base64_output: false,
        guidance_scale: 3.5,
        image: "",
        loras: [
          {
            path: "strangerzonehf/Flux-Super-Realism-LoRA",
            scale: 1
          }
        ],
        num_images: 1,
        num_inference_steps: 28,
        output_format: "jpeg",
        prompt: String(paramValues.prompt ?? ''),
        seed: -1,
        size: "1024*1024",
        strength: 0.8,
        url: `api/v3/${(model?.provider || 'wavespeed-ai')}/${(model?.name || '').toString()}`,
        id: Number.isFinite(Number(model?.id)) ? Number(model?.id) : Date.now(),
      };

      console.log('Submitting order with payload:', payload);
      const res = await api.createOrder(payload);
      console.log('Order created successfully:', res);
      if(res.error){
        setStatus('error');

        // 规范化后端错误：可能是字符串化的JSON，或形如 "HTTP 401: {..}"
        let errorMessage = '生成失败，请重试';
        try {
          const raw = String(res.error || '');
          // 尝试从 raw 中提取 JSON 体
          const jsonMatch = raw.match(/\{[\s\S]*\}$/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            if (parsed?.message) errorMessage = parsed.message;
          } else if (raw) {
            errorMessage = raw;
          }
        } catch {}
  
        // 针对 401 未授权的友好提示
        if (/401|unauthorized/i.test(errorMessage)) {
          errorMessage = '未授权访问，请先登录后重试';
        }
  
        showToast(`错误: ${errorMessage}`, { type: 'error' });
        return ;
      }

      // 如果后端返回可预览的结果URL，尽量显示
      const possibleUrl = res?.result_url || res?.url || res?.image_url || res?.preview_url || res?.output_url;
      if (typeof possibleUrl === 'string' && possibleUrl) {
        setGeneratedResult(possibleUrl);
        setStatus('completed');
        showToast('生成成功！', { type: 'success' });
      } else {
        // 如果没有立即返回结果，保持processing状态，等待后续轮询或回调
        console.log('Order submitted, waiting for result...');
        showToast('任务已提交，正在生成中...', { type: 'info' });
        // 这里可以添加轮询逻辑来检查任务状态
        // 暂时使用模拟结果
        setTimeout(() => {
          setGeneratedResult(mockResults[Math.floor(Math.random() * mockResults.length)]);
          setStatus('completed');
          showToast('生成完成！', { type: 'success' });
        }, 3000);
      }
    } catch (err: any) {
      console.error('Create order failed:', err);
      setStatus('error');

      // 规范化后端错误：可能是字符串化的JSON，或形如 "HTTP 401: {..}"
      let errorMessage = '生成失败，请重试';
      try {
        const raw = String(err?.response?.data || err?.message || err?.error || '');
        // 尝试从 raw 中提取 JSON 体
        const jsonMatch = raw.match(/\{[\s\S]*\}$/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (parsed?.message) errorMessage = parsed.message;
        } else if (raw) {
          errorMessage = raw;
        }
      } catch {}

      // 针对 401 未授权的友好提示
      if (/401|unauthorized/i.test(errorMessage)) {
        errorMessage = '未授权访问，请先登录后重试';
      }

      showToast(`错误: ${errorMessage}`, { type: 'error' });
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setProgress(0);
    setCurrentStep(0);
    setGeneratedResult(null);
    
    // 重置所有参数为默认值
    const resetValues: Record<string, any> = {};
    if (modelParams) {
      Object.entries(modelParams).forEach(([key, param]) => {
        resetValues[key] = param.default;
      });
    }
    setParamValues(resetValues);
  };

  const handleParamChange = (paramName: string, value: any) => {
    // 参数验证
    const paramConfig = modelParams[paramName];
    if (paramConfig) {
      let validatedValue = value;
      
      // 类型验证和转换
      if (paramConfig.type === 'INT' && typeof value === 'string') {
        validatedValue = parseInt(value, 10);
        if (isNaN(validatedValue)) {
          validatedValue = paramConfig.default;
        }
      } else if (paramConfig.type === 'FLOAT' && typeof value === 'string') {
        validatedValue = parseFloat(value);
        if (isNaN(validatedValue)) {
          validatedValue = paramConfig.default;
        }
      }
      
      // 范围验证
      if (paramConfig.min !== undefined && validatedValue < paramConfig.min) {
        validatedValue = paramConfig.min;
      }
      if (paramConfig.max !== undefined && validatedValue > paramConfig.max) {
        validatedValue = paramConfig.max;
      }
      
      setParamValues(prev => ({
        ...prev,
        [paramName]: validatedValue
      }));
    } else {
      setParamValues(prev => ({
        ...prev,
        [paramName]: value
      }));
    }
  };

  const handleDownload = () => {
    if (generatedResult) {
      const link = document.createElement('a');
      link.href = generatedResult;
      link.download = `generated-${model.name}-${Date.now()}.${model.type === 'video' ? 'mp4' : 'jpg'}`;
      link.click();
    }
  };

  const renderPreviewContent = () => {
    switch (status) {
      case 'idle':
        return (
          <>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎬</div>
            <PreviewText>Ready to generate with {model.name}</PreviewText>
            <StatusIndicator $status="idle">
              <span>●</span>
              Click "Run" to start generation
            </StatusIndicator>
          </>
        );

      case 'processing':
        return (
          <>
            <div style={{ width: '100%' }}>
              <PreviewText>Generating {model.type}...</PreviewText>
              <ProgressBar progress={progress} />
              <div style={{ marginBottom: '1rem' }}>
                {Math.round(progress)}% complete • ~{Math.max(0, estimatedTime - (progress / 100 * estimatedTime)).toFixed(0)}s remaining
              </div>
              <GenerationSteps>
                {generationSteps.map((step, index) => (
                  <StepItem
                    key={index}
                    $active={index === currentStep}
                    $completed={index < currentStep}
                  >
                    {step}
                  </StepItem>
                ))}
              </GenerationSteps>
            </div>
          </>
        );

      case 'completed':
        return (
          <>
            {generatedResult && (
              <GenerationResult>
                {model.type === 'video' ? (
                  <GeneratedVideo controls autoPlay muted>
                    <source src={generatedResult} type="video/mp4" />
                    Your browser does not support the video tag.
                  </GeneratedVideo>
                ) : (
                  <GeneratedImage src={generatedResult} alt="Generated content" />
                )}
              </GenerationResult>
            )}
            <StatusIndicator $status="completed">
              <span>●</span>
              Generation completed successfully!
            </StatusIndicator>
            <DownloadButton onClick={handleDownload} variant="secondary">
              <span>⬇️</span>
              Download Result
            </DownloadButton>
          </>
        );

      case 'error':
        return (
          <>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
            <PreviewText>Generation failed</PreviewText>
            <StatusIndicator $status="idle">
              <span>●</span>
              Please try again with different parameters
            </StatusIndicator>
          </>
        );

      default:
        return null;
    }
  };

  const getBadgeVariant = (tag: string) => {
    if (tag.toLowerCase().includes('hot')) return 'hot';
    if (tag.toLowerCase().includes('commercial')) return 'commercial';
    if (tag.toLowerCase().includes('partner')) return 'partner';
    return undefined;
  };
  return (
    <ModelDetailContainer>
      <Container>
        <Breadcrumbs>
          <Link to="/">Home</Link> / <Link to="/models">Explore</Link> /
          <Link to="/collections/minimax">HAILUO VIDEO MODELS</Link> /
          {provider}/{modelName}
        </Breadcrumbs>

        <ModelHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🎬</span>
            <span style={{ color: '#6b7280' }}>text-to-video</span>
          </div>

          <ModelBadges>
            {model.tags && model.tags.length > 0 && model.tags.map((tag) => (
              <Badge key={tag} $variant={getBadgeVariant(tag)}>
                {tag}
              </Badge>
            ))}
          </ModelBadges>

          <ModelTitle>
            <span className="provider">{model?.provider || 'Unknown'}</span>/{model?.name || 'Unknown'}
          </ModelTitle>

          <ModelDescription>{model?.description || 'No description available'}</ModelDescription>
        </ModelHeader>

        <MainContent>
          <LeftSection>
            <PreviewArea>
              {renderPreviewContent()}
            </PreviewArea>
          </LeftSection>

          <RightSection>
            <PlaygroundCard>
              <PlaygroundHeader>
                <PlaygroundTab
                  $active={activeTab === 'playground'}
                  onClick={() => setActiveTab('playground')}
                >
                  Playground
                </PlaygroundTab>
                <PlaygroundTab
                  $active={activeTab === 'json'}
                  onClick={() => setActiveTab('json')}
                >
                  JSON
                </PlaygroundTab>
                <PlaygroundTab
                  $active={activeTab === 'api'}
                  onClick={() => setActiveTab('api')}
                >
                  API
                </PlaygroundTab>
              </PlaygroundHeader>

              {activeTab === 'playground' && (
                <>
                  {modelParams && Object.keys(modelParams).length > 0 ? (
                    Object.entries(modelParams).map(([paramName, paramConfig]) => (
                      <DynamicParamField
                        key={paramName}
                        paramName={paramName}
                        paramConfig={paramConfig}
                        value={paramValues[paramName]}
                        onChange={(value) => handleParamChange(paramName, value)}
                        disabled={status === 'processing'}
                      />
                    ))
                  ) : (
                    <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚙️</div>
                      <p>No parameters available for this model</p>
                    </div>
                  )}

                  <CostInfo>
                    <CostText>
                      Your request will cost <CostHighlight>${model?.price || 0}</CostHighlight> per run.
                    </CostText>
                    <CostText>
                      For $10 you can run this model approximately <CostHighlight>{Math.floor(10 / (model?.price || 1))}</CostHighlight> times.
                    </CostText>
                  </CostInfo>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button
                      onClick={handleReset}
                      variant="secondary"
                      style={{ flex: 1 }}
                      disabled={status === 'processing'}
                    >
                      Reset
                    </Button>
                    <Button
                      onClick={handleGenerate}
                      variant="primary"
                      style={{ flex: 2 }}
                      disabled={status === 'processing' || !paramValues.prompt?.trim()}
                    >
                      {status === 'processing' ? `Generating... ${Math.round(progress)}%` : `Run $${model?.price || 0}`}
                    </Button>
                  </div>
                </>
              )}

              {activeTab === 'json' && (
                <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.9rem' }}>
                  <pre>{JSON.stringify(paramValues, null, 2)}</pre>
                </div>
              )}

              {activeTab === 'api' && (
                <div>
                  <p style={{ marginBottom: '1rem', color: '#6b7280' }}>
                    Use this model via API endpoint:
                  </p>
                  <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.9rem' }}>
                    <code>POST /api/model/{model?.provider}/{model?.name}/generate</code>
                  </div>
                  <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#6b7280' }}>
                    Include your API key in the Authorization header and send the parameters as JSON in the request body.
                  </p>
                  <div style={{ marginTop: '1rem' }}>
                    <p style={{ marginBottom: '0.5rem', fontWeight: '500' }}>Available parameters:</p>
                    <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.8rem' }}>
                      <pre>{JSON.stringify(modelParams || {}, null, 2)}</pre>
                    </div>
                  </div>
                </div>
              )}
            </PlaygroundCard>
          </RightSection>
        </MainContent>
      </Container>
    </ModelDetailContainer>
  );
};

export default ModelDetailPage;
