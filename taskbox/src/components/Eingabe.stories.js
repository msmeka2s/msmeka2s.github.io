import Eingabe from './Eingabe.vue';

export default {
  component: Eingabe,
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  title: 'Eingabe',
  //👇 Our events will be mapped in Storybook UI
  argTypes: {

  },
};

export const actionsData = {

};

const Template = args => ({
  components: { Eingabe },
  setup() {
    return { args, ...actionsData };
  },
  template: '<Eingabe v-bind="args" />',
});
export const Default = Template.bind({});
Default.args = {

};
