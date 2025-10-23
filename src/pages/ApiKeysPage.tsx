import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Card, Button, Input } from '../styles/GlobalStyles';
import { useToast } from '../components/Toast';
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

// 解决表格在小屏显示不全：加可滚动容器
const TableScroll = styled.div`
  width: 100%;
  overflow: auto;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 2.5fr 1.2fr 1fr 140px;
  min-width: 900px;
  background: ${({ theme }) => theme.colors.surface};
  padding: 1rem;
  font-weight: 600;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 2fr 2.5fr 1.2fr 1fr 140px;
  min-width: 900px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Cell = styled.div`
  padding: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  min-width: 0;
`;

const KeyCell = styled(Cell)`
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  gap: 0.5rem;
  
  .secret {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const EyeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 0.25rem;
  border-radius: 0.375rem;
  transition: background 0.2s, color 0.2s;

  &:hover { 
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
  }

  svg {
    flex-shrink: 0;
  }
`;

const Empty = styled.div`
  padding: 3rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ApiKeysPage: React.FC = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [keys, setKeys] = useState<Array<{ id: string; name: string; keyMasked?: string; key?: string; created: string; status: 'active' | 'revoked' }>>([]);
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const { showToast } = useToast();

  const loadKeys = async () => {
    setIsLoading(true);
    try {
      const data = await api.listApiKeys();
      const items = Array.isArray(data) ? data : (data?.items || []);
      setKeys(items.map((k: any, idx: number) => ({
        // 确保每行 id 唯一，避免可见性状态互相影响
        id: String(k.id ?? k.keyId ?? k.name ?? `row-${idx}`),
        name: k.name ?? 'API Key',
        keyMasked: k.keyMasked ?? k.mask ?? k.api_key ?? '****',
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
        showToast(t('apiKeys.keyCreated'), { type: 'success' });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVisible = (id: string) => {
    setVisible((v) => ({ ...v, [id]: !v[id] }));
  };

  const copyKey = async (text: string | undefined) => {
    try {
      console.log('copyKey', text);
      if (!text) return;
      await navigator.clipboard.writeText(text);
      showToast('Copied to clipboard', { type: 'success' });
    } catch (e) {
      console.error('Copy failed', e);
      showToast('Copy failed', { type: 'error' });
    }
  };

  React.useEffect(() => {
    loadKeys();
  }, []);

  return (
    <PageContainer>
      <Container>
        <Title>{t('apiKeys.title')}</Title>
        <TopBar>
          <NameInput value={name} onChange={(e) => setName(e.target.value)} placeholder={t('apiKeys.keyName')} />
          <Button variant="primary" onClick={handleCreate}>{t('apiKeys.createKey')}</Button>
        </TopBar>

        <Table>
          <TableScroll>
            <TableHeader>
              <div>{t('apiKeys.name')}</div>
              <div>{t('apiKeys.key')}</div>
              <div>{t('apiKeys.status')}</div>
              <div>{t('apiKeys.actions')}</div>
            </TableHeader>

            {isLoading ? (
              <Empty>{t('apiKeys.loading')}</Empty>
            ) : keys.length === 0 ? (
              <Empty>{t('apiKeys.noKeysFound')}</Empty>
            ) : (
              keys.map((k) => {
                const isShown = !!visible[k.id];
                const masked = k.keyMasked ?? (k.key ? k.key.replace(/.(?=.{4})/g, '*') : '****');
                const display = isShown ? (k.key ?? masked) : '*****';
                return (
                  <Row key={k.id}>
                    <Cell>{k.name}</Cell>
                    <KeyCell>
                      <span className="secret" title={isShown ? (k.key ?? '') : ''}>{display}</span>
                      <EyeButton onClick={() => toggleVisible(k.id)} aria-label={isShown ? 'Hide key' : 'Show key'}>
                        {isShown ? (
                          // eye-off icon
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M2 2l20 20-1.41 1.41L17.73 21.56A11.91 11.91 0 0112 23C7 23 2.73 20.11 1 16c.59-1.38 1.46-2.64 2.54-3.73L.59 3.41 2 2zm6.55 6.55L9.73 10.73A3 3 0 0013.27 14.27l2.18 2.18A5 5 0 018.55 8.55zM12 5c5 0 9.27 2.89 11 7-1.03 2.4-2.83 4.41-5.1 5.72l-1.47-1.47A10.02 10.02 0 0021 12c-1.52-3.52-5.18-6-9-6-1.1 0-2.16.2-3.14.57L7.46 5.86A11.91 11.91 0 0112 5z"/>
                          </svg>
                        ) : (
                          // eye icon
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z"/>
                          </svg>
                        )}
                      </EyeButton>
                    </KeyCell>
                    <Cell>{k.status}</Cell>
                    <Cell>
                      <Button size="sm" style={{ marginRight: '0.5rem' }} onClick={() => copyKey(k.keyMasked)}>
                        {t('apiKeys.copy')}
                      </Button>
                      {/* <Button size="sm" variant="secondary">Revoke</Button> */}
                    </Cell>
                  </Row>
                );
              })
            )}
          </TableScroll>
        </Table>
      </Container>
    </PageContainer>
  );
};

export default ApiKeysPage;


