import { ElSwitch } from 'element-plus'

export default {
    name: '开关',
    component: ElSwitch,
    icon: 'switch',
    type: 'basic',
    order: 8,
    initialValues: { label: '开关', component: 'Switch', props: { 'inline-prompt': false } },
}
