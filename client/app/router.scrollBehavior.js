// parameters: to, from, savedPosition
export default function (to) {
  if (to.path === '/' || to.path.indexOf('/player') !== -1) return;
  else return { x: 0, y: 0 };
}
