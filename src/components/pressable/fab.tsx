import React, { FC } from 'react';
import Button from './button';
import C, { apply } from 'consistencss';

const Fab: FC = (props) => (
  <Button.Secondary
    {...props}
    style={apply(C.absolute, C.bottom4, C.right4, C.px3, C.px3)}>
    {props.children}
  </Button.Secondary>
);

export default Object.assign(Fab, { ...Button.Secondary });
