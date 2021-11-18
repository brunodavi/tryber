const connection = require("./connection");

// Converte de snake_case para camelCase

const serialize = (bookData) => ({
  id: bookData.id,
  title: bookData.title,
  authorId: bookData.author_id,
});

// Busca todos os autores do banco.

const getAll = async () => {
  const [books] = await connection.execute(
    "SELECT * FROM model_example.books;"
  );
  return books.map(serialize);
};

/*
Busca um autor específico, a partir do seu ID
@param {String} id ID do autor a ser recuperado
*/

const findById = async (id) => {
  // Repare que substituímos o id por `?` na query.
  // Depois, ao executá-la, informamos um array com o id para o método `execute`.
  // O `mysql2` vai realizar, de forma segura, a substituição do `?` pelo id informado.
  const query = "SELECT * FROM model_example.books WHERE id = ?";
  const [bookData] = await connection.execute(query, [id]);

  if (bookData.length === 0) return null;

  // Utilizamos [0] para buscar a primeira linha, que deve ser a única no array de resultados, pois estamos buscando por ID.

  return serialize(bookData[0]);
};

const getByAuthorId = async (authorId) => {
  const query = "SELECT * FROM model_example.books WHERE author_id = ?";
  const [books] = await connection.execute(query, [authorId]);

  if (books.length === 0) return null;

  return books.map(serialize);
};

const isValid = (title, authorId) => {
  if (!title || typeof title !== "string") return false;
  if (!authorId || typeof authorId !== "number") return false;

  return true;
};

const create = async (title, authorId) =>
  connection.execute(
    "INSERT INTO model_example.books (title, author_id) VALUES (?,?)",
    [title, authorId]
  );

module.exports = {
  getAll,
  findById,
  getByAuthorId,
  isValid,
  create,
};