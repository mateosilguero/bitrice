import React from 'react';
import { View } from 'react-native';
import C, { apply } from 'consistencss';

const styles = apply(
  C.row,
  C.justifyBetween,
  C.itemsCenter,
  C.p4,
  C.shadowXs,
  C.mt_1,
  C.mx_1,
  C.bgWhite,
  {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
);

const ScreenHeader = (props) => <View style={styles}>{props.children}</View>;

export default ScreenHeader;
