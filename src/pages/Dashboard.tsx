import type React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { Card, Button, Input } from '../styles/GlobalStyles';
import { useToast } from '../components/Toast';
import ModelCard from '../components/ModelCard';
import { LoadingState } from '../components/LoadingStates';
import { models } from '../data/models';
import { api } from '../api/client';

const DashboardContainer = styled.div`
  padding: 2rem 0;
  min-height: calc(100vh - 200px);
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

// Usage Section Styles
const UsageSection = styled.section`
  margin-bottom: 3rem;
`;

const UsageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const UsageTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const UsageSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  margin: 0;
`;

const UsageDateRangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const UsageDateRangeText = styled.span`
  font-size: 0.9rem;
`;

const CloseIcon = styled.span`
  font-size: 0.8rem;
  opacity: 0.6;
`;

const UsageContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const UsagePerModelCard = styled(Card)`
  padding: 1.5rem;
`;

const UsagePerModelHeader = styled.div`
  margin-bottom: 1rem;
`;

const UsagePerModelTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 0.5rem 0;
`;

const UsageSummary = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  margin: 0;
`;

const UsageTable = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  overflow: hidden;
`;

const UsageTableBody = styled.div`
  max-height: 280px;
  overflow-y: auto;
`;

const EmptyState = styled.div`
  padding: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
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

const UsageTableCell = styled.div`
  padding: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ModelLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const UsageBreakdownCard = styled(Card)`
  padding: 1.5rem;
`;

const UsageBreakdownTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 1rem 0;
`;

const ChartContainer = styled.div`
  height: 200px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ChartYAxis = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 0.5rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ChartXAxis = styled.div`
  position: absolute;
  bottom: 0;
  left: 40px;
  right: 0;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem 0 1rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ChartBars = styled.div`
  position: absolute;
  left: 40px;
  right: 0;
  top: 1rem;
  bottom: 30px;
  display: flex;
  align-items: end;
  justify-content: space-between;
  padding: 0 1rem;
`;

const ChartBar = styled.div<{ height: number }>`
  width: 20px;
  height: ${({ height }) => height}%;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 2px 2px 0 0;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: scaleY(1.05);
  }
`;

// Requests Section Styles
const RequestsSection = styled.section`
  margin-bottom: 3rem;
`;

const RequestsHeader = styled.div`
  margin-bottom: 1rem;
`;

const RequestsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const Reminder = styled.div`
  background: #fff7ed;
  border: 1px solid #fed7aa;
  color: #92400e;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const ReminderIcon = styled.span`
  font-size: 1rem;
`;

const Filters = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1.2fr 1fr auto auto;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 1rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FilterInput = styled(Input)`
  font-size: 0.9rem;
`;

const FilterSelect = styled.select`
  padding: 0.6rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ActionButton = styled(Button)`
  font-size: 0.9rem;
`;

const RequestsTable = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.75rem;
  overflow: hidden;
`;

const TableHeaderRow = styled.div`
  display: grid;
  grid-template-columns: 40px 2fr 2fr 1fr 120px 2fr 140px;
  background: ${({ theme }) => theme.colors.surface};
  font-weight: 600;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
`;

const TableDataRow = styled.div`
  display: grid;
  grid-template-columns: 40px 2fr 2fr 1fr 120px 2fr 140px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

const TableCell = styled.div`
  padding: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  min-width: 0;
`;

const Checkbox = styled.input`
  margin: 0;
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

const OutputVideo = styled.video`
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
  object-fit: cover;
`;

const isVideoUrl = (url: string): boolean => /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);

const ActionIcons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionIcon = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const DateRangeInput = styled(Input)`
  font-size: 0.9rem;
  min-width: 200px;
