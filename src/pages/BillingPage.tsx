import type React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Card, Button, Input } from '../styles/GlobalStyles';
import { CustomSelect } from '../components/Select';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../api/client';
import { useToast } from '../components/Toast';

const PageContainer = styled.div`
  padding: 2rem 0;
  min-height: calc(100vh - 200px);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const BalanceCard = styled(Card)`
  padding: 2rem;
`;

const Balance = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const Subtle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Table = styled(Card)`
  padding: 0;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr 0.9fr; /* Date | Amount | Status */
  background: ${({ theme }) => theme.colors.surface};
  padding: 0.75rem 1rem;
  font-weight: 600;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr 0.9fr; /* Date | Amount | Status */
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  transition: background 0.15s ease;

  &:nth-child(even) {
    background: ${({ theme }) => theme.colors.surface};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.cardBackground};
  }
`;

const Cell = styled.div`
  padding: 0.85rem 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  /* Amount column right-align and use tabular numbers */
  &:nth-child(2) {
    color: ${({ theme }) => theme.colors.text};
    font-variant-numeric: tabular-nums;
  }
`;

const SectionCard = styled(Card)`
  padding: 1.25rem;
`;

const SectionTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

const AmountGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const AmountCard = styled.button<{ $active?: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.border};
  border-radius: 0.75rem;
  padding: 1.25rem 1rem;
  text-align: center;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.colors.text};

  &:hover { border-color: ${({ theme }) => theme.colors.primary}; }

  .price { font-size: 1.5rem; font-weight: 800; margin-bottom: 0.25rem; }
  .note { font-size: 0.75rem; color: ${({ theme }) => theme.colors.textSecondary}; }
`;

const PaymentRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const Radio = styled.label<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.border};
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
`;

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin: 1rem 0;
`;

const Inline = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const Tabs = styled.div`
  display: flex;
  gap: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin: 1rem 0;
`;

const Tab = styled.button<{ $active?: boolean }>`
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.text};
  font-weight: 600;

  ${({ $active, theme }) => $active && `border-bottom-color: ${theme.colors.primary};`}
`;

const Empty = styled.div`
  padding: 3rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const AccountCard = styled(BalanceCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Avatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0 0.75rem;
`;

const Small = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const StatusPill = styled.span<{ $status: 'pending' | 'success' | 'failed' | string }>`
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  ${({ $status }) => {
    switch ($status) {
      case 'success':
        return `background:#dcfce7;color:#166534;`;
      case 'failed':
        return `background:#fee2e2;color:#991b1b;`;
      case 'pending':
      default:
        return `background:#fef3c7;color:#92400e;`;
    }
  }}
`;

const InlineLoader = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  &::before {
    content: '';
    width: 14px;
    height: 14px;
    border: 2px solid #e5e7eb;
    border-top-color: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    display: inline-block;
    animation: spin .9s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
`;

