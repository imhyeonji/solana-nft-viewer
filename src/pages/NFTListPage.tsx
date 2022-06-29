import { useParams } from "react-router-dom";
import styled from "styled-components";
import Search from "../components/common/Search";
import NFTList from "../components/NFT/NFTList";

export default function NFTListPage() {
  const { address } = useParams();

  return (
    <Layout>
      <Header>
        <h2>NFT Viewer</h2>
        <Search />
      </Header>
      {address ? (
        <NFTList address={address} />
      ) : (
        <div style={{ textAlign: "center" }}>provide public key for search</div>
      )}
    </Layout>
  );
}

const Header = styled.div`
  display: flex;
  align-items: center;
  margin: 60px 75px;

  > h2 {
    font-weight: 400;
    font-size: 40px;
    margin: 0 79px 0 0;
  }
`;

const Layout = styled.div`
  max-width: 1800px;
  margin: 0 auto;
`;
