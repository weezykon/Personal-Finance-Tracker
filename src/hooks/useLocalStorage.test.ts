import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage', () => {
  const testKey = 'testKey';
  const initialValue = 'initial';
  const newValue = 'new';

  beforeEach(() => {
    // Clear localStorage before each test
    window.localStorage.clear();
    // Mock localStorage methods
    vi.spyOn(window.localStorage, 'setItem');
    vi.spyOn(window.localStorage, 'getItem');
    vi.spyOn(window.localStorage, 'removeItem');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return the initial value if nothing is in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage(testKey, initialValue));
    expect(result.current[0]).toBe(initialValue);
    expect(window.localStorage.getItem).toHaveBeenCalledWith(testKey);
  });

  it('should return the value from localStorage if present', () => {
    window.localStorage.setItem(testKey, JSON.stringify(newValue));
    const { result } = renderHook(() => useLocalStorage(testKey, initialValue));
    expect(result.current[0]).toBe(newValue);
    expect(window.localStorage.getItem).toHaveBeenCalledWith(testKey);
  });

  it('should update the value in localStorage when setValue is called', () => {
    const { result } = renderHook(() => useLocalStorage(testKey, initialValue));

    act(() => {
      result.current[1](newValue);
    });

    expect(result.current[0]).toBe(newValue);
    expect(window.localStorage.setItem).toHaveBeenCalledWith(testKey, JSON.stringify(newValue));
  });

  it('should handle a function passed to setValue', () => {
    const { result } = renderHook(() => useLocalStorage(testKey, 0));

    act(() => {
      result.current[1](prev => prev + 1);
    });

    expect(result.current[0]).toBe(1);
    expect(window.localStorage.setItem).toHaveBeenCalledWith(testKey, JSON.stringify(1));
  });

  it('should return initial value if localStorage.getItem throws an error', () => {
    vi.spyOn(window.localStorage, 'getItem').mockImplementation(() => {
      throw new Error('localStorage error');
    });
    const { result } = renderHook(() => useLocalStorage(testKey, initialValue));
    expect(result.current[0]).toBe(initialValue);
  });

  it('should not throw an error if localStorage.setItem throws an error', () => {
    vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
      throw new Error('localStorage error');
    });
    const { result } = renderHook(() => useLocalStorage(testKey, initialValue));
    
    expect(() => {
      act(() => {
        result.current[1](newValue);
      });
    }).not.toThrow();
    expect(result.current[0]).toBe(newValue); // State should still update
  });
});
