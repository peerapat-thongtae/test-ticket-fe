import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Select from 'primevue/select';

const app = createApp(App)
app.use(PrimeVue, {
     theme: {
          preset: Aura,
          options: {
               darkModeSelector: 'class',
          }
     }
});
app.component('InputText', InputText);
app.component('Button', Button);
app.component('Dialog', Dialog);
app.component('DataTable',DataTable);
app.component('Column',Column);
app.component('Textarea', Textarea);
app.component('Select', Select);
app.component('Tag', Tag);

 app.mount('#app')