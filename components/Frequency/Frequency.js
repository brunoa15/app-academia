import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../globals';

const daysOfWeek = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

const Frequency = () => {
  const today = new Date();
  const [totalDays, setTotalDays] = useState('13');
  const [week, setWeek] = useState([]);
  const [selectedDay, setSelectedDay] = useState(today.getDate());

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
      newDate.setDate(newDate.getDate() + (6 - i));
      newWeek[i] = newDate.getDate();
    }

    setWeek(newWeek);
  };

  const addDayViewStyle = day => {
    if (day === today.getDate() && day === selectedDay) {
      return {
        backgroundColor: colors.primaryLight,
        width: 50,
        borderRadius: 24,
      };
    }
    if (day === selectedDay) {
      return {
        backgroundColor: colors.white,
        width: 50,
        borderRadius: 24,
      };
    }
  };

  const addDayStyle = day => {
    if (day === today.getDate() && day === selectedDay) {
      return {
        color: colors.white,
      };
    }
    if (day === today.getDate()) {
      return {
        color: colors.primaryLight,
      };
    }
    if (day === selectedDay) {
      return {
        color: colors.black,
      };
    }
  };

  useEffect(() => {
    buildWeek();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      <View style={styles.chainView}>
        <Text style={styles.chainText}>Dias com as fichas atuais</Text>
        <TextInput
          value={totalDays}
          onChangeText={setTotalDays}
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
        {week.map(day => (
          <TouchableOpacity
            key={day}
            style={styles.dayView}
            onPress={() => setSelectedDay(day)}>
            <View style={addDayViewStyle(day)}>
              <Text style={[styles.daysOfWeekText, addDayStyle(day)]}>
                {day}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
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
});

export default Frequency;
