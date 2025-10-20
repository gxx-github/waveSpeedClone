import type React from 'react';
import { useState, useEffect } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { Card, Button, Input } from '../styles/GlobalStyles';
import { useToast } from '../components/Toast';
import ModelCard from '../components/ModelCard';
import { LoadingState } from '../components/LoadingStates';
import { models } from '../data/models';
import { api } from '../api/client';
import { Calendar, X, BarChart3, TrendingUp, DollarSign, Zap, Info, Trash2, Download, Share2, CheckCircle, Clock, Circle } from 'lucide-react';

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
  display: flex;
  align-items: center;
  justify-content: center;
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

const ChartTooltip = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.375rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text};
  pointer-events: none;
  transform: translate(-50%, -100%);
  box-shadow: 0 8px 20px rgba(0,0,0,0.12);
  z-index: 5;
`;

const ChartBarLabel = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translate(-50%, -4px);
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
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
  display: flex;
  align-items: center;
  justify-content: center;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  svg {
    flex-shrink: 0;
  }
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

const inferExtensionFromUrl = (url: string): string => {
  const match = url.match(/\.([a-zA-Z0-9]+)(\?.*)?$/);
  if (match && match[1]) return `.${match[1].toLowerCase()}`;
  return '';
};

const formatDateTime = (input: string): string => {
  try {
    if (!input) return '--';
    let ts: number | null = null;
    // numeric timestamp as seconds or milliseconds
    if (/^\d+$/.test(input)) {
      const n = Number(input);
      ts = n < 1e12 ? n * 1000 : n;
    } else {
      const parsed = Date.parse(input);
      if (!Number.isNaN(parsed)) ts = parsed;
    }
    if (ts === null) return String(input);
    const d = new Date(ts);
    const pad = (v: number) => String(v).padStart(2, '0');
    const yyyy = d.getFullYear();
    const mm = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    const HH = pad(d.getHours());
    const MM = pad(d.getMinutes());
    const SS = pad(d.getSeconds());
    return `${yyyy}-${mm}-${dd} ${HH}:${MM}:${SS}`;
  } catch {
    return String(input);
  }
};

const downloadFromUrl = async (url: string, filename?: string) => {
  try {
    const response = await fetch(url, { mode: 'cors' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    let finalName = filename;
    if (!finalName) {
      const cd = response.headers.get('content-disposition') || '';
      const cdMatch = cd.match(/filename\*=UTF-8''([^;\n]+)|filename="?([^";\n]+)"?/i);
      const fromHeader = cdMatch ? decodeURIComponent(cdMatch[1] || cdMatch[2]) : '';
      if (fromHeader) finalName = fromHeader;
    }
    if (!finalName) {
      try {
        const u = new URL(url, window.location.href);
        const basename = decodeURIComponent((u.pathname.split('/').pop() || '').trim());
        finalName = basename || 'download';
      } catch {
        finalName = 'download';
      }
    }
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = finalName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(objectUrl);
  } catch (e) {
    const a = document.createElement('a');
    a.href = url;
    if (filename) a.download = filename;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
};

const ActionIcons = styled.div`
  display: flex;
  gap: 0.5rem;
  position: relative;
`;

const ActionIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
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

  svg {
    flex-shrink: 0;
  }
`;

const ConfirmTip = styled.div`
  position: absolute;
  right: 0;
  top: -58px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 10px 30px rgba(0,0,0,0.10);
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 20;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;

  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    right: 14px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid ${({ theme }) => theme.colors.surface};
    filter: drop-shadow(0 -1px 0 ${({ theme }) => theme.colors.border});
  }
`;

const ConfirmButton = styled(Button)`
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;

  svg {
    flex-shrink: 0;
  }
`;

const ConfirmText = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

