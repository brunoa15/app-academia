import React, {useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {colors} from '../../globals';
import Input from '../Input';

const DataEntry = ({trainingId, persistData}) => {
  const initialState = {
    name: '',
    sets: '',
    reps: '',
    weight: '',
  };

  const [exercise, setExercise] = useState(initialState);

  const handleNewExercise = () => {
    persistData(trainingId, exercise);
    setExercise(initialState);
  };

  return (
    <View style={styles.container}>
      <Input
        label="Nome"
        returnKeyType="next"
        value={exercise.name}
        setValue={change => setExercise({...exercise, name: change})}
      />
      <View style={styles.fieldset}>
        <View style={styles.inputGap}>
          <Input
            label="Séries"
            returnKeyType="next"
            keyboardType="numeric"
            value={exercise.sets}
            setValue={change =>
              setExercise({...exercise, sets: change.replace(/[^0-9]/g, '')})
            }
          />
        </View>
        <View style={styles.inputGap}>
          <Input
            label="Repetições"
            returnKeyType="next"
            keyboardType="numeric"
            value={exercise.reps}
            setValue={change =>
              setExercise({...exercise, reps: change.replace(/[^0-9]/g, '')})
            }
          />
        </View>
        <View style={styles.flexGrow}>
          <Input
            label="Carga"
            keyboardType="numeric"
            value={exercise.weight}
            setValue={change =>
              setExercise({...exercise, weight: change.replace(/[^0-9]/g, '')})
            }
          />
        </View>
      </View>
      <Button title="add" onPress={handleNewExercise} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  inputGap: {
    flex: 1,
    marginRight: 16,
  },
  fieldset: {
    flexDirection: 'row',
  },
  flexGrow: {
    flex: 1,
  },
  label: {
    marginLeft: 16,
    color: colors.primary,
  },
});

export default DataEntry;
