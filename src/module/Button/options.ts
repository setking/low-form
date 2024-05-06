export default [
    { label: '唯一标识', component: 'Input', name: 'name' },
    { label: '按钮名称', component: 'Input', name: 'props.name' },
    {
        label: '点击事件',
        component: 'Select',
        name: 'props.clickEvent',
        props: {
            mode: 'static',
            options: [
                { label: '提交表单', value: 'submitForm' },
                { label: '重置表单', value: 'resetFieldsForm' },
                { label: '自定义', value: 'custom' }
            ]
        },
        initialValue: 'submitForm'
    }
]
