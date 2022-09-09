import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../globals';

const AddButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    backgroundColor: colors.primaryLight,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 10,
    bottom: 96,
    right: 16,
  },
  buttonText: {
    fontSize: 24,
    color: colors.primaryDarker,
  },
});

export default AddButton;
