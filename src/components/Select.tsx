import React from 'react';
import styled from 'styled-components';

type Option = { value: string; label: string };

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  disabled?: boolean;
  placeholder?: string;
  width?: string | number;
}

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Trigger = styled.button<{ $disabled?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
`;

const Label = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Chevron = styled.span`
  margin-left: 0.5rem;
`;

const Menu = styled.div`
  position: absolute;
  left: 0;
  top: calc(100% + 4px);
  min-width: 100%;
  max-height: 260px;
  overflow: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  z-index: 1000; /* below trigger, not covering */
`;

const Item = styled.button<{ $active?: boolean }>`
  width: 100%;
  text-align: left;
  padding: 0.5rem 0.75rem;
  background: ${({ $active, theme }) => ($active ? theme.colors.primary + '15' : 'transparent')};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.primary + '10'};
  }
`;

export const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange, options, disabled, placeholder, width }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const selected = options.find(o => o.value === value);

  React.useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  return (
    <Wrapper ref={ref} style={{ width }}>
      <Trigger
        type="button"
        onClick={() => !disabled && setOpen(o => !o)}
        $disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Label>{selected ? selected.label : (placeholder || 'Select')}</Label>
        <Chevron>▾</Chevron>
      </Trigger>
      {open && !disabled && (
        <Menu role="listbox">
          {options.map(opt => (
            <Item
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              $active={opt.value === value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </Item>
          ))}
        </Menu>
      )}
    </Wrapper>
  );
};

export default CustomSelect;


