<template>
  <div class="not-found-page">
    <div class="not-found-page__code">404</div>
    <h1 class="not-found-page__title">Страница не найдена</h1>
    <h4 class="not-found-page__link-wrap">
      <router-link :to="{ name: 'Dashboard' }">
        Вернуться на главную
      </router-link>
    </h4>
  </div>
</template>

<script setup></script>

<style rel="stylesheet/scss" lang="scss" scoped>
.not-found-page {
  margin-bottom: 10%;
  text-align: center;
  color: #4a4a4a;

  &__code {
    font-size: 12em;
    user-select: none;
  }

  &__title {
    font-size: 2em;
    user-select: none;
  }

  &__link-wrap {
    margin-top: 40px;

    a {
      font-size: 23px;
      color: #1779ba;
      user-select: none;
      text-decoration: underline;

      &:hover {
        text-decoration: none;
        opacity: 0.9;
      }
    }
  }
}
</style>
