import React from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { connectAlert, MainLogo, DefaultButton, Input } from '../../components';
import { requestSignIn, requestPasswordRecovery } from '../../actions/auth';
import { connect } from 'react-redux';
import styles from './styles';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/Ionicons';

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    alertWithType: PropTypes.func,
    ongoingRequest: PropTypes.shape({
      signIn: PropTypes.bool,
      signOut: PropTypes.bool,
    }),
    notice: PropTypes.shape({
      kind: PropTypes.string,
      title: PropTypes.string,
      message: PropTypes.string,
    }),
    signedIn: PropTypes.bool,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    alertWithType: null,
    ongoingRequest: { signIn: false, signOut: false },
    notice: {
      kind: '',
      title: '',
      message: '',
    },
    signedIn: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      modalVisible: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notice.message !== '') {
      this.props.alertWithType(
        nextProps.notice.kind,
        nextProps.notice.title,
        nextProps.notice.message,
      );
    }
    if (this.props.signedIn !== nextProps.signedIn && nextProps.signedIn) {
      this.props.navigation.navigate('App');
    }
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  handlePasswordRecovery(email) {
    this.props.dispatch(requestPasswordRecovery({ email }));
    this.setModalVisible(false);
  }

  signInAsync = async (email, password) => {
    this.props.dispatch(requestSignIn({ email, password }));
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.mainContainer}>
        <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
          <View style={styles.loginContainer}>
            <View style={styles.imageContainer}>
              <MainLogo />
            </View>
            <View style={styles.container}>
              <Input
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
                autoCapitalize="none"
                onSubmitEditing={() => this.passwordInput.focus()}
                autoCorrect={false}
                blurOnSubmit={false}
                keyboardType="email-address"
                returnKeyType="next"
                placeholder="Email"
              />

              <Input
                reference={(component) => {
                  this.passwordInput = component;
                }}
                onSubmitEditing={() => this.signInAsync(this.state.email, this.state.password)}
                onChangeText={password => this.setState({ password })}
                returnKeyType="go"
                placeholder="Password"
                secureTextEntry
              />
              <DefaultButton
                title="¿Olvidaste tu contraseña?"
                containerStyles={{ backgroundColor: 'transparent', margin: -10 }}
                textStyles={{ textAlign: 'right', color: EStyleSheet.value('$primary') }}
                onPress={() => this.setModalVisible(true)}
              />
              <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => this.setModalVisible(false)}
              >
                <KeyboardAvoidingView behavior="padding" style={styles.modalContainer}>
                  <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
                    <View>
                      <TouchableOpacity
                        style={styles.icon}
                        onPress={() => this.setModalVisible(false)}
                      >
                        <Icon
                          name={styles.iconName}
                          size={styles.iconSize}
                          color={styles.iconColor}
                        />
                      </TouchableOpacity>
                      <Text style={styles.modalTitle}>Recuperar contraseña</Text>
                      <Text style={styles.modalText}>
                        Ingresa tu correo electrónico para que te enviemos las instrucciones para
                        recuperar tu contraseña
                      </Text>
                      <Input
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        onSubmitEditing={() => this.handlePasswordRecovery(this.state.email)}
                        returnKeyType="go"
                        keyboardType="email-address"
                        placeholder="Correo electrónico"
                      />
                      <DefaultButton
                        title="ENVIAR"
                        onPress={() => this.handlePasswordRecovery(this.state.email)}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
              </Modal>
              <DefaultButton
                title={this.props.ongoingRequest.signIn ? 'CARGANDO...' : 'ENTRAR'}
                onPress={() => this.signInAsync(this.state.email, this.state.password)}
                disabled={this.props.ongoingRequest.signIn}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => {
  const { notice } = state;
  const { headers, ongoingRequest, signedIn } = state.auth;
  return {
    notice,
    headers,
    ongoingRequest,
    signedIn,
  };
};

export default connect(mapStateToProps)(connectAlert(LoginScreen));
