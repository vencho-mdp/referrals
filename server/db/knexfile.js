// let config =
//   typeof useRuntimeConfig !== "undefined"
//     ? useRuntimeConfig()
//     : {
//         DATABASE_URL: ,
//       };

const knex = {
  client: "pg",
  // @alert harcoded
  connection: "postgres://postgres:postgres@localhost:5432/referrals",
};

module.exports = knex;
