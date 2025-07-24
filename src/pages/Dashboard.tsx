import type React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { Card, Button } from '../styles/GlobalStyles';
import ModelCard from '../components/ModelCard';
import { LoadingState } from '../components/LoadingStates';
import { models } from '../data/models';

const DashboardContainer = styled.div`
  padding: 2rem 0;
  min-height: calc(100vh - 200px);
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const DashboardHeader = styled.div`
  margin-bottom: 3rem;
`;

const WelcomeMessage = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const UserInfo = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.1rem;
`;

const TopSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const UsageSection = styled(Card)`
  padding: 2rem;
`;

const UsageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const UsageTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const DateRange = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const UsageStats = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const UsageStat = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 0.25rem;
`;

const ChartContainer = styled.div`
  height: 200px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
`;

const MockChart = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, ${({ theme }) => theme.colors.primary}20, ${({ theme }) => theme.colors.secondary}20);
  border-radius: 0.25rem;
  display: flex;
  align-items: end;
  justify-content: space-around;
  padding: 1rem;
`;

const ChartBar = styled.div<{ height: number }>`
  width: 30px;
  height: ${({ height }) => height}%;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 2px 2px 0 0;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: scaleY(1.1);
  }
`;

const UsageTable = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  background: ${({ theme }) => theme.colors.surface};
  font-weight: 600;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

const TableCell = styled.div`
  padding: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const QuickStatsCard = styled(Card)`
  padding: 2rem;
  height: fit-content;
`;

const QuickStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const QuickStat = styled.div`
  text-align: center;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 0.75rem;
`;

const QuickStatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const QuickStatLabel = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 0.25rem;
`;

const RequestsSection = styled.section`
  margin-bottom: 3rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const RequestsTable = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  overflow: hidden;
`;

const RequestsHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr;
  background: ${({ theme }) => theme.colors.surface};
  font-weight: 600;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const RequestRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

const RequestCell = styled.div`
  padding: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    &:nth-child(n+4) {
      display: none;
    }
  }
`;

const StatusBadge = styled.span<{ status: 'completed' | 'processing' | 'failed' }>`
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;

  ${({ status }) => {
    switch (status) {
      case 'completed':
        return `
          background: #dcfce7;
          color: #166534;
        `;
      case 'processing':
        return `
          background: #fef3c7;
          color: #92400e;
        `;
      case 'failed':
        return `
          background: #fee2e2;
          color: #991b1b;
        `;
    }
  }}
`;

