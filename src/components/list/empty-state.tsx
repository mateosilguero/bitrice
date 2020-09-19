import C, { apply, theme } from 'consistencss';
import React, { PropsWithChildren } from 'react';
import { Image as RNImage, View, ViewProps, ImageProps } from 'react-native';
import { Label, Title } from '../typography';

const styles = {
  container: apply(C.justifyCenter, C.itemsCenter, C.selfCenter, C.alignCenter),
  image: apply(C.w44),
};

const Image = (props: ImageProps) => (
  <RNImage
    {...props}
    style={[styles.image, props.style]}
    resizeMode="contain"
  />
);

const EmptyState = (props: PropsWithChildren<ViewProps>) => (
  <View style={[styles.container, props.style]}>{props.children}</View>
);

EmptyState.Title = Title;
EmptyState.Description = Label;
EmptyState.Image = Image;

export default EmptyState;
