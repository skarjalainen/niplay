import { StyleSheet } from 'react-native';
import { colors } from './base.styles';

export const gameStyles = StyleSheet.create({
  points: {
    textAlign: 'center',
    fontSize: 24,
    paddingTop: 20,
  },
  question: {
    textAlign: 'center',
    padding: 20,
    fontSize: 24,
  },
  choice: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: colors.b5
  },
  choiceTitle: {
    textAlign: 'center',
    fontSize: 14,
  },
});
