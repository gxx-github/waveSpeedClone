import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Button, Input } from '../styles/GlobalStyles';
import LoginModal from './LoginModal';

const HeaderContainer = styled.header<{ $scrolled?: boolean }>`
  background: ${({ theme, $scrolled }) => 
    $scrolled ? theme.colors.cardBackground : theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  backdrop-filter: ${({ $scrolled }) => $scrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${({ $scrolled }) => 
    $scrolled ? '0 2px 20px rgba(0, 0, 0, 0.1)' : 'none'};
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
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

const Dropdown = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  width: 260px;
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.75rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.12);
  overflow: hidden;
  z-index: 1000;
`;

const DropHeader = styled.div`
  padding: 0.75rem 1rem 0.5rem;
`;

const Badge = styled.span`
  background: #f97316;
  color: white;
  border-radius: 999px;
  padding: 0.1rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
`;

const SmallText = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const MenuList = styled.div`
  padding: 0.25rem;
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.6rem 0.75rem;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.text};

  &:hover { background: ${({ theme }) => theme.colors.surface}; }
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.6rem 0.75rem;
  border-radius: 0.5rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};

  &:hover { background: ${({ theme }) => theme.colors.surface}; }
`;

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin: 0.25rem 0;
`;

const Header: React.FC = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const { user, logout, isAuthenticated, fetchUserInfo } = useAuth();
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (menuRef.current.contains(e.target as Node)) return;
      setOpen(false);
    };
    if (open) document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [open]);

  // 滚动监听
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 获取用户信息
  useEffect(() => {
    if (isAuthenticated && !user) {
      fetchUserInfo().catch(console.error);
    }
  }, [isAuthenticated, user, fetchUserInfo]);

  return (
    <>
      <HeaderContainer $scrolled={scrolled}>
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
            <NavLink to="/dashboard" $active={isActive('/dashboard') || location.pathname.startsWith('/dashboard/')}>
              Dashboard
            </NavLink>
            <NavLink to="/models" $active={isActive('/models')}>
              Explore
            </NavLink>
            <NavLink to="/api-keys" $active={isActive('/api-keys')}>
              API Keys
            </NavLink>
            <NavLink to="/billing" $active={isActive('/billing')}>
              Billing
            </NavLink>
            <a href="/docs/docs" target="_blank" rel="noopener noreferrer" style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              fontWeight: 500,
              color: isActive('/docs') ? (theme.colors.primary) : (theme.colors.textSecondary),
            }}>
              Doc
            </a>
          
          </Nav>

          <RightSection>
            <ThemeToggle onClick={toggleTheme}>
              {isDark ? '☀️' : '🌙'}
            </ThemeToggle>

            {isAuthenticated ? (
              <UserMenu ref={menuRef}>
                <button onClick={() => setOpen((v) => !v)} style={{ background: 'transparent' }}>
                  <Avatar>{(user?.name || user?.email || 'U').toString().charAt(0).toUpperCase()}</Avatar>
                </button>
                {open && (
                  <Dropdown>
                    <DropHeader>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <strong>{user?.name || user?.email}</strong>
                      </div>
                      {/* <SmallText>{user?.email ?? 'user@example.com'}</SmallText> */}
                      <div style={{ marginTop: '0.5rem', fontWeight: 700 }}>$ {user?.price?.toFixed(2) ?? '0.00'} available</div>
                    </DropHeader>
                    <Divider />
                    <MenuList>
                      <MenuItem to="/billing">Billing</MenuItem>
                      <MenuItem to="/api-keys">API Keys</MenuItem>
                      {/* <MenuButton onClick={() => setOpen(false)}>Create Team</MenuButton>
                      <MenuButton onClick={() => setOpen(false)}>My Inspiration</MenuButton>
                      <MenuButton onClick={() => setOpen(false)}>Support</MenuButton> */}
                      <MenuButton onClick={() => { toggleTheme(); setOpen(false); }}>
                        <span>Theme</span>
                        <span>{isDark ? 'Dark' : 'Light'}</span>
                      </MenuButton>
                      <Divider />
                      <MenuButton onClick={() => { setOpen(false); logout(); }}>Sign out</MenuButton>
                    </MenuList>
                  </Dropdown>
                )}
              </UserMenu>
            ) : (
              <Link to="/login">
                <Button variant="primary" size="sm">Sign In</Button>
              </Link>
            )}
          </RightSection>
        </HeaderContent>
      </HeaderContainer>

      {/* Modal login removed; using /login route */}
    </>
  );
};

export default Header;
