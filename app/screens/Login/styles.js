import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '$backgroundColor',
  },
  loginContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '$backgroundColor',
  },
  modalTitle: {
    fontSize: 21,
    color: '$dark',
    marginBottom: 20,
  },
  modalText: {
    color: '$dark',
    marginBottom: 20,
    textAlign: 'justify',
  },
  icon: {
    padding: 10,
    alignSelf: 'flex-end',
  },
  iconColor: EStyleSheet.value('$primary'),
  '@media ios': {
    iconSize: 62,
    iconName: 'ios-close',
  },
  '@media android': {
    iconSize: 48,
    iconName: 'md-close',
  },
});

export default styles;
