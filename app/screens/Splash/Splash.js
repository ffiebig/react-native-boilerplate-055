import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, AsyncStorage, View } from 'react-native';
import { restoreAuthInfo, validateToken } from '../../actions/auth';
import { MainLogo } from '../../components';
import styles from './styles';
import { connect } from 'react-redux';

class SplashScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.bootstrapAsync();
  }

  componentWillReceiveProps(nextProps) {
    this.navigate(nextProps);
  }

  navigate = (nextProps) => {
    if (nextProps.navigateTo !== null) {
      this.props.navigation.navigate(nextProps.navigateTo);
    }
  };

  // Fetch the token from storage then navigate into correct navigator
  bootstrapAsync = async () => {
    const accessToken = await AsyncStorage.getItem('access-token');
    const client = await AsyncStorage.getItem('client');
    const expiry = await AsyncStorage.getItem('expiry');
    const tokenType = await AsyncStorage.getItem('token-type');
    const uid = await AsyncStorage.getItem('uid');
    if (accessToken && client && expiry && tokenType && uid) {
      this.props.dispatch(restoreAuthInfo({
        accessToken,
        client,
        expiry,
        tokenType,
        uid,
      }));
      this.props.dispatch(validateToken());
    } else {
      this.props.navigation.navigate('Auth');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <MainLogo />
        <ActivityIndicator />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { signedIn, navigateTo } = state.auth;
  return { signedIn, navigateTo };
};

export default connect(mapStateToProps)(SplashScreen);
