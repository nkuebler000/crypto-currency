import React from 'react';
import Main from './components/Main';
import Detail from './components/Detail';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import { Router, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux';
const RouterWithRedux = connect()(Router);
const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root" backTitle={" "}>
            <Scene key="main" title="Crypto Currency" component={Main} initial={true}/>
            <Scene key="detail" title="Detail" component={Detail} />
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}

