<script setup>
const isValidProfileLinkedinUrl = (url) => {
  const regex = new RegExp("^(https?:\\/\\/)?(www\\.)?linkedin\\.com\\/in");
  return regex.test(url);
};
const emit = defineEmits(["validated"]);
let url = $ref(null);
let error = $ref(false);
let loading = $ref(false);
const isValid = $computed(() => isValidProfileLinkedinUrl(url));
const submitForm = async () => {
  loading = true;
  try {
    error = false;
    const response = await fetch("/api/validate-profile", {
      method: "POST",
      body: JSON.stringify({ profileUrl: url }),
    });
    if (response.ok) {
      emit("validated");
    } else {
      error = true;
    }
  } catch (error) {
    error = true;
  } finally {
    loading = false;
    url = null;
  }
};
</script>
<template>
  <form @submit.prevent="submitForm">
    <div
      v-if="error"
      class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
      role="alert"
    >
      <span class="font-medium">That's not your profile</span> If you think this
      is not accurate, please contact us.
    </div>
    <div>
      <label
        for="first_name"
        class="block mb-2 text-sm font-medium text-gray-900 mt-8"
        >Linkedin profile URL</label
      >
      <input
        type="text"
        id="first_name"
        class="bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        placeholder="E.g: https://www.linkedin.com/in/williamhgates/"
        required
        v-model="url"
      />
    </div>
    <span class="w-full flex items-center justify-between mt-8">
      <button
        class="text-white disabled:bg-gray-400 enabled:bg-blue-700 enabled:hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
        :disabled="!isValid || loading"
      >
        {{ loading ? "Loading..." : "Validate" }}
      </button>
      <Transition name="fade">
        <div
          v-if="loading"
          class="p-4 mb-4 text-sm max-w-xs text-blue-800 rounded-lg bg-blue-100"
          role="alert"
        >
          <span class="font-medium">Please wait</span> This process may take a
          few minutes.
        </div>
      </Transition>
    </span>
  </form>
</template>
