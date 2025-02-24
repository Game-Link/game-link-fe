import {createStore} from 'zustand/vanilla';
import {useStore} from 'zustand';
import {getLocalStorage, saveLocalStorage} from './local-storage';
import {FIRST_VISIT} from '@src/util';

export interface FirstVisit {
  visited: boolean;
  loading: boolean;
  setVisited: () => void;
}

export const firstVisitedStore = createStore<FirstVisit>(set => {
  const initializeStore = async () => {
    const storedVisited = (await getLocalStorage(FIRST_VISIT)) || false;
    // Explicitly convert the stored value to a boolean.
    set({visited: Boolean(storedVisited), loading: false});
  };

  // Set loading to true during initialization.
  set({loading: true});
  initializeStore();

  return {
    visited: false,
    loading: true,
    setVisited: () => {
      set({visited: true});
      saveLocalStorage(FIRST_VISIT, true);
    },
  };
});

export const useFirstVisitStore = () => useStore(firstVisitedStore);
