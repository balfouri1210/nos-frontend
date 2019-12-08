<template>
  <div class="signup">
    <form @submit="signup">
      <input type="email" v-model="email">
      <input type="password" v-model="password">
      <button
        type="submit"
        @click.prevent="signup">SIGNUP</button>
    </form>
  </div>
</template>

<script>
import Base from './_base';

export default {
  mixins: [Base]
};
</script>

<style>
</style>