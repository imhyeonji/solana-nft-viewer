import styled from "styled-components";
import Search from "../components/common/Search";

export default function MainPage() {
  return (
    <Layout>
      <Header>NFT Viewer</Header>
      <Search />
    </Layout>
  );
}

const Header = styled.h1`
  font-weight: 400;
  font-size: 56px;
  line-height: 66px;
  margin-bottom: 71px;
`;

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
`;
