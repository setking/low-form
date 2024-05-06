import Button from "./Button.vue";
import options from "./options";

export default {
    name: '按钮',
    component: Button,
    icon: 'button',
    type: 'assist',
    order: 1,

    initialValues: {
        component: 'Button',
        props: {
            name: '提交',
            type: 'primary'
        }
    },
    options
}
