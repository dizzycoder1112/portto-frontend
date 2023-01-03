type Data = {
  name: string;
  image_thumbnail_url: string;
};
type response = {
  next: string | null;
  previous: string | null;
  assets: Data[] | null;
};
// async function getNFTList(cursor: string): Promise<any> {
//   const url = new URL('https://api.opensea.io/api/v1/assets');
//   url.searchParams.set('owner', '0x19818f44faf5a217f619aff0fd487cb2a55cca65');
//   url.searchParams.set('limit', '10');
//   url.searchParams.set('cursor', cursor);
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw Error(response.statusText);
//     }
//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }
async function getNFTList(cursor: string): Promise<any> {
  const url = new URL('https://api.opensea.io/api/v1/assets');
  url.searchParams.set('owner', '0x19818f44faf5a217f619aff0fd487cb2a55cca65');
  url.searchParams.set('limit', '10');
  url.searchParams.set('cursor', cursor);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
export default getNFTList;
