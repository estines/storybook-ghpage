import React from 'react';
import UIExplorer, {
  Description,
  DocItem,
  Section,
  storiesOf
} from '../ui-explorer';
import RoundButton from '../components/Button/RoundButton';

const RoundButtonScreen = () => (
  <UIExplorer title="Button" url="button.stories.js">
    <Description>Displays a customizable activity indicator</Description>
    <Section title="Props">
      <DocItem name="...View props" />
      <DocItem
        name="RoundButton"
        typeInfo="?boolean = true"
        description="Whether to show the indicator or hide it."
        example={{
          render: () => <RoundButton title="Hello" />
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Button', module).add('Button', RoundButtonScreen);

// Story structure
{
  /* <DocItem
        name="color"
        typeInfo="?color = #1976D2"
        description="The foreground color of the spinner."
        example={{
          render: () => <PropColor />
        }}
      />

      <DocItem
        name="hidesWhenStopped"
        typeInfo="?boolean = true"
        description="Whether the indicator should hide when not animating."
        example={{
          render: () => <PropHidesWhenStopped />
        }}
      />

      <DocItem
        name="size"
        typeInfo="?enum('small', 'large') | number = 'small'"
        description="Size of the indicator. Small has a height of 20px, large has a height of 36px."
        example={{
          render: () => <PropSize />
        }}
      /> */
}
