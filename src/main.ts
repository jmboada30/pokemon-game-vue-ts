import { createApp } from 'vue';

import { createPinia } from 'pinia';

import App from './App.vue';
import './css/styles.css';
import './css/animations.css';

createApp(App).use(createPinia()).mount('#app');
