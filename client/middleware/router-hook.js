// Do something when router is changed
// 혹시나 beforeEach, beforeAfter를 사용하려면, 수많은 삽질 시도끝에 안된다는걸 깨달았다.
// 여길 참고할 것 https://dev.to/husteadrobert/how-to-use-global-navigation-guards-with-nuxt-middleware-and-why-you-absolutely-should-not-7bl
export default function ({ store, route }) {
  if (process.client) store.$gtagTrackSpaPage(route.fullPath);
  return;
}