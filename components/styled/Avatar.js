import styled from 'styled-components';

export const Avatar = styled.img`
  height: ${props => props.large ? '80px' : '40px'};
  width: ${props => props.large ? '8 0px' : '40px'};
  border-radius: 50%;
`;
