import styled from 'styled-components';

export const Input = styled.input`
  position: relative;
  border: 1px solid #b6bec2;
  border-radius: 4px;
  background-color: #fff;
  padding: 0.5rem 1rem;
  color: #1f2426;
  font-size: 1rem;
  display: inline-block;
  width: 100%;
  height: 2.5rem;

  &:active,
  &:focus {
    outline: 0;
    border-color: #0073b9;
    box-shadow: inset 0 0 0 1px #0073b9;
  }

  &.is-invalid {
    border-color: #cc392f;
    box-shadow: inset 0 0 0 1px #cc392f;
    fill: #cc392f;
  }

  &.is-disabled,
  &:disabled,
  &[readonly] {
    border-color: #d5d9db !important;
    box-shadow: none !important;
    background-color: #f5f7f8 !important;
    cursor: not-allowed !important;
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
    user-select: none !important;
    pointer-events: none !important;
    color: #8e999e !important;
  }
`;
