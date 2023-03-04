<script setup>
const props = defineProps({
  show: {
    type: Boolean,
  },
});
const emit = defineEmits(["update:show"]);
</script>
<template>
  <div
    class="flex p-4 m-4 text-sm text-yellow-800 rounded-lg bg-yellow-100 cursor-pointer max-w-md mx-auto"
    role="alert"
    @click="emit('update:show', true)"
  >
    <svg
      aria-hidden="true"
      class="flex-shrink-0 inline w-5 h-5 mr-3"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clip-rule="evenodd"
      ></path>
    </svg>
    <span class="sr-only">Info</span>
    <div>
      <span class="underline font-semibold">Verify your profile</span>
      To be able to get contacted by recruiters or to see candidates and get in
      touch with them
    </div>
  </div>
</template>
