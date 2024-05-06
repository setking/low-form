declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        SchemaForm: (typeof import('low-form'))['SchemaForm']
        FormDesign: (typeof import('low-form'))['FormDesign']
    }
}
declare module 'json-editor-vue3';
export {}
