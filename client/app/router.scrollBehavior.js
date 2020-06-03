// parameters: to, from, savedPosition
export default function (to, from) {
  // page not found일 경우
  if (!from.name) return;

  // leaderboard와 player modal을 오갈 때 스크롤 고정
  if (from.name.indexOf('index___') !== -1
  && to.name.indexOf('index-player-playerId-playerName') !== -1) return;

  if (from.name.indexOf('index-player-playerId-playerName') !== -1
  && to.name.indexOf('index___') !== -1)  return;

  // history leaderboard와 history player modal을 오갈 때 스크롤 고정
  if (from.name.indexOf('history-historyId') !== -1
  && to.name.indexOf('history-historyId-player-playerId-playerName') !== -1)  return;

  if (from.name.indexOf('history-historyId-player-playerId-playerName') !== -1
  && to.name.indexOf('history-historyId') !== -1)  return;

  // 나머지 경우에는 scroll top
  else return { x: 0, y: 0 };
}
