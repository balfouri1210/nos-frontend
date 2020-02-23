<template>
  <div class="home">
    <!-- <div
      v-if="getJwt()"
      style="color: hotpink"
    >
      Hello, {{ getUsername() }}
    </div> -->

    <ul class="players">
      <li
        v-for="(player, index) in players"
        :key="index"
        class="player"
      >
        <nuxt-link
          :to="localePath({
            path: `/player/${player.name}-${player.id}`
          })"
        >
          <div
            class="player__image"
            :style="{
              backgroundImage: `url(${player.imgSrc})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }"
          />
          <p class="player__meta">
            {{ player.name }} / {{ player.team }}
          </p>
        </nuxt-link>
      </li>
    </ul>

    <!-- Nuxt child for player modal -->
    <nuxt-child />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('auth');

export default {
  data() {
    return {
      stage: process.env.STAGE,

      players: [
        {
          id: 1,
          name: 'Lionel Messii',
          team: 'FC Barcelona',
          imgSrc: `${process.env.NOS_IMAGE_URL}/players/messi.png`
        },
        {
          id: 2,
          name: 'Paulo Dybala',
          team: 'FC Juventus',
          imgSrc: `${process.env.NOS_IMAGE_URL}/players/dybala.jpg`
        },
        {
          id: 3,
          name: 'Marco Reus',
          team: 'Borussia Dortmund',
          imgSrc: `${process.env.NOS_IMAGE_URL}/players/reus.png`
        },
        {
          id: 4,
          name: 'Kangin Lee',
          team: 'FC Valencia',
          imgSrc: `${process.env.NOS_IMAGE_URL}/players/kangin.png`
        },
        {
          id: 5,
          name: 'Kangin Lee',
          team: 'FC Valencia',
          imgSrc: `${process.env.NOS_IMAGE_URL}/players/antoine_griezman.jpg`
        },
        {
          id: 6,
          name: 'Kangin Lee',
          team: 'FC Valencia',
          imgSrc: `${process.env.NOS_IMAGE_URL}/players/casemiro.jpg`
        },
        {
          id: 7,
          name: 'Kangin Lee',
          team: 'FC Valencia',
          imgSrc: `${process.env.NOS_IMAGE_URL}/players/cristiano_ronaldo.jpg`
        },
        {
          id: 8,
          name: 'Kangin Lee',
          team: 'FC Valencia',
          imgSrc: `${process.env.NOS_IMAGE_URL}/players/david_beckham.jpg`
        },
        {
          id: 9,
          name: 'Kangin Lee',
          team: 'FC Valencia',
          imgSrc: `${process.env.NOS_IMAGE_URL}/players/ivan_rakitic.jpg`
        },
        {
          id: 10,
          name: 'Kangin Lee',
          team: 'FC Valencia',
          imgSrc: `${process.env.NOS_IMAGE_URL}/players/kevin_de_bruyne.jpg`
        },
        {
          id: 11,
          name: 'Kangin Lee',
          team: 'FC Valencia',
          imgSrc: `${process.env.NOS_IMAGE_URL}/players/luka_modric.jpg`
        },
        {
          id: 12,
          name: 'Kangin Lee',
          team: 'FC Valencia',
          imgSrc: `${process.env.NOS_IMAGE_URL}/players/mesut_ozil.jpg`
        },
        {
          id: 13,
          name: 'Kangin Lee',
          team: 'FC Valencia',
          imgSrc: `${process.env.NOS_IMAGE_URL}/players/radja_nainggolan.jpg`
        },
        {
          id: 14,
          name: 'Kangin Lee',
          team: 'FC Valencia',
          imgSrc: `${process.env.NOS_IMAGE_URL}/players/neymar.jpg`
        }
      ]
    };
  },

  methods: {
    ...mapGetters(['getJwt', 'getUsername'])
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  margin-bottom: 120px;
  overflow: auto;

  .players {
    display: grid;
    grid-gap: 1px;
    list-style: none;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2px;
    width: 100%;
    margin-top: 2px;
  }

  .player {
    width: 100%;

    a {
      display: inline-block;
      position: relative;
      width: 100%;
      height: 100%;
    }

    &__image {
      width: 100%;
    }

    &__image:before {
      display: inline-block;
      width: 100%;
      height: 0;
      padding-bottom: calc(100% / (1 / 1.47));
      content: "";
    }

    &__meta {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 2px 8px;
      background: rgba(0, 0, 0, 0.6);
      color: white;
      text-align: center;
      font-size: 12px;
      font-weight: 400;
    }
  }
}

@media only screen and (min-width: $mobile-width) {
  .home {
    .players {
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 12px;
      margin-top: 18px;
    }

    .player {
      &__meta {
        padding: 4px 8px;
        font-size: 13px;
      }
    }
  }
}
</style>

<i18n>
{
  "en": {
    "greeting": "Localization test - Hi there!"
  },

  "ko": {
    "greeting": "다국어 지원 테스트 - 안녕하세요!"
  }
}
</i18n>
