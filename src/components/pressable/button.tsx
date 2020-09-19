import C, { apply, Text, theme } from 'consistencss';
import React from 'react';
import { PressableProps } from 'react-native';
import Icon, { IconProps } from '../addons/icon';
import { Pressable } from './index';

const styles = {
  button: apply(
    C.py4,
    C.px6,
    C.shadowXs,
    C.row,
    C.justifyCenter,
    C.itemsCenter,
    C.alignCenter,
    C.radius16,
    C.selfCenter,
    C.overflowHidden,
  ),
  text: apply(C.font6, C.textWhite, C.px1),
};

const ButtonText = (props: { text: string }) => (
  <Text style={styles.text}>{props.text}</Text>
);

const ButtonIcon = (props: IconProps) => (
  <Icon {...props} style={styles.text} />
);

const Button = (props: PressableProps) => (
  <Pressable
    android_ripple={{
      color: theme.colors.primarylight,
      radius: 70,
    }}
    {...props}
    style={[
      styles.button,
      props.disabled ? C.bgGray : C.bgPrimary,
      props.style,
    ]}>
    {props.children}
  </Pressable>
);

const ButtonSecondary = (props: PressableProps) => (
  <Button
    {...props}
    style={[C.bgSecondary, props.style]}
    android_ripple={C.textSecondaryLight}
  />
);

Button.Text = ButtonText;
Button.Icon = ButtonIcon;
Button.Secondary = Object.assign(ButtonSecondary, { ...Button });

export default Button;
