import styled from 'styled-components';

const Container = styled.section`
  flex: 1;
  display: flex;
  border-radius: 8px;
  background-color: ${(props) => props.bg || props.theme.colors.hover};
  padding: 0.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.fg};
  box-shadow: 0 6px 16px 0 rgba(31, 36, 38, 0.18);
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  width: 100%;
`;
const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.5rem 0;
`;

export const Card =  { Container, Content, Actions };
