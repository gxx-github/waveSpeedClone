import type React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { api } from '../api/client';

const Page = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background};
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

const TestButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;

  &:hover {
    background: #2563eb;
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

const Result = styled.div<{ $success?: boolean }>`
  background: ${({ $success }) => $success ? '#f0fdf4' : '#fef2f2'};
  border: 1px solid ${({ $success }) => $success ? '#bbf7d0' : '#fecaca'};
  border-radius: 0.5rem;
  padding: 1rem;
  margin-top: 1rem;
  font-family: monospace;
  white-space: pre-wrap;
  max-height: 300px;
  overflow-y: auto;
`;

const Status = styled.div<{ $status: 'success' | 'error' | 'loading' | 'idle' }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  background: ${({ $status }) => {
    switch ($status) {
      case 'success': return '#dcfce7';
      case 'error': return '#fef2f2';
      case 'loading': return '#fef3c7';
      default: return '#f3f4f6';
    }
  }};
  color: ${({ $status }) => {
    switch ($status) {
      case 'success': return '#166534';
      case 'error': return '#dc2626';
      case 'loading': return '#d97706';
      default: return '#374151';
    }
  }};
`;

const AuthDiagnostic: React.FC = () => {
  const [results, setResults] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const runTest = async (testName: string, testFn: () => Promise<any>) => {
    setLoading(prev => ({ ...prev, [testName]: true }));
    try {
      const result = await testFn();
      setResults(prev => ({ ...prev, [testName]: { success: true, data: result } }));
    } catch (error) {
      setResults(prev => ({ 
        ...prev, 
        [testName]: { 
          success: false, 
          error: error instanceof Error ? error.message : String(error) 
        } 
      }));
    } finally {
      setLoading(prev => ({ ...prev, [testName]: false }));
    }
  };

  const testBackendConnection = () => runTest('backend-connection', async () => {
    const response = await fetch('http://47.242.127.155:8000/docs');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return { status: response.status, statusText: response.statusText };
  });

  const testGoogleAuthEndpoint = () => runTest('google-auth-endpoint', async () => {
    const response = await fetch('http://47.242.127.155:8000/auth/google', {
      method: 'GET',
      redirect: 'manual'
    });
    return { 
      status: response.status, 
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    };
  });

  const testGoogleCallbackEndpoint = () => runTest('google-callback-endpoint', async () => {
    const response = await fetch('http://47.242.127.155:8000/auth/google/callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: 'test-code', state: 'test-state' })
    });
    return { 
      status: response.status, 
      statusText: response.statusText,
      body: await response.text()
    };
  });

  const testCORS = () => runTest('cors-test', async () => {
    const response = await fetch('http://47.242.127.155:8000/api/models', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    return { 
      status: response.status, 
      statusText: response.statusText,
      cors: response.headers.get('Access-Control-Allow-Origin')
    };
  });

  const testAll = async () => {
    await testBackendConnection();
    await testGoogleAuthEndpoint();
    await testGoogleCallbackEndpoint();
    await testCORS();
  };

  const getStatus = (testName: string) => {
    if (loading[testName]) return 'loading';
    if (results[testName]) return results[testName].success ? 'success' : 'error';
    return 'idle';
  };

  return (
    <Page>
      <Card>
        <Title>认证诊断工具</Title>
        <p>这个工具可以帮助诊断谷歌登录认证问题</p>
        
        <div>
          <TestButton onClick={testAll} disabled={Object.values(loading).some(Boolean)}>
            运行所有测试
          </TestButton>
          <TestButton onClick={testBackendConnection} disabled={loading['backend-connection']}>
            测试后端连接
          </TestButton>
          <TestButton onClick={testGoogleAuthEndpoint} disabled={loading['google-auth-endpoint']}>
            测试Google认证端点
          </TestButton>
          <TestButton onClick={testGoogleCallbackEndpoint} disabled={loading['google-callback-endpoint']}>
            测试Google回调端点
          </TestButton>
          <TestButton onClick={testCORS} disabled={loading['cors-test']}>
            测试CORS
          </TestButton>
        </div>

        {Object.entries(results).map(([testName, result]) => (
          <Card key={testName}>
            <h3>
              {testName.replace('-', ' ').toUpperCase()}
              <Status $status={getStatus(testName)}>
                {loading[testName] ? '测试中...' : 
                 result.success ? '成功' : '失败'}
              </Status>
            </h3>
            <Result $success={result.success}>
              {JSON.stringify(result, null, 2)}
            </Result>
          </Card>
        ))}

        <Card>
          <h3>常见问题解决方案</h3>
          <ul>
            <li><strong>无法连接到服务器</strong>: 检查后端服务是否运行在 http://47.242.127.155:8000</li>
            <li><strong>CORS错误</strong>: 后端需要配置允许前端域名的跨域请求</li>
            <li><strong>404错误</strong>: 检查后端是否正确实现了 /auth/google 和 /auth/google/callback 端点</li>
            <li><strong>Google OAuth配置</strong>: 确保Google OAuth应用的重定向URL配置正确</li>
            <li><strong>网络问题</strong>: 检查防火墙设置和网络连接</li>
          </ul>
        </Card>
      </Card>
    </Page>
  );
};

export default AuthDiagnostic;
