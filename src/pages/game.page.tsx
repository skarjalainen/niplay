import React, { useEffect, useState } from 'react';
// import { StatusBar } from 'expo-status-bar';
import {
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import questionsJson from '../data/questions.json';
import { gameStyles } from '../styles';
import t from '../translations.json';
import { Button } from '../components';
import { colors } from '../styles/base.styles';

type Choice = {
  id: number;
  title: string;
};

type Question = {
  id: number;
  title: string;
  choices: Choice[];
};

type ChoiceItemProps = {
  item: Choice;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
  disabled: boolean;
};

const ChoiceItem = ({item, onPress, backgroundColor, textColor, disabled}: ChoiceItemProps) => (
  <TouchableOpacity onPress={onPress} style={[gameStyles.choice, {backgroundColor}]} disabled={disabled}>
    <Text style={[gameStyles.choiceTitle, {color: textColor}]}>{item.title}</Text>
  </TouchableOpacity>
);

const shuffle = (array: Choice[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const DATA: Question[] = questionsJson.map((q, i) => ({
  id: i,
  title: q.question,
  choices: [
    { id: 0, title: q.answer1 },
    { id: 1, title: q.answer2 },
    { id: 2, title: q.answer3 },
    { id: 3, title: q.answer4 },
  ],
}));

const App = () => {
  const [questionIndex, setQuestionIndex] = useState<number>(0)
  const [choiceId, setChoiceId] = useState<number>();
  const [choices, setChoices] = useState<Choice[]>([])
  const [isCorrect, setIsCorrect] = useState(0);
  const [points, setPoints] = useState(0);

  const moveToNextQuestion = () => {
    const newQuestionIndex = DATA[Math.floor(Math.random() * DATA.length)].id;
    setQuestionIndex(newQuestionIndex);
    setChoices(shuffle(DATA[newQuestionIndex].choices));
  };

  useEffect(() => {
    moveToNextQuestion();
  }, []);

  const handleSelectChoice = (choice: Choice) => () => {
    setChoiceId(choice.id);
  };

  const handleCheckAnswer = () => {
    if (choiceId !== undefined) {
      if (choiceId === 0) {
        setPoints(points + 1);
        setIsCorrect(1);
      } else {
        setIsCorrect(2);
      }
    }
  };

  const handleNextQuestion = () => {
    moveToNextQuestion();
    setIsCorrect(0);
    setChoiceId(undefined);
  };

  const renderChoiceItem = ({ item }: { item: Choice }) => {
    let backgroundColor = item.id === choiceId ? colors.b0 : colors.b5;
    const color = item.id === choiceId ? 'white' : 'black';

    if (isCorrect === 1 && item.id === choiceId) {
      backgroundColor = colors.correct;
    }
    if (isCorrect === 2 && item.id === choiceId) {
      backgroundColor = colors.wrong;
    }
    return (
      <ChoiceItem
        item={item}
        onPress={handleSelectChoice(item)}
        backgroundColor={backgroundColor}
        textColor={color}
        disabled={isCorrect > 0}
      />
    );
  };

  return (
    <>
      <Text style={gameStyles.points}>Pisteet: {points}</Text>
      <FlatList
        ListHeaderComponent={<Text style={gameStyles.question}>{DATA[questionIndex].title}?</Text>}
        data={choices}
        renderItem={renderChoiceItem}
        keyExtractor={item => `choice_${item.id}`}
        extraData={choiceId}
        ListFooterComponent={
          isCorrect === 0 ? (
            <Button style={{ marginTop: 30 }} disabled={choiceId === undefined} onPress={handleCheckAnswer}>
              <Text>{t['game.button.answer']}</Text>
            </Button>
          ) : (
            <Button style={{ marginTop: 30 }} disabled={choiceId === undefined} onPress={handleNextQuestion}>
              <Text>{t['game.button.next']}</Text>
            </Button>
          )
        }
      />
    </>
  );
};

export default App;
