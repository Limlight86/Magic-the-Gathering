import styled from "styled-components";

export const DeckWrapper = styled.main`
  padding: 2rem;
`;

export const CardTypeSection = styled.section``;

export const CardList = styled.ul`
  list-style:none;
  padding: 0;
`;

export const CardLine = styled.li`
  display: flex;
  width: 20rem;
  padding: 0.5rem;
  a{
    flex: 8;
  }
`;

export const CardCount = styled.span`
  flex: 0.5;
`;

export const Cost = styled.div`
  display: flex;
  flex: 3;
  img {
    width: 1rem;
    height: 1rem;
  }
`;
