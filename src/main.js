import { createApp } from "vue";//引入crateApp用于创建应用
import "./style.css";
import App from "./App.vue";//引入App根组件
import List from './components/List.vue';

import router from "./router";

import ANTD from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App);
app.use(router);
app.use(ANTD);//使用组件库
app.component('List', List);//使用组件
app.mount("#app");//挂载到#app元素上
