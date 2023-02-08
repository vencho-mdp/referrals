<script setup>
const handleChangeOfRole = async (wants_referral) => {
  await $fetch("/api/role", {
    method: "POST",
    body: JSON.stringify({ wants_referral }),
  });
  navigateTo("/listing");
};
</script>
<template>
  <div
    class="p-32 text-center flex flex-col items-center justify-center min-h-full"
  >
    <h1 class="text-4xl font-bold min-w-fit">Get&nbsp;started</h1>
    <button
      class="text-white bg-blue-700 mt-32 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base min-w-max my-auto px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      @click="handleChangeOfRole(true)"
    >
      I&nbsp;want&nbsp;referral <Icon name="ph:arrow-circle-right" />
    </button>
    <button
      type="button"
      @click="handleChangeOfRole(false)"
      class="text-blue-700 duration-200 hover:text-white border mt-24 border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg min-w-max text-base px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
    >
      I&nbsp;give&nbsp;referral&nbsp;<Icon name="ph:arrow-circle-right" />
    </button>
  </div>
</template>
