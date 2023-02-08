<script setup>
definePageMeta({ auth: false });
const { signIn, data } = useSession();
if (data.value) {
  navigateTo("/listing");
}
</script>
<template>
  <div
    class="p-32 text-center flex flex-col items-center justify-center min-h-full"
  >
    <h1 class="text-4xl font-bold min-w-fit">Log&nbsp;in</h1>
    <button
      class="text-white bg-blue-700 mt-64 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base min-w-max my-auto px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      @click="signIn('linkedin', { redirect: '/listing' })"
    >
      Log in with&nbsp;Linkedin <Icon name="mdi:linkedin" />
    </button>
  </div>
</template>
