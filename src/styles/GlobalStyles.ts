import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  #root {
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    border: none;
    outline: none;
    cursor: pointer;
    font-family: inherit;
  }

  input, textarea {
    border: none;
    outline: none;
    font-family: inherit;
  }

  .gradient-text {
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 1rem;
    }
  }
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary'; size?: 'sm' | 'md' | 'lg' }>`
  padding: ${({ size }) =>
    size === 'sm' ? '0.5rem 1rem' :
    size === 'lg' ? '1rem 2rem' :
    '0.75rem 1.5rem'};
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.2s ease;

  ${({ variant, theme }) => variant === 'primary' ? `
    background: ${theme.colors.buttonPrimary};
    color: white;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
    }
  ` : `
    background: transparent;
    color: ${theme.colors.text};
    border: 1px solid ${theme.colors.border};
    &:hover {
      background: ${theme.colors.surface};
    }
  `}
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    /* transform: translateY(-4px); */
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  resize: vertical;
  min-height: 100px;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;
