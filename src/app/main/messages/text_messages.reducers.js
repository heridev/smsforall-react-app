import _ from '@lodash';
import {
  SET_TEXT_MESSAGES_COLLECTION,
  SET_TEXT_MESSAGE_SEARCH,
  SET_TEXT_MESSAGE_SEARCH_PARAMS
} from './text_messages.actions';

const initialState = {
  validationErrors: [],
  textMessageCollection: [],
  textMessageDetails: undefined,
  textMessageCreationStatus: '',
  textSearch: '',
  textSearchParams: {}
};

const textMessages = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEXT_MESSAGE_SEARCH_PARAMS: {
      const newValues = _.merge({}, state.textSearchParams, action.payload);
      return {
        ...state,
        textSearchParams: newValues
      };
    }
    case SET_TEXT_MESSAGE_SEARCH: {
      return {
        ...state,
        textSearch: action.payload
      };
    }
    case SET_TEXT_MESSAGES_COLLECTION: {
      return {
        ...state,
        textMessagesCollection: action.payload
      };
    }
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
