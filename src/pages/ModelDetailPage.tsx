import type React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { Card, Button, Input, Textarea } from '../styles/GlobalStyles';
import { api } from '../api/client';
import DynamicParamField from '../components/DynamicParamField';
import { useToast } from '../components/Toast';
import type { ModelParams, ModelParam, ApiModel } from '../types/models';
import { CheckCircle, Clock, Circle, Film, X, Settings, Clipboard, Play, Download, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { keyframes } from 'styled-components';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const SpinningIcon = styled(Loader2)`
  animation: ${spin} 1s linear infinite;
`;

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
  color: ${({ theme }) => theme.colors.textSecondary };
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

const Select = styled.div``;

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
`;

const StepIcon = styled.div<{ $active?: boolean; $completed?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
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
  const { t } = useTranslation();
  const { provider, model: modelName, subtype } = useParams<{ provider: string; model: string; subtype?: string }>();
  console.log('modelName', modelName);
  console.log('provider', provider);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
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

  // 路由状态模型；若无，则从接口获取匹配模型
  const apiModel = location.state?.model as ApiModel | undefined;
  const [fetchedApiModel, setFetchedApiModel] = useState<ApiModel | undefined>(undefined);
  const [loadingModel, setLoadingModel] = useState<boolean>(false);

  useEffect(() => {
    if (!apiModel) {
      const fetchAndMatch = async () => {
        try {
          setLoadingModel(true);
          const list = await api.listModels();
          const arr: ApiModel[] = Array.isArray(list) ? list : (list?.models || []);
          const match = arr.find((m) => {
            const name = (m.model_name || m.name || '').toString();
            const routeFullName = subtype ? `${provider}/${modelName}/${subtype}` : `${provider}/${modelName}`;
            return name === routeFullName;
          });
          console.log('match', match);
          if (match) {
            setFetchedApiModel(match);
            // 如果匹配的模型有playground结果，更新参数值
            if (match.playground) {
              const playgroundDefaults = match.playground || {};
              setParamValues(prevValues => {
                const newValues = { ...prevValues };
                Object.entries(playgroundDefaults).forEach(([key, value]) => {
                  if (value !== undefined && value !== null) {
                    newValues[key] = value;
                  }
                });
                return newValues;
              });
            }
          }
        } catch (e) {
          console.error('Failed to fetch model from /api/model:', e);
        } finally {
          setLoadingModel(false);
        }
      };
      fetchAndMatch();
    }
  }, [apiModel, provider, modelName, subtype]);

  const effectiveApiModel: ApiModel | undefined = apiModel || fetchedApiModel;

  const model = effectiveApiModel ? (() => {
    const name = effectiveApiModel.model_name || effectiveApiModel.name || '';
    const priceRaw = effectiveApiModel.base_price ?? effectiveApiModel.price ?? 0;
    const price = priceRaw > 10 ? Number((priceRaw / 100).toFixed(2)) : Number(priceRaw);
    const thumbnail = effectiveApiModel.cover_url || effectiveApiModel.index_url || effectiveApiModel.thumbnail || 'https://via.placeholder.com/600x400?text=Model';
    const tags = (effectiveApiModel.tags && effectiveApiModel.tags.length ? effectiveApiModel.tags : effectiveApiModel.tag || []);
    const normalizedType = typeof effectiveApiModel.type === 'string'
      ? (effectiveApiModel.type.includes('video') ? 'video' : effectiveApiModel.type.includes('image') ? 'image' : 'image')
      : 'image';
    return {
      id: String(effectiveApiModel.id),
      name,
      provider: effectiveApiModel.provider || effectiveApiModel.company || effectiveApiModel.collections || 'unknown',
      title: effectiveApiModel.title || name,
      description: effectiveApiModel.description || effectiveApiModel.describe || '',
      price,
      type: effectiveApiModel.type,
      tags,
      thumbnail,
      examples: effectiveApiModel.examples,
      category: effectiveApiModel.category || effectiveApiModel.collections || 'general',
      featured: Boolean(effectiveApiModel.featured),
      hot: Boolean(effectiveApiModel.hot),
      commercial: Boolean(effectiveApiModel.commercial),
      partner: Boolean(effectiveApiModel.partner),
      cover_url: effectiveApiModel.cover_url ,
    };
  })() : undefined;

  const generationSteps = [
    t('modelDetail.analyzingPrompt'),
    t('modelDetail.initializingModel'),
    t('modelDetail.processingGeneration'),
    t('modelDetail.optimizingOutput'),
    t('modelDetail.finalizingResult')
  ];

  const mockResults = [
    'https://ext.same-assets.com/2897352160/2094130039.false',
    'https://ext.same-assets.com/2897352160/374079494.false',
    'https://ext.same-assets.com/2897352160/3894555946.false',
  ];

  // 懒加载 Loading Spinner
  const LoadingSpinner = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4rem 0' }}>
      <div
        style={{
          width: 40,
          height: 40,
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}
      />
      <style>
        {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
      </style>
    </div>
  );

  // 初始化模型参数（优先用 API 模型）
  useEffect(() => {
    if (effectiveApiModel?.params) {
      const transformed: ModelParams = {};
      Object.entries(effectiveApiModel.params).forEach(([key, p]: any) => {
        console.log('p', p);
        const backendType = String(p.type || '').toLowerCase();
        const mapType = backendType === 'integer' ? 'INT' : 
                       backendType === 'number' ? 'FLOAT' : 
                       backendType === 'boolean' ? 'BOOLEAN' : 
                       backendType === 'array' ? 'ARRAY' : 'STRING';
        const param: ModelParam = {
          type: mapType as ModelParam['type'],
          default: p.Default || p.default,
          required: Boolean(p.Required),
        };
        
        // 处理 Range 选项（新格式，大写R）
        if (Array.isArray(p.Range)) {
          param.Range = p.Range as Array<string | number>;
          // 如果是NUMBER类型且有Range，使用滑块
          if (backendType === 'number' && p.Range.length === 2) {
            param.min = Math.min(p.Range[0], p.Range[1]);
            param.max = Math.max(p.Range[0], p.Range[1]);
            param.step = 0.01; // 默认步长为1
            param.display = 'slider';
          } else {
            param.display = 'select';
          }
        }
        // 处理旧的 range 选项（小写r）
        else if (Array.isArray(p.range)) {
          param.options = p.range as Array<string | number>;
          param.display = 'select';
        }
        transformed[key] = param;
      });
      console.log('transformed', transformed);
      setModelParams(transformed);

      const initialValues: Record<string, any> = {};
      const playgroundDefaults = effectiveApiModel.playground || {};
      Object.entries(transformed).forEach(([key, param]) => {
        if (playgroundDefaults && Object.prototype.hasOwnProperty.call(playgroundDefaults, key)) {
          initialValues[key] = (playgroundDefaults as any)[key];
        } else {
          initialValues[key] = param.default;
        }
      });
      setParamValues(initialValues);
    }
  }, [effectiveApiModel]);

  useEffect(() => {
    if (status === 'processing') {
      const totalTime = estimatedTime * 1000;
      const stepTime = totalTime / generationSteps.length;

      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
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

  // 在接口筛选完成之前显示懒加载
  if (!effectiveApiModel && loadingModel) {
    return (
      <ModelDetailContainer>
        <Container>
          <LoadingSpinner />
        </Container>
      </ModelDetailContainer>
    );
  }

  if (!model) {
    return (
      <ModelDetailContainer>
        <Container>
          <h1>{t('modelDetail.modelNotFound')}</h1>
          <p>{t('modelDetail.modelNotFound')}</p>
          <Button as={Link} to="/models" variant="primary">
            {t('modelDetail.backToModels')}
          </Button>
        </Container>
      </ModelDetailContainer>
    );
  }

  const handleGenerate = async () => {
    if (!isAuthenticated) {
      showToast(t('modelDetail.pleaseLogin'), { type: 'error' });
      navigate('/login');
      return;
    }
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

    const baseTime = model?.type === 'video' ? 30 : 15;
    const duration = paramValues.duration || 6;
    const durationMultiplier = Number.parseInt(duration.toString()) / 6;
    setEstimatedTime(baseTime * durationMultiplier);

    try {
      // 动态合并参数：将当前填写的所有参数传递给后端
      const dynamicParams = { ...paramValues } as Record<string, any>;
      const payload = {
        ...dynamicParams,
        url: `${(model?.name || '').toString()}`,
        id: Number.isFinite(Number(model?.id)) ? Number(model?.id) : Date.now(),
      } as Record<string, any>;

      console.log('Submitting order with payload:', payload);
      const res = await api.createOrder(payload as any);
      console.log('Order created successfully:', res);
      
      // 检查是否有错误信息（如超时等）
      if (res && res.detail && typeof res.detail === 'string') {
        const errorDetail = res.detail.toLowerCase();
        if (errorDetail.includes('timeout') || errorDetail.includes('timed out')) {
          setStatus('error');
          showToast(t('modelDetail.generationFailed'), { type: 'error' });
          return;
        }
      }
      
      // 请求创建成功但无结果，需要使用返回的 uuid 轮询查询结果
      if (res && res.uuid) {
        showToast('任务已提交，正在生成中...', { type: 'info' });

        const requestId: string = String(res.uuid);
        const startTime = Date.now();
        const timeoutMs = Math.max(30000, (estimatedTime || 15) * 1000 * 2); // 至少 15s，上限=估计时长*2
        const pollIntervalMs = 1500;

        const pollResult = async (): Promise<void> => {
          try {
            const result = await api.getOrderResult(requestId);
            // 兼容不同返回结构：成功时可能包含 url/image_url/result_url/preview_url/output_url 或 status/completed 标记
            const possibleUrl = result?.result_url || result?.url || result?.image_url || result?.preview_url || result?.output_url;
            const statusText = (result?.status || '').toString().toLowerCase();

            // 检查状态是否为 completed
            if (statusText === 'completed') {
              if (typeof possibleUrl === 'string' && possibleUrl) {
                setGeneratedResult(possibleUrl);
                setStatus('completed');
                showToast(t('modelDetail.generationSuccess'), { type: 'success' });
                return;
              } else {
                // 即使状态是 completed 但没有 URL，也认为生成失败
                setStatus('error');
                showToast(t('modelDetail.generationFailed'), { type: 'error' });
                return;
              }
            }

            // 检查是否有直接的结果 URL（兼容旧格式，但需要确保不是 processing 状态）
            if (typeof possibleUrl === 'string' && possibleUrl && statusText !== 'processing') {
              setGeneratedResult(possibleUrl);
              setStatus('completed');
              showToast(t('modelDetail.generationSuccess'), { type: 'success' });
              return;
            }

            if (statusText === 'failed' || statusText === 'error') {
              setStatus('error');
              showToast(t('modelDetail.generationFailed'), { type: 'error' });
              return;
            }

            if (Date.now() - startTime > timeoutMs) {
              setStatus('error');
              showToast('生成超时，请稍后重试', { type: 'error' });
              return;
            }

            setTimeout(pollResult, pollIntervalMs);
          } catch (e) {
            // 轮询单次失败不立刻失败，继续重试直到超时
            if (Date.now() - startTime > timeoutMs) {
              setStatus('error');
              showToast('生成超时，请稍后重试', { type: 'error' });
              return;
            }
            setTimeout(pollResult, pollIntervalMs);
          }
        };

        // 启动轮询
        setTimeout(pollResult, pollIntervalMs);
        // 注意：这里不 return，让方法继续执行到结尾
      }

      if(res.error || res.code ===400){
        setStatus('error');

        let errorMessage = t('modelDetail.generationFailed');
        try {
          const raw = String(res.error || '');
          const jsonMatch = raw.match(/\{[\s\S]*\}$/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            if (parsed?.message) errorMessage = parsed.message;
          } else if (raw) {
            errorMessage = raw;
          }
        } catch {}
  
        showToast(`错误: ${errorMessage}`, { type: 'error' });
        return ;
      }

      const possibleUrl = res?.result_url || res?.url || res?.image_url || res?.preview_url || res?.output_url;
      if (typeof possibleUrl === 'string' && possibleUrl) {
        setGeneratedResult(possibleUrl);
        setStatus('completed');
        showToast(t('modelDetail.generationSuccess'), { type: 'success' });
      } else {
        // 无 uuid 且无直链，视为异常
        console.log('Order submitted, but no uuid and no direct result returned');
        // showToast('任务已提交，但未获取到任务标识，请稍后在历史中查看', { type: 'warning' as any });
      }
    } catch (err: any) {
      console.error('Create order failed:', err);
      setStatus('error');

      let errorMessage = t('modelDetail.generationFailed');
      try {
        const raw = String(err?.response?.data || err?.message || err?.error || '');
        const jsonMatch = raw.match(/\{[\s\S]*\}$/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (parsed?.message) errorMessage = parsed.message;
        } else if (raw) {
          errorMessage = raw;
        }
      } catch {}

      // if (/401|unauthorized/i.test(errorMessage)) {
      //   errorMessage = '未授权访问，请先登录后重试';
      // }

      showToast(`错误: ${errorMessage}`, { type: 'error' });
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setProgress(0);
    setCurrentStep(0);
    setGeneratedResult(null);
    const resetValues: Record<string, any> = {};
    if (modelParams) {
      Object.entries(modelParams).forEach(([key, param]) => {
        resetValues[key] = param.default;
      });
    }
    setParamValues(resetValues);
  };

  const handleParamChange = (paramName: string, value: any) => {
    const paramConfig = modelParams[paramName];
    if (paramConfig) {
      let validatedValue = value;
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

  const generateCurlCommand = () => {
    const apiKey = '${WAVESPEED_API_KEY}';
    const endpoint = `https://aispeed.8lab.cn/api/order`;
    
    // 构建请求数据
    const requestData: any = {
      enable_base64_output: false,
      enable_sync_mode: false,
      ...paramValues
    };

    // 处理图片参数
    if (paramValues.image || paramValues.start_image || paramValues.last_image) {
      const imageUrl = paramValues.image || paramValues.start_image || paramValues.last_image;
      requestData.images = [imageUrl];
      delete requestData.image;
      delete requestData.start_image;
      delete requestData.last_image;
    }

    const jsonData = JSON.stringify(requestData, null, 2);
    
    return `curl --location '${endpoint}' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer ${apiKey}' \\
--data-raw '${jsonData}'`;
  };

  const generateQueryCommand = () => {
    const apiKey = '${WAVESPEED_API_KEY}';
    const uuid = '${uuid}';
    return `curl --location 'https://aispeed.8lab.cn/api/order/result?request_id=${uuid}' \\
--header 'Authorization: Bearer ${apiKey}'`;
  };

  const renderPreviewContent = () => {
    switch (status) {
      case 'idle':
        return (
          <>
            {model?.cover_url ? (
              (() => {
                const url = model.cover_url.toLowerCase();
                const isVideo = url.includes('.mp4') || url.includes('.mp3')  || url.includes('.webm') || url.includes('.ogg') || url.includes('.mov');
                const isImage = url.includes('.png') || url.includes('.jpg') || url.includes('.jpeg') || url.includes('.gif') || url.includes('.webp') || url.includes('.svg');
                
                if (isVideo) {
                  return (
                    <GeneratedVideo 
                      controls 
                      style={{ 
                        width: '100%', 
                        maxHeight: '350px', 
                        objectFit: 'cover',
                        borderRadius: '0.5rem',
                        marginBottom: '1rem'
                      }}
                    >
                      <source src={model.cover_url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </GeneratedVideo>
                  );
                } else if (isImage) {
                  return (
                    <GeneratedImage 
                      src={model.cover_url} 
                      alt="Model preview" 
                      style={{ 
                        width: '100%', 
                        maxHeight: '350px', 
                        objectFit: 'cover',
                        borderRadius: '0.5rem',
                        marginBottom: '1rem'
                      }}
                    />
                  );
                } else {
                  // 如果无法确定类型，默认显示为图片
                  return (
                    <GeneratedImage 
                      src={model.cover_url} 
                      alt="Model preview" 
                      style={{ 
                        width: '100%', 
                        maxHeight: '350px', 
                        objectFit: 'cover',
                        borderRadius: '0.5rem',
                        marginBottom: '1rem'
                      }}
                    />
                  );
                }
              })()
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                <Film size={48} />
              </div>
            )}
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
              <PreviewText>{t('modelDetail.generating')} {model.type}...</PreviewText>
              <ProgressBar progress={progress} />
              <div style={{ marginBottom: '1rem' }}>
                {Math.round(progress)}% {t('common.complete')} • ~{Math.max(0, estimatedTime - (progress / 100 * estimatedTime)).toFixed(0)}{t('modelDetail.seconds')} {t('common.remaining')}
              </div>
              <GenerationSteps>
                {generationSteps.map((step, index) => (
                  <StepItem
                    key={index}
                    $active={index === currentStep}
                    $completed={index < currentStep}
                  >
                    <StepIcon $active={index === currentStep} $completed={index < currentStep}>
                      {index < currentStep ? (
                        <CheckCircle size={16} />
                      ) : index === currentStep ? (
                        <Clock size={16} />
                      ) : (
                        <Circle size={16} />
                      )}
                    </StepIcon>
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
                {(() => {
                  const url = generatedResult.toLowerCase();
                  const isVideo = url.includes('.mp4') || url.includes('.webm') || url.includes('.ogg') || url.includes('.mov');
                  const isImage = url.includes('.png') || url.includes('.jpg') || url.includes('.jpeg') || url.includes('.gif') || url.includes('.webp') || url.includes('.svg');
                  
                  if (isVideo) {
                    return (
                      <GeneratedVideo 
                        controls 
                        autoPlay 
                        muted
                        style={{ 
                          width: '100%', 
                          maxHeight: '500px', 
                          objectFit: 'cover',
                          borderRadius: '0.5rem',
                          marginBottom: '1rem'
                        }}
                      >
                        <source src={generatedResult} type="video/mp4" />
                        Your browser does not support the video tag.
                      </GeneratedVideo>
                    );
                  } else if (isImage) {
                    return (
                      <GeneratedImage 
                        src={generatedResult} 
                        alt="Generated content" 
                        style={{ 
                          width: '100%', 
                          maxHeight: '500px', 
                          objectFit: 'cover',
                          borderRadius: '0.5rem',
                          marginBottom: '1rem'
                        }}
                      />
                    );
                  } else {
                    // 如果无法确定类型，默认显示为图片
                    return (
                      <GeneratedImage 
                        src={generatedResult} 
                        alt="Generated content" 
                        style={{ 
                          width: '100%', 
                          maxHeight: '500px', 
                          objectFit: 'cover',
                          borderRadius: '0.5rem',
                          marginBottom: '1rem'
                        }}
                      />
                    );
                  }
                })()}
              </GenerationResult>
            )}
            <StatusIndicator $status="completed">
              <span>●</span>
              {t('modelDetail.generationSuccess')}
            </StatusIndicator>
            {generatedResult && (
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <Button 
                  onClick={() => window.open(generatedResult, '_blank')} 
                  variant="secondary"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <Download size={16} />
                  {t('modelDetail.downloadResult')}
                </Button>
                {/* <Button 
                  onClick={() => navigator.clipboard.writeText(generatedResult)} 
                  variant="secondary"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <Clipboard size={16} />
                  {t('modelDetail.copyUrl')}
                </Button> */}
              </div>
            )}
          </>
        );

      case 'error':
        return (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <X size={48} />
            </div>
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
          {subtype ? `${modelName}/${subtype}` : modelName}
        </Breadcrumbs>

        <ModelHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Film size={24} />
            <span style={{ color: '#6b7280' }}>{model?.type}</span>
          </div>

          <ModelBadges>
            {model.tags && model.tags.length > 0 && model.tags.map((tag) => (
              <Badge key={tag} $variant={getBadgeVariant(tag)}>
                {tag}
              </Badge>
            ))}
          </ModelBadges>

          <ModelTitle>
     {model?.name || 'Unknown'}
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
                  {t('modelDetail.playground')}
                </PlaygroundTab>
                <PlaygroundTab
                  $active={activeTab === 'json'}
                  onClick={() => setActiveTab('json')}
                >
                  {t('modelDetail.json')}
                </PlaygroundTab>
                <PlaygroundTab
                  $active={activeTab === 'api'}
                  onClick={() => setActiveTab('api')}
                >
                  {t('modelDetail.api')}
                </PlaygroundTab>
              </PlaygroundHeader>

              {activeTab === 'playground' && (
                <>
                  {modelParams && Object.keys(modelParams).length > 0 ? (
                    Object.entries(modelParams)
                      .sort((a, b) => {
                        const ak = a[0].toLowerCase();
                        const bk = b[0].toLowerCase();
                        if (ak === 'prompt' && bk !== 'prompt') return -1;
                        if (bk === 'prompt' && ak !== 'prompt') return 1;
                        return 0;
                      })
                      .map(([paramName, paramConfig]) => (
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
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                        <Settings size={24} />
                      </div>
                      <p>{t('modelDetail.noParametersAvailable')}</p>
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
                      {t('modelDetail.reset')}
                    </Button>
                    <Button
                      onClick={handleGenerate}
                      variant="primary"
                      style={{ flex: 2 }}
                      disabled={status === 'processing'}
                    >
                      {status === 'processing' ? (
                        <>
                          <SpinningIcon size={16} />
                          {t('modelDetail.generating')}
                           {/* {Math.round(progress)}% */}
                        </>
                      ) : status === 'completed' ? (
                        t('modelDetail.generate')
                      ) : status === 'error' ? (
                        t('modelDetail.generate')
                      ) : (
                        `${t('modelDetail.generate')} $${model?.price || 0}`
                      )}
                    </Button>
                  </div>
                </>
              )}

              {activeTab === 'json' && (
                <div style={{ 
                  background: '#f8f9fa', 
                  padding: '1rem', 
                  borderRadius: '0.5rem', 
                  fontSize: '0.9rem',
                  overflow: 'auto',
                  maxHeight: '400px',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
                }}>
                  <pre style={{ 
                    margin: 0, 
                    whiteSpace: 'pre-wrap', 
                    wordBreak: 'break-all',
                    overflow: 'visible'
                  }}>
                    {JSON.stringify(paramValues, null, 2)}
                  </pre>
                </div>
              )}

              {activeTab === 'api' && (
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                    Submit Task
                  </h3>
                  <div style={{ 
                    background: '#1e1e1e', 
                    color: '#d4d4d4', 
                    padding: '1.5rem', 
                    borderRadius: '0.5rem', 
                    fontSize: '0.85rem',
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                    position: 'relative',
                    overflow: 'auto'
                  }}>
                    <div style={{ 
                      position: 'absolute', 
                      top: '1rem', 
                      right: '1rem', 
                      cursor: 'pointer',
                      color: '#9ca3af',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0.25rem',
                      borderRadius: '0.25rem',
                      transition: 'all 0.2s ease'
                    }} onClick={() => {
                      const curlCommand = generateCurlCommand();
                      navigator.clipboard.writeText(curlCommand);
                      showToast('Curl command copied to clipboard!', { type: 'success' });
                    }}>
                      <Clipboard size={16} />
                    </div>
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
{generateCurlCommand()}
                    </pre>
                  </div>
                  <div style={{ marginTop: '2rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                      Query Result
                    </h3>
                    <div style={{ 
                      background: '#1e1e1e', 
                      color: '#d4d4d4', 
                      padding: '1.5rem', 
                      borderRadius: '0.5rem', 
                      fontSize: '0.85rem',
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                      position: 'relative',
                      overflow: 'auto'
                    }}>
                      <div style={{ 
                        position: 'absolute', 
                        top: '1rem', 
                        right: '1rem', 
                        cursor: 'pointer',
                        color: '#9ca3af',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.25rem',
                        borderRadius: '0.25rem',
                        transition: 'all 0.2s ease'
                      }} onClick={() => {
                        const queryCommand = generateQueryCommand();
                        navigator.clipboard.writeText(queryCommand);
                        showToast('Query command copied to clipboard!', { type: 'success' });
                      }}>
                        <Clipboard size={16} />
                      </div>
                      <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
{generateQueryCommand()}
                      </pre>
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
