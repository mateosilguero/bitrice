import C, { apply, Text } from 'consistencss';
import React from 'react';
import { TextProps } from 'react-native';

const styles = {
  label: apply(C.font4, C.textGrey),
  subtitle: C.font5,
  title: C.font7,
};

export interface TypographyProps extends TextProps {
  text: String;
}

const Base = (props: TypographyProps) => <Text {...props}>{props.text}</Text>;

export const Label = (props: TypographyProps) => (
  <Base {...props} style={[styles.label, props.style]} />
);

export const Subtitle = (props: TypographyProps) => (
  <Base {...props} style={[styles.subtitle, props.style]} />
);

export const Title = (props: TypographyProps) => (
  <Base {...props} style={[styles.title, props.style]} />
);
