import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as IconSearch } from "../../assets/icon_search.svg";
import { IconButton } from "./Buttons";

export default function Search() {
  const params = useParams();
  const navigate = useNavigate();
  const [address, setAddress] = useState(params.address || "");

  const handleNavigation = () => navigate(`/nfts/${address.trim()}`);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleNavigation();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <input
        placeholder="search owner public key"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <IconButton onClick={handleNavigation}>
        <SearchIcon />
      </IconButton>
    </Form>
  );
}

const Form = styled.form`
  position: relative;
  width: 100%;
  max-width: 792px;

  > input {
    box-sizing: border-box;
    width: 100%;
    height: 47px;
    border-radius: 10px;
    border: 0.5px solid #000000;
    outline: none;
    padding: 0 20px;
    cursor: text;

    ::placeholder {
      color: #000000;
      font-size: 14px;
    }
  }
`;

const SearchIcon = styled(IconSearch)`
  position: absolute;
  width: 17px;
  top: 13px;
  right: 15px;
  margin: 0;
`;
