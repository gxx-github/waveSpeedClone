import type React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BarChart3, Circle } from 'lucide-react';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 3rem 0 1rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FooterTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background: ${({ theme }) => theme.colors.gradient};
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FooterMain = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.5rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ExternalLink = styled.a`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.5rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FooterBottom = styled.div`
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterTop>
          <FooterLogo>
            <LogoIcon>
              <IconWrapper>
                <BarChart3 size={20} />
              </IconWrapper>
            </LogoIcon>
            WaveSpeedAI
          </FooterLogo>

          <StatusIndicator>
            <StatusDot>
              <Circle size={4} fill="currentColor" />
            </StatusDot>
            All services are online
          </StatusIndicator>
        </FooterTop>

        <FooterMain>
          <FooterSection>
            <SectionTitle>Navigation</SectionTitle>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/models">Explore</FooterLink>
            <FooterLink to="/api-keys">API Keys</FooterLink>
          </FooterSection>

          <FooterSection>
            {/* <SectionTitle>Resources</SectionTitle>
            <ExternalLink href="/docs">Documentation</ExternalLink> */}
            {/* <ExternalLink href="/blog">Blog</ExternalLink>
            <SectionTitle style={{ marginTop: '1rem' }}>Github</SectionTitle>
            <ExternalLink href="https://github.com/WaveSpeedAI/agent-mcp-lab">Agent MCP Lab</ExternalLink>
            <ExternalLink href="https://github.com/WaveSpeedAI/mcp-server">MCP Server</ExternalLink> */}
          </FooterSection>

          <FooterSection>
            <SectionTitle>Contact</SectionTitle>
            <ExternalLink href="mailto:support@wavespeed.ai">support@wavespeed.ai</ExternalLink>
          </FooterSection>

          {/* <FooterSection>
            <SectionTitle>Models</SectionTitle>
            <FooterLink to="/collections/bytedance">Seedance 1.0</FooterLink>
            <FooterLink to="/collections/wan">Wan 2.1</FooterLink>
            <FooterLink to="/collections/flux">FLUX 1.0</FooterLink>
            <FooterLink to="/collections/kling">KLING</FooterLink>
            <FooterLink to="/collections/minimax">Hailuo 02</FooterLink>
          </FooterSection> */}
        </FooterMain>

        <FooterBottom>
          © 2025 WaveSpeedAI. All Rights Reserved.{' '}
          <Link to="">Terms of Service</Link> and{' '}
          <Link to="">Privacy Policy</Link>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
