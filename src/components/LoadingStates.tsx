import type React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.surface} 25%,
    ${({ theme }) => theme.colors.border} 50%,
    ${({ theme }) => theme.colors.surface} 75%
  );
  background-size: 400% 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
  border-radius: 0.5rem;
`;

export const SkeletonCard = styled(SkeletonBase)`
  width: 100%;
  height: 400px;
  border-radius: 1rem;
`;

export const SkeletonText = styled(SkeletonBase)<{ width?: string; height?: string }>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '1rem'};
  margin-bottom: 0.5rem;
`;

export const SkeletonButton = styled(SkeletonBase)`
  width: 120px;
  height: 40px;
  border-radius: 0.5rem;
`;

const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const SkeletonCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  background: ${({ theme }) => theme.colors.cardBackground};
`;

export const ModelsSkeletonLoader: React.FC<{ count?: number }> = ({ count = 8 }) => {
  return (
    <SkeletonGrid>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCardContainer key={index}>
          {/* thumbnail */}
          <SkeletonCard style={{ height: '200px' }} />
          {/* tags row */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <SkeletonText width="60px" height="16px" />
            <SkeletonText width="80px" height="16px" />
            <SkeletonText width="70px" height="16px" />
          </div>
          {/* provider + price */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <SkeletonText width="120px" height="20px" />
            <SkeletonText width="60px" height="24px" />
          </div>
          {/* title/desc */}
          <SkeletonText width="80%" height="18px" />
          <SkeletonText width="100%" height="16px" />
          <SkeletonText width="90%" height="16px" />
          {/* button */}
          <SkeletonButton />
        </SkeletonCardContainer>
      ))}
    </SkeletonGrid>
  );
};

// Sidebar skeleton for filters
const SidebarSkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CheckboxBox = styled(SkeletonBase)`
  width: 18px;
  height: 18px;
  border-radius: 4px;
`;

export const SidebarSkeleton: React.FC = () => {
  return (
    <SidebarSkeletonContainer>
      <SkeletonText width="120px" height="20px" />
      {Array.from({ length: 6 }).map((_, i) => (
        <CheckboxRow key={i}>
          <CheckboxBox />
          <SkeletonText width="60%" height="16px" />
          <SkeletonText width="40px" height="16px" />
        </CheckboxRow>
      ))}
      <SkeletonButton />
    </SidebarSkeletonContainer>
  );
};

export const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${({ theme }) => theme.colors.border};
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 2rem auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = "Loading..." }) => {
  return (
    <div style={{ textAlign: 'center', padding: '3rem' }}>
      <LoadingSpinner />
      <p style={{ marginTop: '1rem', color: '#6b7280' }}>{message}</p>
    </div>
  );
};
