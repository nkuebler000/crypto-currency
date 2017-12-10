
import { REQUEST_TICKER,RECEIVE_TICKER } from '../actions/ticker';

function ticker(state={
  isFetching: false
},action){
  switch (action.type) {
    case REQUEST_TICKER:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_TICKER:
      return Object.assign({}, state, {
        isFetching: false,
        tickerInfo: action.tickerInfo,
        status: action.status,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

export default ticker;