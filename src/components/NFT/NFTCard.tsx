import React, { useEffect, useState, useCallback, MouseEvent } from "react";
import styled from "styled-components";
import { ReactComponent as IconBookmark } from "../../assets/icon_bookmark.svg";
import { IconButton } from "../common/Buttons";
import { getNFTDetails, shortenAddress } from "../../utils/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  uri: string;
  mintAddress: string;
  bookmark: boolean;
  toggleBookmark: (uri: string, e: MouseEvent<HTMLButtonElement>) => void;
}

function NFTCard({ uri, mintAddress, bookmark, toggleBookmark }: Props) {
  const [nftDetailData, setNftDetailData] =
    useState<Awaited<ReturnType<typeof getNFTDetails>>>();

  const sortable = useSortable({ id: uri });
  const { attributes, listeners, setNodeRef, transform, transition } = sortable;

  useEffect(() => {
    (async () => {
      const data = await getNFTDetails(uri);
      setNftDetailData(data);
    })();
  }, [uri, mintAddress]);

  const handleClickNftCard = useCallback(() => {
    window.open(`https://solscan.io/token/${mintAddress}`);
  }, [mintAddress]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (!nftDetailData) return null;

  const { image, name, creatorAddress } = nftDetailData;

  return (
    <Container
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={handleClickNftCard}
    >
      <IconButton onClick={(e) => toggleBookmark(uri, e)}>
        <BookmarkIcon
          fill={bookmark ? "#FFD233" : "transparent"}
          stroke={bookmark ? "#FFD233" : "white"}
        />
      </IconButton>
      <img src={image} alt={name} />
      <div>
        <div className="title">{name}</div>
        <div className="creator">{`Creator : ${shortenAddress(
          creatorAddress
        )}`}</div>
      </div>
    </Container>
  );
}

export default React.memo(NFTCard);

const Container = styled.div`
  background-color: #c4c4c4;
  border-radius: 15px;
  position: relative;
  cursor: grab;

  > img {
    width: 100%;
    height: 218px;
    border-radius: 15px;
  }

  > div {
    padding: 15px;

    .title {
      padding-bottom: 7px;
      font-weight: 400;
      font-size: 15px;
      line-height: 18px;
    }

    .creator {
      font-size: 12px;
      line-height: 14px;
    }
  }
`;

const BookmarkIcon = styled(IconBookmark)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 12px 10px;
`;
