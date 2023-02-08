<script setup>
const { user } = defineProps({
  user: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits("clicked");
</script>
<template>
  <span
    class="flex justify-start cursor-pointer items-center max-w-md w-full px-4 py-2 border border-blue-200 hover:shadow-xl transition duration-200 rounded-full"
    @click="emit('clicked')"
  >
    <img
      class="w-10 h-10 rounded-full"
      :src="user.avatar_url"
      alt="Rounded avatar"
    />
    <div class="flex flex-col ml-4 p-0.5">
      <h3 class="text-lg font-semibold">
        {{ user.first_name + " " + user.last_name }}
      </h3>
      <h5
        class="text-base font-semibold text-gray-500"
        v-if="user.location || user.job || user.email"
      >
        {{ user.location || user.job || user.email }}
      </h5>
    </div>
  </span>
</template>
