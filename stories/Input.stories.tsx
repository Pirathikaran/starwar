import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Input from "../components/appComponents/common/Input";

export default {
  title: "Components/Input",
  component: Input,
  argTypes: {
    onChange: { action: "changed" },
  },
} as Meta;

const Template: StoryFn = (args) => <Input {...args} />;

// 1. Enabled State
export const Enabled = Template.bind({});
Enabled.args = {
  label: "Title",
  hint: "Hint",
  placeholder: "Enabled",
};

// 2. Focus State
export const Focus = Template.bind({});
Focus.args = {
  label: "Title",
  hint: "Hint",
  placeholder: "Focus",
};

// 3. Typing State
export const Typing = Template.bind({});
Typing.args = {
  label: "Title",
  value: "Typing",
  placeholder: "Typing",
};

// 4. Error State
export const Error = Template.bind({});
Error.args = {
  label: "Title",
  error: true,
  value: "Complete",
  errorMessage: "Hint",
  placeholder: "Error",
};

// 5. Completed State
export const Completed = Template.bind({});
Completed.args = {
  label: "Title",
  //   value: "Complete",
  completed: true,
  placeholder: "Complete",
};

// 6. Disabled State
export const Disabled = Template.bind({});
Disabled.args = {
  label: "Title",
  disabled: true,
  placeholder: "Disabled",
};
