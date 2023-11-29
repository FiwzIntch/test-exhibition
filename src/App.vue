<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="bg-base-200">
    <div class="navbar bg-primary">
      <RouterLink :to="{ name: 'list' }" class="btn btn-ghost text-xl"> Exhibition </RouterLink>
    </div>
    <main>
      <div class="min-h-screen overscroll-auto p-6">
        <RouterView />
      </div>
    </main>
  </div>
</template>
