-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Feb 10, 2023 at 04:57 PM
-- Server version: 8.0.30
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coin_collector`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`%` PROCEDURE `favorited_coins` (IN `userId` INT)   BEGIN
  SELECT
    c.id AS coinId,
    `c`.`name` AS `coinName`,
    `c`.`short_description` AS `shortDescription`,
    `c`.`Description` AS `description`,
    `c2`.`name` AS `issuedByCountry`,
    `c3`.`name` AS `composition`,
    `q`.`name` AS `quality`,
    `c`.`Denomination` AS `denomination`,
    `c`.`Year` AS `year`,
    `c`.`Weight` AS `weight`,
    `c`.`Price` AS `price`,
    `t`.`name` AS `type`,
    `c`.`imageUrl_front` AS `faceImage`,
    `c`.`imageUrl_back` AS `backImage`
  FROM favorites f
    LEFT JOIN coins c
      ON c.id = f.CoinId
      AND c.deleted = 0
    LEFT JOIN `countries` `c2`
      ON `c2`.`id` = `c`.`issued_countryId`
    LEFT JOIN `compositions` `c3`
      ON `c3`.`id` = `c`.`compositionId`
    LEFT JOIN `qualities` `q`
      ON `q`.`id` = `c`.`qualityId`
    LEFT JOIN `types` `t`
      ON `t`.`id` = `c`.`typeId`
  WHERE f.userId = userId;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `favorite_coin` (IN `userId` INT, IN `coinId` INT)   BEGIN
  INSERT INTO favorites (userId, coinId)
    SELECT
      userId,
      coinId
    FROM dual
    WHERE NOT EXISTS (SELECT
        *
      FROM favorites f
      WHERE f.userId = userId
      AND f.coinId = coinId);
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `like_coin` (IN `userId` INT, IN `coinId` INT)   BEGIN
  INSERT INTO likes (userId, coinId)
    SELECT
      userId,
      coinId
    FROM dual
    WHERE NOT EXISTS (SELECT
        *
      FROM likes l1
      WHERE l1.userId = userId
      AND l1.coinId = coinId);
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `similar_coins` (IN `coinId` INT)   BEGIN
  SELECT
    --     c1.id AS id,
    --     c1.name AS CoinName,
    --     c1.imageUrl_front,
    c2.id AS id,
    c2.name AS name,
    c2.imageUrl_front,
    c2.imageUrl_back,
    c2.year,
    c2.issued_countryCode
  FROM coins c1
    JOIN coins c2
      ON  c1.issued_countryCode = c2.issued_countryCode OR c1.year=c2.year OR c1.price=c2.price
    LEFT JOIN countries c
      ON c.code = c2.issued_countryCode
  WHERE c1.id != c2.id
  AND c1.id = coinId
  ORDER BY c1.id;
END$$

--
-- Functions
--
CREATE DEFINER=`root`@`%` FUNCTION `check_user_favorited` (`userId` INT, `coinId` INT) RETURNS TINYINT(1)  BEGIN
  DECLARE result int;
  SELECT
    COUNT(*) INTO result
  FROM favorites f
  WHERE f.userId = userId
  AND f.coinId = coinId;
  RETURN IF(result>0,TRUE,FALSE);
END$$

CREATE DEFINER=`root`@`%` FUNCTION `check_user_like` (`userId` INT, `coinId` INT) RETURNS TINYINT(1)  BEGIN
  DECLARE result int;
  SELECT
    COUNT(*) INTO result
  FROM likes l
  WHERE l.userId = userId
  AND l.coinId = coinId;
  RETURN IF(result>0,TRUE,FALSE);
END$$

CREATE DEFINER=`root`@`%` FUNCTION `favorited_count` (`coinId` INT) RETURNS INT  BEGIN
  RETURN (SELECT COUNT(*) FROM favorites f WHERE f.coinId=coinId);
END$$

CREATE DEFINER=`root`@`%` FUNCTION `increase_coin_view` (`coinId` INT) RETURNS INT  BEGIN
  DECLARE views int DEFAULT 0;
  INSERT INTO coin_views (coinId, view_count)
    VALUES (coinId, 1) ON DUPLICATE KEY UPDATE view_count = view_count + 1;

  SELECT
    cv.view_count INTO @views
  FROM coin_views cv
  WHERE cv.coinId = coinId;
  RETURN @views;
END$$

CREATE DEFINER=`root`@`%` FUNCTION `like_count` (`coinId` INT) RETURNS INT  BEGIN
  RETURN (SELECT COUNT(*) FROM likes l WHERE l.coinId=coinId);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Stand-in structure for view `AllCoinsDetailed`
-- (See below for the actual view)
--
CREATE TABLE `AllCoinsDetailed` (
`backImage` varchar(150)
,`coinId` int
,`coinName` varchar(50)
,`composition` varchar(20)
,`compositionId` int
,`denomination` varchar(20)
,`description` text
,`faceImage` varchar(150)
,`favoriteCount` bigint
,`issuedByCountry` varchar(100)
,`issuedCountryId` varchar(2)
,`likeCount` bigint
,`price` decimal(10,2)
,`quality` varchar(20)
,`qualityId` int
,`shortDescription` varchar(200)
,`type` varchar(40)
,`typeId` int
,`viewCount` bigint
,`weight` decimal(10,2)
,`year` year
);

-- --------------------------------------------------------

--
-- Table structure for table `avatars`
--

CREATE TABLE `avatars` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `avatar_url` varchar(150) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Stand-in structure for view `CategoryViewsStatistics`
-- (See below for the actual view)
--
CREATE TABLE `CategoryViewsStatistics` (
`categoryName` varchar(40)
,`totalViews` decimal(41,0)
);

-- --------------------------------------------------------

--
-- Table structure for table `coins`
--

CREATE TABLE `coins` (
  `id` int NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `short_description` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `issued_countryCode` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `compositionId` int DEFAULT NULL,
  `qualityId` int DEFAULT NULL,
  `denomination` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `year` year DEFAULT NULL,
  `weight` decimal(10,2) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `typeId` int DEFAULT NULL,
  `imageUrl_front` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '/static/images/coin.png',
  `imageUrl_back` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '/static/images/coin.png',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coins`
