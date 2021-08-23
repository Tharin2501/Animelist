import Switch from "../Switch";
import SwitchDoc from "./SwitchDoc.mdx";
import Example from "./Example";

export default {
  title: "Components/Switch", // You can also create sub-directories /
  component: Switch,
  subcomponents: Example,
  parameters: {
    docs: { page: SwitchDoc },
  },
};

const Template = (args) => <Switch {...args} />;
const ExampleTemplate = (args) => <Example {...args} />;

// story that uses our Example file
export const UseCase = ExampleTemplate.bind({});
//  UseCase.args = {};

export const SwitchComponent = Template.bind({});
SwitchComponent.args = {
  // Default data for props here
  //children: "A value",
  isChecked: true,
};
