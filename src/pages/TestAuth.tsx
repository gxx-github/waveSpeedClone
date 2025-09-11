import type React from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Card = styled.div`
  width: 100%;
  max-width: 500px;
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  padding: 2rem;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Info = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
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
`;

const TestAuth: React.FC = () => {
  const { user, isAuthenticated, loginWithGoogle, logout, isLoading } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error('Google login failed:', error);
      alert('Google login failed: ' + (error as Error).message);
    }
  };

  return (
    <Page>
      <Card>
        <Title>认证测试页面</Title>
        
        <Info>
          <h3>当前状态：</h3>
          <p>已认证: {isAuthenticated ? '是' : '否'}</p>
          <p>加载中: {isLoading ? '是' : '否'}</p>
          {user && (
            <div>
              <p>用户ID: {user.id}</p>
              <p>邮箱: {user.email}</p>
              <p>姓名: {user.name}</p>
            </div>
          )}
        </Info>

        <div>
          <Button onClick={handleGoogleLogin} disabled={isLoading}>
            {isLoading ? '登录中...' : '测试Google登录'}
          </Button>
          
          {isAuthenticated && (
            <Button onClick={logout}>
              登出
            </Button>
          )}
        </div>

        <Info style={{ marginTop: '1rem' }}>
          <h4>测试说明：</h4>
          <p>1. 点击"测试Google登录"按钮</p>
          <p>2. 将被重定向到Google OAuth页面</p>
          <p>3. 完成授权后会自动跳转回应用</p>
          <p>4. 检查用户信息是否正确显示</p>
        </Info>
      </Card>
    </Page>
  );
};

export default TestAuth;
