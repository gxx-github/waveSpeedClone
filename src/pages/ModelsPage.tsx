import type React from 'react';
import { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Input, Button } from '../styles/GlobalStyles';
import { CustomSelect } from '../components/Select';
import ModelCard from '../components/ModelCard';
import { ModelsSkeletonLoader, LoadingState } from '../components/LoadingStates';
import { api } from '../api/client';
import type { ApiModel, Model } from '../types/models';
import { Search, Filter, X, Loader2 } from 'lucide-react';

const ModelsPageContainer = styled.div`
  min-height: calc(100vh - 140px);
  background: ${({ theme }) => theme.colors.background};
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Header = styled.div`
  padding: 2rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const SearchSection = styled.div`
  margin-bottom: 2rem;
`;

const SearchContainer = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textSecondary};
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled(Input)`
  padding-left: 3rem;
  padding-right: 1rem;
  height: 3rem;
  font-size: 1.1rem;
  border-radius: 0.75rem;
  border: 2px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  transition: all 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  padding: 2rem 0;

  @media (max-width: 1024px) {
    grid-template-columns: 250px 1fr;
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const Sidebar = styled.div`
  position: sticky;
  top: 6rem;
  height: fit-content;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  @media (max-width: 1024px) {
    top: 5rem;
  }
  
  @media (max-width: 768px) {
    position: static;
    margin-bottom: 1rem;
  }
`;

const SidebarTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FilterGroup = styled.div`
  margin-bottom: 2rem;
`;

const FilterLabel = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FilterOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterOption = styled.label<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ $selected, theme }) => 
    $selected ? theme.colors.primary + '15' : 'transparent'};
  border: 1px solid ${({ $selected, theme }) => 
    $selected ? theme.colors.primary : 'transparent'};

  &:hover {
    background: ${({ theme }) => theme.colors.primary + '10'};
  }
`;

const Checkbox = styled.input`
  width: 1.2rem;
  height: 1.2rem;
  accent-color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;

const OptionText = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
`;

const OptionCount = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.border};
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  min-width: 1.5rem;
  text-align: center;
`;

const ClearFiltersButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
  font-size: 0.9rem;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  svg {
    flex-shrink: 0;
  }
`;

const ModelsSection = styled.div`
  min-height: 400px;
`;

const ModelsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.5rem;
`;

const ModelsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const ModelsCount = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-left: 0.5rem;
`;

const SortSelect = styled.div``;

const ModelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const NoResultsIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const NoResultsTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const NoResultsText = styled.p`
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const LoadMoreButton = styled(Button)`
  margin: 2rem auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2rem;

  svg {
    flex-shrink: 0;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

type SortOption = 'newest' | 'price-low' | 'price-high' | 'name' | 'popular';
type TypeFilter = 'all' | 'video' | 'image' | 'audio';
type ProviderFilter = 'all' | 'minimax' | 'bytedance' | 'kwaivgi' | 'wavespeed-ai';

const ModelsPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [displayCount, setDisplayCount] = useState(20);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [apiModels, setApiModels] = useState<ApiModel[]>([]);
  const [useApiData, setUseApiData] = useState(false);

  // 将API模型转换为本地Model格式
  const convertApiModelToModel = (apiModel: ApiModel): Model => {
    const name = apiModel.model_name || apiModel.name || '';
    const priceRaw = apiModel.base_price ?? apiModel.price ?? 0;
    const price = priceRaw > 10 ? Number((priceRaw / 100).toFixed(2)) : Number(priceRaw);
    const thumbnail = apiModel.cover_url || apiModel.index_url || apiModel.thumbnail || 'https://via.placeholder.com/600x400?text=Model';
    const tags = (apiModel.tags && apiModel.tags.length ? apiModel.tags : apiModel.tag && apiModel.tag.length ? apiModel.tag : [])
      .map(t => String(t));
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
      type: apiModel.type  || '' ,
      tags,
      thumbnail,
      category: apiModel.company || apiModel.collections || 'general',
      featured: Boolean(apiModel.featured),
      hot: Boolean(apiModel.hot),
      commercial: Boolean(apiModel.commercial),
      partner: Boolean(apiModel.partner),
    };
  };

  // 获取API模型数据
  useEffect(() => {
    const fetchApiModels = async () => {
      setIsLoading(true);
      try {
        const response = await api.listModels();
        if (response && Array.isArray(response)) {
          setApiModels(response);
          setUseApiData(true);
        } else if (response && response.models && Array.isArray(response.models)) {
          setApiModels(response.models);
          setUseApiData(true);
        } else {
          setUseApiData(false);
        }
      } catch (error) {
        console.error('Failed to fetch API models:', error);
        setUseApiData(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApiModels();
  }, []);

  // 移除固定超时，骨架严格跟随接口响应

  // 模拟搜索延迟
  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  // 获取所有可用的分类和提供商
  const availableCategories = useMemo(() => {
    const dataSource = useApiData ? apiModels.map(convertApiModelToModel) : [];
    const categories = new Set(dataSource.map(model => model.type).filter(category => category));
    return Array.from(categories).sort();
  }, [useApiData, apiModels]);


  // 过滤和排序模型
  const filteredAndSortedModels = useMemo(() => {
    const dataSource = useApiData ? apiModels.map(convertApiModelToModel) :  [];
    
    const filtered = dataSource.filter(model => {
      // 搜索过滤
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          model.name.toLowerCase().includes(query) ||
          (model.title && model.title.toLowerCase().includes(query)) ||
          (model.description && model.description.toLowerCase().includes(query)) ||
          model.provider.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // 类型过滤
      if (selectedCategories.length > 0 && !selectedCategories.includes(model.type)) {
        return false;
      }

      return true;
    });

    // 排序
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'popular':
          // 简单的流行度排序：featured > hot > commercial > 其他
          const aScore = (a.featured ? 4 : 0) + (a.hot ? 3 : 0) + (a.commercial ? 2 : 0) + 1;
          const bScore = (b.featured ? 4 : 0) + (b.hot ? 3 : 0) + (b.commercial ? 2 : 0) + 1;
          return bScore - aScore;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategories, sortBy, useApiData, apiModels]);

  const displayedModels = filteredAndSortedModels.slice(0, displayCount);
  const hasMore = displayCount < filteredAndSortedModels.length;

  const loadMore = () => {
    setDisplayCount(prev => prev + 20);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };


  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSortBy('popular');
  };

  const getCategoryCount = (category: string) => {
    const dataSource = useApiData ? apiModels.map(convertApiModelToModel) : [];
    return dataSource.filter(model => model.type === category).length;
  };




  if (isLoading) {
    return (
      <ModelsPageContainer>
        <Container>
          <Header>
            <SearchSection>
              <SearchContainer>
                <SearchIcon>
                  <Search size={20} />
                </SearchIcon>
                <SearchInput placeholder="Search models..." disabled />
              </SearchContainer>
            </SearchSection>
          </Header>
          <MainContent>
            <Sidebar>
              {/* 侧边栏骨架屏 */}
              <ModelsSkeletonLoader count={0} />
            </Sidebar>
            <ModelsSection>
              {/* 模型卡片骨架屏 */}
              <ModelsSkeletonLoader count={12} />
            </ModelsSection>
          </MainContent>
        </Container>
      </ModelsPageContainer>
    );
  }

  return (
    <ModelsPageContainer>
      <Container>
        <Header>
          <SearchSection>
            <SearchContainer>
              <SearchIcon>
                <Search size={20} />
              </SearchIcon>
              <SearchInput
                type="text"
                placeholder={t('models.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchContainer>
          </SearchSection>
        </Header>

        <MainContent>
          <Sidebar>
            <SidebarTitle>
              <Filter size={20} />
              {t('models.filters')}
            </SidebarTitle>
            
            <FilterGroup>
              <FilterOptions>
                {availableCategories.map((category) => (
                  <FilterOption
                    key={category}
                    $selected={selectedCategories.includes(category)}
                  >
                    <Checkbox
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <OptionText>{category}</OptionText>
                    <OptionCount>{getCategoryCount(category)}</OptionCount>
                  </FilterOption>
                ))}
              </FilterOptions>
            </FilterGroup>


            <ClearFiltersButton
              onClick={clearAllFilters}
              variant="secondary"
            >
              <X size={16} />
              {t('models.clearAllFilters')}
            </ClearFiltersButton>
          </Sidebar>

          <ModelsSection>
            <ModelsHeader>
              <div>
                <ModelsTitle>
                  {t('models.title')}
                  <ModelsCount>({filteredAndSortedModels.length} models)</ModelsCount>
                </ModelsTitle>
              </div>
              <SortSelect>
                <CustomSelect
                  value={sortBy}
                  onChange={(v) => setSortBy(v as SortOption)}
                  options={[
                    { value: 'popular', label: t('models.mostPopular') },
                    { value: 'newest', label: t('models.newest') },
                    { value: 'name', label: t('models.nameAZ') },
                    { value: 'price-low', label: t('models.priceLowToHigh') },
                    { value: 'price-high', label: t('models.priceHighToLow') },
                  ]}
                />
              </SortSelect>
            </ModelsHeader>

          

            {isSearching ? (
              <LoadingState message={t('models.searching')} />
            ) : displayedModels.length > 0 ? (
              <>
                <ModelsGrid>
                  {displayedModels.map((model, index) => {
                    const apiModel = useApiData ? apiModels.find(apiModel => 
                      apiModel.id === model.id || 
                      (apiModel.name === model.name && (apiModel.provider === model.provider || apiModel.company === model.provider))
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
                    {t('models.loadMore')} ({filteredAndSortedModels.length - displayCount} {t('models.remaining')})
                  </LoadMoreButton>
                )}
              </>
            ) : (
              <NoResults>
                <NoResultsIcon>
                  <Search size={48} />
                </NoResultsIcon>
                <NoResultsTitle>{t('models.noModelsFound')}</NoResultsTitle>
                <NoResultsText>
                  {t('models.noResultsDescription')}
                </NoResultsText>
                <Button
                  onClick={clearAllFilters}
                  variant="primary"
                  style={{ margin:'0 auto' }}
                >
                  <X size={16} />
                  {t('models.clearAllFilters')}
                </Button>
              </NoResults>
            )}
          </ModelsSection>
        </MainContent>
      </Container>
    </ModelsPageContainer>
  );
};

export default ModelsPage;