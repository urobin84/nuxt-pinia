<template>
  <div class="container flex items-center justify-center">
    <div>
      <h1>Welcome</h1>
      <p>Sign in to your profile</p>
      <button @click="signIn" class="px-3 py-2 rounded-md bg-emerald-500 text-white inline-flex items-center">Sign
        In</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const userStore = useUserStore();

  definePageMeta({
      middleware: ['already-auth']
  });

  const signIn = async () => {
    await userStore.signIn({
      username: 'emilys',
      password: 'emilyspass',
      expiresInMins: 30,
    });

    await navigateTo('/profile', { replace: true })
  }
</script>

<style>

</style>