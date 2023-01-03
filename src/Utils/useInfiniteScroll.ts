import { useState, useEffect } from 'react';

const useInfiniteScroll = (
  callback: _.DebouncedFunc<() => Promise<void>>
): readonly [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching ?? false) return;
    void callback();
  }, [isFetching]);

  function handleScroll(): void {
    const currentHeight =
      window.innerHeight + document.documentElement.scrollTop;
    const bottomHeight = document.documentElement.offsetHeight;
    if (currentHeight !== bottomHeight) return;
    setIsFetching(true);
  }

  return [isFetching, setIsFetching] as const;
};

export default useInfiniteScroll;
