import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import getNFTList from '../../Actions/getNFTListAction';
import useInfiniteScroll from '../../Utils/useInfiniteScroll';

function NFTLists(): JSX.Element {
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
      console.log(e);
    }
  }, 1000);
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchData);

  useEffect(() => {
    void fetchData();
  }, []);

  return (
    <div>
      <h1>Lists</h1>
      <div>
        {lists.map((list: any) => {
          return (
            <div key={list.id}>
              <img src={list.image_preview_url} width={'500px'} />
            </div>
          );
        })}
      </div>
      {isFetching && 'Fetching more list items...'}
    </div>
  );
}

export default NFTLists;
