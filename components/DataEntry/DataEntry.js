import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, persistData} from '../../globals';
import Input from '../Input';

const DataEntry = ({data, trainingId, setExercises}) => {
  const initialState = {
    name: '',
    sets: '',
    reps: '',
    weight: '',
  };

  const [exercise, setExercise] = useState(initialState);

  const handleNewExercise = () => {
    persistData(`@exercises${trainingId}`, setExercises, exercise);
    setExercise(initialState);
  };

  useEffect(() => {
    if (data) {
      setExercise(data);
    }
  }, [data]);

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
      <TouchableOpacity style={styles.buttonAdd} onPress={handleNewExercise}>
        <Text style={styles.buttonAddText}>ADD</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonDelete}>
        <Text style={styles.buttonDeleteText}>EXCLUIR</Text>
      </TouchableOpacity>
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
  buttonAdd: {
    backgroundColor: colors.greyDarker,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primaryLight,
    marginTop: 24,
  },
  buttonAddText: {
    color: colors.primaryLight,
    fontWeight: '700',
  },
  buttonDelete: {
    backgroundColor: colors.errorRed,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: 12,
    marginTop: 8,
  },
  buttonDeleteText: {
    color: colors.white,
    fontWeight: '700',
  },
});

export default DataEntry;
