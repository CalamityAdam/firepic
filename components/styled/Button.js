import styled from 'styled-components';

export const Button = styled.button`
  display: -webkit-inline-box;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  flex-shrink: 0;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-transition: background-color 0.3s cubic-bezier(0.19, 1, 0.22, 1),
    border-color 0.3s cubic-bezier(0.19, 1, 0.22, 1),
    color 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  transition: background-color 0.3s cubic-bezier(0.19, 1, 0.22, 1),
    border-color 0.3s cubic-bezier(0.19, 1, 0.22, 1),
    color 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  border: 2px solid transparent;
  border-radius: 4px;
  box-shadow: none;
  cursor: pointer;
  padding: 0.375rem 1rem;
  width: auto;
  text-align: center;
  text-decoration: none;
  line-height: 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  word-break: break-word;
  background-color: ${({ theme }) => theme.colors.teal};
  color: ${({ theme }) => theme.colors.bg};

  &:focus,
  &:hover {
    background-color: ${({ theme }) => theme.colors.blueActive};
    color: ${({ theme }) => theme.colors.fg};
  }

  &--ghost {
    border-color: currentColor;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.teal};
  }

  &--ghost:focus,
  &--ghost:hover {
    background-color: rgba(0, 115, 185, 0.1);
    color: #0091d9;
  }

  &--borderless {
    -webkit-transition: color 0.3s ease, box-shadow 0.3s ease;
    transition: color 0.3s ease, box-shadow 0.3s ease;
    border-radius: 0;
    box-shadow: 0 2px 0 transparent;
    background-color: transparent;
    padding: 0;
    height: auto;
    color: ${({ theme }) => theme.colors.teal};
  }

  &--borderless:focus,
  &--borderless:hover {
    box-shadow: 0 2px 0 currentColor;
    background-color: transparent;
    color: #047;
  }

  &.is-disabled {
    pointer-events: none !important;
  }

  &.is-disabled,
  &[disabled] {
    background-color: ${({theme}) => theme.colors.bgDisabled} !important;
    cursor: not-allowed !important;
    color: #8e999e !important;
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
    user-select: none !important;
  }
`;
