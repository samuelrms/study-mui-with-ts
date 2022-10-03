import { useCallback, useRef } from "react";

/**
 *
 * @param delay é o temp que faz referencia ao tempo de espera para executar a função, por padrão foi setado com 300ms
 * @debounce é a função responsável por encapsular o atraso com um useCallback e um setTimeout
 */

export const useDebounce = (delay = 300, notDelayInFirstTime = true) => {
  const debouncing = useRef<NodeJS.Timeout>();
  const isFirstTime = useRef<boolean>(notDelayInFirstTime);

  const debounce = useCallback(
    (func: () => void) => {
      if (isFirstTime.current) {
        isFirstTime.current = false;
        func();
      } else {
        if (debouncing.current) {
          clearTimeout(debouncing.current);
        }

        debouncing.current = setTimeout(() => {
          func();
        }, delay);
      }
    },
    [delay],
  );

  return { debounce };
};
