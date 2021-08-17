import Switch from '../Switch'
import SwitchDoc from './SwitchDoc.mdx'

export default {
  title: "Components/Switch", // You can also create sub-directories /
  component: Switch,
  parameters: {
    docs: { page: SwitchDoc },
  },
};

const Template = (args) => <Switch {...args} />;

export const SwitchComponent = Template.bind({});
SwitchComponent.args = {
  // Default data for props here
  children: "A value"
};
