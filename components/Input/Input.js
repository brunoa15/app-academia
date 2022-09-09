import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {colors} from '../../globals';

const Input = ({
  value,
  setValue,
  placeholder,
  keyboardType,
  label,
  returnKeyType,
}) => {
  const [fieldColor, setFieldColor] = useState(colors.primary);

  const onInputFocus = () => {
    setFieldColor(colors.primaryLight);
  };

  const onInputBlur = () => {
    setFieldColor(colors.primary);
  };

  const styles = StyleSheet.create({
    input: {
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 16,
      height: 40,
      borderWidth: 1,
      borderColor: fieldColor,
      borderRadius: 32,
      marginBottom: 8,
      backgroundColor: colors.darkGrey,
      color: colors.white,
      flex: 1,
    },
    label: {
      marginLeft: 16,
      color: fieldColor,
    },
  });

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        keyboardType={keyboardType}
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        returnKeyType={returnKeyType}
      />
    </View>
  );
};

export default Input;
