import Vue from 'vue';
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required, min, email, is } from 'vee-validate/dist/rules';

export default function({ $axios }) {
  Vue.component('ValidationProvider', ValidationProvider);
  Vue.component('ValidationObserver', ValidationObserver);

  extend('required', {
    ...required,
    message: 'Required Information'
  });
  extend('min', {
    ...min,
    message: 'This field should have length of {length}'
  });
  extend('email', {
    ...email,
    message: 'Invalid Email Address'
  });
  extend('is', {
    ...is,
    message: 'The confirmation does not match'
  });


  extend('available_email', value => {
    return $axios.$get(`/api/auth/verifyEmail/${value}`).then((res) => {
      return {
        valid: res.errorCode !== 'error_000001'
      };
    });
  });

  v => {
    v = v.replace(/-/g, '');
    return /^[0-9]{11}$/.test(v) || this.$t('mobile_number_should');
  };

  extend('is_mobile_number', value => {
    value = value.replace(/-/g, '');
    return {
      valid: /^[0-9]{11}$/.test(value)
    };
  });

  extend('pwd_enhancer', value => { // 6자 이상, 20자 이하, 영문+숫자+특수문자 최소 한글자 포함
    return /(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9\s])(?=.+)(^.{6,20}$)/.test(value);
  });


  // Vue.use(VeeValidate, {
  //   dictionary: {
  //     en: {
  //       messages: {
  //         email: 'Invalid Email Address',
  //         required: 'Required Information',
  //         available_email: 'This email is already signed up',
  //         is_mobile_number: 'Mobile number should have length of 11',
  //         pwd_enhancer: 'Password between 6 and 20 characters; must contain at least one lowercase letter, one number, and one special character',
  //         confirmed: 'The confirmation does not match'
  //       }
  //     },
      
  //     ko: {
  //       messages: {
  //         email: '유효하지 않은 이메일 형식입니다',
  //         required: '필수값입니다',
  //         available_email: '이미 가입된 이메일 입니다',
  //         is_mobile_number: '11자리 휴대폰 번호를 입력하세요',
  //         pwd_enhancer: '6자-20자의 영문 소문자, 숫자, 특수문자 조합이어야 합니다',
  //         confirmed: '비밀번호가 일치하지 않습니다'
  //       }
  //     }
  //   }
  // });
}
