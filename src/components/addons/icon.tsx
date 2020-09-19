import React from 'react';
import { TextStyle, StyleProp } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}

const Icon = (props: IconProps) => <MaterialIcon {...props} />;

export default Icon;
