import type { Meta, StoryObj } from '@storybook/react';

import { Presenter } from './presenter';

const meta: Meta<typeof Presenter> = {
  component: Presenter,
  args: {
    title: 'Title',
  },
};

export default meta;

type Story = StoryObj<typeof Presenter>;

export const Default: Story = {
  argTypes: {},
};
