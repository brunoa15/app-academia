import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Menu from './components/Menu';
import ExercisesList from './components/ExercisesList';
import Frequency from './components/Frequency';

const App = () => {
  const [active, setActive] = useState('A');

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar backgroundColor={backgroundStyle.backgroundColor} />
      <View style={styles.container}>
        {['A', 'B'].includes(active) && <ExercisesList active={active} />}
        {active === 'C' && <Frequency />}
      </View>
      <Menu active={active} setActive={setActive} />
    </SafeAreaView>
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
