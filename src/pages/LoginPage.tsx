import type React from 'react';
import styled from 'styled-components';
import { BASE_URL } from '../api/client';

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

const Button = styled.a<{ $variant?: 'google' | 'github' }>`
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
  background: ${({ $variant }) => $variant === 'google' ? '#1d4ed8' : '#111827'};
`;

const Disclaimer = styled.p`
  margin-top: 1rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const LoginPage: React.FC = () => {
  const googleUrl = `${BASE_URL}/auth/google`;
  const githubUrl = `${BASE_URL}/auth/github`;

  return (
    <Page>
      <Card>
        <Title>Welcome</Title>
        <Subtitle>Sign in to continue to the dashboard</Subtitle>
        <Button $variant="google" href={googleUrl}>
          <span>G</span> Sign in with Google
        </Button>
        <Button $variant="github" href={githubUrl}>
          <span>🐙</span> Sign in with GitHub
        </Button>
        <Disclaimer>
          By signing in, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
        </Disclaimer>
      </Card>
    </Page>
  );
};

export default LoginPage;


