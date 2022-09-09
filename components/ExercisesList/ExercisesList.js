import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../globals';
import AddButton from '../AddButton';
import DataEntry from '../DataEntry';

const ExercisesList = ({active}) => {
  const [exercises, setExercises] = useState([]);
  const [showDataEntry, setShowDataEntry] = useState(false);

  const getData = async trainingId => {
    try {
      const value = await AsyncStorage.getItem(`@exercises${trainingId}`);
      if (value !== null) {
        setExercises(JSON.parse(value));
      }
    } catch {
      setExercises([]);
    }
  };

  const persistData = async (trainingId, newExercise) => {
    try {
      await AsyncStorage.setItem(
        `@exercises${trainingId}`,
        JSON.stringify([...exercises, newExercise]),
      );
      getData(active);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setExercises([]);
    getData(active);
  }, [active]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {showDataEntry && (
          <DataEntry trainingId={active} persistData={persistData} />
        )}
        <View style={styles.tableRow}>
          <Text style={[styles.tableFirstItem, styles.textTableHead]}>
            Exercício
          </Text>
          <Text style={[styles.tableItems, styles.textTableHead]}>S</Text>
          <Text style={[styles.tableItems, styles.textTableHead]}>R</Text>
          <Text style={[styles.tableItems, styles.textTableHead]}>C</Text>
        </View>
        {exercises.map(exercise => (
          <View key={exercise.name} style={styles.tableRow}>
            <Text style={styles.tableFirstItem}>{exercise.name}</Text>
            <Text style={styles.tableItems}>{exercise.sets}</Text>
            <Text style={styles.tableItems}>{exercise.reps}</Text>
            <Text style={styles.tableItems}>{exercise.weight}</Text>
          </View>
        ))}
      </ScrollView>
      <AddButton onPress={() => setShowDataEntry(!showDataEntry)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableFirstItem: {
    flex: 1,
    fontSize: 16,
    color: colors.secondary,
  },
  tableItems: {
    width: 40,
    fontSize: 16,
    marginBottom: 4,
    color: colors.white,
  },
  textTableHead: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 8,
  },
});

export default ExercisesList;
