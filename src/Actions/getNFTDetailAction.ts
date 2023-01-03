type NFTDetailDTO = {
  contract_address: string;
  token_id: string;
};
async function getNFTDetail(data: NFTDetailDTO): Promise<any> {
  const url = new URL(
    `https://api.opensea.io/api/v1/assets/${data.contract_address}/${data.token_id}`
  );
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
export default getNFTDetail;
