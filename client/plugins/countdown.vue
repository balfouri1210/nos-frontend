<template>
  <div>
  <!-- 안쓰이는 플러그인인데 나중에 써먹으려고 여기에 html과 관련 함수들을 저장해놓는다 (20200202) -->
  <!-- 기본 카운트다운, 카운트다운 초기화, 00:00 포맷팅을 할 수 있다. -->
  
  <!-- <div class="settings__expiration">
      <label for="verificationCode">Verification Code</label>

      <countdown
        :key="componentKey"
        class="settings__expiration-timer"
        :time="expirationTime" 5000을 하면 5초 뒤 만료로 설정됨.
        :interval="1000" 카운트다운 단위
        :transform="transform"
        tag="p"
        @end="expirationCountdownEnd" 만료 이벤트
      >
        <template slot-scope="props">
          Expiration in <span>{{ props.minutes }}:{{ props.seconds }}</span>
        </template>
      </countdown>
    </div> -->
  </div>
</template>

<script>
// 카운트다운 초기화 함수
// forceRerender() {
//   this.componentKey += 1;
// },

// 00:00 포맷 만들어주는 함수. 따로 호출하지 않아도 됨. 등록만 하면 된다.
// transform(props) {
//   Object.entries(props).forEach(([key, value]) => {
//     // Adds leading zero
//     const digits = value < 10 ? `0${value}` : value;

//     props[key] = `${digits}`;
//   });

//   return props;
// }

export default {};
</script>

<style>
</style>