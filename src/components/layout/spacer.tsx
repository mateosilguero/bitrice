import { apply } from 'consistencss';
import React, { FC } from 'react';
import { View, ViewProps } from 'react-native';

const default_margin = 2;

interface Props extends ViewProps {
  horizontal?: number;
  vertical?: number;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

const Spacer: FC<Props> = ({
  children,
  horizontal = default_margin,
  vertical = default_margin,
  top = vertical,
  right = horizontal,
  bottom = vertical,
  left = horizontal,
  ...props
}) => {
  const styles = apply(`mt${top}`, `mr${right}`, `mb${bottom}`, `ml${left}`);
  return (
    <View {...props} style={[styles, props.style]}>
      {children}
    </View>
  );
};

export default Spacer;
