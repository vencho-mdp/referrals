<script setup>
const { data, getSession } = useSession();
const { data: userData, refresh } = await useFetch("/api/user", {
  query: {
    id: data.value.user.id,
  },
});
const { data: users } = await useFetch("/api/users", {
  query: {
    get_those_who_want_referral: !userData.value?.data?.wants_referral,
  },
});
if (userData.value?.data?.wants_referral === null) {
  navigateTo("/role");
}
const title = !userData.value?.data?.wants_referral
  ? "Candidates"
  : "FAANG Employees";
let showValidationForm = $ref(false);
const validated = async () => {
  showValidationForm = false;
  await refresh();
};
</script>
<template>
  <main class="px-4 py-16 min-h-screen">
    <h1 class="text-2xl font-bold text-center mb-12">{{ title }}</h1>
    <WarningProfileNotValidated
      v-if="!userData.data || !userData.data.has_full_information"
      v-model:show="showValidationForm"
    />
    <div class="flex flex-col gap-8 items-center" v-else>
      <UserItem
        v-for="user in users"
        @clicked="
          () => {
            useUser().value = user;
            navigateTo(`/listing/${user.id}`);
          }
        "
        :key="user.id"
        :user="user"
      />
    </div>
    <Teleport to="body">
      <!-- modal -->
      <div
        class="flex items-center absolute top-0 justify-center bg-neutral-500 bg-opacity-50 h-screen w-screen"
        v-if="showValidationForm"
      >
        <div
          data-modal-backdrop="static"
          class="z-50 p-4 my-auto bg-white shadow-lg rounded-lg mx-2 w-full md:w-96"
        >
          <span class="flex w-full justify-end items-center">
            <button @click="showValidationForm = false" class="ml-auto">
              <Icon name="gridicons:cross" size="24px" />
            </button>
          </span>

          <FormValidateProfile @validated="validated" />
        </div>
      </div>
    </Teleport>
  </main>
</template>