// Themed wrapper for react-date-range
const DateRangeWrapper = styled.div`
  .rdrCalendarWrapper {
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 0.75rem;
    box-shadow: 0 12px 28px rgba(0,0,0,0.12);
    font-size: 0.92rem;
  }
  .rdrDateDisplay { display: none; }
  
  .rdrDefinedRangesWrapper { 
    display: none; /* hide built-in middle ranges column */
  }
  .rdrStaticRange, .rdrInputRangeInput, .rdrStaticRangeLabel { color: ${({ theme }) => theme.colors.text}; }
  .rdrStaticRange:hover .rdrStaticRangeLabel { background: ${({ theme }) => `${theme.colors.primary}11`}; }
`;

const RangePopover = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.75rem;
  box-shadow: 0 12px 28px rgba(0,0,0,0.12);
`;

const RangeBody = styled.div`
  display: flex;
`;

const QuickRanges = styled.div`
  width: 190px;
  padding: 0.75rem;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  border-top-left-radius: 0.75rem;
  border-bottom-left-radius: 0.75rem;
`;

const QuickRangeItem = styled.button`
  width: 100%;
  text-align: left;
  padding: 0.5rem 0.6rem;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-size: 0.92rem;
  transition: all 0.15s ease;

  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}11`};
    border-color: ${({ theme }) => `${theme.colors.primary}33`};
  }
`;

const RangeFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  border-bottom-left-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
`;

const DateRangeInput = styled(Input)`
  font-size: 0.9rem;
  min-width: 200px;
