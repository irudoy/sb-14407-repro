import React, { ReactElement } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import SomeComponent from './index';

export default { title: 'SomeComponent', decorators: [withKnobs] };

export const advancedSearchButton = (): ReactElement => (
    <SomeComponent />
);
