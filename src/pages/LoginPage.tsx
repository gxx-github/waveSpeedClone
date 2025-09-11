import type React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Page = styled.div`
  min-height: calc(100vh - 160px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Card = styled.div`
  width: 100%;
  max-width: 520px;
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1.25rem;
`;

const Button = styled.button<{ $variant?: 'google' | 'github' | 'primary' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.85rem 1rem;
  border-radius: 0.5rem;
  color: white;
  font-weight: 700;
  margin-top: 0.75rem;
  background: ${({ $variant }) => {
    switch ($variant) {
      case 'google': return '#1d4ed8';
      case 'github': return '#111827';
      case 'primary': return '#3b82f6';
      default: return '#3b82f6';
    }
  }};
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
  }
  
  span {
    padding: 0 1rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.875rem;
  }
`;

const TestAccountInfo = styled.div`
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-top: 1rem;
  text-align: left;
`;

const TestAccountTitle = styled.h4`
  color: #0369a1;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`;

const TestAccountText = styled.p`
  color: #0369a1;
  font-size: 0.8rem;
  margin: 0.25rem 0;
`;

const Disclaimer = styled.p`
  margin-top: 1rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const LoginPage: React.FC = () => {
  const { login, loginWithGoogle, loginWithGitHub, isLoading } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error('Google login failed:', error);
      setError('Google登录失败，请重试');
    }
  };

  const handleGitHubLogin = async () => {
    try {
      await loginWithGitHub();
    } catch (error) {
      console.error('GitHub login failed:', error);
      setError('GitHub登录失败，请重试');
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('请填写用户名和密码');
      return;
    }

    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError('用户名或密码错误');
    }
  };

  const fillTestAccount = (account: 'admin' | 'user') => {
    if (account === 'admin') {
      setUsername('admin');
      setPassword('admin123');
    } else {
      setUsername('user');
      setPassword('user123');
    }
  };

  return (
    <Page>
      <Card>
        <Title>欢迎登录</Title>
        <Subtitle>选择登录方式继续到仪表板</Subtitle>

        {/* OAuth 登录按钮 */}
        <Button $variant="google" onClick={handleGoogleLogin} disabled={isLoading}>
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="white" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="white" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="white" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="white" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {isLoading ? '登录中...' : '使用 Google 登录'}
        </Button>

        <Button $variant="github" onClick={handleGitHubLogin} disabled={isLoading}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          {isLoading ? '登录中...' : '使用 GitHub 登录'}
        </Button>

        <Divider>
          <span>或</span>
        </Divider>

        {/* 用户名密码登录表单 */}
        <Form onSubmit={handleFormSubmit}>
          <FormGroup>
            <Label htmlFor="username">用户名</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="输入用户名"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">密码</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="输入密码"
              required
            />
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit" $variant="primary" disabled={isLoading}>
            {isLoading ? '登录中...' : '登录'}
          </Button>
        </Form>

        {/* 测试账户信息 */}
        <TestAccountInfo>
          <TestAccountTitle>🧪 测试账户（接口未通时使用）</TestAccountTitle>
          <TestAccountText>
            <strong>管理员账户:</strong> admin / admin123
            <button 
              onClick={() => fillTestAccount('admin')}
              style={{ 
                marginLeft: '0.5rem', 
                padding: '0.25rem 0.5rem', 
                fontSize: '0.75rem',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer'
              }}
            >
              填入
            </button>
          </TestAccountText>
          <TestAccountText>
            <strong>普通用户:</strong> user / user123
            <button 
              onClick={() => fillTestAccount('user')}
              style={{ 
                marginLeft: '0.5rem', 
                padding: '0.25rem 0.5rem', 
                fontSize: '0.75rem',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer'
              }}
            >
              填入
            </button>
          </TestAccountText>
        </TestAccountInfo>

        <Disclaimer>
          登录即表示您同意我们的 <a href="/terms">服务条款</a> 和 <a href="/privacy">隐私政策</a>。
        </Disclaimer>
      </Card>
    </Page>
  );
};

export default LoginPage;


