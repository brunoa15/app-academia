import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {colors} from '../../globals';

const daysOfWeek = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

const Frequency = () => {
  const [totalDays, setTotalDays] = useState('22');
  const [week, setWeek] = useState([]);
  const today = new Date();

  const buildWeek = () => {};

  useEffect(() => {
    buildWeek();
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
      <View style={styles.daysOfWeekView}>
        {daysOfWeek.map((day, index) => (
          <Text key={index} style={styles.daysOfWeekText}>
            {day}
          </Text>
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
  daysOfWeekView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  daysOfWeekText: {
    color: colors.white,
  },
});

export default Frequency;
