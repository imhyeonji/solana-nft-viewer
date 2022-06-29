import styled from "styled-components";
import NFTCard from "./NFTCard";
import { Button, RedButton } from "../common/Buttons";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useMemo, useState, useCallback, MouseEvent } from "react";
import {
  changeOrderByBlockTime,
  getTokenMetadata,
  getTransactionInfo,
} from "../../utils/utils";
import DraggableContext from "./DraggableContext";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

export type SortingType = "lastTransaction" | "createdAt";

export type NFTData = {
  uri: string;
  mint: string;
  transactionInfo: { lastTransaction: number; createdAt: number };
};

interface Props {
  address: string;
}

export default function NFTList({ address }: Props) {
  const [data, setData] = useState<Array<NFTData>>([]);
  const [sortingType, setSortingType] =
    useState<SortingType>("lastTransaction");
  const [changeHistory, setChangeHistory] = useState<Array<Array<number>>>([]);
  const [bookmarks, setBookmarks] = useState<Array<string>>([]);

  const publicKey = useMemo(() => new PublicKey(address), [address]);

  useEffect(() => {
    const data = localStorage.getItem(address);

    if (!data) return;

    const { sortingType, bookmarks } = JSON.parse(data);
    setSortingType(sortingType);
    setBookmarks(bookmarks);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      const nftMetaDataData = await getTokenMetadata(publicKey);

      // set data without transaction information for initial render
      setData(nftMetaDataData);

      const promises = nftMetaDataData.map(async (nftMetaData) => {
        const info = await getTransactionInfo(nftMetaData.mint);

        return {
          ...nftMetaData,
          transactionInfo: info,
        };
      });

      Promise.all(promises).then((data) =>
        setData(changeOrderByBlockTime(data, "lastTransaction"))
      );
    })();
  }, [publicKey]);

  useEffect(() => {
    setData((prev) => changeOrderByBlockTime(prev, sortingType));
  }, [sortingType]);

  useEffect(() => {
    setChangeHistory([]);
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem(address, JSON.stringify({ sortingType, bookmarks }));
  }, [sortingType, bookmarks, address]);

  const clearAllBookmarks = useCallback(() => {
    setBookmarks([]);
  }, []);

  const toggleBookmark = useCallback(
    (uri: string, e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      setBookmarks((prev) => {
        if (prev.includes(uri)) {
          return prev.filter((item) => item !== uri);
        } else {
          return [...prev, uri];
        }
      });
    },
    []
  );

  const prioritizeBookmarkedData = useCallback(
    (data: Array<NFTData>) => {
      const [bookmarkedList, rest] = data.reduce<Array<Array<NFTData>>>(
        (result, data) => {
          bookmarks.includes(data.uri)
            ? result[0].push(data)
            : result[1].push(data);
          return result;
        },
        [[], []]
      );

      return [...bookmarkedList, ...rest];
    },
    [bookmarks]
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setData((prev) => {
        const oldIndex = prev.findIndex((i) => i.uri === active.id);
        const newIndex = prev.findIndex((i) => i.uri === over.id);

        setChangeHistory((prev) => [...prev.slice(-3), [oldIndex, newIndex]]);

        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }, []);

  const popChangeHistory = () => {
    setData((prev) => {
      return arrayMove(
        prev,
        changeHistory[changeHistory.length - 1][0],
        changeHistory[changeHistory.length - 1][1]
      );
    });

    setChangeHistory((prev) => prev.slice(0, -1));
  };

  return (
    <Container>
      <Buttons>
        <div>
          <Button
            onClick={() => setSortingType("lastTransaction")}
            selected={sortingType === "lastTransaction"}
          >
            Last transaction time
          </Button>
          <Button
            onClick={() => setSortingType("createdAt")}
            selected={sortingType === "createdAt"}
          >
            Last creation time
          </Button>
        </div>
        <div>
          {!!changeHistory.length && (
            <Button onClick={popChangeHistory}>Undo changes</Button>
          )}
          <RedButton onClick={clearAllBookmarks}>Clear bookmark</RedButton>
        </div>
      </Buttons>

      <DraggableContext
        items={data.map((item) => item.uri)}
        onDragEnd={handleDragEnd}
      >
        <Grid>
          {prioritizeBookmarkedData(data).map(({ uri, mint }) => {
            return (
              <NFTCard
                uri={uri}
                mintAddress={mint}
                bookmark={bookmarks.includes(uri)}
                toggleBookmark={toggleBookmark}
                key={mint}
              />
            );
          })}
        </Grid>
      </DraggableContext>
    </Container>
  );
}

const Container = styled.div`
  padding: 0 97px;
`;

const Grid = styled.div`
  margin: 73px 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-gap: 2rem;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    > button:first-child {
      margin-right: 25px;
    }
  }
`;
