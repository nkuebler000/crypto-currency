import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { List, ListItem, SearchBar, ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux';
import appStyles from '../styles/app';
import { getTicker } from '../redux/actions/ticker';
import { Actions } from 'react-native-router-flux';
import icons from '../icons/icons';
import accounting from 'accounting';

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.searchBarOnChangeText = this.searchBarOnChangeText.bind(this);
    this.sortUpdateIndex = this.sortUpdateIndex.bind(this);
    this.sortFn = this.sortFn.bind(this);
    this.state = {
      currencyFilter: null,
      sortSelectedIndex: 0
    };
  }

  componentWillMount(){
    console.log('componentWillMount');
    this.props.dispatch(getTicker());
  }

  searchBarOnChangeText(txt) {
    this.setState({currencyFilter: txt});
  }

  searchBarOnClearText(args) {
    console.log('clear',args);
  }

  sortUpdateIndex (selectedIndex) {
    this.setState({ sortSelectedIndex: selectedIndex });
  }

  sortFn (a,b) {

    let field = 'rank';
    if (this.state.sortSelectedIndex === 1) {
      field = 'name';
    }
    if (this.state.sortSelectedIndex === 2) {
      field = 'symbol';
    }

    var nameA = a[field].toUpperCase(); // ignore upper and lowercase
    var nameB = b[field].toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  }

  render() {
    return (
      <View style={appStyles.container}>
        <SearchBar
          round
          lightTheme
          onChangeText={this.searchBarOnChangeText}
          onClearText={this.searchBarOnClearText}
          placeholder='Filter' />
        <ButtonGroup
          onPress={this.sortUpdateIndex}
          selectedIndex={this.state.sortSelectedIndex}
          buttons={['Sort Rank', 'Sort Name', 'Sort Symbol']}
          containerStyle={{height: 25}}
        />
        <List containerStyle={appStyles.list}>
          <FlatList data={
            this.props.ticker.tickerInfo &&
            this.props.ticker.tickerInfo
              .filter(tickerInfo => {
                if (this.state.currencyFilter !== null) {
                  return tickerInfo.name.startsWith(this.state.currencyFilter) || tickerInfo.symbol.startsWith(this.state.currencyFilter);
                } else {
                  return tickerInfo;
                }
              }).sort(this.sortFn)
          }
            keyExtractor={item => {
              return item.symbol;
            }}
            renderItem={({item}) => {
              let avatar = icons[item.symbol];
              if (!avatar) {
                avatar = icons['default'];
              }
                return (
                  <ListItem
                    roundAvatar
                    title={item.name}
                    subtitle={`Symbol: ${item.symbol} | Price USD: ${accounting.formatMoney(item.price_usd)}`}
                    avatar={avatar}
                    onPress={() => {
                      Actions.detail({item: item, title: item.name});
                    }}
                  />
                );
              }
            }
          />
        </List>

      </View>
    );
  }
}


function mapStateToProps(state) {
  const { ticker } = state;
  return {
    ticker
  }
}

export default connect(mapStateToProps)(Main);