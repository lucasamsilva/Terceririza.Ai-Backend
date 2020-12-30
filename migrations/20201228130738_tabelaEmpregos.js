
exports.up = function(knex) {
    return knex.schema.createTable('empregos', function (table) {
        table.increments();
        table.integer('usuarioId').unsigned().notNull();
        table.foreign('usuarioId').references('id').inTable('usuarios');
        table.string('descricao').notNull();
        table.string('area').notNull();
        table.string('titulo').notNull();
        table.string('equipamentos');
        table.boolean('ativo').notNull();
        table.datetime('criadoEm').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    knex.schema.dropTable('empregos')
};
