import C, { apply, TextInput, theme } from 'consistencss';
import React, { FC } from 'react';
import { TextInputProps, View, ViewProps } from 'react-native';
import Icon, { IconProps } from '../addons/icon';
import { Label, TypographyProps } from '../typography';

const styles = {
  container: apply(
    C.bgWhite,
    'border0.3',
    C.p1,
    C.row,
    C.justifyStart,
    C.alignCenter,
    C.itemsCenter,
    {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomWidth: 4,
    },
  ),
  input: apply(C.px2, C.font6, C.flex),
  icon: apply(C.font7, C.mx2, C.w7),
  label: apply(C.mb2, C.ml4),
};

const Container: FC<ViewProps> = (props) => (
  <View style={[styles.container, C.borderPrimary, props.style]}>
    {props.children}
  </View>
);

const Field = (props: TextInputProps) => (
  <TextInput
    {...props}
    style={[styles.input, C.familyPrimary, C.textPrimarydark, props.style]}
    selectionColor={theme.colors.primarylight}
  />
);

const InputLabel = (props: TypographyProps) => (
  <Label style={styles.label} text={props.text} />
);

const InputIcon = (props: IconProps) => (
  <Icon {...props} style={apply(styles.icon, C.textPrimary, props.style)} />
);

const Input: FC<ViewProps> & {
  Container: typeof Container;
  Field: typeof Field;
  Icon: typeof InputIcon;
  Label: typeof InputLabel;
  Description: typeof InputLabel;
} = (props) => <View>{props.children}</View>;

Input.Container = Container;
Input.Field = Field;
Input.Icon = InputIcon;
Input.Label = InputLabel;
Input.Description = InputLabel;

export default Input;