const OutputPreview = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
  object-fit: cover;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Tab = styled.button<{ $active?: boolean }>`
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.textSecondary};
  font-weight: 500;
  transition: all 0.2s ease;

  ${({ $active, theme }) => $active && `
    border-bottom-color: ${theme.colors.primary};
  `}

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FavoritesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const QuickActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'recent' | 'favorites'>('recent');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const recentRequests = [
    {
      id: 'c7ff89b67efa437bb96f6df75bbfdcf28',
      model: 'wavespeed-ai/flux-dev-lora-ultra-fast',
      status: 'completed' as const,
      output: 'https://ext.same-assets.com/2897352160/374079494.false',
      created: '2025-07-13 22:13',
      cost: '$0.006'
    },
    {
      id: 'a8ef72c34bfa521cc87e5af86ccefdf19',
      model: 'minimax/hailuo-02/t2v-standard',
      status: 'processing' as const,
      output: null,
      created: '2025-07-13 21:45',
      cost: '$0.23'
    },
    {
      id: 'b9df83d45ceb632dd98f6bg97ddfefe20',
      model: 'bytedance/seedance-v1-pro-t2v-480p',
      status: 'completed' as const,
      output: 'https://ext.same-assets.com/2897352160/3894555946.false',
      created: '2025-07-13 20:30',
      cost: '$0.15'
    }
  ];

  const favoriteModels = models.filter(model => model.featured).slice(0, 6);

  const usageData = {
    totalPredictions: 1,
    totalCost: 0.006,
    modelsUsed: [
      { name: 'wavespeed-ai/flux-dev-lora-ultra-fast', requests: 1, cost: 0.0060 }
    ]
  };

  const chartData = [65, 45, 80, 35, 90, 55, 70];

  if (isLoading) {
    return (
      <DashboardContainer>
        <Container>
          <LoadingState message="Loading your dashboard..." />
        </Container>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <Container>
        <DashboardHeader>
          <WelcomeMessage>Welcome back, {user?.name}!</WelcomeMessage>
          <UserInfo>Here's your AI generation overview and recent activity.</UserInfo>
        </DashboardHeader>

        <TopSection>
          <UsageSection>
            <UsageHeader>
              <UsageTitle>Usage</UsageTitle>
              <DateRange>Jul 01, 2025 — Jul 31, 2025</DateRange>
            </UsageHeader>

            <UsageStats>
              <UsageStat>
                <StatValue>{usageData.totalPredictions}</StatValue>
                <StatLabel>Total Predictions</StatLabel>
              </UsageStat>
              <UsageStat>
                <StatValue>${usageData.totalCost.toFixed(3)}</StatValue>
                <StatLabel>Total Cost</StatLabel>
              </UsageStat>
            </UsageStats>

            <ChartContainer>
              <MockChart>
                {chartData.map((height, index) => (
                  <ChartBar key={index} height={height} />
                ))}
              </MockChart>
            </ChartContainer>

            <UsageTable>
              <TableHeader>
                <TableCell style={{ fontWeight: 600 }}>Model</TableCell>
                <TableCell style={{ fontWeight: 600 }}>Request Count</TableCell>
                <TableCell style={{ fontWeight: 600 }}>Cost</TableCell>
              </TableHeader>
              {usageData.modelsUsed.map((model, index) => (
                <TableRow key={index}>
                  <TableCell>{model.name}</TableCell>
                  <TableCell>{model.requests}</TableCell>
                  <TableCell>${model.cost.toFixed(4)}</TableCell>
                </TableRow>
              ))}
            </UsageTable>
          </UsageSection>

          <QuickStatsCard>
            <SectionTitle style={{ marginBottom: '1.5rem' }}>Quick Stats</SectionTitle>
            <QuickStatsGrid>
              <QuickStat>
                <QuickStatNumber>45</QuickStatNumber>
                <QuickStatLabel>Total Generations</QuickStatLabel>
              </QuickStat>
              <QuickStat>
                <QuickStatNumber>$12.50</QuickStatNumber>
                <QuickStatLabel>Credits Used</QuickStatLabel>
              </QuickStat>
              <QuickStat>
                <QuickStatNumber>$87.50</QuickStatNumber>
                <QuickStatLabel>Credits Remaining</QuickStatLabel>
              </QuickStat>
              <QuickStat>
                <QuickStatNumber>{favoriteModels.length}</QuickStatNumber>
                <QuickStatLabel>Favorite Models</QuickStatLabel>
              </QuickStat>
            </QuickStatsGrid>

            <QuickActions>
              <Button variant="primary" size="lg" style={{ flex: 1 }}>
                🎬 Create Video
              </Button>
              <Button variant="secondary" size="lg" style={{ flex: 1 }}>
                🖼️ Generate Image
              </Button>
            </QuickActions>
          </QuickStatsCard>
        </TopSection>

        <RequestsSection>
          <SectionHeader>
            <SectionTitle>Requests</SectionTitle>
            <Button variant="secondary" size="sm">
              View All
            </Button>
          </SectionHeader>

          <RequestsTable>
            <RequestsHeader>
              <RequestCell style={{ fontWeight: 600 }}>ID</RequestCell>
              <RequestCell style={{ fontWeight: 600 }}>Model</RequestCell>
              <RequestCell style={{ fontWeight: 600 }}>Status</RequestCell>
              <RequestCell style={{ fontWeight: 600 }}>Output</RequestCell>
              <RequestCell style={{ fontWeight: 600 }}>Created</RequestCell>
              <RequestCell style={{ fontWeight: 600 }}>Action</RequestCell>
            </RequestsHeader>
            {recentRequests.map((request) => (
              <RequestRow key={request.id}>
                <RequestCell>{request.id}</RequestCell>
                <RequestCell>{request.model}</RequestCell>
                <RequestCell>
                  <StatusBadge status={request.status}>
                    {request.status}
                  </StatusBadge>
                </RequestCell>
                <RequestCell>
                  {request.output && (
                    <OutputPreview src={request.output} alt="Generated output" />
                  )}
                </RequestCell>
                <RequestCell>{request.created}</RequestCell>
                <RequestCell>
                  <Button size="sm" variant="secondary">
                    ⬇️
                  </Button>
                </RequestCell>
              </RequestRow>
            ))}
          </RequestsTable>
        </RequestsSection>

        <section>
          <SectionHeader>
            <SectionTitle>Your Models</SectionTitle>
          </SectionHeader>

          <TabsContainer>
            <Tab
              $active={activeTab === 'recent'}
              onClick={() => setActiveTab('recent')}
            >
              Most Popular
            </Tab>
            <Tab
              $active={activeTab === 'favorites'}
              onClick={() => setActiveTab('favorites')}
            >
              Favorites
            </Tab>
          </TabsContainer>

          {activeTab === 'favorites' ? (
            <>
              {favoriteModels.length > 0 ? (
                <FavoritesGrid>
                  {favoriteModels.map((model) => (
                    <ModelCard key={model.id} model={model} />
                  ))}
                </FavoritesGrid>
              ) : (
                <EmptyState>
                  <h3>No favorite models yet</h3>
                  <p>Start exploring models and add them to your favorites.</p>
                  <Button variant="primary" style={{ marginTop: '1rem' }}>
                    Explore Models
                  </Button>
                </EmptyState>
              )}
            </>
          ) : (
            <FavoritesGrid>
              {models.slice(0, 4).map((model) => (
                <ModelCard key={model.id} model={model} />
              ))}
            </FavoritesGrid>
          )}
        </section>
      </Container>
    </DashboardContainer>
  );
};

export default Dashboard;
