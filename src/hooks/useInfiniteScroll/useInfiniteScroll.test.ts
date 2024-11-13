import { renderHook, act } from "@testing-library/react";
import useInfiniteScroll from "./useInfiniteScroll";
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from "vitest";
describe("useInfiniteScroll", () => {
  let observeMock: ReturnType<typeof vi.fn>;
  let disconnectMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    observeMock = vi.fn();
    disconnectMock = vi.fn();
    window.IntersectionObserver = vi.fn(function (this: IntersectionObserver) {
      this.observe = observeMock;
      this.disconnect = disconnectMock;
    }) as unknown as {
      new (
        callback: IntersectionObserverCallback,
        options?: IntersectionObserverInit
      ): IntersectionObserver;
      prototype: IntersectionObserver;
    };
    window.IntersectionObserver.prototype = {
      observe: observeMock,
      disconnect: disconnectMock,
      root: null,
      rootMargin: "",
      thresholds: [],
      takeRecords: vi.fn(),
      unobserve: vi.fn(),
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return a ref for the target element", () => {
    const { result } = renderHook(() =>
      useInfiniteScroll({ onLoadMore: vi.fn() })
    );

    expect(result.current.loadMoreRef).toBeDefined();
    expect(result.current.loadMoreRef.current).toBeNull();
  });

  it("should set up the IntersectionObserver with the provided options", () => {
    const rootMargin = "100px";
    const threshold = 0.5;

    renderHook(() =>
      useInfiniteScroll({
        onLoadMore: vi.fn(),
        rootMargin,
        threshold,
      })
    );

    expect(window.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        root: null,
        rootMargin,
        threshold,
      }
    );
  });

  it("should call onLoadMore when the target element intersects", () => {
    const onLoadMoreMock = vi.fn();
    renderHook(() => useInfiniteScroll({ onLoadMore: onLoadMoreMock }));

    // Trigger the IntersectionObserver callback
    const handleObserver = (window.IntersectionObserver as Mock).mock
      .calls[0][0];
    act(() => {
      handleObserver([{ isIntersecting: true }]);
    });

    expect(onLoadMoreMock).toHaveBeenCalledTimes(1);
  });

  it("should disconnect the observer on unmount", () => {
    const { unmount } = renderHook(() =>
      useInfiniteScroll({ onLoadMore: vi.fn() })
    );

    unmount();
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });
});
