/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("education", (table) => {
    table
      .string("user_id")
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");
    table.string("school_name");
    table.primary(["user_id", "school_name"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("education");
};
