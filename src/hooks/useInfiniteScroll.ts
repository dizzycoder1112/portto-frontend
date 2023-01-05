import { useState, useEffect } from 'react';

const useInfiniteScroll = (
  callback: _.DebouncedFunc<() => Promise<void>>
): [boolean, (isFetching: boolean) => void] => {
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleIsFetching = (isFetching: boolean): void => {
    setIsFetching(isFetching);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    void callback();
  }, [isFetching]);

  function handleScroll(): void {
    const currentHeight =
      window.innerHeight + document.documentElement.scrollTop;
    const bottomHeight = document.documentElement.offsetHeight;
    if (currentHeight !== bottomHeight) return;
    setIsFetching(true);
  }

  return [isFetching, handleIsFetching];
};

export default useInfiniteScroll;
