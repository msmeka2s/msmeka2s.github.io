import CustomMenu from './CustomMenu.vue';

import { action } from '@storybook/addon-actions';

export default {
    component: CustomMenu,
    //👇 Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/,
    title: 'CustomMenu',
    //👇 Our events will be mapped in Storybook UI
    argTypes: {
        onVertical: {},
    },
};

export const actionsData = {
    onVertical: action('vertical'),
};

const Template = args => ({
    components: { CustomMenu },
    setup() {
        return { args, ...actionsData };
    },
    template: '<CustomMenu v-bind="args" />',
});
export const Default = Template.bind({});
Default.args = {
    id: '1',
    title: 'Test Menu',
    direction: 'horizontal',
    menuItems: [
        {
            id: 1,
            name: 'Menüpunkt 1',
            target: '#'
        },
        {
            id: 2,
            name: 'Menüpunkt 2',
            target: 'https://www.google.de'
        },
        {
            id: 3,
            name: 'Menüpunkt 3',
            target: 'gfdjghkdfjgh'
        }
    ],
    updatedAt: new Date(2018, 0, 1, 9, 0),
};

export const Vertical = Template.bind({});
Vertical.args = {
    ...Default.args.customMenu,
    direction: 'vertical',
    menuItems: [
        {
            id: 1,
            name: 'Menüpunkt 1',
            target: 'lkfhöljkf'
        },
        {
            id: 2,
            name: 'Menüpunkt 2',
            target: 'https://www.youtube.com'
        },
        {
            id: 3,
            name: 'Menüpunkt 3',
            target: '#'
        }
    ]
};