import type React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from '../styles/GlobalStyles';
import ModelCard from '../components/ModelCard';
import { models, modelCollections, videoEffects } from '../data/models';
import { api } from '../api/client';
import type { Model } from '../types/models';

const HomePageContainer = styled.div`
  background: ${({ theme }) => theme.colors.background};
`;

const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.3;
  }
`;
const VideoDom = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  
  video {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
  color: white;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  opacity: 0.95;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 3rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const HeroButton = styled(Button) <{ $variant?: 'primary' | 'secondary' }>`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  ${({ $variant }) => $variant === 'secondary' ? `
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.3);
    color: white;
    backdrop-filter: blur(10px);

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }
  ` : `
     background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
     border: none;
     color: white;
     
     &:hover {
       background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
       transform: translateY(-2px);
       box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
     }
  `}
`;

const Section = styled.section`
  padding: 4rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ModelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FeatureSection = styled.section`
  padding: 4rem 0;
  background: ${({ theme }) => theme.colors.surface};
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: ${({ theme }) => theme.colors.gradient};
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const CollectionsSection = styled.section`
  padding: 4rem 0;
`;

const CollectionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const CollectionCard = styled(Link)`
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  display: block;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const CollectionIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const CollectionName = styled.h4`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const VideoEffectsSection = styled.section`
  padding: 4rem 0;
  background: ${({ theme }) => theme.colors.surface};
`;

const EffectsHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const EffectsTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};

  .highlight {
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const EffectsSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const EffectsToggle = styled.div`
  display: flex;
  gap: 0;
  justify-content: center;
  margin-bottom: 2rem;
`;

const ToggleButton = styled.button<{ $active?: boolean }>`
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  border: none;
  background: ${({ $active, theme }) => $active ? theme.colors.primary : 'transparent'};
  color: ${({ $active, theme }) => $active ? 'white' : theme.colors.textSecondary};

  &:first-child {
    border-radius: 0.5rem 0 0 0.5rem;
  }

  &:last-child {
    border-radius: 0 0.5rem 0.5rem 0;
  }

  &:hover {
    background: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.surface};
  }
