import type React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../api/client';

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Card = styled.div`
  width: 100%;
  max-width: 400px;
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Message = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1rem;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${({ theme }) => theme.colors.border};
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const OAuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const error = searchParams.get('error');
        const state = searchParams.get('state');

        console.log('OAuth Callback Debug Info:', {
          code: code ? `${code.substring(0, 10)}...` : 'null',
          error,
          state,
          fullUrl: window.location.href
        });

        if (error) {
          console.error('OAuth error from Google:', error);
          setErrorMessage(`OAuth错误: ${error}`);
          setStatus('error');
          return;
        }

        if (!code) {
          console.error('No authorization code received');
          setErrorMessage('未收到授权码，请重试');
          setStatus('error');
          return;
        }

        console.log('Calling backend API with code...');
        
        // 调用后端处理OAuth回调
        const response = await api.handleGoogleCallback(code, state || undefined);
        
        console.log('Backend response:', response);
        
        if (response && response.access_token) {
          // 存储token
          localStorage.setItem('token', response.access_token);
          console.log('Token stored successfully');
          
          // 设置用户信息
          if (response.user) {
            setUser(response.user);
            localStorage.setItem('user', JSON.stringify(response.user));
            console.log('User info stored:', response.user);
          }
          
          // 清理地址栏中的 code/state 等临时参数
          try {
            const url = new URL(window.location.href);
            url.searchParams.delete('code');
            url.searchParams.delete('state');
            url.searchParams.delete('scope');
            url.searchParams.delete('authuser');
            url.searchParams.delete('prompt');
            window.history.replaceState({}, document.title, `${url.pathname}`);
          } catch (e) {
            console.warn('Failed to clean callback URL:', e);
          }

          setStatus('success');
          
          // 延迟跳转到仪表板
          setTimeout(() => {
            navigate('/dashboard', { replace: true });
          }, 800);
        } else {
          console.error('Invalid response from backend:', response);
          throw new Error('后端返回的响应格式不正确');
        }
      } catch (error) {
        console.error('OAuth callback error:', error);
        
        let errorMsg = '认证失败';
        if (error instanceof Error) {
          if (error.message.includes('Failed to fetch')) {
            errorMsg = '无法连接到服务器，请检查网络连接';
          } else if (error.message.includes('HTTP 404')) {
            errorMsg = '后端API端点不存在，请检查服务器配置';
          } else if (error.message.includes('HTTP 500')) {
            errorMsg = '服务器内部错误，请稍后重试';
          } else if (error.message.includes('HTTP 401')) {
            errorMsg = '认证失败，授权码可能已过期';
          } else {
            errorMsg = error.message;
          }
        }
        
        setErrorMessage(errorMsg);
        setStatus('error');
      }
    };

    handleCallback();
  }, [searchParams, navigate, setUser]);

  if (status === 'loading') {
    return (
      <Page>
        <Card>
          <Spinner />
          <Title>正在验证...</Title>
          <Message>请稍候，我们正在处理您的登录信息</Message>
        </Card>
      </Page>
    );
  }

  if (status === 'error') {
    return (
      <Page>
        <Card>
          <Title>登录失败</Title>
          <ErrorMessage>{errorMessage}</ErrorMessage>
          <button 
            onClick={() => navigate('/login')}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}
          >
            返回登录页面
          </button>
        </Card>
      </Page>
    );
  }

  return (
    <Page>
      <Card>
        <Title>登录成功！</Title>
        <Message>正在跳转到仪表板...</Message>
        <Spinner />
      </Card>
    </Page>
  );
};

export default OAuthCallback;
