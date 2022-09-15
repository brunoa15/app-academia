import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {colors, getData} from '../../globals';
import AddButton from '../AddButton';
import Card from '../Card';
import ExerciseModal from '../ExerciseModal';

const ExercisesList = ({active}) => {
  const [exercises, setExercises] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setExercises([]);
    getData(`@exercises${active}`, setExercises);
  }, [active]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {exercises.map(exercise => (
          <Card
            key={exercise.id}
            exerciseData={exercise}
            trainingId={active}
            setExercises={setExercises}
          />
        ))}
      </ScrollView>
      <ExerciseModal
        open={openModal}
        setOpen={setOpenModal}
        trainingId={active}
        setExercises={setExercises}
      />
      <AddButton onPress={() => setOpenModal(true)} />
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
