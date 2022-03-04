import WwwNavigator from './WwwNavigator.vue';

export default {
    component: WwwNavigator,
    //👇 Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/,
    title: 'WwwNavigator',
    //👇 Our events will be mapped in Storybook UI
    argTypes: {

    },
};

export const actionsData = {

};

const Template = args => ({
    components: { WwwNavigator },
    setup() {
        return { args, ...actionsData };
    },
    template: '<WwwNavigator v-bind="args" />',
});
export const Default = Template.bind({});
Default.args = {

};
