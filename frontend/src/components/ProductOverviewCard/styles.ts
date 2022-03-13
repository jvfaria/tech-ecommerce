import styled from 'styled-components';

export const ProductOverviewPriceSpan = styled.span`
  font-weight: 600;
  color: #FF8E3D;
  font-size: 3.2rem;
`;

export const ProductOverviewContainer = styled('div')`
  max-width: 80%;
  height: 110vh;
  margin: 0 auto;

  @media screen and (max-width: 600px) {
    max-width: 100%;
  }
`;
