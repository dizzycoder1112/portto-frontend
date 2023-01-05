import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import _ from 'lodash';
import getNFTList from './../actions/getNFTListAction';
import useInfiniteScroll from './../hooks/useInfiniteScroll';

type NFTDTO = {
  id: string;
  name: string;
  asset_contract: {
    address: string;
  };
  image_preview_url: string;
  token_id: string;
};

function Root(): JSX.Element {
  const [lists, setLists] = useState([]);
  const [cursor, setCursor] = useState('');
  const fetchData = _.debounce(async () => {
    try {
      if (cursor === null) return;
      const data = await getNFTList(cursor);
      if (data !== undefined) {
        const newList = lists.concat(data.assets);
        setLists(newList);
        setCursor(data.next);
        setIsFetching(false);
      }
    } catch (e) {
      console.error(e);
    }
  }, 1000);
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchData);

  useEffect(() => {
    void fetchData();
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Lists</h1>
      <NFTListWrapper>
        {lists.map((list: NFTDTO) => {
          return (
            <NFT key={list.id}>
              <Link
                to={`/collections/${list.asset_contract.address}/${list.token_id}`}
              >
                <div>
                  <img src={list.image_preview_url} />
                  <p>{list.name ?? `null`}</p>
                </div>
              </Link>
            </NFT>
          );
        })}
      </NFTListWrapper>

      {isFetching && cursor !== null && (
        <CircularProgressWrapper>
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        </CircularProgressWrapper>
      )}
    </div>
  );
}

const NFTListWrapper = styled.div`
  @media screen and (max-width: 768px) {
    width:100%;
  }
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content center;
  align-items: center;
  flex-wrap: wrap;
  align-content: stretch;
  `;

const NFT = styled.div`
  @media screen and (max-width: 768px) {
    img {
      width: 100%;
    }
  }
  display: block;
  width: 550px;
  margin: 5px 5px 5px 5px;
  border-width: 3px;
  border-style: outset;
  border-color: #ada2df;
  padding: 5px;
`;

const CircularProgressWrapper = styled.div`
  margin: 0;
  position: fixed;
  left: 50%;
  bottom: 5%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 50%;
  border-width: 1px;
  border-style: solid;
  border-color: #dddddd;
  padding: 5px;
`;
export default Root;
