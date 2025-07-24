import type React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { Button, Input } from '../styles/GlobalStyles';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 1rem;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  margin: 1rem;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.5rem;
  padding: 0.25rem;
  border-radius: 0.25rem;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const DiscountBanner = styled.div`
  background: ${({ theme }) => theme.colors.gradient};
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: white;
`;

const DiscountTitle = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const DiscountText = styled.p`
  font-size: 0.9rem;
  opacity: 0.9;
`;

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await login(email, password);
      onClose();
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>

        <DiscountBanner>
          <DiscountTitle>Surprise benefits!</DiscountTitle>
          <DiscountText>
            Sign up and receive
            <br />
            Get a <strong>20%</strong> discount on your first deposit
          </DiscountText>
        </DiscountBanner>

        <Title>Sign In</Title>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LoginModal;
