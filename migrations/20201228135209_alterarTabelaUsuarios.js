
exports.up = function (knex) {
    return knex.schema.alterTable('usuarios', function (table) {
        table.string('cidade').notNull();
        table.string('UF').notNull();
        table.string('telefone').notNull();
    })
};

exports.down = function (knex) {
    return knex.schema.alterTable('usuarios', function (table) {
        table.dropColumn('cidade');
        table.dropColumn('UF');
        table.dropColumn('telefone');
    })
};
