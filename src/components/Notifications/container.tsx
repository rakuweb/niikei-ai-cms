// import layer
import { FC } from 'react';
import { Presenter, PresenterProps } from './presenter';

export type ContainerProps = PresenterProps;

export const Container: FC<ContainerProps> = ({ ...props }) => {
  return <Presenter {...props} />;
};
