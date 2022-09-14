import React from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {colors} from '../../globals';
import DataEntry from '../DataEntry';

const ExerciseModal = ({open, setOpen, data}) => {
  return (
    <Modal
      isVisible={open}
      animationIn="slideInDown"
      animationOut="slideOutUp"
      backdropOpacity={0.4}
      backdropColor={colors.grey}
      onBackdropPress={() => setOpen(false)}>
      <View style={styles.modalContent}>
        <DataEntry data={data} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: colors.greyDarker,
    width: '100%',
    position: 'absolute',
    top: 40,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.black,
    padding: 8,
    flex: 1,
    margin: 0,
  },
});

export default ExerciseModal;
