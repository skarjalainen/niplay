import { StyleSheet } from 'react-native';

export const colors = {
  b0: '#443008',
  b1: '#674e1c',
  b2: '#806734',
  b3: '#a38954',
  b4: '#baa77e',
  b5: '#c7b080',
  b6: '#dbceb0',
  b7: '#fff7e5',
  b8: '',
  b9: '',
  correct: 'green',
  wrong: 'red',
};

export const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: colors.b2,
  },
  header: {
    textAlign: 'center',
    padding: 20,
    paddingTop: 50,
    fontSize: 40,
    backgroundColor: colors.b7,
    color: 'black',
  },
  button: {
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    color: 'black',
    backgroundColor: colors.b5,
    fontSize: 16,
  },
  buttonPressed: {
    backgroundColor: colors.b0,
  },
});
