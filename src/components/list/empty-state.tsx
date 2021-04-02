import C, { apply } from 'consistencss';
import React, { FC, PropsWithChildren } from 'react';
import {
  Image as RNImage,
  View,
  ViewProps,
  ImageProps,
  ImageStyle,
} from 'react-native';
import { Label, Title } from '../typography';

const styles = {
  container: apply(C.justifyCenter, C.itemsCenter, C.selfCenter, C.alignCenter),
  image: C.w44 as ImageStyle,
};

const Image: FC<ImageProps> = (props) => (
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
