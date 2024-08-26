import {useCallback, useState} from 'react';

export const useCuisines = () => {
  const [cuisines, setCuisines] = useState(Cuisines);

  const toggleCuisine = useCallback((id: number) => {
    setCuisines(prevCuisines => {
      return prevCuisines.map(cuisine => {
        if (cuisine.id === id) {
          return {
            ...cuisine,
            selected: !cuisine.selected,
          };
        }
        return cuisine;
      });
    });
  }, []);

  return {
    cuisines,
    toggleCuisine,
  };
};
const BestCuisine = 'Italian';

export const Cuisines = new Array(20).fill(BestCuisine).map((cuisine, i) => ({
  id: i,
  name: cuisine,
  selected: false,
}));

export const ACTIVE_COLOR = '#EF8E52';
export const INACTIVE_COLOR = '#B3B1B4';
