---
to: <%= abs_path %>/presenter.tsx
unless_exists: true
---

// import layer
import { FC } from 'react';

// type layer
export type StyleProps = Record<string, unknown>;
export type DataProps = Record<string, unknown>;
export type PresenterProps = StyleProps & DataProps;

// presenter
export const Presenter: FC<PresenterProps> = ({ ...props }) => {
  return (
    <div>
      <div />
    </div>
  )
};
