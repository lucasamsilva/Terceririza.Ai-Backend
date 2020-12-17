
exports.up = function (knex) {
    return knex.schema.createTable('usuarios', function (table) {
        table.increments();
        table.string('nome').notNull();
        table.string('email').notNull().unique();
        table.string('senha').notNull();
        table.string('cpf');
        table.string('cnpj');
        table.datetime('created_At').defaultTo(knex.fn.now());
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('usuarios');
};
