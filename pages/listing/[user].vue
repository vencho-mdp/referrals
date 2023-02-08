<script setup>
const user = computed(() => useUser()?.value);
const firstLetterToUpperCase = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

const { data } = useSession();
if (!useUser().value) {
  const { data: user } = await useFetch("/api/user", {
    query: { id: useRoute().params.user },
  });
  useUser().value = user.value.data;
}
const possibleFields = ["education", "companies", "job", "location", "email"];
const validFieldsKeys = computed(() => {
  const validFields = Object.keys(user.value).filter(
    (key) =>
      !!user.value[key] &&
      user.value[key].length > 0 &&
      possibleFields.includes(key) &&
      (Array.isArray(user.value[key]) ? user.value[key].join("") : true)
  );
  return validFields;
});
</script>
<template>
  <div class="p-8 min-h-screen flex flex-col justify-around">
    <h4 class="font-bold text-2xl text-center pb-8">
      {{ user.first_name + " " + user.last_name }}
    </h4>
    <div class="mx-16 md:mx-auto flex items-center justify-center">
      <img
        :src="user && user.avatar_url"
        :alt="user && user.first_name + ' ' + user.last_name"
        class="w-64 h-64 aspect-square rounded-xl"
      />
    </div>

    <div class="flex flex-col gap-4 p-4 items-center">
      <div
        v-for="field in validFieldsKeys"
        :key="field"
        class="flex flex-col gap-2 items-start p-2 w-full md:mx-auto max-w-lg"
      >
        <h5 class="text-lg font-semibold text-left">
          {{ firstLetterToUpperCase(field) }}
        </h5>
        <p class="text-lg font-semibold text-gray-500">
          {{
            Array.isArray(user[field]) ? user[field].join(", ") : user[field]
          }}
        </p>
      </div>
    </div>
    <div
      class="min-w-full flex items-center justify-center mt-auto mb-16"
      v-if="user.email"
    >
      <a
        :href="`mailto:${user.email}`"
        class="text-white max-w-sm text-center bg-blue-700 w-full hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Contact
      </a>
    </div>
  </div>
</template>
