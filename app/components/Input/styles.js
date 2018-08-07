import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  viewContainerWithButton: {
    height: 45,
    maxHeight: 45,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  input: {
    height: 40,
    backgroundColor: '$inputBackground',
    marginBottom: 10,
    padding: 10,
    color: '$dark',
    borderRadius: 4,
    borderColor: '#333',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  buttonContainer: {
    flex: 0.3,
    height: 45,
    backgroundColor: '$primary',
    paddingVertical: 10,
    marginBottom: 5,
  },
  iconContainer: {
    color: '$white',
    textAlign: 'center',
  },
  '@media ios': {
    submitDefault: 'ios-',
  },
  '@media android': {
    submitDefault: 'md-',
  },
});

export default styles;
