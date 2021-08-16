import mdx from "./testdoc.mdx";
import { Button } from "./Button";

// default export describes the component
export default {
  title: "Components/Test component",
  component: Button,
  parameters: {
    docs: { page: mdx }, // Need to add this param to show the mdx docs
  },
};

//👇 How to use Controls with Args

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Button {...args} />;
//👇 Each story then reuses that template
export const ComponentName = Template.bind({});
ComponentName.args = {
  children: "A native button",
  backgroundColor: "Aquamarine",
};
