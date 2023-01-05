import config from './config';

type NFTDetailDTO = {
  contractAddress: string | undefined;
  tokenId: string | undefined;
};

async function getNFTDetail(data: NFTDetailDTO): Promise<any> {
  if (data.contractAddress === undefined || data.tokenId === undefined)
    throw Error('params is uncorrect');
  const url = new URL(
    `${config.openseaAPI}/asset/${data.contractAddress}/${data.tokenId}`
  );
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
export default getNFTDetail;
