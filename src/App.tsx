import React, { useEffect, useState } from 'react';
// import { StatusBar } from 'expo-status-bar';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import questionsJson from './data/questions.json'

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
};

const ChoiceItem = ({item, onPress, backgroundColor, textColor}: ChoiceItemProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
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

  const getCurrentAnswer = () => {
    return choices.find((c) => c.id === choiceId)?.title || "";
  };

  const renderChoiceItem = ({ item }: { item: Choice }) => {
    const backgroundColor = item.id === choiceId ? '#003459' : '#00a8e8';
    const color = item.id === choiceId ? 'white' : 'black';

    return (
      <ChoiceItem
        item={item}
        onPress={handleSelectChoice(item)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Niplay</Text>
      <Text style={styles.points}>Pisteet: {points}</Text>
      {isCorrect === 0 && (
        <>
          <FlatList
            ListHeaderComponent={<Text style={styles.question}>{DATA[questionIndex].title}?</Text>}
            data={choices}
            renderItem={renderChoiceItem}
            keyExtractor={item => `choice_${item.id}`}
            extraData={choiceId}
            ListFooterComponent={
              <View style={{ paddingTop: 20 }}>
                <Pressable style={styles.button} disabled={choiceId === undefined} onPress={handleCheckAnswer}>
                  <Text style={styles.button}>Lukitse vastaus</Text>
                </Pressable>
              </View>
            }
          />
        </>
      )}
      {isCorrect === 1 && (
        <View style={{ flex: 1 }}>
          <Text style={styles.question}>{DATA[questionIndex].title}?</Text>
          <Text style={styles.question}>{getCurrentAnswer()}</Text>
          <Text style={styles.question}>Vastaus on oikein, hienoa!</Text>
          <Text style={{ paddingTop: 20 }} />
          <Pressable style={styles.button} disabled={choiceId === undefined} onPress={handleNextQuestion}>
            <Text style={styles.button}>Seuraava kysymys</Text>
          </Pressable>
        </View>
      )}
      {isCorrect === 2 && (
        <>
          <Text style={styles.question}>{DATA[questionIndex].title}?</Text>
          <Text style={styles.question}>{getCurrentAnswer()}</Text>
          <Text style={styles.question}>Väärin meni!</Text>
          <Text style={{ paddingTop: 20 }} />
          <Pressable style={styles.button} disabled={choiceId === undefined} onPress={handleNextQuestion}>
            <Text style={styles.button}>Seuraava kysymys</Text>
          </Pressable>
        </>
      )}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#007ea7',
  },
  header: {
    textAlign: 'center',
    padding: 20,
    fontSize: 40,
    backgroundColor: '#ffffff',
    color: '#000000',
  },
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
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 14,
  },
  button: {
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    color: 'white',
    backgroundColor: 'black',
    fontSize: 16,
  },
});

export default App;