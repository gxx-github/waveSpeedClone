import type React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Button, Input } from '../styles/GlobalStyles';
import LoginModal from './LoginModal';

const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};

  &:hover {
    opacity: 0.8;
  }
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

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  color: ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.textSecondary};
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
  }
`;

const SearchContainer = styled.div`
  position: relative;
  max-width: 300px;
  flex: 1;
  margin: 0 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchInput = styled(Input)`
  padding-left: 2.5rem;

  &::placeholder {
    font-size: 0.9rem;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ThemeToggle = styled.button`
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.border};
  }
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
`;

const Header: React.FC = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <Logo to="/">
            <LogoIcon>W</LogoIcon>
            WaveSpeedAI
          </Logo>

          <SearchContainer>
            <SearchIcon>🔍</SearchIcon>
            <SearchInput placeholder="Search models..." />
          </SearchContainer>

          <Nav>
            <NavLink to="/models" $active={isActive('/models')}>
              Explore
            </NavLink>
            <NavLink to="/docs" $active={isActive('/docs')}>
              Doc
            </NavLink>
            <NavLink to="/blog" $active={isActive('/blog')}>
              Blog
            </NavLink>
            <NavLink to="/creators" $active={isActive('/creators')}>
              Creators
            </NavLink>
          </Nav>

          <RightSection>
            <ThemeToggle onClick={toggleTheme}>
              {isDark ? '☀️' : '🌙'}
            </ThemeToggle>

            {isAuthenticated ? (
              <UserMenu>
                <NavLink to="/dashboard" $active={isActive('/dashboard')}>
                  Dashboard
                </NavLink>
                <UserInfo>
                  <Avatar>{user?.name.charAt(0).toUpperCase()}</Avatar>
                  <span>{user?.name}</span>
                </UserInfo>
                <Button variant="secondary" size="sm" onClick={logout}>
                  Logout
                </Button>
              </UserMenu>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowLoginModal(true)}
              >
                Sign In
              </Button>
            )}
          </RightSection>
        </HeaderContent>
      </HeaderContainer>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </>
  );
};

export default Header;
