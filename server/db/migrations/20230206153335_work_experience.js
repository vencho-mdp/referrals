/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("work_experience", (table) => {
    table
      .string("user_id")
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");
    table.string("company_name");
    table.primary(["user_id", "company_name"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("work_experience");
};
