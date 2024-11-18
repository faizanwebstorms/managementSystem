const initialState = {
  loading: false,
  error: null,
  dealers: null,
  dealer: null,
};

const dealersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DEALERS_REQUEST":
    case "DEALERS_ADD_REQUEST":
      return { ...state, loading: true, error: null };
    case "DEALERS_SUCCESS":
      return { ...state, loading: false, dealers: action.payload };
    case "DEALERS_ADD_SUCCESS":
      return { ...state, loading: false, dealer: action.payload };
    case "DEALERS_FAILURE":
      return { ...state, loading: false, dealers: null, error: action.payload };
    case "DEALERS_ADD_FAILURE":
      return { ...state, loading: false, dealer: null, error: action.payload };
    default:
      return state;
  }
};

export default dealersReducer;
