export const REQUEST_TICKER = 'REQUEST_TICKER';
export const RECEIVE_TICKER = 'RECEIVE_TICKER';

function requestTicker() {
  return {
    type: REQUEST_TICKER
  }
}

function receiveTicker(tickerInfo, status) {
  return {
    type: RECEIVE_TICKER,
    tickerInfo,
    status,
    receivedAt: Date.now()
  }
}

export function getTicker() {
  return dispatch => {
    dispatch(requestTicker());
    return fetch(new Request('https://api.coinmarketcap.com/v1/ticker/', {
      method: 'GET'
    })).then(response => {
      if (response.status === 200) {
        response.json().then(json => {
          dispatch(receiveTicker(json),response.status);
        });
      } else {
        dispatch(receiveTicker(null,response.status));
      }
    });
  }
}