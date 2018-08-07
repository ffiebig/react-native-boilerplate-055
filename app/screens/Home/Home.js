import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import styles from './styles';
import { connectAlert } from '../../components';
import { connect } from 'react-redux';

class HomeScreen extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.notice.message !== '') {
      this.props.alertWithType(
        nextProps.notice.kind,
        nextProps.notice.title,
        nextProps.notice.message,
      );
    }
  }

  render() {
    return (
      <View style={styles.formContainer}>
        <Text>
          Home
        </Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { notice } = state;
  const { signedIn, headers } = state.auth;
  return {
    notice,
    signedIn,
    headers,
  };
};

export default connect(mapStateToProps)(connectAlert(HomeScreen));
