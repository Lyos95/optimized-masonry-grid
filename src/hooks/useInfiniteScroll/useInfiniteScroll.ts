import { useEffect, useRef, useCallback } from "react";

interface UseInfiniteScrollProps {
  onLoadMore: () => void;
  rootMargin?: string;
  threshold?: number;
}

const useInfiniteScroll = ({
  onLoadMore,
  rootMargin = "200px",
  threshold = 1.0,
}: UseInfiniteScrollProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      onLoadMore();
    }
  }, [onLoadMore]);

  
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin,
      threshold,
    });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [handleObserver, rootMargin, threshold]);

  return { loadMoreRef };
};

export default useInfiniteScroll;
