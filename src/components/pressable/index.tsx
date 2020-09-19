import React from 'react';
import { Pressable as RNPressable, PressableProps } from 'react-native';
import C from 'consistencss';

export const Pressable = (props: PressableProps) => (
  <RNPressable {...props} android_ripple={C.textPrimary}>
    {props.children}
  </RNPressable>
);
