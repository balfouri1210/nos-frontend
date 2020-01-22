import Vue from 'vue';

// Vue spinner에서 제공하는 여러가지 컴포넌트가 있다 PulseLoader, GridLoader ..
// 이중에 쓰고싶은걸 골라 component에 등록해야 사용할 수 있다.
// https://github.com/greyby/vue-spinner 참고
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

export default function() {
  Vue.component('PulseLoader', PulseLoader);
}