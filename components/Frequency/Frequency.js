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
import {colors, removeData, returnData, updateData} from '../../globals';

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

  const addButtonDisabledStyle = () => {
    if (doneDay !== null || selectedWeekDay > today.getDay() - 1) {
      return {
        backgroundColor: colors.greyDisabled,
        color: colors.grey,
      };
    }
    return null;
  };

  const addSwitchTextStyle = switchPosition => {
    if (doneDay !== null && switchPosition === switchSelection) {
      return {
        color: colors.successGreen,
      };
    }
    if (switchPosition === switchSelection) {
      return {
        color: colors.primaryLight,
      };
    }
  };

  const updateFrequency = change => {
    setFrequency(String(change));
    updateData('@frequency', +change);
  };

  const clearDoneDays = async () => {
    for (let i = 0; i < 6; i++) {
      await removeData(`@doneDay${i}`);
    }
  };

  const getByLastTraining = async () => {
    const lastTraining = await returnData('@lastTraining');
    const lastTrainingWeekDay = await returnData('@lastTrainingWeekDay');
    const lastTrainingDate = await returnData('@lastTrainingDate');

    if (lastTraining === null) {
      return false;
    }
    if (lastTrainingWeekDay === 0 && lastTrainingDate === week[0]) {
      await clearDoneDays();
    }
    return lastTraining === 'false';
  };

  const getTrainingDay = async dayIndex => {
    const doneDayData = await returnData(`@doneDay${dayIndex}`);
    if (doneDayData !== null) {
      return doneDayData === 'true';
    }

    if (dayIndex === 0) {
      return await getByLastTraining();
    }

    return !(await getTrainingDay(dayIndex - 1));
  };

  const getButtonText = () => {
    if (selectedWeekDay > today.getDay() - 1) {
      return 'CÊ TÁ APRESSADO 🗓️';
    }
    if (doneDay === null) {
      return 'CONFIRMAR DIA 🏋️';
    }
    if (selectedWeekDay === today.getDate() - 1) {
      return 'O DE HOJE TÁ PAGO! 💪';
    }
    return 'TÁ PAGO! 💪';
  };

  const handleDone = async () => {
    const lastTrainingWeekDay = await returnData('@lastTrainingWeekDay');

    if (lastTrainingWeekDay < selectedWeekDay) {
      updateData('@lastTraining', switchSelection);
      updateData('@lastTrainingWeekDay', selectedWeekDay);
      updateData('@lastTrainingDate', week[selectedWeekDay]);
    }

    updateData(`@doneDay${selectedWeekDay}`, switchSelection);
    updateData('@frequency', +frequency + 1);
    setFrequency(String(+frequency + 1));
    setDoneDay(switchSelection);
  };

  useEffect(() => {
    async function fetchData() {
      const responseFrequency = await returnData('@frequency');
      setFrequency(responseFrequency || '0');
    }
    fetchData();
    buildWeek();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const responseTrainingDay = await getTrainingDay(selectedWeekDay);
      const responseDoneDay = await returnData(`@doneDay${selectedWeekDay}`);
      setSwitchSelection(responseTrainingDay);
      setDoneDay(responseDoneDay);
    }
    if (week.length > 0) {
      fetchData();
    }
  }, [selectedWeekDay, week]);

  // remove storage
  // useEffect(() => {
  //   for (let index = 0; index < 6; index++) {
  //     removeData(`@doneDay${index}`);
  //   }
  //   removeData('@lastTraining');
  //   removeData('@lastTrainingWeekDay');
  //   removeData('@lastTrainingDate');
  // }, []);

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
          <Text style={[styles.switchTextColor, addSwitchTextStyle(false)]}>
            Treino A
          </Text>
          <Switch
            ios_backgroundColor={
              doneDay !== null ? colors.greyDark : colors.primaryDark
            }
            value={switchSelection}
            onValueChange={setSwitchSelection}
            disabled={doneDay !== null}
            style={styles.exerciseSwitch}
            thumbColor={
              doneDay !== null ? colors.successGreen : colors.primaryLight
            }
            trackColor={
              doneDay !== null
                ? {true: colors.greyDark, false: colors.greyDark}
                : {true: colors.primaryDark, false: colors.primaryDark}
            }
          />
          <Text style={[styles.switchTextColor, addSwitchTextStyle(true)]}>
            Treino B
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleDone}
          disabled={doneDay !== null || selectedWeekDay > today.getDay() - 1}
          style={[styles.successButton, addButtonDisabledStyle()]}>
          <Text style={addButtonDisabledStyle()}>{getButtonText()}</Text>
        </TouchableOpacity>
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
    marginHorizontal: 4,
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
  switchTextColor: {
    color: colors.white,
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
    marginHorizontal: 4,
  },
});

export default Frequency;
