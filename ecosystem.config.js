module.exports = {
  apps: [
    {
      name: "Referrals",
      port: "3000",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
      env: {
        ORIGIN: "https://referfortech.site",
        NUXT_LINKEDIN_CLIENT_ID: "783x38dt7lt81e",
        NUXT_LINKEDIN_CLIENT_SECRET: "CJuIEakgEoxxVntF",
        NUXT_DATABASE_URL:
          "postgres://postgres:new_password@localhost:5432/referrals",
        NUXT_LINKEDIN_PASSWORD: "Benicapo2",
        NUXT_LINKEDIN_EMAIL: "beniciocardozomdp@gmail.com",
      },
    },
  ],
};
