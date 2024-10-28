import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlay, faStop, faTrash } from '@fortawesome/free-solid-svg-icons';
library.add(faPlay, faStop, faTrash);

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
