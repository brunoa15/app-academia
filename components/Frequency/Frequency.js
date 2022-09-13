/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, getData, returnData, updateData} from '../../globals';

const daysOfWeek = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

const Frequency = () => {
  const today = new Date();

  const [frequency, setFrequency] = useState();
  const [week, setWeek] = useState([]);
  const [selectedWeekDay, setSelectedWeekDay] = useState(today.getDay() - 1);
  const [switchSelection, setSwitchSelection] = useState();
  const [doneDay, setDoneDay] = useState();

  const buildWeek = () => {
    const newWeek = [];
    let currentDay = today.getDate();

    if (today.getDay() === 0) {
      const newDate = new Date();
      newDate.setDate(today.getDate() - 1);
      newWeek[5] = newDate.getDate();
      currentDay = newDate.getDate();
    } else {
      newWeek[(today.getDay() - 1 + 6) % 6] = today.getDate();
    }

    const todayIndex = newWeek.indexOf(currentDay);

    for (let i = todayIndex - 1; i >= 0; i--) {
      const newDate = new Date();
      newDate.setDate(currentDay - (todayIndex - i));
      newWeek[i] = newDate.getDate();
    }

    for (let i = todayIndex + 1; i < 6; i++) {
      const newDate = new Date();
      newDate.setDate(currentDay + (i - todayIndex));
      newWeek[i] = newDate.getDate();
    }

    setWeek(newWeek);
  };

  const addDayViewStyle = day => {
    if (day === today.getDay() - 1 && day === selectedWeekDay) {
      return {
        backgroundColor: colors.primaryLight,
        width: 50,
        borderRadius: 24,
      };
    }
    if (day === selectedWeekDay) {
      return {
        backgroundColor: colors.white,
        width: 50,
        borderRadius: 24,
      };
    }
  };

  const addDayStyle = day => {
    if (day === today.getDay() - 1 && day === selectedWeekDay) {
      return {
        color: colors.white,
      };
    }
    if (day === today.getDay() - 1) {
      return {
        color: colors.primaryLight,
      };
    }
    if (day === selectedWeekDay) {
      return {
        color: colors.black,
      };
    }
  };

  const updateFrequency = change => {
    setFrequency(change);
    updateData('@frequency', change);
  };

  const getTrainingDay = async dayIndex => {
    const doneDayData = await returnData(`@doneDay${dayIndex}`);
    if (doneDayData !== null) {
      return doneDayData === 'true';
    }

    if (dayIndex === 0) {
      const aaa = await returnData('@lastWeekTraining');
      return aaa === 'true';
    }

    return !(await getTrainingDay(dayIndex - 1));
  };

  const handleDone = () => {
    updateData(`@doneDay${selectedWeekDay}`, switchSelection);
    updateData('@frequency', `${+frequency + 1}`);
    setFrequency(`${+frequency + 1}`);
  };

  useEffect(() => {
    getData('@frequency', setFrequency);
    buildWeek();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const responseTrainingDay = await getTrainingDay(selectedWeekDay);
      const responseDoneDay = await returnData(`@doneDay${selectedWeekDay}`);
      console.log(responseDoneDay);
      setSwitchSelection(responseTrainingDay);
      setDoneDay(responseDoneDay);
    }
    fetchData();
  }, [selectedWeekDay]);

  return (
    <View>
      <View style={styles.chainView}>
        <Text style={styles.chainText}>Dias com as fichas atuais</Text>
        <TextInput
          value={frequency}
          onChangeText={updateFrequency}
          style={styles.chainInput}
          textAlign="center"
        />
      </View>
      <View style={styles.weekView}>
        {daysOfWeek.map((day, index) => (
          <View key={index} style={styles.dayView}>
            <Text style={styles.daysOfWeekHead}>{day}</Text>
          </View>
        ))}
      </View>
      <View style={styles.weekView}>
        {week.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={styles.dayView}
            onPress={() => setSelectedWeekDay(index)}>
            <View style={addDayViewStyle(index)}>
              <Text style={[styles.daysOfWeekText, addDayStyle(index)]}>
                {day}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View>
        <View style={styles.switchView}>
          <Text>Treino A</Text>
          <Switch
            value={switchSelection}
            onValueChange={setSwitchSelection}
            style={styles.exerciseSwitch}
            thumbColor={colors.primaryLight}
            trackColor={{true: colors.primaryDark, false: colors.primaryDark}}
          />
          <Text>Treino B</Text>
        </View>
        <TouchableOpacity
          onPress={handleDone}
          disabled={doneDay !== null}
          style={styles.successButton}>
          <Text>O DE HOJE TÁ PAGO!</Text>
        </TouchableOpacity>
        <Text>AAA {doneDay}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chainView: {
    height: 64,
    backgroundColor: colors.primary,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 24,
  },
  chainText: {
    color: colors.secondary,
    fontSize: 20,
  },
  chainInput: {
    backgroundColor: colors.primaryLight,
    width: 64,
    height: '100%',
    shadowColor: '#171717',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.5,
    justifyContent: 'center',
    color: colors.primaryDarker,
    fontWeight: 'bold',
    fontSize: 24,
  },
  weekView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dayView: {
    width: '16%',
    alignItems: 'center',
  },
  daysOfWeekHead: {
    color: colors.white,
    textAlign: 'center',
  },
  daysOfWeekText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 24,
  },
  switchView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseSwitch: {
    marginVertical: 32,
    marginHorizontal: 16,
  },
  successButton: {
    backgroundColor: colors.successGreen,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: 12,
  },
});

export default Frequency;
