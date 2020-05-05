// parameters: to, from, savedPosition
export default function (to, from) {
  // leaderboard와 player modal을 오갈 때 스크롤 고정
  if (from.path === '/'
  && to.name.indexOf('index-player-playerName') !== -1) { console.log('fix'); return; }

  if (from.name.indexOf('index-player-playerName') !== -1
  && to.path === '/')  { console.log('fix'); return; }

  // history leaderboard와 history player modal을 오갈 때 스크롤 고정
  if (from.name.indexOf('history-historyId-player') !== -1
  && to.name.indexOf('history-historyId-player-playerName') !== -1)  { console.log('fix'); return; }

  if (from.name.indexOf('history-historyId-player-playerName') !== -1
  && to.name.indexOf('history-historyId-player') !== -1)  { console.log('fix'); return; }

  // 나머지 경우에는 scroll top
  else return { x: 0, y: 0 };
}
