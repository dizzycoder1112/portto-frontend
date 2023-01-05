import config from './config';

async function getNFTList(cursor: string): Promise<any> {
  const url = new URL(`${config.openseaAPI}/assets`);
  url.searchParams.set('owner', '0x19818f44faf5a217f619aff0fd487cb2a55cca65');
  url.searchParams.set('limit', '20');
  url.searchParams.set('cursor', cursor);
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
export default getNFTList;
