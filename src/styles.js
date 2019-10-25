import styled from "styled-components";
import { Card, List } from "antd";

export const Body = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const MovieList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export const MovieItem = styled.li`
  list-style-type: none;
  margin-top: 20px;
`;

export const MovieCard = styled(Card)``;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const ModalContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

export const Title = styled.h1`
  align-self: center;
`;

export const ComparisonList = styled(List)`
  overflow: scroll;
  max-height: 50vh;
`;
