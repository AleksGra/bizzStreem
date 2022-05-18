const initialState = { documentLayout: {}, documentDefinition: {} };
const documentInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "mt/documentInfo/SET_DOCUMENT_LAYOUT":
      return {
        ...state,
        documentLayout: action.payload,
      };

    case "mt/documentInfo/SET_DOCUMENT_DATA":
      return {
        ...state,
        documentDefinition: action.payload,
      };
    case "mt/documentInfo/SAVE_DOCUMENT_DATA":
      return {
        ...state,
        documentDefinition: action.payload,
      };

    default:
      return state;
  }
};

export const actions = {
  setDocumentLayout: (layout) => ({
    type: "mt/documentInfo/SET_DOCUMENT_LAYOUT",
    payload: layout,
  }),
  setDocumentData: (data) => ({
    type: "mt/documentInfo/SET_DOCUMENT_DATA",
    payload: data,
  }),
  saveDocumentData: (data) => ({
    type: "mt/documentInfo/SAVE_DOCUMENT_DATA",
    payload: data,
  }),
};
export const setDataRedux = (layout, definition) => {
  return (dispatch) => {
    dispatch(actions.setDocumentLayout(layout));
    dispatch(actions.setDocumentData(definition));
  };
};

export default documentInfoReducer