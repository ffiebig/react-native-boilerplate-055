import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  buttonContainer: {
    backgroundColor: '$primary',
    paddingVertical: 15,
    marginBottom: 5,
  },
  buttonContainerDisabled: {
    backgroundColor: 'gray',
    paddingVertical: 15,
    marginBottom: 5,
  },
  buttonText: {
    color: '$white',
    textAlign: 'center',
    fontWeight: '700',
  },
});

export default styles;