--

INSERT INTO `coins` (`id`, `name`, `short_description`, `description`, `issued_countryCode`, `compositionId`, `qualityId`, `denomination`, `year`, `weight`, `price`, `typeId`, `imageUrl_front`, `imageUrl_back`, `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted`) VALUES
(4, 'Canadian Beaver', '\"Canadian beaver\". Unique coin with the image of a beaver. Face value - 5 cents. Created under Elizabeth II.', 'In the center of the obverse is a portrait of Queen Elizabeth II, the profile is directed to the right. The inscription on the left semicircle (English) ELIZABETH II, on the right semicircle D · G · REGINA (ELIZABETH II QUEEN by the Grace of GOD) with dots. Below is a mint mark.\r\nIn the center of the coin reverse is a Canadian beaver on a rock sticking out of the water. At the top is a semicircle with the inscription \"5 cents\" between two maple leaves. At the bottom in two lines is the inscription CANADA (CANADA) and the year of minting.', 'CA', 2, 1, '5 cents', 1965, '5.00', '40.00', 1, '/static/uploads/f42284281c6779544b2861f8cb5a47d2.png', '/static/uploads/0d2d5402180971cba7f63ae829500a77.png', '2023-01-25 18:03:12', 1, NULL, NULL, 0),
(6, 'Looney', '\"Looney\". Unique coin with the image of a goat. Canadian dollar symbol.', 'The reverse of the coin depicts a black goat - a symbol of Canada and an inscription divided into the lower and upper semicircle \"Canadian dollar\".\r\n\r\nThe obverse depicts Queen Elizabeth II. The inscription on the left semicircle (English) ELIZABETH II, on the right semicircle D · G · REGINA (ELIZABETH II QUEEN by the Grace of GOD) with dots. Below is the year of coinage.', 'CA', 1, 1, '1 dollar', 1970, '5.40', '65.00', 1, '/static/uploads/438c56fd8c411355d35af2b23b5012a5.png', '/static/uploads/837222ac4f5fe914bc6a1f11ed13f950.png', '2023-02-02 14:36:57', 1, '2023-02-02 21:31:30', 1, 0),
(8, 'Jefferson', 'Unique coin featuring Thomas Jefferson, the 3rd American president. Face value - 5 cents.', 'The obverse of the coin depicts a bust of the 3rd American president, Thomas Jefferson. The inscription on the right semicircle \"IN GOD WE TRUST\". Below is the inscription “FREEDOM” and the year of minting. Under the image of Jefferson was a monogram of an engraver. The initials of the engraver FS first appeared on coins in 1966.\r\n\r\nThe reverse side shows the Jefferson Monticello estate, as well as the inscription: on the top - the motto “E PLURIBUS UNUM”, on the bottom - the inscriptions “MONTICELLO”, “FIVE CENTS” and “UNITED STATES OF AMERICA”.', 'US', 2, 1, '5 cents', 2023, '3.54', '35.00', 1, '/static/uploads/b6c4c7fa2029f7e48fb3d0835cc1adc7.png', '/static/uploads/afc8943ee2b5fffd94bff2f507cc6444.png', '2023-02-02 15:31:07', 1, '2023-02-02 21:30:21', 1, 0),
(64, 'Coin of the Weimar Republic', 'The Hindenburg Coin with the coat of arms of the Weimar Republic.', 'On the obverse, in the center of the coin, at the top is the coat of arms of the Weimar Republic. In the center below is the coat of arms of the Hindenburg family. This is a shield divided into 4 fields - in the upper left and lower right corners there is a head of a bull.\r\n\r\nOn the reverse side is a portrait of Paul von Hindenburg (1847–1934), Field Marshal, President of the Weimar Republic in 1925–1934 (right). Along the edge of the coin is a semicircle of date: 1847-1927 and the inscription: * * REICHSPRASIDENT * VON * HINDENBURG •. At the bottom left of the portrait is a letter denoting a German mint.', 'AZ', 4, 1, '5 Mark', 1927, '4.76', '142.00', 2, '/static/uploads/f1176276da4d618a92c5d0a85b56e447.png', '/static/uploads/3cff13a5c371ab7d2d726788f29842e2.png', '2023-02-08 12:28:28', 1, '2023-02-08 17:36:04', 1, 0),
(65, 'Rial', 'Iranian silver coin with the image of a lion. Face value 5000 five thousand dinars (5 five taps). 1928 year.', 'It depicts a bust of Reza Shah, whose head is turned to the right.\r\n\r\nOn the other side is a lion with a saber in front of the radiant sun. Above it is a crown.\r\n\r\nBefore the monetary reform of 1932, the currency of Iran was fog. (1 fog = 10 clicks, 1 crane = 1000 dinars.)\r\n\r\nCurrently, the name \"fog\" is used to denote the amount of 10 reais.', 'IR', 4, 1, '5000 Dinars', 1928, '6.12', '98.00', 3, '/static/uploads/5f7e168e3ed7a4042e70ee4abc3fbbe0.png', '/static/uploads/7342a0c595a2fe11793af0ba8a037eea.png', '2023-02-08 12:28:28', 1, '2023-02-08 17:39:09', 1, 0),
(66, 'Sailboat', 'Portuguese silver coin with the image of a sailing ship. ', 'Portuguese silver coin in 5 five escudos. It has been produced since 1933.\r\nOn one side of the coin is a sailing ship floating in the sea.\r\nOn the other side of the coin is a shield with smaller shields in front of a stylized globe.', 'PT', 4, 1, '5 Escudos', 1933, '4.40', '134.00', 3, '/static/uploads/4266c879d3a4235d95452ad315d5fdba.png', '/static/uploads/eefe8880ae080ab7d8e1f8cf641df8f1.png', '2023-02-08 12:28:28', 1, '2023-02-08 17:39:23', 1, 0),
(67, 'Cron', 'A unique coin depicting a Knorr Viking ship at sea.', 'Coin 1 crown was issued from August 1, 1934 to March 25, 1941, during the first period of Estonia’s independence.\r\n\r\nOn the obverse of the coin in the center is a large state seal, the emblem of Estonia, crowned with an arched text with the inscription “Eesti Vabariik”, and on the lower edge - the year of issue “1934”.\r\n\r\nThe reverse depicts a Viking ship Knarr in the sea, under which appears the inscription 1 crown.\r\n\r\nIn 2012, a single crown coin.\r\n\r\n1934 was recognized as \"the most beautiful coin ever circulated in Estonia.\"', 'EE', 1, 1, '1/2 Pound', 1934, '5.67', '79.00', 2, '/static/uploads/eda94f5212bb33cb6fd77931c66c29b7.png', '/static/uploads/d62a9cccbc5e2e6ad1d399f461ad3ac9.png', '2023-02-08 12:28:28', 1, '2023-02-08 17:36:31', 1, 0),
(68, 'Dim Sum', 'Dim Sum is a 10-cent coin of the United States that has been minted from 1946 to the present. This is a unique coin with the image of a torch, oak and olive branches.', 'The obverse of the coin depicts a portrait of the 32nd President of the United States, Franklin D. Roosevelt, and the reverse depicts a torch, oak and olive branches above the motto “E pluribus unum” - “Out of many.”\r\n\r\nAfter the death of Franklin Roosevelt in 1945, it was decided to put his image on a coin to perpetuate his memory. The choice of a coin denomination of 10 cents was due to the fact that in 1938 Roosevelt made a lot of efforts to create the National Fund Fund, which is half joking, and since 1979 it has been officially called the “March of ten cents”.', 'US', 2, 1, '10 Cents', 1946, '4.25', '10.00', 1, '/static/uploads/eb8dc9d588509ee00967844341b1977a.png', '/static/uploads/223323ffa96cef86597547adda39c992.png', '2023-02-08 12:28:28', 1, '2023-02-08 17:36:46', 1, 0),
(69, 'Franc', 'Unique coin with the image of a walking elephant. \"Frank\" of the Belgian Congo.', 'On the reverse of the coin in its central part there is an inscription in French: \"2 francs\" - 2 francs, framed by a five-pointed star. Along the edge from left to right there is an inscription in French and Dutch in two lines: “BANQUE DU CONGO BELGE”, “BANQUE VAN BELGISCH CONGO” - Bank of the Belgian Congo. The edge of the coin is decorated with decorative teeth.\r\n\r\nOn the reverse of the coin in the central part is a walking elephant. The year of minting is located under it: 1947. The edge is uneven.', 'CG', 1, 1, '2 Francs', 1947, '5.45', '68.00', 2, '/static/uploads/ee90e8bfc437e72701aa4d305b990b21.png', '/static/uploads/8abf6394d30f4b414f50453e35aa07aa.png', '2023-02-08 12:28:28', 1, '2023-02-08 17:37:00', 1, 0),
(70, 'The British Antelope', 'Unique coin depicting an antelope. British South African gold coin with a face value of 1/2 pound. It has been produced since 1952.', 'On one side of the coin is the head of King George VI, turned to the left. Also at the top in a semicircle is the inscription GEORGIVS SEXTVS REX.\r\n\r\nOn the other side of the coin is an Antelope. Around it is the inscription SOUTH AFRICA 1952 SUID AFRICA, dotted with dots. Below is the nominal value.', 'ZA', 1, 1, '1/2 Pound', 1952, '6.30', '78.00', 2, '/static/uploads/061caf07e0eafb070afbeab7a3065df7.png', '/static/uploads/1a5074fba058a9fcdb0e45bc6b9255e7.png', '2023-02-08 12:28:28', 1, '2023-02-08 17:40:27', 1, 0),
(71, 'South Vietnamese Dong', 'Currency of the Republic of Vietnam in 1955-1975 Coin with the image of wheat.', 'Currency of the Republic of Vietnam in 1955-1975.\r\n\r\nOn the front side, we see wheat, and on the back, a unit symbolizing money.\r\n\r\nThe monetary unit of South Vietnam was originally the Indochinese piastre, issued by the Institute of Emissions of the States of Cambodia, Laos and Vietnam. Banknotes of the graduating institute were issued in three types: Cambodian, Lao and Vietnamese. The inscriptions on the banknotes of all samples were made in four languages: French, Khmer, Lao and Vietnamese. Vietnamese-style banknotes depicted a pattern, as well as the inscription “VIÊN PHÁT-HÀNH”. Piastres previously issued by the French Bank of Indochina were also in circulation.', 'VN', 2, 1, '1 Dong', 1955, '5.05', '56.00', 2, '/static/uploads/e99c560aefa1ad8c40178c5e724e90dc.png', '/static/uploads/9edcd8b7c9936fe218d90dca0f8fd5a8.png', '2023-02-08 12:28:28', 1, '2023-02-08 17:39:54', 1, 0),
(72, 'Theobroma Cocoa', 'Coin with a lion in the center of the shield. Ghana coin, published in 1967.', 'The reverse depicts a runaway lion in the center of a shield divided into four parts, separating the date and the face value. The inscription at the top of the coin is TWENTY\r\n\r\nAs for the images inside the coat of arms:\r\nupper left: sword (used by chieftains) and staff (used by a linguist for ceremonial events)\r\ntop right: OSU castle at sea (Presidential Palace),\r\nbottom left: cocoa tree (agricultural wealth of Ghana).\r\nBottom right: a gold mine (rich in industrial minerals and natural resources) in Ghana.\r\n\r\nThe Golden Lion and George intersect in the center (a permanent connection between Ghana and the Commonwealth of Nations).', 'GH', 3, 1, '20 Pesewas', 1962, '4.76', '54.00', 2, '/static/uploads/dc2e9df024bdf5ea30595c497da10352.png', '/static/uploads/ba083532405e5c7594aa71417c13fc42.png', '2023-02-08 12:28:28', 1, '2023-02-08 17:41:02', 1, 0),
(73, 'Kennedy', 'The unique coin is made in honor of the assassination of the 35th president of Texas.', 'On November 22, 1963, in connection with the assassination of the 35th President John F. Kennedy in Dallas (Texas), it was decided to perpetuate the memory of President Kennedy on a coin.\r\n\r\nOn the obverse to the right is a portrait of the 35th President of the United States, John F. Kennedy. Captions: FREEDOM / IN GOD WE TRUST / 1993.\r\n\r\nThe reverse depicts the US state emblem (bald eagle with a shield) in the ring of stars. Captions: UNITED STATES OF AMERICA / E PLURIBUS UNUM / HALF DOLLAR.', 'US', 2, 1, 'HALF DOLLAR', 1963, '4.30', '43.00', 1, '/static/uploads/c352a6e6a1976dd38e9a885bcd8c42b5.png', '/static/uploads/fca43a53f60a067ad24a4fd0d2efb2a6.png', '2023-02-08 12:28:28', 1, '2023-02-08 17:38:38', 1, 0),
(74, 'Yemen', 'Coin of South Arabia (Yemen) with the image of a viral boat. Coin in 25 twenty five fils.', 'An octagonal star with dots is depicted on one side of the coin.\r\n\r\nOn the other side, a sailboat divides bills into English and Arabic.\r\n\r\nUntil 1951, Indian rupee and East African shilling traded in the British colony of Aden.\r\n\r\nIn 1951, East African shilling was declared the only legal tender in Aden.\r\n\r\nIn 1959, the Federation of the United Arab Emirates of the South was formed, which was transformed into the Federation of South Arabia in 1962.\r\n\r\nAden joined the Federation in 1963.\r\n\r\nIn April 1965, the South Arabian Dinar was issued and published by the South Arabian Monetary Authority.\r\n\r\nEast African shillings were exchanged for dinars until July 1, 1965 at a ratio of 20 shillings = 1 dinar.\r\n\r\nDinar was equated to pound.', 'YE', 2, 1, '25 Fils', 1964, '5.47', '69.00', 3, '/static/uploads/ad1ac7ae53103e58f30b6cfd3254fe62.png', '/static/uploads/265dc9b2a69924b58b6b926b3af2f894.png', '2023-02-08 12:28:28', 1, '2023-02-08 17:41:55', 1, 0),
(75, 'Canadian Cent', '\"Canadian cent.\" A unique coin with the image of maple leaves - symbols of Canada. Face value - 1 cent.', 'On May 3, 2012, the Department of the Treasury of Canada announced the cessation of production of a 1 cent coin. The latest issues of the famous 1-cent maple leaf were minted in 2012.\r\n\r\nOn the reverse, in the center of the coin are two maple leaves (the symbol of Canada), the year of issue is 2012 on the left. The upper part of the coin shows the denomination: 1 cent (1 cent), in the lower part of the inscription in a semicircle: CANADA.\r\n\r\nOn the obverse in the center of the coin on the right is a portrait of Queen Elizabeth II. Along the edge of the coin there is an inscription: Elizabeth II D G REGINA.', 'CA', 3, 1, '1 Cent', 1965, '2.70', '8.00', 1, '/static/uploads/651cf5138e651515c769ed6af9b2eeb4.png', '/static/uploads/453d1d31b8ec7b14af41a8fdc419441d.png', '2023-02-08 12:28:28', 1, '2023-02-08 17:35:39', 1, 0),
(76, '25 cents', 'Unique coin depicting a caribou (reindeer). The face value of the coin is equal to a quarter of the Canadian dollar.', 'The obverse depicts Queen Elizabeth II. The caribou (reindeer) is depicted on the reverse.\r\n\r\nA modern design (with a deer) has been used since the time of King George VI, when the design of other Canadian coins also changed.\r\n\r\nUnder previous kings, a different design was used for coins from 5 to 50 cents. On the reverse side was the name of the coin in small letters, framed by maple leaves, with a crown at the top.\r\n\r\nOrdinary quarters are minted with a caribou on the back.\r\n\r\nIn 2004, Memorial Day was released. The reverse shows a poppy flower.', 'CA', 2, 1, '25 Cents', 1966, '5.70', '80.00', 1, '/static/uploads/43112f2a0ca4cd71f130842f9537175a.png', '/static/uploads/408fed61ef8f20b3b1d00e1fe70cbaf8.png', '2023-02-08 12:28:28', 1, '2023-02-08 17:15:45', 1, 0),
(77, 'Woman', '1 yuan Chinese coin with a picture of a woman. 1986 edition.', 'On one side of the coin is a woman sitting on a stone. Doves fly around her\r\n\r\nOn the other side is a Chinese weapon with stars.\r\n\r\nToday, the term \"yuan\" usually refers to the main unit of account of the renminbi (renminbi), the currency of the People’s Republic of China.\r\n\r\nYuan banknotes start at one yuan and go up to 100 yuan.\r\n\r\nThe yuan symbol is also used in Chinese to denote the monetary units of Japan (yen) and Korea (won) and is used to convert the currency to the dollar, as well as to some other currencies; for example, the US dollar is called in Chinese meiyuan.', 'CN', 2, 1, '1 Yuan', 1968, '6.02', '48.00', 3, '/static/uploads/a2ecf5deb6b2dd87c35b50ca4695f5cd.png', '/static/uploads/91eab35ac0469f6c5c1c3ad8cd69c26d.png', '2023-02-08 12:28:28', 1, '2023-02-08 17:41:27', 1, 0),
(78, 'Costa Rica', 'Costa - African coin with the image of manatee. Costa Rican coin of 100 columns. It has been produced since 1974.', 'On one side of the coin is a shield with a sailing ship in front of the mountains. Below is the release date of the coin.\r\n\r\nOn the other side of the coin is a manatee among algae.\r\n\r\nThe Costa Rican coin is the monetary unit of Costa Rica.\r\n\r\nUntil 2017, the All-Russian classifier of currencies is the \"Costa Rican Colony\".', 'CR', 2, 1, '100 Columns', 1974, '5.24', '78.00', 3, '/static/uploads/7c70be3ef2e4d507da3c330dbfdd7acf.png', '/static/uploads/1346382bc1c337c12497d1fbe8545049.png', '2023-02-08 12:28:28', 1, '2023-02-08 17:36:17', 1, 0),
(79, 'Lion sedge', 'Indian coin with the image of a lion Ashoka. Face value 1 one rupee. 1975 edition.', 'It depicts the lion Ashok on his pedestal. It is surrounded by the inscription of the name of the country in two languages, meaning and date, surrounded by stylized stalks of grain.\r\n\r\nThe rupee (from Sanskrit silver) is an Indian historical silver coin, put into circulation in the 15th century, as well as the monetary unit of a number of countries in South Asia.\r\n\r\nAfter the British conquest of Burma in 1852, the Indian rupee became its currency.\r\n\r\nIn 1938, Burma became an independent British colony.\r\n\r\nA year earlier, the release of the Burmese rupee, which lasted until 1952, began.\r\n\r\nIn 1952, the Burmese rupee was replaced by a kyat.\r\n\r\nThe rupee remained the currency of Portuguese possessions in India until 1959, when it was replaced by the escudos of Portuguese India.', 'IN', 3, 1, '1 Rupee', 1975, '4.95', '76.00', 3, '/static/uploads/fa8f93cfbe8fc13c30ba1f50eff26c1f.png', '/static/uploads/6c19278a010ffe2c4132b225e7bf0ed0.png', '2023-02-08 12:28:28', 1, '2023-02-08 17:38:53', 1, 0),
(80, 'Botswana', '\"Botswana\". Coin with the image of a bird.\r\n\r\nCoin of state of Botswana 1976.', 'Translated from Botswana, its name means “let it rain”\r\n\r\nAfter gaining independence from the United Kingdom in 1966, Botswana was a member of currency unions.\r\n\r\nIn 2005, as a result of inflation, the currency fell by 12%, but it still remains one of the “strong” currencies on the African continent.', 'BW', 3, 1, '1 Thebe', 1976, '4.28', '62.00', 2, '/static/uploads/6cb3ec708d956f0a6dbe95d153c070b2.png', '/static/uploads/8104a4df30a45622b9d7cf2af1f13862.png', '2023-02-08 12:28:28', 1, '2023-02-08 17:34:30', 1, 0),
(81, 'Year of the children', 'Costa is an African coin depicting three chicks in a nest. Costa Rican coin of 100 columns. It has been produced since 1979.', 'On one side of the coin are 3 chicks in a nest, symbolizing the International Year of Children.\r\n\r\nOn the other side is a shield with a sailing ship in front of the mountains, the shining sun behind the mountains.\r\n\r\nIn circulation are banknotes: 1000 columns of series A and B (red, polymer), 2000 columns (blue with a shark of Mauro Fernandez on one side and a bull shark on the back), 5000 columns of series A and B (yellow with Alfredo González Flores) with one side and capuchin monkeys on the back), 10,000 columns (green), 20,000 columns and 50,000 columns.\r\n\r\nIn the monetary circulation of the country are coins in denominations of 500, 100, 50, 25, 20, 10, 5 and 1 column.', 'CR', 2, 1, '100 Columns', 1979, '5.24', '72.00', 3, '/static/uploads/8ad8a72782916ed42fb36b1b9aa01409.png', '/static/uploads/ee3d4fe36707bb0f4d26cfa08e6ca4e7.png', '2023-02-08 12:28:28', 1, '2023-02-08 17:41:44', 1, 0),
(82, 'Scientist', 'Silver Egyptian coin with the image of the god Thoth. Silver Egyptian coin.', 'Face value one pound. It has been produced since 1981.\r\n\r\nThe coin shows the name of the country and its meaning in Arabic. Also depicted is the Egyptian god Thoth.\r\n\r\nOn the other side is a travel plate left by a radiant sun gear and splatter.\r\n\r\nThe Egyptian pound is often shortened as LE or L. E., which means livre égyptienne (French for Egyptian pound).', 'AZ', 4, 1, '1 Pound', 1981, '3.95', '112.00', 2, '/static/uploads/45552e517e6f4472fba915fe528faa69.png', '/static/uploads/8e6b5e6796c0644bd0daaff389941c9c.png', '2023-02-08 12:28:28', 1, '2023-02-08 17:39:38', 1, 0),
(83, 'Gyeonggi', '\"Gyeonggi\". Coin with the image of five kangaroos - symbols of Australia.', 'The first Australian coin with a nominal value of 1 dollar was introduced on May 13, 1984 to replace a one-dollar banknote.\r\n\r\nThe portraits of Elizabeth II on the obverse of the 1984, 1985 and 1988 coins were made by Arnold Machin, and on the 1999 coins by Ian Rank-Broadley.\r\n\r\nThe reverse of the coin depicts five kangaroos symbolizing Australia. The drawing was designed by Stuart Devlin in 1966.\r\n\r\nThe first Australian $ 1 coin was introduced on May 13, 1984 to replace a one-dollar bill.\r\n\r\nThis is currently the most common coin denomination in Australia.', 'AZ', 1, 1, '1 Dollar', 1984, '4.76', '97.00', 2, '/static/uploads/bff2c2d4ed298e2a929b445d61c728c7.png', '/static/uploads/ef63a24dfc4b7144df84d703b507e447.png', '2023-02-08 12:28:28', 1, '2023-02-08 17:37:20', 1, 0),
(84, 'Bolivian Peso', 'Boliviano Coin with the image of Bolivia.\r\n\r\nBy 1987, the Bolivian peso had completely depreciated and was replaced by a new boliviano during another monetary reform.', 'Old banknotes were printed and used as a \"bargaining chip.\" And in 1988, they began to mint a real coin.\r\n\r\nThis currency is still in circulation.\r\n\r\nAt the top of one of the sides of the coin in a semicircle is the inscription REPUBLICADE BOLIVIA. At the bottom of the coin, an arc depicts 10 stars.\r\n\r\nAbove, on the other side of the coin, the inscription PESO BOLIVIANO is located in an arc. In the middle is an image of face value. At the bottom of the year, framed on both sides by branches.', 'BO', 3, 1, '1 Peso', 1988, '3.62', '54.00', 2, '/static/uploads/3b37c55d4566d0dd1e8896bb84a96edb.png', '/static/uploads/3c28c743004d78cb9fa722fa5a6ad66e.png', '2023-02-08 12:28:28', 1, '2023-02-08 17:32:10', 1, 0),
(85, 'The Golden Panda', 'Chinese coin with the image of two pandas. 5 yuan Chinese coin. 1993 edition.', 'On one side of the coin are two pandas. At the top of the coin are Chinese characters in an arc.\r\n\r\nOn the other side is a Chinese weapon with stars, surrounded by hieroglyphs. Below is written the year of release.\r\n\r\nChinese Golden Panda, launched in 1982.\r\n\r\nCoins (front side) remain unchanged since 1992\r\n\r\nThere is also a Silver Panda investment coin series, made in a similar design.', 'CN', 2, 1, '5 Yuan', 1993, '7.24', '82.00', 3, '/static/uploads/d3a354e3eb38818da19d6f058d2d4c4f.png', '/static/uploads/8939b15374adee3cb9a45f0aa0077fea.png', '2023-02-08 12:28:28', 1, '2023-02-08 17:40:43', 1, 0),
(86, 'Stork', 'Unique coin with the image of a flying stork. French coin at 2 two francs 1997.', 'Two francs by Georges Gynemer - a commemorative coin of two French francs, issued in 1997 in honor of the famous pilot of the First World War, Georges Gynemer, on the occasion of the 80th anniversary of the officer cross of the Legion of Honor and his death: shot down in flight by a German plane.\r\n\r\nThey are painted by engravers of the workshop of coins and medals under the direction of the general engraver of coins Pierre Rodier 4.\r\n\r\nThe obverse depicts a portrait of Georges Gainemer in a flight suit and pilot\'s glasses, raised to his forehead. The inscription GEORGES GUYNEMER 1894-1917 in a semicircle at the top of the coin. And also the year of release below.\r\n\r\nThe reverse shows a flying stork. Also below the arc is the inscription LIBERTÉ ÉGALITÉ FRATERNITÉ, separated by dots. And the face value at the top of the coin.', 'FR', 3, 1, '2 Francs', 1997, '6.57', '54.00', 2, '/static/uploads/d2364474fdb43cfffe9fcf3ddda15316.png', '/static/uploads/8077c935cc0c3782010564819211a030.png', '2023-02-08 12:28:28', 1, '2023-02-08 17:40:13', 1, 0),
(87, 'Alligator', 'Chinese coin with the image of an alligator. 5 yuan Chinese coin. 1998 edition.', 'It depicts a Chinese alligator on the banks of the river.\r\n\r\nOn the other side is a Chinese weapon with stars. It is surrounded by hieroglyphs and a coin release date.', 'CN', 2, 1, '5 Yuan', 1998, '7.24', '78.00', 3, '/static/uploads/a17585f27312fab1623441395b795208.png', '/static/uploads/f482d1e4bfb705f2fed5d6fd883a0484.png', '2023-02-08 12:28:28', 1, '2023-02-08 17:31:33', 1, 0),
(88, 'ISK', 'Icelandic coin with a picture of a fish. Face value 1 Icelandic krona', 'Initially, the krone consisted of 100 Eire (ISL. EYRIR, MN. CH. ISL. Aurar), but since January 1, 1995 Eire has not been used in monetary circulation.\r\n\r\nFrom January 1, 1999, in accordance with Law No. 36 of April 27, 1998, amounts must be rounded to 50 Eire.\r\n\r\nCoin minting in Krona began in 1925.\r\n\r\nInitially, all coins had a monogram of King Christian X.\r\n\r\nIceland was declared a Republic in 1944, and in 1946 it began to mint coins without royal symbols.\r\n\r\nIcelandic coins were minted by the Royal Mint of Denmark, the Royal Mint of Great Britain and a private mint in Birmingham.', 'IS', 2, 1, '1 Icelandic krona', 2007, '5.42', '78.00', 3, '/static/uploads/1ad0c12bfb2e9dd209300f51eb05936d.png', '/static/uploads/0f962ab28cbdb70a9dd99ceb0d1c8c8d.png', '2023-02-08 12:28:28', 1, '2023-02-08 17:38:13', 1, 0),
(89, 'Virginia', 'Virginia Coin with the image of a seahorse. Coin created during the reign of Elizabeth II.', 'The obverse depicts Her Majesty Queen Elizabeth II. At the top of the coin is the inscription British Virgin Islands Queen Elizabeth II 2014.\r\n\r\nThe reverse depicts a beautiful seahorse with a tail wrapped around a coral.\r\n\r\nThe choice of seahorse reflects the marine heritage of the British Virgin Islands. The British Virgin Islands, located in the Caribbean Sea and consisting of more than 60 islands, are known for their coral reefs, which are home to a wide variety of animal species, including seahorses.\r\n\r\nSeahorse is the name given to 54 species of marine fish in the genus Hippocampus, which comes from the ancient Greek hippos, which means “horse”, and Campos - “sea monster”.', 'VI', 2, 1, '5 Dollars', 2014, '6.98', '108.00', 2, '/static/uploads/bea57ad9342dacc3948dd5aadd1e3818.png', '/static/uploads/6e5ec7d8e2f19d6e595682dcf095ab01.png', '2023-02-08 12:28:28', 1, '2023-02-08 17:41:15', 1, 0),
(90, 'VICTORY', 'In 2021 the Central Bank issued to circulation a gold commemorative coin dedicated to the anniversary of historical Victory of the Azerbaijani army.', 'The coin was minted at ‘The Royal Mint’ of Great Britain on proof-based technology.\r\n\r\nThe face of the coin depicts the image of the state flag of Azerbaijan synthesized with the words ‘8 November’ victory history, the Khari Bulbul, that has become the symbol of victory at the Patriotic War, the bay leaf, the symbol of eternal victory, a graphic image of the Sun, the symbol of power and development, as well as the words ‘Victory’ and ‘Karabakh is Azerbaijan’ as the main design elements, while the back of the coin depicts the Coat of Arms of the Republic of Azerbaijan, 8-pointed stars, the words ‘the Republic of Azerbaijan’ and denomination of the coin.', 'AZ', 1, 16, '100 Manat', 2021, '31.10', '58.82', 1, '/static/uploads/97af923523f6cc5517a3e5bbdb717ceb.png', '/static/uploads/9c6a415c2547aa06227f637c7bccca8d.png', '2023-02-08 13:56:04', 1, '2023-02-08 17:58:39', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `coins_copy`
--

CREATE TABLE `coins_copy` (
  `id` int NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `short_description` varchar(120) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `issued_countryCode` varchar(2) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `compositionId` int DEFAULT NULL,
  `qualityId` int DEFAULT NULL,
  `denomination` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `year` year DEFAULT NULL,
  `weight` decimal(10,2) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `typeId` int DEFAULT NULL,
  `imageUrl_front` varchar(150) COLLATE utf8mb4_general_ci DEFAULT '/static/images/coin.png',
  `imageUrl_back` varchar(150) COLLATE utf8mb4_general_ci DEFAULT '/static/images/coin.png',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coin_views`
--

CREATE TABLE `coin_views` (
  `id` int NOT NULL,
  `coinId` int DEFAULT NULL,
  `view_count` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coin_views`
--

INSERT INTO `coin_views` (`id`, `coinId`, `view_count`) VALUES
(33, 1, 66),
(71, 4, 247),
(75, 8, 21),
(76, 6, 55),
(391, 76, 71),
(393, 69, 1),
(394, 83, 1),
(396, 90, 7),
(403, 77, 13),
(411, 75, 1),
(415, 87, 40),
(416, 84, 15),
(462, 70, 41),
(511, 85, 15),
(562, 86, 18);

-- --------------------------------------------------------

--
-- Table structure for table `compositions`
--

CREATE TABLE `compositions` (
  `id` int NOT NULL,
  `name` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `icon` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `compositions`
--

INSERT INTO `compositions` (`id`, `name`, `icon`) VALUES
(1, 'Gold', 'gold'),
(2, 'Nickel', 'nickel'),
(3, 'Steel', 'steel'),
(4, 'Silver', 'silver');

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `code` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `name`, `code`) VALUES
(16, 'Azerbaijan', 'AZ'),
(27, 'Bolivia', 'BO'),
(30, 'Botswana', 'BW'),
(34, 'British Virgin Islands', 'VG'),
(41, 'Canada', 'CA'),
(47, 'China', 'CN'),
(53, 'Costa Rica', 'CR'),
(59, 'Democratic Republic of the Congo', 'CD'),
(70, 'Estonia', 'EE'),
(76, 'France', 'FR'),
(82, 'Georgia', 'GE'),
(84, 'Ghana', 'GH'),
(101, 'Iceland', 'IS'),
(102, 'India', 'IN'),
(104, 'Iran', 'IR'),
(178, 'Portugal', 'PT'),
(181, 'Republic of the Congo', 'CG'),
(184, 'Russia', 'RU'),
(207, 'South Africa', 'ZA'),
(229, 'Turkey', 'TR'),
(234, 'U.S. Virgin Islands', 'VI'),
(236, 'Ukraine', 'UA'),
(239, 'United States', 'US'),
(245, 'Vietnam', 'VN'),
(248, 'Yemen', 'YE');

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `coinId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`id`, `userId`, `coinId`) VALUES
(2, 1, 1),
(3, 1, 87),
(4, 1, 70),
(5, 1, 77),
(6, 1, 85),
(7, 1, 76),
(8, 1, 6),
(9, 1, 84),
(10, 1, 86);

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int NOT NULL,
  `coinId` int NOT NULL,
  `userId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `coinId`, `userId`) VALUES
(6, 1, 1),
(7, 2, 1),
(8, 87, 1),
(9, 70, 1),
(10, 85, 1),
(11, 76, 1),
(12, 6, 1),
(13, 84, 1),
(14, 86, 1);

-- --------------------------------------------------------

--
-- Table structure for table `qualities`
--

CREATE TABLE `qualities` (
  `id` int NOT NULL,
  `name` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `icon` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `qualities`
--

INSERT INTO `qualities` (`id`, `name`, `icon`) VALUES
(1, 'BU', 'icon'),
(16, 'Proof', 'proof');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int NOT NULL,
  `name` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `data` text COLLATE utf8mb4_general_ci,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`, `data`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES
(1, 'Admin', NULL, NULL, '2023-01-25 12:08:19', NULL, NULL, NULL),
(2, 'User', NULL, NULL, '2023-01-25 12:08:19', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `types`
--

CREATE TABLE `types` (
  `id` int NOT NULL,
  `name` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `icon` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `types`
--

INSERT INTO `types` (`id`, `name`, `description`, `icon`) VALUES
(1, 'Commemorative', 'Commemorative coins', '/static/images/commerative.png'),
(2, 'Investment', 'Investment coins', '/static/images/investment.png'),
(3, 'Exclusive', 'Exclusive coins', '/static/images/exclusive.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `fullname` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `avatarId` int DEFAULT NULL,
  `roleId` int NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `fullname`, `email`, `avatarId`, `roleId`, `created_at`) VALUES
(1, 'admin', '$2b$10$1nAYgWNxrOSN3Qfpxn.H1uzX2dUSoh8bIgs6iXgfE5Pwr2ns0CKdG', 'Hasanli Hasan', 'hasan@hasanli.info', NULL, 1, '2023-01-25 12:16:35'),
(2, 'hasan', '$2b$10$oDTVDh.sOXR5YF048seqleXUKJg3N.h41mETsOSiMuAaJDp.qFf02', NULL, 'some@mail.ru', NULL, 0, '2023-01-29 11:07:20'),
(4, 'user2', '$2b$10$wUMFEjU8/m2lqP5lZy7f5ueqstg.Sty6n5HWECiwaU8o0q/G0GZmG', NULL, 'hesenli.hesen@gmail.com', NULL, 0, '2023-01-29 11:11:02'),
(5, 'admin12', '$2b$10$HWv5/A9tLoCxWnrsGBXAMezr6YQaV6CCZgIqcnG2.MIAzzh71Xl7S', NULL, 'hasan2@hasanli.info', NULL, 0, '2023-01-30 10:51:33'),
(8, 'admin123', '$2b$10$h6eqdAiyygbf2RlHEfsp4O/HXwRJ9rEkx/Qkp2crNZPQgn.trpFuS', NULL, 'hasan3@hasanli.info', NULL, 0, '2023-01-30 10:53:15'),
(9, 'admin1234', '$2b$10$mEdyqX6S40C76e/Qor5p3.5f7Rw9bFP.ypOyHoQir0ffkMcCfXwDa', NULL, 'hasan4@hasanli.info', NULL, 0, '2023-01-30 10:54:09');

-- --------------------------------------------------------

--
-- Table structure for table `views`
--

CREATE TABLE `views` (
  `id` int NOT NULL,
  `coinId` int NOT NULL,
  `view_count` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure for view `AllCoinsDetailed`
--
DROP TABLE IF EXISTS `AllCoinsDetailed`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `AllCoinsDetailed`  AS SELECT `coin`.`id` AS `coinId`, `coin`.`name` AS `coinName`, `coin`.`short_description` AS `shortDescription`, `coin`.`description` AS `description`, `country`.`code` AS `issuedCountryId`, `country`.`name` AS `issuedByCountry`, `composition`.`id` AS `compositionId`, `composition`.`name` AS `composition`, `quality`.`id` AS `qualityId`, `quality`.`name` AS `quality`, `coin`.`denomination` AS `denomination`, `coin`.`year` AS `year`, `coin`.`weight` AS `weight`, `coin`.`price` AS `price`, `type`.`id` AS `typeId`, `type`.`name` AS `type`, `coin`.`imageUrl_front` AS `faceImage`, `coin`.`imageUrl_back` AS `backImage`, ifnull(`cviews`.`view_count`,0) AS `viewCount`, (select `like_count`(`coin`.`id`)) AS `likeCount`, (select `favorited_count`(`coin`.`id`)) AS `favoriteCount` FROM (((((`coins` `coin` left join `countries` `country` on((`country`.`code` = `coin`.`issued_countryCode`))) left join `compositions` `composition` on((`composition`.`id` = `coin`.`compositionId`))) left join `qualities` `quality` on((`quality`.`id` = `coin`.`qualityId`))) left join `types` `type` on((`type`.`id` = `coin`.`typeId`))) left join `coin_views` `cviews` on((`cviews`.`coinId` = `coin`.`id`))) WHERE (`coin`.`deleted` = 0)  ;

-- --------------------------------------------------------

--
-- Structure for view `CategoryViewsStatistics`
--
DROP TABLE IF EXISTS `CategoryViewsStatistics`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `CategoryViewsStatistics`  AS SELECT `acd`.`type` AS `categoryName`, sum(`acd`.`viewCount`) AS `totalViews` FROM `AllCoinsDetailed` AS `acd` GROUP BY `acd`.`type``type`  ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `avatars`
--
ALTER TABLE `avatars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coins`
--
ALTER TABLE `coins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coins_copy`
--
ALTER TABLE `coins_copy`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coin_views`
--
ALTER TABLE `coin_views`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `coinId` (`coinId`);

--
-- Indexes for table `compositions`
--
ALTER TABLE `compositions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `qualities`
--
ALTER TABLE `qualities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `views`
--
ALTER TABLE `views`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `avatars`
--
ALTER TABLE `avatars`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `coins`
--
ALTER TABLE `coins`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT for table `coins_copy`
--
ALTER TABLE `coins_copy`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `coin_views`
--
ALTER TABLE `coin_views`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=645;

--
-- AUTO_INCREMENT for table `compositions`
--
ALTER TABLE `compositions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=257;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `qualities`
--
ALTER TABLE `qualities`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `types`
--
ALTER TABLE `types`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `views`
--
ALTER TABLE `views`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
