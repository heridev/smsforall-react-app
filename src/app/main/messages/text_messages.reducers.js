import {
  SET_TEXT_MESSAGE_DATA,
  SET_TEXT_MESSAGE_COLLECTION,
  SET_TEXT_MESSAGE_CREATION_AS
} from './text_messages.actions';

const initialState = {
  validationErrors: [],
  textMessageCollection: [],
  textMessageDetails: undefined,
  textMessageCreationStatus: ''
};

const textMessages = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEXT_MESSAGE_CREATION_AS: {
      return {
        ...state,
        textMessageCreationStatus: action.payload
      };
    }
    // case SET_MOBILE_HUB_COLLECTION: {
    //   return {
    //     ...state,
    //     mobileHubCollection: action.payload
    //   };
    // }
    // case SET_MOBILE_HUB_DATA: {
    //   return {
    //     ...state,
    //     mobileHubDetails: action.payload
    //   };
    // }
    default: {
      return state;
    }
  }
};

export default textMessages;
