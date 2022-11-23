const URL_REGEXP = /^(https?:\/\/)(www\.)?([\da-z.-]+\.[a-z.]{2,6}|[\d.]+)(\/?[\da-z-._~:?#[\]@!$&'()*+,;=]+\/?)*/;
const DEFAULT_MESSAGE_ERROR = 'Ошибка по умолчанию.';
const NOT_FOUND_ERROR = 'Объект по указанному _id не найден.';
const PAGE_NOT_FOUND_ERROR = 'Страница не найдена.';
const UNAUTHORIZED_ERROR = 'Необходима авторизация.';
const INCORRECT_DATA_ERROR = 'Переданы некорректные данные.';
const CONFLICT_ERROR = 'Конфликт. Объект с указанными данными уже существует.';
const FORBIDDEN_ERROR = 'Запрещено.';
const DELETION_FORBIDDEN_ERROR = 'Удаление Запрещено.';
module.exports = {
  URL_REGEXP,
  DEFAULT_MESSAGE_ERROR,
  PAGE_NOT_FOUND_ERROR,
  NOT_FOUND_ERROR,
  UNAUTHORIZED_ERROR,
  INCORRECT_DATA_ERROR,
  CONFLICT_ERROR,
  FORBIDDEN_ERROR,
  DELETION_FORBIDDEN_ERROR,
};
