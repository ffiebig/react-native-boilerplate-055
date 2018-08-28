import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  '@media ios': {
    headerLogoPaddingVertical: 10,
    homeDefault: 'ios-home',
    homeFocused: 'ios-home',
    otherDefault: 'ios-person',
    otherFocused: 'ios-person',
  },
  '@media android': {
    headerLogoPaddingVertical: 15,
    homeDefault: 'md-home',
    homeFocused: 'md-home',
    otherDefault: 'md-person',
    otherFocused: 'md-person',
  },
});

export default styles;