`;

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  // Usage date range (default last 7 days)
  const [usageDateRange, setUsageDateRange] = useState<{ start: Date; end: Date }>(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 6);
    return { start, end };
  });
  const [showRangePicker, setShowRangePicker] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    id: '',          // uuid
    model: '',       // model_id
    startDate: '',   // ISO string
    endDate: '',     // ISO string
    status: 'all'
  });
  const [orders, setOrders] = useState<Array<{ id: string; orderId?: number; model: string; status: 'created' | 'processing' | 'completed' | 'failed' | string; output?: string | null; created: string }>>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [confirmDeleteFor, setConfirmDeleteFor] = useState<string | null>(null);
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

  const fetchUsage = async (range?: { start?: Date; end?: Date }) => {
    try {
      const startRef = (range?.start || usageDateRange.start);
      const endRef = (range?.end || usageDateRange.end);
      // 归一化到本地 00:00 和 23:59:59，确保后端包含最后一天
      const startNorm = new Date(startRef.getFullYear(), startRef.getMonth(), startRef.getDate(), 0, 0, 0, 0).getTime();
      const endNorm = new Date(endRef.getFullYear(), endRef.getMonth(), endRef.getDate(), 23, 59, 59, 999).getTime();
      const startSeconds = Math.floor(startNorm / 1000);
      const endSeconds = Math.floor(endNorm / 1000);
      const res: any = await api.getUserUsage({ start_time: startSeconds, end_time: endSeconds });
      // Normalize API response (new schema)
      const data = res?.data || {};
      const totalPredictions = Number(data?.order_count ?? res?.order_count ?? 0);
      const totalCost = Number(data?.total_cost ?? res?.total_cost ?? 0);
      const perModel: any[] = Array.isArray(data?.per_model_usage) ? data.per_model_usage : [];
      const modelsUsed = perModel.map((it: any) => ({
        name: String(it.model_id || it.model || ''),
        requests: Number(it.request_count || it.count || 0),
        cost: Number(it.total_cost || it.cost || 0),
      }));
      setUsageData({ totalPredictions, totalCost, modelsUsed });

      // Daily timeseries if provided
      const dailyRaw: any[] = Array.isArray(data?.daily_usage) ? data.daily_usage : [];
      const daily: any[] = dailyRaw.map((d: any) => ({ date: d.date, value: Number(d.amount || 0) }));
      try {
        console.log('[DEBUG] usageDateRange', usageDateRange.start, usageDateRange.end);
        console.log('[DEBUG] daily_raw', dailyRaw);
        console.log('[DEBUG] daily_norm', daily);
      } catch {}
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
    // 以本地日期的 00:00 到 23:59:59 作为闭区间构建桶
    const start = new Date(usageDateRange.start.getFullYear(), usageDateRange.start.getMonth(), usageDateRange.start.getDate(), 0, 0, 0, 0);
    const end = new Date(usageDateRange.end.getFullYear(), usageDateRange.end.getMonth(), usageDateRange.end.getDate(), 23, 59, 59, 999);
    const dayMs = 24 * 60 * 60 * 1000;
    const fmt = (d: Date) => `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
    const buckets: Record<string, number> = {};
    // Build a map from usageDaily using same label normalization
    const valueMap: Record<string, number> = {};
    for (const d of usageDaily) {
      let label = d.date;
      if (/\d{4}-\d{2}-\d{2}/.test(d.date)) {
        const [y, m, day] = d.date.split('-').map((n: string) => parseInt(n, 10));
        label = fmt(new Date(y, m - 1, day));
      }
      valueMap[label] = (valueMap[label] || 0) + Number(d.value || 0);
    }
    for (let t = start.getTime(); t <= end.getTime(); t += dayMs) {
      const d = new Date(t);
      buckets[fmt(d)] = 0;
    }
    Object.keys(buckets).forEach((label) => {
      if (valueMap[label] !== undefined) buckets[label] = valueMap[label];
    });
    const data = Object.entries(buckets).map(([date, value]) => ({ date, value }));
    try {
      console.log('[DEBUG] valueMap', valueMap);
      console.log('[DEBUG] buckets', buckets);
      console.log('[DEBUG] chartData', data);
    } catch {}
    return data;
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
        id: String(it.id ),
        orderId:it.uuid,
        model: String(it.model || it.model_id || it.url || it.api || ''),
        status: String(it.status || 'processing'),
        output: it.output || null,
        created: String(it.created_at || it.created || it.create_time || ''),
      }));

      setOrders(normalized);
      setTotal(totalCount);
      setSelectedId(null);
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
    setSelectedId(prev => (prev === requestId ? null : requestId));
  };

  const handleSelectAll = () => {
    // 单选模式下，表头复选框切换为清空选择
    setSelectedId(null);
  };

  const handleDownload = async () => {
    if (!selectedId) {
      showToast('请先选择一条记录', { type: 'info' });
      return;
    }
    const req = orders.find(o => o.id === selectedId);
    if (!req || !req.output) {
      showToast('该记录没有可下载的输出', { type: 'info' });
      return;
    }
    // 优先使用文件本名，其次再回退到推断扩展名
    await downloadFromUrl(String(req.output));
  };

  const handleDelete = async () => {
    if (!selectedId) {
      showToast('请先选择一条记录', { type: 'info' });
      return;
    }
    setConfirmDeleteFor(selectedId);
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
            <div style={{ position: 'relative' }}>
              <UsageDateRangeContainer onClick={() => setShowRangePicker(v => !v)}>
                <Calendar size={16} />
                <UsageDateRangeText>
                  {usageDateRange.start.toLocaleDateString()} – {usageDateRange.end.toLocaleDateString()}
                </UsageDateRangeText>
                <CloseIcon>
                  <X size={12} />
                </CloseIcon>
              </UsageDateRangeContainer>
              {showRangePicker && (
                <div style={{ position: 'absolute', right: 0, zIndex: 30 }}>
                  <RangePopover>
                    <RangeBody>
                      <QuickRanges>
                      {[
                        { label: 'Today', gen: () => { const n = new Date(); return { start: n, end: n }; } },
                        { label: 'Yesterday', gen: () => { const n = new Date(); n.setDate(n.getDate()-1); return { start: n, end: n }; } },
                        { label: 'This Week', gen: () => { const n = new Date(); const day = n.getDay()||7; const s = new Date(n); s.setDate(n.getDate()-day+1); return { start: s, end: n }; } },
                        { label: 'Last Week', gen: () => { const n = new Date(); const day = n.getDay()||7; const end = new Date(n); end.setDate(n.getDate()-day); const start = new Date(end); start.setDate(end.getDate()-6); return { start, end }; } },
                        { label: 'Last 30 Days', gen: () => { const end = new Date(); const start = new Date(); start.setDate(end.getDate()-29); return { start, end }; } },
                        { label: 'This Month', gen: () => { const n = new Date(); const start = new Date(n.getFullYear(), n.getMonth(), 1); return { start, end: n }; } },
                        { label: 'Last Month', gen: () => { const n = new Date(); const start = new Date(n.getFullYear(), n.getMonth()-1, 1); const end = new Date(n.getFullYear(), n.getMonth(), 0); return { start, end }; } },
                      ].map((q, i) => (
                        <QuickRangeItem key={i} onClick={() => { const { start, end } = q.gen(); setUsageDateRange({ start, end }); setShowRangePicker(false); fetchUsage({ start, end }); }}>{q.label}</QuickRangeItem>
                      ))}
                      </QuickRanges>
                      <DateRangeWrapper>
                      <DateRangePicker
                    ranges={[{ startDate: usageDateRange.start, endDate: usageDateRange.end, key: 'selection' }]}
                        onChange={(r: any) => {
                          const sel = r.selection || r.selectionRange || r.range1 || r[Object.keys(r)[0]];
                          if (sel?.startDate && sel?.endDate) {
                            let start = new Date(sel.startDate);
                            let end = new Date(sel.endDate);
                            if (start.getTime() > end.getTime()) {
                              const tmp = start; start = end; end = tmp;
                            }
                            // 仅更新选择，不自动关闭/请求，允许继续点第二个日期完成范围
                            setUsageDateRange({ start, end });
                          }
                        }}
                    onRangeFocusChange={() => {}}
                    moveRangeOnFirstSelection={false}
                        showSelectionPreview
                        dragSelectionEnabled
                    months={2}
                    direction="horizontal"
                    weekdayDisplayFormat="EEE"
                    monthDisplayFormat="MMM yyyy"
                  />
                      </DateRangeWrapper>
                    </RangeBody>
                  </RangePopover>
                  <RangeFooter>
                    <ActionButton variant="secondary" onClick={() => setShowRangePicker(false)}>Cancel</ActionButton>
                    <ActionButton variant="primary" onClick={() => { setShowRangePicker(false); fetchUsage(); }}>Apply</ActionButton>
                  </RangeFooter>
                </div>
              )}
            </div>
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

            {/* Usage breakdown - Right side */}
            <UsageBreakdownCard>
              <UsageBreakdownTitle>Usage breakdown</UsageBreakdownTitle>
              
              <ChartContainer>
                {(() => {
                  const values = chartData.map(d => d.value);
                  const max = Math.max(0, ...values);
                  // 计算合适的上限（向上取整到 1、2、5 刻度）
                  const steps = [1, 2, 5];
                  let magnitude = Math.pow(10, Math.floor(Math.log10(max || 1)));
                  let top = steps[0] * magnitude;
                  for (const s of steps) {
                    const candidate = s * magnitude;
                    if (candidate >= max * 1.1) { top = candidate; break; }
                  }
                  if (max <= 0) top = 1;
                  const ticks = 4;
                  const formatter = (v: number) => {
                    // 小数较小用 4 位，否则 2 位；前缀 $ 符合金额语义
                    const precision = top < 1 ? 4 : 2;
                    return `$${v.toFixed(precision)}`;
                  };
                  const labels = Array.from({ length: ticks + 1 }, (_, i) => formatter((top / ticks) * (ticks - i)));
                  const heightPct = (v: number) => (v <= 0 ? 0 : Math.max(1.5, Math.min(100, (v / top) * 100)));
                  return (
                    <>
                      <ChartYAxis>
                        {labels.map((t, i) => (<span key={i}>{t}</span>))}
                      </ChartYAxis>
                      <ChartXAxis>
                        {chartData.map((item, index) => (
                          // 仅显示首日、末日与每隔2-3天一个，避免挤压
                          ((index === 0) || (index === chartData.length - 1) || (index % Math.ceil(chartData.length / 6) === 0)) ? (
                            <span key={index}>{item.date}</span>
                          ) : (
                            <span key={index} />
                          )
                        ))}
                      </ChartXAxis>
                      <ChartBars>
                        {chartData.map((item, index) => (
                          <div key={index} style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', height: '100%' }}
                            onMouseEnter={(e) => {
                              const tip = (e.currentTarget.querySelector('[data-tip]') as HTMLDivElement);
                              if (tip) tip.style.opacity = '1';
                            }}
                            onMouseLeave={(e) => {
                              const tip = (e.currentTarget.querySelector('[data-tip]') as HTMLDivElement);
                              if (tip) tip.style.opacity = '0';
                            }}
                          >
                            <ChartBar height={heightPct(item.value)} />
                            <ChartTooltip data-tip style={{ left: '10px', bottom: `${heightPct(item.value)}%`, opacity: 0 }}>
                              {item.date} · {formatter(item.value)}
                            </ChartTooltip>
                          </div>
                        ))}
                      </ChartBars>
                    </>
                  );
                })()}
              </ChartContainer>
            </UsageBreakdownCard>
          </UsageContent>
        </UsageSection>

        {/* Requests Section */}
        <RequestsSection>
          <RequestsHeader>
            <RequestsTitle>Requests</RequestsTitle>
          </RequestsHeader>

          <Reminder>
            <ReminderIcon>
              <Info size={16} />
            </ReminderIcon>
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
                  checked={false}
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
                    checked={selectedId === request.id}
                    onChange={() => handleRequestSelect(request.id)}
                  />
                </TableCell>
                <TableCell>
                  <ModelLink href="#">{request.orderId}</ModelLink>
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
                <TableCell>{formatDateTime(request.created)}</TableCell>
                <TableCell>
                  <ActionIcons>
                    {/* <ActionIcon title="Share"><Share2 size={16} /></ActionIcon> */}
                    <ActionIcon title="Download" onClick={async () => {
                      if (!request.output) return;
                      await downloadFromUrl(String(request.output));
                    }}>
                      <Download size={16} />
                    </ActionIcon>
                    <ActionIcon title="Delete" onClick={() => setConfirmDeleteFor(request.id)}>
                      <Trash2 size={16} />
                    </ActionIcon>
                    {confirmDeleteFor === request.id && (
                      <ConfirmTip>
                        <ConfirmText>确认删除？</ConfirmText>
                        <ConfirmButton variant="secondary" onClick={() => setConfirmDeleteFor(null)}>取消</ConfirmButton>
                        <ConfirmButton variant="primary" onClick={async () => {
                          try {
                            const numericId = Number(request.id);
                            await api.deleteOrder(numericId);
                            showToast('删除成功', { type: 'success' });
                            setConfirmDeleteFor(null);
                            fetchOrders();
                          } catch (err: any) {
                            let errorMessage = err?.message || '删除失败';
                            try {
                              const raw = String(err?.message || '');
                              const jsonMatch = raw.match(/\{[\s\S]*\}$/);
                              if (jsonMatch) {
                                const parsed = JSON.parse(jsonMatch[0]);
                                if (parsed?.message) errorMessage = parsed.message;
                              }
                            } catch {}
                            showToast(`错误: ${errorMessage}`, { type: 'error' });
                            setConfirmDeleteFor(null);
                          }
                        }}>确定</ConfirmButton>
                      </ConfirmTip>
                    )}
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
