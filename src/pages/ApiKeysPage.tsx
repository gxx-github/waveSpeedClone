import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, Button, Input } from '../styles/GlobalStyles';
import { api } from '../api/client';

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

const TopBar = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
`;

const NameInput = styled(Input)`
  max-width: 420px;
`;

const Table = styled(Card)`
  padding: 0;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 120px;
  background: ${({ theme }) => theme.colors.surface};
  padding: 1rem;
  font-weight: 600;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 120px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Cell = styled.div`
  padding: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
`;

const Empty = styled.div`
  padding: 3rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ApiKeysPage: React.FC = () => {
  const [name, setName] = useState('stitcch–test–wavespeed');
  const [isLoading, setIsLoading] = useState(false);
  const [keys, setKeys] = useState<Array<{ id: string; name: string; keyMasked?: string; key?: string; created: string; status: 'active' | 'revoked' }>>([]);

  const loadKeys = async () => {
    setIsLoading(true);
    try {
      const data = await api.listApiKeys();
      const items = Array.isArray(data) ? data : (data?.items || []);
      setKeys(items.map((k: any) => ({
        id: String(k.id ?? k.keyId ?? k.name),
        name: k.name ?? 'API Key',
        keyMasked: k.keyMasked ?? k.mask ?? '****',
        created: k.created ?? k.createdAt ?? '',
        status: (k.status ?? 'active') as 'active' | 'revoked'
      })));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      const created = await api.createApiKey(name);
      await loadKeys();
      if (created?.keyPlain) {
        alert(`Copy your key now: ${created.keyPlain}`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    loadKeys();
  }, []);

  return (
    <PageContainer>
      <Container>
        <Title>API Keys</Title>
        <TopBar>
          <NameInput value={name} onChange={(e) => setName(e.target.value)} placeholder="Key name" />
          <Button variant="primary" onClick={handleCreate}>Create Key</Button>
        </TopBar>

        <Table>
          <TableHeader>
            <div>Name</div>
            <div>Key</div>
            <div>Created</div>
            <div>Status</div>
            <div>Actions</div>
          </TableHeader>

          {isLoading ? (
            <Empty>Loading...</Empty>
          ) : keys.length === 0 ? (
            <Empty>No access keys found. Create one to get started.</Empty>
          ) : (
            keys.map((k) => (
              <Row key={k.id}>
                <Cell>{k.name}</Cell>
                <Cell>{k.keyMasked ?? k.key}</Cell>
                <Cell>{k.created}</Cell>
                <Cell>{k.status}</Cell>
                <Cell>
                  <Button size="sm" style={{ marginRight: '0.5rem' }}>Copy</Button>
                  <Button size="sm" variant="secondary">Revoke</Button>
                </Cell>
              </Row>
            ))
          )}
        </Table>
      </Container>
    </PageContainer>
  );
};

export default ApiKeysPage;


