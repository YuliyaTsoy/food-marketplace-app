import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    // Returns a copy of state with an updated products array. We use the action.products property and spread it's contents into the new array.
    case UPDATE_PRODUCTS:
      return { ...state, products: [action.products] };

    // Returns a copy of state with an updated categories array.
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    // Returns a copy of state with the new category
    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };

    // Return the state as is in the event that the `action.type` passed to our reducer was not accounted for by the developers
    default:
      return state;
  }
};
