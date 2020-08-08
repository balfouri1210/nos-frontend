<template>
  <a
    class="link-preview"
    :href="meta.url"
    target="_blank"
  >
    <div class="link-preview__text">
      <p class="link-preview__title">
        <img
          v-if="meta.icon"
          :src="meta.icon"
        ><span>{{ meta.title }}</span>
      </p>
      <p class="link-preview__desc">
        {{ meta.description }}
      </p>
    </div>

    <div class="link-preview__image">
      <img
        v-if="meta.image"
        :src="meta.image"
        class="link-preview__image"
      >
    </div>
  </a>
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style lang="scss" scoped>
.link-preview {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 2px 12px 2px 14px;

  &__title,
  &__desc {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__text {
    flex: 60;
    margin-right: 12px;
  }
  &__title {
    font-weight: 400;

    img {
      height: 20px;
      margin-right: 5px;
      vertical-align: middle;
    }

    span {
      font-size: 13px;
      vertical-align: middle;
    }
  }
  &__desc {
    margin-top: 4px;
    font-size: 12px;
    font-weight: 300;
    line-height: 18px;
    color: rgba(0, 0, 0, 0.7);
  }

  &__image {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 40;

    img {
      width: 100%;
      max-width: 300px;
      border-radius: 6px;
    }
  }
}

.link-preview::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  content: "";
}

@media screen and (min-width: $mobile-width) {
  .link-preview {
    padding: 2px 16px;

    &__text {
      flex: 70;
    }

    &__title {
      span {
        font-size: 14px;
      }
    }

    &__desc {
      font-size: 13px;
    }

    &__image {
      flex: 30;
    }
  }

  .link-preview::before {
    left: -2px;
  }
}
</style>