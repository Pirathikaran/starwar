import { Button } from "../components/appComponents/common/Button";
import { FaCoffee, FaBeer } from "react-icons/fa";
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: "Components/Button",
  component: Button,
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Button title",
  variant: "primary",
  size: "sm",
  icon: <FaBeer />,
};

export const PrimaryWithoutIcon = Template.bind({});
PrimaryWithoutIcon.args = {
  children: "Button title",
  variant: "primary",
  size: "sm",
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  children: "Button title",
  variant: "tertiary",
  size: "sm",
  icon: <FaBeer />,
};

export const TertiaryWithoutIcon = Template.bind({});
TertiaryWithoutIcon.args = {
  children: "Button title",
  variant: "tertiary",
  size: "sm",
};

export const Ghost = Template.bind({});
Ghost.args = {
  children: "Button title",
  variant: "ghost",
  size: "sm",
  iconPosition: "right",
  icon: <FaBeer />,
};

export const GhostWithoutIcon = Template.bind({});
GhostWithoutIcon.args = {
  children: "Button title",
  variant: "ghost",
  size: "sm",
  iconPosition: "right",
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: "Button title",
  variant: "secondary",
  size: "sm",
  icon: <FaCoffee />,
};

export const Success = Template.bind({});
Success.args = {
  children: "Button title",
  variant: "success",
  size: "sm",
  icon: <FaCoffee />,
};

export const Warning = Template.bind({});
Warning.args = {
  children: "Button title",
  variant: "warning",
  size: "sm",
  icon: <FaCoffee />,
};

export const Danger = Template.bind({});
Danger.args = {
  children: "Button title",
  variant: "danger",
  size: "sm",
  icon: <FaCoffee />,
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: "Button title",
  variant: "primary",
  size: "sm",
  icon: <FaBeer />,
  disabled: true,
};

export const WithIconLeft = Template.bind({});
WithIconLeft.args = {
  children: "Button with Icon",
  variant: "primary",
  size: "sm",
  icon: <FaBeer />,
  iconPosition: "left",
};

export const WithIconRight = Template.bind({});
WithIconRight.args = {
  children: "Button with Icon",
  variant: "primary",
  size: "sm",
  icon: <FaBeer />,
  iconPosition: "right",
};

export const Small = Template.bind({});
Small.args = {
  children: "Small Button",
  variant: "primary",
  size: "sm",
  icon: <FaBeer />,
};
