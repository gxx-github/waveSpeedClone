import type React from 'react';
import { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { Input, Button } from '../styles/GlobalStyles';
import ModelCard from '../components/ModelCard';
import { ModelsSkeletonLoader, LoadingState } from '../components/LoadingStates';
import { models } from '../data/models';
import { api } from '../api/client';
import type { ApiModel } from '../types/models';

const ModelsPageContainer = styled.div`
  padding: 3rem 0;
  min-height: calc(100vh - 140px);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding-top: 1rem;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const PageDescription = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FiltersSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const FiltersRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 250px;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textSecondary};
  pointer-events: none;
`;

const SearchInputStyled = styled(Input)`
  padding-left: 3rem;
  transition: all 0.3s ease;

  &:focus {
    transform: scale(1.02);
    box-shadow: 0 4px 20px rgba(59, 130, 246, 0.15);
  }
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const FilterLabel = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
`;

const FilterSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const FilterButton = styled(Button)<{ $active?: boolean }>`
  ${({ $active, theme }) => $active && `
    background: ${theme.colors.primary};
    color: white;
  `}
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ResultsCount = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const SortSelect = styled(FilterSelect)`
  min-width: 150px;
`;

const ModelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const LoadMoreButton = styled(Button)`
  margin: 3rem auto 0;
  display: block;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 0.25rem;
`;

type SortOption = 'newest' | 'price-low' | 'price-high' | 'name';
type TypeFilter = 'all' | 'video' | 'image' | 'audio';
type ProviderFilter = 'all' | 'minimax' | 'bytedance' | 'kwaivgi' | 'wavespeed-ai';

const ModelsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [providerFilter, setProviderFilter] = useState<ProviderFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showHotOnly, setShowHotOnly] = useState(false);
  const [showCommercialOnly, setShowCommercialOnly] = useState(false);
  const [displayCount, setDisplayCount] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [apiModels, setApiModels] = useState<ApiModel[]>([]);
  const [useApiData, setUseApiData] = useState(false);

  // 获取API模型数据
  useEffect(() => {
    const fetchApiModels = async () => {
      try {
        const response = await api.listModels();
        if (response && Array.isArray(response)) {
          setApiModels(response);
          setUseApiData(true);
        } else if (response && response.models && Array.isArray(response.models)) {
          setApiModels(response.models);
          setUseApiData(true);
        }
      } catch (error) {
        console.error('Failed to fetch API models:', error);
        setUseApiData(false);
      }
    };

    fetchApiModels();
  }, []);

  // Simulate loading on initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Simulate search delay for better UX
  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  const filteredAndSortedModels = useMemo(() => {
    // 选择要使用的数据源
    const dataSource = useApiData ? apiModels : models;
    
    const filtered = dataSource.filter(model => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          model.name.toLowerCase().includes(query) ||
          (model.title && model.title.toLowerCase().includes(query)) ||
          (model.description && model.description.toLowerCase().includes(query)) ||
          model.provider.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Type filter
      if (typeFilter !== 'all' && model.type !== typeFilter) {
        return false;
      }

      // Provider filter
      if (providerFilter !== 'all' && model.provider !== providerFilter) {
        return false;
      }

      // Hot filter
      if (showHotOnly && !model.hot) {
        return false;
      }

      // Commercial filter
      if (showCommercialOnly && !model.commercial) {
        return false;
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0; // Keep original order for newest
      }
    });

    return filtered;
  }, [searchQuery, typeFilter, providerFilter, sortBy, showHotOnly, showCommercialOnly, useApiData, apiModels]);

  const displayedModels = filteredAndSortedModels.slice(0, displayCount);
  const hasMore = displayCount < filteredAndSortedModels.length;

  const loadMore = () => {
    setDisplayCount(prev => prev + 12);
  };

  const stats = {
    totalModels: models.length,
    videoModels: models.filter(m => m.type === 'video').length,
    imageModels: models.filter(m => m.type === 'image').length,
    avgPrice: (models.reduce((sum, m) => sum + m.price, 0) / models.length).toFixed(3)
  };

  if (isLoading) {
    return (
      <ModelsPageContainer>
        <Container>
          <PageHeader>
            <PageTitle>Explore AI Models</PageTitle>
            <PageDescription>
              Discover the latest and most powerful AI models for image, video, and audio generation.
            </PageDescription>
          </PageHeader>
          <ModelsSkeletonLoader count={8} />
        </Container>
      </ModelsPageContainer>
    );
  }

  return (
    <ModelsPageContainer>
      <Container>
        <PageHeader>
          <PageTitle>Explore AI Models</PageTitle>
          <PageDescription>
            Discover the latest and most powerful AI models for image, video, and audio generation.
          </PageDescription>
        </PageHeader>

        <StatsContainer>
          <StatItem>
            <StatNumber>{stats.totalModels}</StatNumber>
            <StatLabel>Total Models</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>{stats.videoModels}</StatNumber>
            <StatLabel>Video Models</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>{stats.imageModels}</StatNumber>
            <StatLabel>Image Models</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>${stats.avgPrice}</StatNumber>
            <StatLabel>Avg Price</StatLabel>
          </StatItem>
        </StatsContainer>

        <FiltersSection>
          <FiltersRow>
            <SearchContainer>
              <SearchIcon>🔍</SearchIcon>
              <SearchInputStyled
                type="text"
                placeholder="Search models, providers, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchContainer>

            <FilterGroup>
              <FilterLabel>Type:</FilterLabel>
              <FilterSelect
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
              >
                <option value="all">All Types</option>
                <option value="video">Video</option>
                <option value="image">Image</option>
                <option value="audio">Audio</option>
              </FilterSelect>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>Provider:</FilterLabel>
              <FilterSelect
                value={providerFilter}
                onChange={(e) => setProviderFilter(e.target.value as ProviderFilter)}
              >
                <option value="all">All Providers</option>
                <option value="minimax">MiniMax</option>
                <option value="bytedance">ByteDance</option>
                <option value="kwaivgi">KwaiVGI</option>
                <option value="wavespeed-ai">WaveSpeed AI</option>
              </FilterSelect>
            </FilterGroup>

            <FilterButton
              $active={showHotOnly}
              onClick={() => setShowHotOnly(!showHotOnly)}
              size="sm"
            >
              🔥 Hot
            </FilterButton>

            <FilterButton
              $active={showCommercialOnly}
              onClick={() => setShowCommercialOnly(!showCommercialOnly)}
              size="sm"
            >
              💼 Commercial
            </FilterButton>
          </FiltersRow>
        </FiltersSection>

        <ResultsHeader>
          <ResultsCount>
            {isSearching ? (
              <span style={{ opacity: 0.7 }}>Searching...</span>
            ) : (
              <span>
                <strong>{filteredAndSortedModels.length}</strong> models found
                {searchQuery && ` for "${searchQuery}"`}
              </span>
            )}
          </ResultsCount>
          <FilterGroup>
            <FilterLabel>Sort by:</FilterLabel>
            <SortSelect
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </SortSelect>
          </FilterGroup>
        </ResultsHeader>

        {isSearching ? (
          <LoadingState message="Searching models..." />
        ) : displayedModels.length > 0 ? (
          <>
            <ModelsGrid>
              {displayedModels.map((model, index) => {
                // 如果是API数据，找到对应的API模型
                const apiModel = useApiData ? apiModels.find(apiModel => 
                  apiModel.id === model.id || 
                  (apiModel.name === model.name && apiModel.provider === model.provider)
                ) : undefined;
                
                return (
                  <ModelCard 
                    key={model.id} 
                    model={model} 
                    apiModel={apiModel}
                  />
                );
              })}
            </ModelsGrid>

            {hasMore && (
              <LoadMoreButton onClick={loadMore} variant="secondary">
                Load More Models ({filteredAndSortedModels.length - displayCount} remaining)
              </LoadMoreButton>
            )}
          </>
        ) : (
          <NoResults>
            <h3>No models found</h3>
            <p>Try adjusting your search criteria or filters.</p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setTypeFilter('all');
                setProviderFilter('all');
                setShowHotOnly(false);
                setShowCommercialOnly(false);
              }}
              variant="primary"
              style={{ marginTop: '1rem' }}
            >
              Clear All Filters
            </Button>
          </NoResults>
        )}
      </Container>
    </ModelsPageContainer>
  );
};

export default ModelsPage;
