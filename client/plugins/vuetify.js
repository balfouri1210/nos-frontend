import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import nosEmojiHmm from '@/components/nos-emoji-hmm/nos-emoji-hmm.vue';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    values: {
      hmm: {
        component: nosEmojiHmm
      }
    }
  }
});
