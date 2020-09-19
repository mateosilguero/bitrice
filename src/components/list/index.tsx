import C, { apply, theme } from 'consistencss';
import React, { PropsWithChildren } from 'react';
import { Image as RNImage, View, ViewProps, ImageProps } from 'react-native';
import Icon, { IconProps } from '../addons/icon';
import { Label, Title } from '../typography';

const styles = {
  container: apply(C.row, C.bgWhite, C.shadowMd, C.radius4, C.overflowHidden),
  content: apply(C.flex, C.py1, C.px4),
  icon: apply(C.font6, C.my1, C.mx2, C.w6),
  image: apply(C.w14, C.minh18),
};

const Content = (props: PropsWithChildren<ViewProps>) => (
  <View style={[styles.content, props.style]}>{props.children}</View>
);

const ListImage = (props: ImageProps) => (
  <RNImage
    {...props}
    style={[styles.image, props.style]}
    resizeMode="contain"
  />
);

const ListIcon = (props: IconProps) => (
  <Icon
    {...props}
    style={[styles.icon, props.style]}
    color={props.color || theme.colors.primary}
  />
);

const ListItem = (props: PropsWithChildren<ViewProps>) => (
  <View style={[styles.container, props.style]}>{props.children}</View>
);

ListItem.Content = Content;
ListItem.Icon = ListIcon;
ListItem.Title = Title;
ListItem.Description = Label;
ListItem.Image = ListImage;

export default ListItem;
