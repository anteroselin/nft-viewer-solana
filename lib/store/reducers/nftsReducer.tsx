import { OWNER_PUBLIC_KEY } from "../types";

const INITIAL_STATE = {
  owner_key: "",
}

const nftsReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
      case OWNER_PUBLIC_KEY:
          return {
              ...state,
              owner_key: action.payload
          }
      default:
          return state;
  }
};

export default nftsReducer;
