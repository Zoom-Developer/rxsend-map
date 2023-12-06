SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `rxmap`
--

-- --------------------------------------------------------

--
-- Структура таблицы `points`
--

CREATE TABLE `points` (
  `id` int NOT NULL,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `type` varchar(16) NOT NULL,
  `pos_x` float NOT NULL,
  `pos_y` float NOT NULL,
  `zone` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `zones`
--

CREATE TABLE `zones` (
  `id` varchar(16) NOT NULL,
  `name` text NOT NULL,
  `map_file` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `zones`
--

INSERT INTO `zones` (`id`, `name`, `map_file`) VALUES
('ez', 'Офисная зона', '/maps/ez.jpg'),
('hcz', 'Зона тяжёлого содержания', '/maps/hcz.jpg'),
('lcz', 'Зона лёгкого содержания', '/maps/lcz.jpg');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `points`
--
ALTER TABLE `points`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `zones`
--
ALTER TABLE `zones`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `points`
--
ALTER TABLE `points`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
