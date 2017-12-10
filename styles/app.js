import { StyleSheet } from 'react-native';

const appStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  list: {
    marginTop: -1
  },
  detailMainView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  detailSubView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  detailSubViewTop: {
    marginTop: 40
  },
  detailSubViewTopImage: {
    height: 150
  }
});

export default appStyles;