`;

const EffectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const EffectCard = styled.div`
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  aspect-ratio: 1;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const EffectLabel = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 1rem 0.5rem 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
`;

const HotBadge = styled.span`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: #ef4444;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
`;

const ViewAllButton = styled(Button)`
  margin: 2rem auto 0;
  display: block;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
  
  &::after {
    content: '';
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 2rem 0;
  color: #dc2626;
  text-align: center;
`;

const ModelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
`;

interface ApiModel {
  id: string;
  name: string;
  // 后端字段命名
  company?: string;
  collections?: string;
  describe?: string;
  tag?: string[];
  url?: string;

  // 兼容此前假设的字段（有些后端也可能返回这些）
  provider?: string;
  price: number;
  description?: string;
  thumbnail?: string;
  featured?: boolean;
  category?: string;
  title?: string;
  type?: 'video' | 'image' | 'audio';
  tags?: string[];
}

// 将API模型转换为本地Model格式
const convertApiModelToModel = (apiModel: ApiModel): Model => ({
  id: String(apiModel.id),
  name: apiModel.name,
  provider: apiModel.provider || apiModel.company || apiModel.collections || 'unknown',
  title: apiModel.title || apiModel.name,
  description: apiModel.describe || apiModel.description || '',
  // 后端价格单位不确定，做一次简单归一化（>10 视作分）
  price: apiModel.price > 10 ? Number((apiModel.price / 100).toFixed(2)) : apiModel.price,
  type: apiModel.type || 'image',
  tags: (apiModel.tags && apiModel.tags.length ? apiModel.tags : (apiModel.tag || [])).map(t => String(t)),
  thumbnail: apiModel.thumbnail || 'https://via.placeholder.com/600x400?text=Model',
  category: apiModel.category || 'general',
  featured: apiModel.featured || false,
});

const HomePage: React.FC = () => {
  const [apiModels, setApiModels] = useState<ApiModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 获取API模型数据
  useEffect(() => {
    const fetchModels = async () => {
      try {
        setLoading(true);
        const response = await api.listModels();
        console.log('API Models Response:', response);
        
        // 根据实际API响应结构调整
        if (response && Array.isArray(response)) {
          setApiModels(response);
        } else if (response && response.models && Array.isArray(response.models)) {
          setApiModels(response.models);
        } else {
          console.warn('Unexpected API response format:', response);
          setApiModels([]);
        }
      } catch (err) {
        console.error('Failed to fetch models:', err);
        setError('Failed to load models');
        // 使用本地数据作为后备
        setApiModels(models.filter(model => model.featured).slice(0, 8));
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  // 合并API数据和本地数据
  const featuredModels: Model[] = apiModels.length > 0 
    ? apiModels.slice(0, 8).map(convertApiModelToModel)
    : models.filter(model => model.featured).slice(0, 8);

  return (
    <HomePageContainer>
      <HeroSection>
     <VideoDom>
     <video src="https://d1q70pf5vjeyhc.wavespeed.ai/media/videos/1752735441692270409_ABJFCxuq.mp4" className="absolute top-0 left-0 w-full h-full object-cover" autoPlay={true}  poster="https://d1q70pf5vjeyhc.wavespeed.ai/media/images/1752735588486465176_uELKGDzv.png" data-sentry-component="VideoBanner" data-sentry-source-file="home.tsx"></video>
     </VideoDom>
        <HeroContent>
          <HeroTitle>Ultimate AI Media Generation Platform</HeroTitle>
          <HeroSubtitle>
            WaveSpeedAI accelerates AI Image and Video generation for you to build, create, and scale faster.
          </HeroSubtitle>
          <HeroActions>
            <HeroButton as={Link} to="/models" $variant="primary">
              Explore Models
            </HeroButton>
            <HeroButton as={Link} to="/docs" $variant="secondary">
              API Doc
            </HeroButton>
          </HeroActions>
        </HeroContent>
      </HeroSection>

      <Section>
        <Container>
          <SectionTitle>Featured Models</SectionTitle>
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage>
              {error}. Using local data as fallback.
            </ErrorMessage>
          ) : null}
          <ModelGrid>
            {featuredModels.map((model, index) => (
              <ModelCard 
                key={model.id} 
                model={model} 
                apiModel={apiModels[index]} 
              />
            ))}
          </ModelGrid>
        </Container>
      </Section>

      <FeatureSection>
        <Container>
          <SectionTitle>Unleash the Power of AI with Speed</SectionTitle>
          <p style={{ textAlign: 'center', marginBottom: '3rem', color: '#64748b' }}>
            Experience the fastest and most diverse multimodal AI generation.
          </p>
          <FeatureGrid>
            <FeatureCard>
              <FeatureIcon>🎯</FeatureIcon>
              <FeatureTitle>Multimodal AI Tools</FeatureTitle>
              <FeatureDescription>
                Unlock image, video, and voice generation from text, image, or audio — all in one place.
              </FeatureDescription>
              <Button as={Link} to="/models" variant="secondary">
                Explore More
              </Button>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>⚡</FeatureIcon>
              <FeatureTitle>Latest AI Models</FeatureTitle>
              <FeatureDescription>
                Try the newest multimodal models before anyone else.
              </FeatureDescription>
              <Button as={Link} to="/models?sort=newest" variant="secondary">
                Latest
              </Button>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>🔧</FeatureIcon>
              <FeatureTitle>APIs for Scale</FeatureTitle>
              <FeatureDescription>
                Integrate powerful image and video generation into your app or platform via WaveSpeed APIs.
              </FeatureDescription>
              <Button as={Link} to="/docs" variant="secondary">
                Run API
              </Button>
            </FeatureCard>
          </FeatureGrid>
        </Container>
      </FeatureSection>

      <CollectionsSection>
        <Container>
          <SectionTitle>Model Groups</SectionTitle>
          <CollectionsGrid>
            {modelCollections.map((collection) => (
              <CollectionCard key={collection.id} to={`/collections/${collection.id}`}>
                <CollectionIcon>{collection.icon}</CollectionIcon>
                <CollectionName>{collection.name}</CollectionName>
              </CollectionCard>
            ))}
          </CollectionsGrid>
        </Container>
      </CollectionsSection>

      <VideoEffectsSection>
        <Container>
          <EffectsHeader>
            <EffectsTitle>
              <span className="highlight">100+</span> Viral AI Videos and Photo Effects
            </EffectsTitle>
            <EffectsSubtitle>
              Want to make a lion dive into a swimming pool or create a ninja slicing fruit in mid-air?
              How about turning your selfie into a Pixar-style character or making a robot dance on the moon?
              With just one click, you can turn any wild idea into viral content.
            </EffectsSubtitle>
            <EffectsToggle>
              <ToggleButton $active={true}>Video Effects</ToggleButton>
              <ToggleButton>Photo Effects</ToggleButton>
            </EffectsToggle>
          </EffectsHeader>

          <EffectsGrid>
            {videoEffects.slice(0, 10).map((effect) => (
              <EffectCard
                key={effect.id}
                style={{ backgroundImage: `url(${effect.thumbnail})` }}
              >
                {effect.hot && <HotBadge>HOT</HotBadge>}
                <EffectLabel>{effect.name}</EffectLabel>
              </EffectCard>
            ))}
          </EffectsGrid>

          <ViewAllButton as={Link} to="/collections/video-effects" variant="primary">
            View all
          </ViewAllButton>
        </Container>
      </VideoEffectsSection>
    </HomePageContainer>
  );
};

export default HomePage;