`;

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  // Usage date range (default last 30 days, UTC days)
  const [usageDateRange, setUsageDateRange] = useState<{ start: string; end: string }>(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 29);
    const toISO = (d: Date) => new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString();
    return { start: toISO(start), end: toISO(end) };
  });
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    id: '',          // uuid
    model: '',       // model_id
    startDate: '',   // ISO string
    endDate: '',     // ISO string
    status: 'all'
  });
  const [orders, setOrders] = useState<Array<{ id: string; model: string; status: 'created' | 'processing' | 'completed' | 'failed' | string; output?: string | null; created: string }>>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const { showToast } = useToast();

  useEffect(() => {
    const load = async () => {
      try {
        await api.listModels();
        await fetchUsage();
        await fetchOrders();
      } catch (e) {
        // ignore for now; UI can still show local data
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [page, pageSize]);


  // Usage data from API
  const [usageData, setUsageData] = useState<{ totalPredictions: number; totalCost: number; modelsUsed: Array<{ name: string; requests: number; cost: number }>}>({
    totalPredictions: 0,
    totalCost: 0,
    modelsUsed: []
  });

  const [usageDaily, setUsageDaily] = useState<Array<{ date: string; value: number }>>([]);

  const fetchUsage = async (range?: { start?: string; end?: string }) => {
    try {
      const res: any = await api.getUserUsage();
      // Normalize API response
      const totalPredictions = Number(res?.total || res?.totalPredictions || res?.count || 0);
      const totalCost = Number(res?.total_cost || res?.totalCost || res?.cost || 0);
      const items: any[] = Array.isArray(res?.items) ? res.items : (Array.isArray(res) ? res : (res?.data?.items || []));
      const modelsUsed = items.map((it: any) => ({
        name: String(it.model || it.name || it.model_name || ''),
        requests: Number(it.count || it.requests || it.request_count || 0),
        cost: Number(it.cost || it.total_cost || 0),
      }));
      setUsageData({ totalPredictions, totalCost, modelsUsed });

      // Daily timeseries if provided
      const daily: any[] = Array.isArray(res?.daily)
        ? res.daily
        : Array.isArray(res?.data?.daily)
        ? res.data.daily
        : [];
      if (daily.length > 0) {
        const normalized = daily.map((d: any) => ({
          date: String(d.date || d.day || ''),
          value: Number(d.value || d.cost || d.total || 0),
        }));
        setUsageDaily(normalized);
      } else {
        setUsageDaily([]);
      }
    } catch (err: any) {
      console.error('Failed to fetch usage:', err);
    }
  };

  // Build chart data from daily or generate buckets from range
  const chartData = (() => {
    const start = new Date(usageDateRange.start);
    const end = new Date(usageDateRange.end);
    const dayMs = 24 * 60 * 60 * 1000;
    const fmt = (d: Date) => `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
    const buckets: Record<string, number> = {};
    for (let t = start.getTime(); t <= end.getTime(); t += dayMs) {
      const d = new Date(t);
      buckets[fmt(d)] = 0;
    }
    if (usageDaily.length > 0) {
      usageDaily.forEach((d) => {
        // support input as YYYY-MM-DD or MM/DD
        const dateStr = /\d{4}-\d{2}-\d{2}/.test(d.date)
          ? (() => {
              const dd = new Date(d.date);
              return fmt(new Date(Date.UTC(dd.getFullYear(), dd.getMonth(), dd.getDate())));
            })()
          : d.date;
        if (buckets[dateStr] !== undefined) buckets[dateStr] += d.value;
      });
    }
    return Object.entries(buckets).map(([date, value]) => ({ date, value }));
  })();

  const fetchOrders = async () => {
    try {
      const params: any = {
        page,
        page_size: pageSize,
      };
      if (filters.id) params.uuid = filters.id.trim();
      if (filters.model) params.model_id = filters.model.trim();
      if (filters.status && filters.status !== 'all') params.status = filters.status;
      if (filters.startDate) params.start_time = new Date(filters.startDate).toISOString();
      if (filters.endDate) params.end_time = new Date(filters.endDate).toISOString();

      const res: any = await api.listOrders(params);
      const items: any[] = Array.isArray(res?.items)
        ? res.items
        : Array.isArray(res)
        ? res
        : (res?.data?.items || []);
      const totalCount = Number(res?.total || res?.data?.total || res?.count || items.length);

      const normalized = items.map((it) => ({
        id: String(it.uuid || it.id || it.order_id || ''),
        model: String(it.model || it.model_id || it.url || it.api || ''),
        status: String(it.status || 'processing'),
        output: it.output || null,
        created: String(it.created_at || it.created || it.create_time || ''),
      }));

      setOrders(normalized);
      setTotal(totalCount);
      setSelectedRequests([]);
    } catch (err: any) {
      let errorMessage = err?.message || '获取订单失败';
      try {
        const raw = String(err?.message || '');
        const jsonMatch = raw.match(/\{[\s\S]*\}$/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (parsed?.message) errorMessage = parsed.message;
        }
      } catch {}
      if (/401|unauthorized/i.test(errorMessage)) errorMessage = '未授权访问，请先登录';
      showToast(`错误: ${errorMessage}`, { type: 'error' });
    }
  };

  const handleRequestSelect = (requestId: string) => {
    setSelectedRequests(prev => 
      prev.includes(requestId) 
        ? prev.filter(id => id !== requestId)
        : [...prev, requestId]
    );
  };

  const handleSelectAll = () => {
    if (selectedRequests.length === orders.length) {
      setSelectedRequests([]);
    } else {
      setSelectedRequests(orders.map((r) => r.id));
    }
  };

  const handleDownload = () => {
    if (selectedRequests.length === 0) {
      alert('请先选择要下载的请求');
      return;
    }
    console.log('Downloading requests:', selectedRequests);
  };

  const handleDelete = () => {
    if (selectedRequests.length === 0) {
      alert('请先选择要删除的请求');
      return;
    }
    if (confirm(`确定要删除 ${selectedRequests.length} 个请求吗？`)) {
      console.log('Deleting requests:', selectedRequests);
      setSelectedRequests([]);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    fetchOrders();
  };

  const handleReset = () => {
    setFilters({ id: '', model: '', startDate: '', endDate: '', status: 'all' });
    fetchOrders();
  };

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
        {/* Usage Section */}
        <UsageSection>
          <UsageHeader>
            <div>
              <UsageTitle>Usage</UsageTitle>
              <UsageSubtitle>See usage statistics per model</UsageSubtitle>
            </div>
            {/* <UsageDateRangeContainer onClick={() => {
              const s = prompt('开始时间 (YYYY-MM-DD)', usageDateRange.start.slice(0,10));
              const e = prompt('结束时间 (YYYY-MM-DD)', usageDateRange.end.slice(0,10));
              if (s && e) {
                const startISO = new Date(`${s}T00:00:00Z`).toISOString();
                const endISO = new Date(`${e}T00:00:00Z`).toISOString();
                setUsageDateRange({ start: startISO, end: endISO });
                fetchUsage({ start: startISO, end: endISO });
              }
            }}>
              <span>📅</span>
              <UsageDateRangeText>
                {new Date(usageDateRange.start).toLocaleDateString()} – {new Date(usageDateRange.end).toLocaleDateString()}
              </UsageDateRangeText>
              <CloseIcon>✕</CloseIcon>
            </UsageDateRangeContainer> */}
          </UsageHeader>

          <UsageContent>
            {/* Usage per model - Left side */}
            <UsagePerModelCard>
              <UsagePerModelHeader>
                <UsagePerModelTitle>Usage per model</UsagePerModelTitle>
                <UsageSummary>Total {usageData.totalPredictions} predictions, cost ${usageData.totalCost}</UsageSummary>
              </UsagePerModelHeader>

              <UsageTable>
                <TableHeader>
                  <UsageTableCell style={{ fontWeight: 600 }}>Model</UsageTableCell>
                  <UsageTableCell style={{ fontWeight: 600 }}>Request Count</UsageTableCell>
                  <UsageTableCell style={{ fontWeight: 600 }}>Cost</UsageTableCell>
                </TableHeader>
                {usageData.modelsUsed.length === 0 ? (
                  <EmptyState>No usage yet</EmptyState>
                ) : (
                  <UsageTableBody>
                    {usageData.modelsUsed.map((model, index) => (
                      <TableRow key={index}>
                        <UsageTableCell>
                          <ModelLink href="#">{model.name}</ModelLink>
                        </UsageTableCell>
                        <UsageTableCell>{model.requests}</UsageTableCell>
                        <UsageTableCell>${model.cost.toFixed(4)}</UsageTableCell>
                      </TableRow>
                    ))}
                  </UsageTableBody>
                )}
              </UsageTable>
            </UsagePerModelCard>

            {/* Usage breakdown - Right side
            <UsageBreakdownCard>
              <UsageBreakdownTitle>Usage breakdown</UsageBreakdownTitle>
              
              <ChartContainer>
                <ChartYAxis>
                  <span>0.16</span>
                  <span>0.12</span>
                  <span>0.08</span>
                  <span>0.04</span>
                  <span>0</span>
                </ChartYAxis>
                
                <ChartXAxis>
                  {chartData.map((item, index) => (
                    <span key={index}>{item.date}</span>
                  ))}
                </ChartXAxis>
                
                <ChartBars>
                  {chartData.map((item, index) => (
                    <ChartBar 
                      key={index} 
                      height={item.value > 0 ? (item.value / 0.16) * 100 : 5} 
                    />
                  ))}
                </ChartBars>
              </ChartContainer>
            </UsageBreakdownCard> */}
          </UsageContent>
        </UsageSection>

        {/* Requests Section */}
        <RequestsSection>
          <RequestsHeader>
            <RequestsTitle>Requests</RequestsTitle>
          </RequestsHeader>

          <Reminder>
            <ReminderIcon>ℹ️</ReminderIcon>
            <strong>Reminder</strong> Your outputs are stored for 7 days only. Make sure to download and save them before they expire.
          </Reminder>

          <Filters>
            <FilterInput 
              placeholder="ID" 
              value={filters.id}
              onChange={(e) => handleFilterChange('id', e.target.value)}
            />
            <FilterInput 
              placeholder="Search model..." 
              value={filters.model}
              onChange={(e) => handleFilterChange('model', e.target.value)}
            />
            <DateRangeInput 
              placeholder="开始时间 (YYYY-MM-DD)" 
              value={filters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
            />
            <DateRangeInput 
              placeholder="结束时间 (YYYY-MM-DD)" 
              value={filters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
            />
            <FilterSelect 
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="failed">Failed</option>
            </FilterSelect>
            <ActionButton variant="secondary" onClick={handleReset}>
              Reset
            </ActionButton>
            <ActionButton variant="primary" onClick={handleSearch}>
              Search
            </ActionButton>
          </Filters>

          <ActionButtons>
            <ActionButton variant="primary" onClick={handleDownload}>
              Download
            </ActionButton>
            <ActionButton variant="secondary" onClick={handleDelete} style={{ backgroundColor: '#ef4444', color: 'white' }}>
              Delete
            </ActionButton>
          </ActionButtons>

          <RequestsTable>
            <TableHeaderRow>
              <TableCell>
                <Checkbox 
                  type="checkbox" 
                  checked={orders.length > 0 && selectedRequests.length === orders.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Status</TableCell>
              <TableCell style={{ justifyContent: 'center' }}>Outputs</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Action</TableCell>
            </TableHeaderRow>
            
            {orders.map((request) => (
              <TableDataRow key={request.id}>
                <TableCell>
                  <Checkbox 
                    type="checkbox" 
                    checked={selectedRequests.includes(request.id)}
                    onChange={() => handleRequestSelect(request.id)}
                  />
                </TableCell>
                <TableCell>
                  <ModelLink href="#">{request.id}</ModelLink>
                </TableCell>
                <TableCell>
                  <ModelLink href="#">{request.model}</ModelLink>
                </TableCell>
                <TableCell>
                  <StatusBadge status={(request.status as any) === 'created' ? 'processing' : (request.status as any)}>
                    {request.status}
                  </StatusBadge>
                </TableCell>
                <TableCell style={{ justifyContent: 'center' }}>
                  {request.output ? (
                    isVideoUrl(String(request.output)) ? (
                      <OutputVideo src={String(request.output)} muted playsInline controls={false} />
                    ) : (
                      <OutputPreview src={String(request.output)} alt="Generated output" />
                    )
                  ) : null}
                </TableCell>
                <TableCell>{request.created}</TableCell>
                <TableCell>
                  <ActionIcons>
                    <ActionIcon title="Share">📤</ActionIcon>
                    <ActionIcon title="Download">⬇️</ActionIcon>
                    <ActionIcon title="Delete">🗑️</ActionIcon>
                  </ActionIcons>
                </TableCell>
              </TableDataRow>
            ))}
          </RequestsTable>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', color: '#6b7280', fontSize: '0.9rem' }}>
            <div>
              Showing {(orders.length === 0) ? 0 : ((page - 1) * pageSize + 1)} to {Math.min(page * pageSize, total)} of {total} results
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Button variant="secondary" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>Previous</Button>
              <Input style={{ width: 48, textAlign: 'center' }} value={page} onChange={(e) => {
                const v = parseInt(e.target.value || '1', 10);
                if (!Number.isNaN(v)) setPage(Math.max(1, v));
              }} />
              <Button variant="secondary" onClick={() => fetchOrders()}>Go</Button>
              <Button variant="secondary" onClick={() => setPage((p) => (p * pageSize < total ? p + 1 : p))} disabled={page * pageSize >= total}>Next</Button>
              <FilterSelect value={pageSize} onChange={(e) => { setPageSize(parseInt(e.target.value, 10)); setPage(1); }}>
                <option value={10}>10/page</option>
                <option value={20}>20/page</option>
                <option value={50}>50/page</option>
              </FilterSelect>
            </div>
          </div>
        </RequestsSection>
      </Container>
    </DashboardContainer>
  );
};

export default Dashboard;
