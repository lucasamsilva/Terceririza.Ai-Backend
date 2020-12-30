
exports.up = function(knex) {
    return knex.schema.createTable('terceirizados', function (table) {
        table.increments();
        table.integer('usuarioId').unsigned().notNull();
        table.foreign('usuarioId').references('id').inTable('usuarios');
        table.string('area').notNull();
        table.string('servicoprestado');
        table.string('equipamentos');
        table.boolean('ativo').notNull();
    })
};

exports.down = function(knex) {
    knex.schema.dropTable('terceirizados')
};
