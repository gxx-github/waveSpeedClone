import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronDown, Globe } from 'lucide-react';

const SwitcherContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const SwitcherButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.border};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    flex-shrink: 0;
  }
`;

const Dropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 160px;
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.75rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  z-index: 1000;
  opacity: ${({ $isOpen }) => $isOpen ? 1 : 0};
  visibility: ${({ $isOpen }) => $isOpen ? 'visible' : 'hidden'};
  transform: ${({ $isOpen }) => $isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.2s ease;
`;

const LanguageOption = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: ${({ $isActive, theme }) => 
    $isActive ? theme.colors.primary + '15' : 'transparent'};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }

  &:first-child {
    border-radius: 0.75rem 0.75rem 0 0;
  }

  &:last-child {
    border-radius: 0 0 0.75rem 0.75rem;
  }
`;

const LanguageFlag = styled.span`
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const LanguageName = styled.span`
  font-weight: 500;
  flex: 1;
`;

const LanguageCode = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 400;
`;

const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, setLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageChange = (languageCode: string) => {
    setLanguage(languageCode as any);
    setIsOpen(false);
  };

  return (
    <SwitcherContainer>
      <SwitcherButton
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe size={16} />
        <LanguageFlag>{currentLang?.flag}</LanguageFlag>
        <LanguageName>{currentLang?.name}</LanguageName>
        <ChevronDown size={14} />
      </SwitcherButton>

      <Dropdown ref={dropdownRef} $isOpen={isOpen}>
        {availableLanguages.map((language) => (
          <LanguageOption
            key={language.code}
            $isActive={language.code === currentLanguage}
            onClick={() => handleLanguageChange(language.code)}
          >
            <LanguageFlag>{language.flag}</LanguageFlag>
            <LanguageName>{language.name}</LanguageName>
            <LanguageCode>{language.code.toUpperCase()}</LanguageCode>
          </LanguageOption>
        ))}
      </Dropdown>
    </SwitcherContainer>
  );
};

export default LanguageSwitcher;
