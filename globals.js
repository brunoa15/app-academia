import AsyncStorage from '@react-native-async-storage/async-storage';

export const colors = {
  primary: '#A44200',
  primaryLight: '#D58936',
  primaryDark: '#69140e',
  primaryDarker: '#3C1518',
  secondary: '#F2F3AE',
  black: '#000',
  white: '#fff',
  grey: '#666',
  darkGrey: '#333',
  disabledGrey: '#aaa',
  successGreen: '#00b56a',
};

export const getData = async (key, setState) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      setState(JSON.parse(value));
    }
  } catch {
    setState([]);
  }
};

export const returnData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch {
    return null;
  }
};

export const persistData = async (key, setState, newItem) => {
  try {
    const value = await AsyncStorage.getItem(key);
    let newValue = [newItem];
    if (value) {
      newValue = [...JSON.parse(value), newItem];
    }
    await AsyncStorage.setItem(key, JSON.stringify(newValue));
    getData(key, setState);
  } catch (e) {
    console.error(e);
  }
};

export const updateData = async (key, newItem) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(newItem));
  } catch (e) {
    console.error(e);
  }
};
