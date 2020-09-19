import React, { FC } from 'react';
import { View } from 'react-native';
import C, { apply } from 'consistencss';

const Row: FC<{ style?: {} }> = (props) => (
  <View style={apply(C.row, C.itemsCenter, props.style)}>{props.children}</View>
);

export default Row;
