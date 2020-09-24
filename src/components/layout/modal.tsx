import React, { FC } from 'react';
import { Modal, View } from 'react-native';
import C, { apply } from 'consistencss';

interface AlertProps {
  visible: boolean;
}

const Alert: FC<AlertProps> = ({ children, visible }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View
        style={apply(
          C.bgBlack,
          C.flex,
          C.hFull,
          C.wFull,
          C.justifyCenter,
          C.opacity50,
          C.absolute,
        )}
      />
      <View style={apply(C.flex, C.justifyCenter, C.px4)}>{children}</View>
    </Modal>
  );
};

export default Alert;
