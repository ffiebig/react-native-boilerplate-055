import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import { View, Text } from 'react-native';
import { requestSignOut } from '../../actions/auth';
import { connectAlert, DefaultButton } from '../../components';
import { connect } from 'react-redux';

class ProfileScreen extends React.Component {
  static propTypes = {
    alertWithType: PropTypes.func,
    notice: PropTypes.shape({
      title: PropTypes.string,
      kind: PropTypes.string,
      message: PropTypes.string,
    }),
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.shape({
      email: PropTypes.string,
    }),
  };

  static defaultProps = {
    alertWithType: null,
    notice: {
      title: '',
      kind: '',
      message: '',
    },
    user: {
      email: '',
    },
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.notice.message !== '') {
      this.props.alertWithType(
        nextProps.notice.kind,
        nextProps.notice.title,
        nextProps.notice.message,
      );
    }
  }

  signOut = () => {
    this.props.dispatch(requestSignOut());
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.user.email}</Text>
        <DefaultButton title="CERRAR SESIÓN" onPress={this.signOut} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { notice } = state;
  const { signedIn, headers, user } = state.auth;
  return {
    notice,
    user,
    signedIn,
    headers,
  };
};

export default connect(mapStateToProps)(connectAlert(ProfileScreen));
