import React, {useState} from 'react';
import {
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Menu from './components/Menu';
import ExercisesList from './components/ExercisesList';
import Frequency from './components/Frequency';
import {colors} from './globals';

const App = () => {
  const [active, setActive] = useState('A');

  const backgroundStyle = {
    backgroundColor: colors.greyDarker,
    flex: 1,
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar backgroundColor={backgroundStyle.backgroundColor} />
        <View style={styles.container}>
          {['A', 'B'].includes(active) && <ExercisesList active={active} />}
          {active === 'C' && <Frequency />}
        </View>
        <Menu active={active} setActive={setActive} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    marginRight: 8,
    flex: 1,
  },
});

export default App;
