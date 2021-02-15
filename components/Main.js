import styled from 'styled-components';

const StyledMain = styled.main`
  width: 100%;
`;

export function Main({ children }) {
  return (
    <StyledMain>
      {children}
    </StyledMain>
  )
}
