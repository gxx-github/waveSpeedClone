import type React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import type { Model } from '../types/models';
import { Card, Button } from '../styles/GlobalStyles';

const ModelCardContainer = styled(Card)`
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const ModelImage = styled.div<{ $backgroundImage: string }>`
  width: 100%;
  height: 200px;
  background-image: url(${props => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
`;

const TagsContainer = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  z-index: 1;
`;

const Tag = styled.span<{ $variant?: 'hot' | 'commercial' | 'partner' }>`
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;

  ${({ $variant }) => {
    switch ($variant) {
      case 'hot':
        return `
          background: #ef4444;
          color: white;
        `;
      case 'commercial':
        return `
          background: #10b981;
          color: white;
        `;
      case 'partner':
        return `
          background: #3b82f6;
          color: white;
        `;
      default:
        return `
          background: rgba(0, 0, 0, 0.7);
          color: white;
        `;
    }
  }}
`;

const ModelProvider = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const ProviderIcon = styled.div`
  width: 20px;
  height: 20px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
`;

const ProviderName = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`;

const Price = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #10b981;
  margin-left: auto;
`;

const ModelName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.3;
`;

const ModelDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: auto;
`;

interface ModelCardProps {
  model: Model;
}

const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
  const getModelUrl = () => {
    return `/models/${model.provider}/${model.name}`;
  };

  const getTagVariant = (tag: string) => {
    if (tag.toLowerCase().includes('hot')) return 'hot';
    if (tag.toLowerCase().includes('commercial')) return 'commercial';
    if (tag.toLowerCase().includes('partner')) return 'partner';
    return undefined;
  };

  return (
    <ModelCardContainer>
      <ModelImage $backgroundImage={model.thumbnail}>
        <TagsContainer>
          {model.tags.map((tag) => (
            <Tag key={tag} $variant={getTagVariant(tag)}>
              {tag}
            </Tag>
          ))}
        </TagsContainer>
      </ModelImage>

      <ModelProvider>
        <ProviderIcon>
          {model.provider.charAt(0).toUpperCase()}
        </ProviderIcon>
        <ProviderName>{model.provider}</ProviderName>
        <Price>${model.price}</Price>
      </ModelProvider>

      <ModelName>{model.name}</ModelName>
      <ModelDescription>{model.description}</ModelDescription>

      <ActionContainer>
        <Button
          as={Link}
          to={getModelUrl()}
          variant="primary"
          size="sm"
          style={{ flex: 1 }}
        >
          Try it
        </Button>
      </ActionContainer>
    </ModelCardContainer>
  );
};

export default ModelCard;
