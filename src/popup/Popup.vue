<template>
  <main>
    <h3 class="title">Password Keeper</h3>
    <ul class="mb-3">
      <li
        v-for="it in accountList"
        class="p-2 border-b border-b-green-300 leading-3"
      >
        <h4 class="mb-3 font-medium">{{ it.system }}</h4>
        <div class="flex justify-between">
          <span class="account">
            <span class="mr-1">{{ it.username }}</span>
            <span>{{ it.password }}</span>
          </span>
          <i-mdi-vector-arrange-below
            title="复制"
            class="copy cursor-pointer"
            @click="copyPassword(it)"
          />
        </div>
      </li>
    </ul>
    <div class="info">
      <h6 class="version">v 0.0.1</h6>
      <a href="https://github.com/mh1874/password-keeper" target="_blank">
        <i-mdi-github class="inline" />
        <span class="ml-1">Power by {{ MH }}</span>
      </a>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { AccountItem } from './types';

const MH = ref('mh1874');

const accountList = ref<AccountItem[]>([
  {
    id: 1,
    system: 'QMS dev',
    username: 'admin',
    password: 'j0H8fAC~dY-Z^Uo',
  },
]);

const copyPassword = (it: AccountItem) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(it.password);
    ElMessage({ message: 'copied!', type: 'success' });
  }
};
</script>

<style scoped>
main {
  padding: 1em;
}

.title {
  color: #42b983;
  text-transform: uppercase;
  font-size: 1.5rem;
  font-weight: 200;
  line-height: 1.2rem;
  margin: 0.5rem auto;
}
.version {
  font-size: 0.5rem;
  color: #333333;
  margin: 0.1rem 0;
}

.copy:hover {
  color: #777df7;
}

@media (min-width: 480px) {
  .title {
    max-width: none;
  }
}

@media (prefers-color-scheme: light) {
  a:hover {
    color: #747bff;
  }

  .version {
    color: #333333;
  }
}
</style>
