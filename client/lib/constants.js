export const apiFootballRequestHeader = {
  headers: {
    'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
    'x-rapidapi-key': process.env.RAPID_API_KEY
  }
};

export const apiFootballLeagueId = {
  epl1920: 524,
  epl2021: 2790,
  faCup1920: 1063,
  faCup2021: 2791,
};

export const TOKEN_EXPIRES = 3;
// export const VERIFICATION_CODE_EXPIRES = 1000 * 60 * 5;
// export const PLAYER_LIST_MAX = 100;

export const eplClubs = [
  {
    id: 1,
    clean_name: 'Arsenal',
    image: 'https://cdn.footystats.org/img/teams/england-arsenal-fc.png',
    official_site: 'https://www.arsenal.com/',
    league_id: 1,
    api_football_team_id: 42,
    color: '#d2264d'
  }, {
    id: 2,
    clean_name: 'Tottenham Hotspur',
    image: 'https://cdn.footystats.org/img/teams/england-tottenham-hotspur-fc.png',
    official_site: 'https://www.tottenhamhotspur.com/',
    league_id: 1,
    api_football_team_id: 47,
    color: '#050e3b'
  }, {
    id: 3,
    clean_name: 'Manchester City',
    image: 'https://cdn.footystats.org/img/teams/england-manchester-city-fc.png',
    official_site: 'https://www.mancity.com/',
    league_id: 1,
    api_football_team_id: 50,
    color: '#7ab4dc'
  }, {
    id: 4,
    clean_name: 'Leicester City',
    image: 'https://cdn.footystats.org/img/teams/england-leicester-city-fc.png',
    official_site: 'https://www.lcfc.com/',
    league_id: 1,
    api_football_team_id: 46,
    color: '#004c96'
  }, {
    id: 5,
    clean_name: 'Crystal Palace',
    image: 'https://cdn.footystats.org/img/teams/england-crystal-palace-fc.png',
    official_site: 'https://www.cpfc.co.uk/',
    league_id: 1,
    api_football_team_id: 52,
    color: '#004a90'
  }, {
    id: 6,
    clean_name: 'Everton',
    image: 'https://cdn.footystats.org/img/teams/england-everton-fc.png',
    official_site: 'https://www.evertonfc.com/',
    league_id: 1,
    api_football_team_id: 45,
    color: '#03319a'
  }, {
    id: 7,
    clean_name: 'Burnley',
    image: 'https://cdn.footystats.org/img/teams/england-burnley-fc.png',
    official_site: 'https://www.burnleyfootballclub.com/',
    league_id: 1,
    api_football_team_id: 44,
    color: '#bce4f6'
  }, {
    id: 8,
    clean_name: 'Southampton',
    image: 'https://cdn.footystats.org/img/teams/england-southampton-fc.png',
    official_site: 'https://www.southamptonfc.com/',
    league_id: 1,
    api_football_team_id: 41,
    color: '#da2227'
  }, {
    id: 28,
    clean_name: 'Fulham',
    image: 'https://cdn.footystats.org/img/teams/england-fulham-fc.png',
    official_site: 'https://www.fulhamfc.com/',
    league_id: 1,
    api_football_team_id: 36,
    color: '#000000'
  }, {
    id: 10,
    clean_name: 'Manchester United',
    image: 'https://cdn.footystats.org/img/teams/england-manchester-united-fc.png',
    official_site: 'https://www.manutd.com/',
    league_id: 1,
    api_football_team_id: 33,
    color: '#f20203'
  }, {
    id: 11,
    clean_name: 'Liverpool',
    image: 'https://cdn.footystats.org/img/teams/england-liverpool-fc.png',
    official_site: 'https://www.liverpoolfc.com/',
    league_id: 1,
    api_football_team_id: 40,
    color: '#d61921'
  }, {
    id: 12,
    clean_name: 'Chelsea',
    image: 'https://cdn.footystats.org/img/teams/england-chelsea-fc.png',
    official_site: 'https://www.chelseafc.com/en',
    league_id: 1,
    api_football_team_id: 49,
    color: '#283990'
  }, {
    id: 13,
    clean_name: 'West Ham United',
    image: 'https://cdn.footystats.org/img/teams/england-west-ham-united-fc.png',
    official_site: 'https://www.whufc.com/',
    league_id: 1,
    api_football_team_id: 48,
    color: '#7c2d3b'
  }, {
    id: 22,
    clean_name: 'West Bromwich Albion',
    image: 'https://cdn.footystats.org/img/teams/england-west-bromwich-albion-fc.png',
    official_site: 'https://www.wba.co.uk/',
    league_id: 1,
    api_football_team_id: 60,
    color: '#20356a'
  }, {
    id: 15,
    clean_name: 'Newcastle United',
    image: 'https://cdn.footystats.org/img/teams/england-newcastle-united-fc.png',
    official_site: 'https://www.nufc.co.uk/',
    league_id: 1,
    api_football_team_id: 34,
    color: '#000000'
  }, {
    id: 16,
    clean_name: 'Aston Villa',
    image: 'https://cdn.footystats.org/img/teams/england-aston-villa-fc.png',
    official_site: 'https://www.avfc.co.uk/',
    league_id: 1,
    api_football_team_id: 66,
    color: '#79013b'
  }, {
    id: 41,
    clean_name: 'Leeds United',
    image: 'https://cdn.footystats.org/img/teams/england-leeds-united-fc.png',
    official_site: 'https://www.leedsunited.com/',
    league_id: 1,
    api_football_team_id: 63,
    color: '#0161aa'
  }, {
    id: 18,
    clean_name: 'Brighton & Hove Albion',
    image: 'https://cdn.footystats.org/img/teams/england-brighton-hove-albion-fc.png',
    official_site: 'https://www.brightonandhovealbion.com/',
    league_id: 1,
    api_football_team_id: 51,
    color: '#0155a5'
  }, {
    id: 19,
    clean_name: 'Wolverhampton Wanderers',
    image: 'https://cdn.footystats.org/img/teams/england-wolverhampton-wanderers-fc.png',
    official_site: 'https://www.wolves.co.uk/',
    league_id: 1,
    api_football_team_id: 39,
    color: '#faa618'
  }, {
    id: 20,
    clean_name: 'Sheffield United',
    image: 'https://cdn.footystats.org/img/teams/england-sheffield-united-fc.png',
    official_site: 'https://www.sufc.co.uk/',
    league_id: 1,
    api_football_team_id: 62,
    color: '#ec1f27'
  }
];

