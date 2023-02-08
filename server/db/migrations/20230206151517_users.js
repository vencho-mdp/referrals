/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("users", (table) => {
    table.string("id").primary().unique().notNullable();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("job");
    table.string("location");
    table.string("avatar_url", 1200).notNullable();
    table.string("email");
    table.boolean("wants_referral");
    table.boolean("has_full_information").defaultTo(false);

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable("users");
};
