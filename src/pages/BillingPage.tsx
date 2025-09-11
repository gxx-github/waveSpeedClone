import type React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Card, Button, Input } from '../styles/GlobalStyles';

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
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  background: ${({ theme }) => theme.colors.surface};
  padding: 1rem;
  font-weight: 600;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Cell = styled.div`
  padding: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
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

const BillingPage: React.FC = () => {
  const balance = 0.85;
  const [tab, setTab] = useState<'topup' | 'billing'>('topup');
  const [amount, setAmount] = useState<'10' | '50' | '100' | 'custom'>('10');
  const [customAmount, setCustomAmount] = useState(2);
  const [payment, setPayment] = useState<'paypal' | 'stripe'>('stripe');
  const history: Array<{ id: string; date: string; description: string; amount: number; status: string }> = [];

  const selectedValue = amount === 'custom' ? customAmount : Number(amount);

  return (
    <PageContainer>
      <Container>
        <Title>Billing</Title>
        <Grid>
          <div>
            <SectionTitleRow>
              <h3 style={{ fontSize: '1.1rem' }}>Top Up</h3>
              <Small>$2 minimum, $1 increments</Small>
            </SectionTitleRow>

            <SectionCard>
              <p style={{ marginBottom: '0.75rem', fontWeight: 600 }}>Amount</p>
              <AmountGrid>
                <AmountCard $active={amount==='10'} onClick={() => setAmount('10')}>
                  <div className="price">$10</div>
                  <div className="note">Generate over <b>100</b> videos or <b>2,000</b> images.</div>
                </AmountCard>
                <AmountCard $active={amount==='50'} onClick={() => setAmount('50')}>
                  <div className="price">$50</div>
                  <div className="note">Generate over <b>500</b> videos or <b>10,000</b> images.</div>
                </AmountCard>
                <AmountCard $active={amount==='100'} onClick={() => setAmount('100')}>
                  <div className="price">$100</div>
                  <div className="note">Generate over <b>1,000</b> videos or <b>20,000</b> images.</div>
                </AmountCard>
                <AmountCard $active={amount==='custom'} onClick={() => setAmount('custom')}>
                  <div className="price">Custom</div>
                  <div className="note">Minimum <b>$2</b><span> </span><b>$1</b> increments</div>
                </AmountCard>
              </AmountGrid>

              {amount==='custom' && (
                <div style={{ marginTop: '0.75rem', maxWidth: 240 }}>
                  <Input type="number" min={2} value={customAmount} onChange={(e) => setCustomAmount(Number(e.target.value))} />
                </div>
              )}

              <p style={{ marginTop: '1rem', fontWeight: 600 }}>Payment Method</p>
              <PaymentRow>
                <Radio $active={payment==='paypal'} onClick={() => setPayment('paypal')}>
                  <input type="radio" checked={payment==='paypal'} readOnly /> PayPal
                </Radio>
                <Radio $active={payment==='stripe'} onClick={() => setPayment('stripe')}>
                  <input type="radio" checked={payment==='stripe'} readOnly /> stripe
                </Radio>
                <div style={{ flex: 1 }} />
                <Button variant="primary">
                  {selectedValue === 10 ? 'Buy (Get $12)' : `Buy $${selectedValue}`}
                </Button>
              </PaymentRow>

              <Divider />
              <Inline>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <strong>Automated Top–ups:</strong>
                  <Small>You can set up automated top–ups to avoid running out of credits.</Small>
                </div>
                <Button variant="secondary" size="sm">Enable</Button>
              </Inline>
            </SectionCard>

            <Inline style={{ marginTop: '1rem' }}>
              <Tabs>
                <Tab $active={tab==='topup'} onClick={() => setTab('topup')}>Top up</Tab>
                <Tab $active={tab==='billing'} onClick={() => setTab('billing')}>Billing</Tab>
              </Tabs>
              <Button variant="secondary" size="sm">Add Billing Address</Button>
            </Inline>

            <Table>
              <TableHeader>
                <div>Description</div>
                <div>Date</div>
                <div>Amount</div>
                <div>Action</div>
              </TableHeader>
              {history.length === 0 ? (
                <Empty>Showing 1 to 0 of 0 results</Empty>
              ) : (
                history.map((item) => (
                  <Row key={item.id}>
                    <Cell>{item.description}</Cell>
                    <Cell>{item.date}</Cell>
                    <Cell>${item.amount.toFixed(2)}</Cell>
                    <Cell>-</Cell>
                  </Row>
                ))
              )}
            </Table>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
              <Small>Previous</Small>
              <Button size="sm" variant="secondary">1</Button>
              <Button size="sm" variant="secondary">Go</Button>
              <Small>Next</Small>
            </div>
          </div>

          <AccountCard>
            <h2 style={{ marginBottom: '0.75rem' }}>My Account</h2>
            <Avatar>W</Avatar>
            <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Xin GU</div>
            <Small>stitchone23@gmail.com</Small>
            <Balance style={{ marginTop: '1rem' }}>${balance.toFixed(2)}</Balance>
            <Small>Account Balance</Small>
            <Small>The balance never expires.</Small>
          </AccountCard>
        </Grid>
      </Container>
    </PageContainer>
  );
};

export default BillingPage;