const formatBillDate = (input: string): string => {
  if (!input) return '--';
  const t = Date.parse(input);
  if (!Number.isNaN(t)) {
    const d = new Date(t);
    const pad = (v: number) => String(v).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
  return String(input);
};

const BillingPage: React.FC = () => {
  const { t } = useTranslation();
  const { user, fetchUserInfo, isAuthenticated } = useAuth();
  const [balance, setBalance] = useState<number>(0);
  const [tab, setTab] = useState<'topup' | 'billing'>('topup');
  const [amount, setAmount] = useState<'10' | '50' | '100' | 'custom'>('10');
  const [customAmount, setCustomAmount] = useState(2);
  const [payment, setPayment] = useState<'paypal' | 'stripe'>('stripe');
  const [history, setHistory] = useState<Array<{ id: string; date: string; description: string; amount: number; status: string }>>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const { showToast } = useToast();
  const [billsLoading, setBillsLoading] = useState(false);

  // 获取用户信息
  useEffect(() => {
    const load = async () => {
      try {
        if (isAuthenticated && !user) {
          await fetchUserInfo();
        }
        const me = await api.me() as any;
        // 兼容多种字段名：balance / account_balance / credits 等
        const b = Number(me.price ?? 0);
        setBalance(isFinite(b) ? b : 0);
      } catch (e) {
        // 保持静默失败，UI 使用默认 0
      }
    };
    load();
  }, [isAuthenticated, fetchUserInfo]);

  useEffect(() => {
    const loadBills = async () => {
      try {
        setBillsLoading(true);
        const res: any = await api.payList({ page, page_size: pageSize });
        const items: any[] = Array.isArray(res?.items) ? res.items : (Array.isArray(res) ? res : (res?.data?.items || res?.data || []));
        const normalized = items.map((it: any, idx: number) => ({
          id: String(it.id || it.payment_id || idx),
          date: String(it.create_date || it.created_at || it.create_time || it.date || ''),
          description: String(it.description || it.remark || it.note || it.type || 'Top up'),
          amount: Number(it.amount ?? it.total ?? it.price ?? 0),
          status: String(it.status || 'pending'),
        }));
        const totalCount = Number(res?.total || res?.data?.total || items.length);
        setHistory(normalized);
        setTotal(isFinite(totalCount) ? totalCount : normalized.length);
      } catch (err: any) {
        showToast(err?.message || '获取支付记录失败', { type: 'error' });
      } finally {
        setBillsLoading(false);
      }
    };
    if (tab === 'topup') {
      loadBills();
    }else{
      setHistory([]);
    }
  }, [page, pageSize, showToast, tab]);

  const selectedValue = amount === 'custom' ? customAmount : Number(amount);

  return (
    <PageContainer>
      <Container>
        <Title>{t('billing.title')}</Title>
        <Grid>
          <div>
            <SectionTitleRow>
              <h3 style={{ fontSize: '1.1rem' }}>Top Up</h3>
              <Small>$2 minimum, $1 increments</Small>
            </SectionTitleRow>

            <SectionCard>
              <p style={{ marginBottom: '0.75rem', fontWeight: 600 }}>{t('billing.amount')}</p>
              <AmountGrid>
                <AmountCard $active={amount==='10'} onClick={() => setAmount('10')}>
                  <div className="price">$10</div>
                  <div className="note">{t('billing.generateOver')} <b>100</b> {t('billing.videos')} or <b>2,000</b> {t('billing.images')}.</div>
                </AmountCard>
                <AmountCard $active={amount==='50'} onClick={() => setAmount('50')}>
                  <div className="price">$50</div>
                  <div className="note">{t('billing.generateOver')} <b>500</b> {t('billing.videos')} or <b>10,000</b> {t('billing.images')}.</div>
                </AmountCard>
                <AmountCard $active={amount==='100'} onClick={() => setAmount('100')}>
                  <div className="price">$100</div>
                  <div className="note">{t('billing.generateOver')} <b>1,000</b> {t('billing.videos')} or <b>20,000</b> {t('billing.images')}.</div>
                </AmountCard>
                <AmountCard $active={amount==='custom'} onClick={() => setAmount('custom')}>
                  <div className="price">{t('billing.custom')}</div>
                  <div className="note">{t('billing.minimum')} <b>$2</b><span> </span><b>$1</b> {t('billing.increments')}</div>
                </AmountCard>
              </AmountGrid>

              {amount==='custom' && (
                <div style={{ marginTop: '0.75rem', maxWidth: 240 }}>
                  <Input type="number" min={2} value={customAmount} onChange={(e) => setCustomAmount(Number(e.target.value))} />
                </div>
              )}

              <p style={{ marginTop: '1rem', fontWeight: 600 }}>{t('billing.paymentMethod')}</p>
              <PaymentRow>
                {/* <Radio $active={payment==='paypal'} onClick={() => setPayment('paypal')}>
                  <input type="radio" checked={payment==='paypal'} readOnly /> {t('billing.paypal')}
                </Radio> */}
                <Radio $active={payment==='stripe'} onClick={() => setPayment('stripe')}>
                  <input type="radio" checked={payment==='stripe'} readOnly /> {t('billing.stripe')}
                </Radio>
                <div style={{ flex: 1 }} />
                <Button variant="primary" onClick={async () => {
                  try {
                    let price_type: 'price_10' | 'price_50' | 'price_100' | 'price_custom' = 'price_custom';
                    if (amount === '10') price_type = 'price_10';
                    else if (amount === '50') price_type = 'price_50';
                    else if (amount === '100') price_type = 'price_100';
                    else price_type = 'price_custom';

                    const res: any = await api.payGetSession({ price_type });
                    console.log('res', res);
                    const url: string =
                      (typeof res === 'string' ? res : '') ||
                      res?.url ||
                      res?.checkout_url ||
                      (typeof res?.data === 'string' ? res.data : '') ||
                      res?.data?.url || '';
                    if (url) {
                      window.location.href = url;
                    } else {
                      showToast('未获取到支付链接', { type: 'error' });
                    }
                  } catch (e: any) {
                    showToast(e?.message || '创建支付会话失败', { type: 'error' });
                  }
                }}>
                  {selectedValue === 10 ? 'Buy (Get $12)' : `Buy $${selectedValue}`}
                </Button>
              </PaymentRow>

              {/* <Divider /> */}
              {/* <Inline>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <strong>Automated Top–ups:</strong>
                  <Small>You can set up automated top–ups to avoid running out of credits.</Small>
                </div>
                <Button variant="secondary" size="sm">Enable</Button>
              </Inline> */}
            </SectionCard>

            <Inline style={{ marginTop: '1rem' }}>
              <Tabs>
                <Tab $active={tab==='topup'} onClick={() => setTab('topup')}>{t('billing.topUp')}</Tab>
                {/* <Tab $active={tab==='billing'} onClick={() => setTab('billing')}>Billing</Tab> */}
              </Tabs>
              {/* <Button variant="secondary" size="sm">Add Billing Address</Button> */}
            </Inline>

            <Table>
              <TableHeader>
                <div>{t('billing.date')}</div>
                <div>{t('billing.amount')}</div>
                <div>{t('billing.status')}</div>
              </TableHeader>
              {billsLoading ? (
                <div style={{ padding: '1rem', textAlign: 'center' }}>
                  <InlineLoader>{t('billing.loadingRecords')}</InlineLoader>
                </div>
              ) : history.length === 0 ? (
                <Empty>No top up records yet</Empty>
              ) : (
                history.map((item) => (
                  <Row key={item.id}>
                    <Cell>{formatBillDate(item.date)}</Cell>
                    <Cell>${item.amount.toFixed(2)}</Cell>
                    <Cell><StatusPill $status={item.status}>{item.status}</StatusPill></Cell>
                  </Row>
                ))
              )}
            </Table>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginTop: '0.5rem' }}>
              <Small>Showing {(history.length===0)?0:((page-1)*pageSize+1)} to {Math.min(page*pageSize, total)} of {total} results</Small>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Button size="sm" variant="secondary" onClick={() => setPage((p) => Math.max(1, p-1))} disabled={page<=1}>Previous</Button>
                <Input style={{ width: 56, textAlign: 'center' }} value={page} onChange={(e) => { const v = parseInt(e.target.value||'1',10); if(!Number.isNaN(v)) setPage(Math.max(1,v)); }} />
                <Button size="sm" variant="secondary" onClick={() => { /* refresh */ }}>Go</Button>
                <Button size="sm" variant="secondary" onClick={() => setPage((p)=> (p*pageSize<total? p+1 : p))} disabled={page*pageSize>=total}>Next</Button>
                {/* unified select */}
                <div style={{ minWidth: 120 }}>
                  <CustomSelect
                    value={String(pageSize)}
                    onChange={(v)=>{ setPageSize(parseInt(v,10)); setPage(1); }}
                    options={[
                      { value: '10', label: '10/page' },
                      { value: '20', label: '20/page' },
                      { value: '50', label: '50/page' },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>

          <AccountCard>
            <h2 style={{ marginBottom: '0.75rem' }}>My Account</h2>
            <Avatar>{(user?.name || user?.email || 'U').toString().charAt(0).toUpperCase()}</Avatar>
            <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{user?.name || user?.email || 'User'}</div>
            {/* <Small>{user?.email || 'user@example.com'}</Small> */}
            <Balance style={{ marginTop: '1rem' }}>${balance.toFixed(2)}</Balance>
            <Small>{t('billing.balance')}</Small>
            <Small>The balance never expires.</Small>
          </AccountCard>
        </Grid>
      </Container>
    </PageContainer>
  );
};

export default BillingPage;


