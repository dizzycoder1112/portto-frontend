import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import getNFTDetail from './../actions/getNFTDetailAction';

type NFTDetailDTO = {
  image_url: string;
  name: string;
  collection: { name: string };
  description: string;
  permalink: string;
};

function NFTDetail(): JSX.Element {
  const navigate = useNavigate();
  const { contractAddress, tokenId } = useParams();
  const [NFT, setNFT] = useState<NFTDetailDTO>();

  const fetchData = async (): Promise<void> => {
    try {
      const data = await getNFTDetail({ contractAddress, tokenId });
      if (data !== undefined) {
        setNFT(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    void fetchData();
  }, [contractAddress, tokenId]);

  const handleLink = (src: string | undefined): void => {
    if (src === undefined) return;
    window.location.href = src;
  };

  return (
    <NFTWrapper>
      <div>
        <BackBtnWrapper>
          <span onClick={() => navigate(-1)}>
            <img src={String(process.env.PUBLIC_URL) + '/left_arrow.svg'} />
          </span>
        </BackBtnWrapper>
        <h3>{NFT?.collection.name}</h3>
      </div>
      <img src={NFT?.image_url} />
      <ContentWrapper>
        <h4>{NFT?.name}</h4>
        <DescriptionWrapper>{NFT?.description}</DescriptionWrapper>
      </ContentWrapper>

      <PermalLinkBtnWrapper>
        <button onClick={() => handleLink(NFT?.permalink)}>permalink</button>
      </PermalLinkBtnWrapper>
    </NFTWrapper>
  );
}

const NFTWrapper = styled.div`
  @media screen and (max-width: 768px) {
    width: 100%;
    img {
      width: 100%;
    }
  }
  position: relative;
  display: block;
  width: 550px;
  text-align: center;
  margin: 0 auto;
  border-width: 3px;
  border-style: outset;
  border-color: #ada2df;
  padding: 5px;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  width: 100%;
`;

const PermalLinkBtnWrapper = styled.div`
  position: absolute;
  width: inherit;
  bottom: 0;
  right: 0;
  margin: 0;
  position: fixed;
  left: 50%;
  bottom: 5%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  button {
    align-items: center;
    appearance: none;
    background-color: #fff;
    border-radius: 24px;
    border-style: none;
    box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px,
      rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;
    box-sizing: border-box;
    color: #3c4043;
    cursor: pointer;
    display: inline-flex;
    fill: currentcolor;
    font-family: 'Google Sans', Roboto, Arial, sans-serif;
    font-size: 14px;
    font-weight: 500;
    height: 48px;
    justify-content: center;
    letter-spacing: 0.25px;
    line-height: normal;
    max-width: 100%;
    overflow: visible;
    padding: 2px 24px;
    position: relative;
    text-align: center;
    text-transform: none;
    transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),
      opacity 15ms linear 30ms, transform 270ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    width: 80%;
    will-change: transform, opacity;
    z-index: 0;
  }
`;

const DescriptionWrapper = styled.p`
  word-break: break-all;
  white-space: normal;
`;
const BackBtnWrapper = styled.div`
  position: absolute;
  width: 20px;
  span {
    width: 100%;
    img {
      width: 100%;
    }
  }
`;

export default NFTDetail;
