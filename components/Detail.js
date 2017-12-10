import React from 'react';
import appStyles from '../styles/app';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { Col, Row, Grid } from "react-native-easy-grid";
import accounting from 'accounting';
import { Ionicons } from '@expo/vector-icons';
import icons from '../icons/icons';
import moment from 'moment';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.formatPriceBTC = this.formatPriceBTC.bind(this);
    this.getChangeIcon = this.getChangeIcon.bind(this);

  }

  componentWillMount(){

  }

  formatPriceBTC(price) {
    let precision = 2;
    let val = accounting.toFixed(price, precision);
    while (val == 0) {
      precision++;
      val = accounting.toFixed(price, precision);
      if (precision === 10) break;
    }
    return val;
  }

  getChangeIcon(change) {
    if (change < 0) {
      return (
        <Ionicons name="md-arrow-dropdown" size={16} color="red" />
      );
    }
    return (
      <Ionicons name="md-arrow-dropup" size={16} color="green" />
    );
  }

  render() {
    let change1h = Number(this.props.item['percent_change_1h']);
    let change24h = Number(this.props.item['percent_change24h']);
    let change7d = Number(this.props.item['percent_change_7d']);

    let lastUpdated = moment(new Date(
      Number(this.props.item['last_updated']) * 1000
    ));

    let avatar = icons[this.props.item.symbol];
    if (!avatar) {
      avatar = icons['default'];
    }

    return(
      <View style={appStyles.detailMainView}>
        <View style={[appStyles.detailSubView, appStyles.detailSubViewTop]}>
          <View style={{ width: 200, height: 200}}>
            <Image source={avatar} style={{
              flex: 1,
              alignSelf: 'stretch',
              width: undefined,
              height: undefined
            }} />
          </View>
        </View>
        <View style={appStyles.detailSubView}>
          <View style={{flex: 1}}/>
          <Grid style={{flex: 12}}>
            <Col size={3}>
              <Row style={{ height: 22 }}>
                <Text>Price USD</Text>
              </Row>
              <Row style={{ height: 22 }}>
                <Text>Price BTC</Text>
              </Row>
              <Row style={{ height: 22 }}>
                <Text>24 Hour Volume USD</Text>
              </Row>
              <Row style={{ height: 22 }}>
                <Text>Market Cap USD</Text>
              </Row>
              <Row style={{ height: 22 }}>
                <Text>Available Supply</Text>
              </Row>
              <Row style={{ height: 22 }}>
                <Text>Total Supply</Text>
              </Row>
              <Row style={{ height: 22 }}>
                <Text>Percent Change 1 hour</Text>
              </Row>
              <Row style={{ height: 22 }}>
                <Text>Percent Change 24 hours</Text>
              </Row>
              <Row style={{ height: 22 }}>
                <Text>Percent Change 7 days</Text>
              </Row>
              <Row style={{ height: 22 }}>
                <Text>Last Updated</Text>
              </Row>
            </Col>
            <Col size={2}>
              <Row style={{ height: 22 }}>
                <Text>{accounting.formatMoney(this.props.item.price_usd)}</Text>
              </Row>
              <Row style={{ height: 22 }}>
                <Text>{this.formatPriceBTC(this.props.item.price_btc)} BTC</Text>
              </Row>
              <Row style={{ height: 22 }}>
                <Text>{accounting.formatMoney(this.props.item['24h_volume_usd'] / 1000000)} MM</Text>
              </Row>
              <Row style={{ height: 22 }}>
                <Text>{accounting.formatMoney(this.props.item['market_cap_usd'] / 1000000)} MM</Text>
              </Row>
              <Row style={{ height: 22 }}>
                <Text>{accounting.formatNumber(this.props.item['available_supply'] / 1000000, 2)} MM</Text>
              </Row>
              <Row style={{ height: 22 }}>
                <Text>{accounting.formatNumber(this.props.item['total_supply'] / 1000000, 2)} MM</Text>
              </Row>
              <Row style={{ height: 22 }}>
                <Text>{this.getChangeIcon(change1h)}{accounting.formatNumber(Math.abs(change1h), 2)}</Text>
              </Row>
              <Row style={{ height: 22 }}>
                <Text>{this.getChangeIcon(change24h)}{accounting.formatNumber(Math.abs(change7d), 2)}</Text>
              </Row>
              <Row style={{ height: 22 }}>
                <Text>{this.getChangeIcon(change7d)}{accounting.formatNumber(Math.abs(change7d), 2)}</Text>
              </Row>
              <Row style={{ height: 22 }}>
                <Text>{lastUpdated.fromNow()}</Text>
              </Row>
            </Col>
          </Grid>
          <View style={{flex: 1}}/>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { tickerDetails } = state;
  return {
    tickerDetails
  }
}

export default connect(mapStateToProps)(Detail);