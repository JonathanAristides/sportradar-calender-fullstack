-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 25, 2022 at 03:52 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sportradar_beispiel`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `Event_ID` int(11) NOT NULL,
  `Event_Date` date NOT NULL,
  `Event_Time` time NOT NULL,
  `_Sport_ID` int(11) NOT NULL,
  `_Team1_ID` int(11) NOT NULL,
  `_Team2_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`Event_ID`, `Event_Date`, `Event_Time`, `_Sport_ID`, `_Team1_ID`, `_Team2_ID`) VALUES
(1, '2023-02-15', '15:00:00', 1, 9, 10),
(2, '2023-06-13', '18:00:00', 1, 3, 5),
(3, '2023-06-20', '12:00:00', 1, 2, 1),
(4, '2022-12-06', '16:00:00', 2, 26, 34),
(5, '2023-03-21', '15:00:00', 2, 32, 34),
(6, '2022-10-29', '12:00:00', 2, 31, 33),
(9, '2023-02-08', '20:00:00', 3, 21, 18),
(10, '2022-10-11', '11:00:00', 3, 22, 19),
(11, '2022-12-19', '17:00:00', 3, 23, 17);

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `Player_ID` int(11) NOT NULL,
  `Player_Name` varchar(255) NOT NULL,
  `_Player_Team_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`Player_ID`, `Player_Name`, `_Player_Team_ID`) VALUES
(1, 'Bernhard Unger', 9),
(2, 'Paul Gartler', 9),
(3, 'Niklas Hedl', 9);

-- --------------------------------------------------------

--
-- Table structure for table `sports`
--

CREATE TABLE `sports` (
  `Sport_ID` int(11) NOT NULL,
  `Sport_Name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sports`
--

INSERT INTO `sports` (`Sport_ID`, `Sport_Name`) VALUES
(1, 'Fußball'),
(2, 'Basketball'),
(3, 'IceHockey');

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `Team_ID` int(11) NOT NULL,
  `Team_Name` varchar(255) NOT NULL,
  `_Team_Sport_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`Team_ID`, `Team_Name`, `_Team_Sport_ID`) VALUES
(1, 'RB Salzburg', 1),
(2, 'Sturm Graz', 1),
(3, 'LASK', 1),
(4, 'Austria Klagenfurt', 1),
(5, 'WSG Tirol', 1),
(6, 'Austria', 1),
(7, 'Wolfsberg', 1),
(8, 'SCR Altach', 1),
(9, 'Rapid Wien', 1),
(10, 'Austria Lustenau', 1),
(11, 'Ried', 1),
(12, 'Hartberg', 1),
(13, 'Asiago Hockey', 3),
(14, 'EC KAC', 3),
(15, 'EC Red Bull Salzburg', 3),
(16, 'EC Villacher SV', 3),
(17, 'Fehérvár AV19', 3),
(18, 'HC Bolzano', 3),
(19, 'HC TWK Innsbruck', 3),
(20, 'HC Val Pusteria', 3),
(21, 'HK Olimpija', 3),
(22, 'Moser Medical Graz 99ers', 3),
(23, 'Pioneers Vorarlberg', 3),
(24, 'Steinbach Black Wings 1992', 3),
(25, 'Vienna Capitals', 3),
(26, 'Mistelbach Mustangs', 2),
(27, 'Wörthersee Piraten', 2),
(28, 'Union Deutsch Wagram Alligators', 2),
(29, 'Raiffeisen Dornbirn Lions', 2),
(30, 'Haustechnik Güssing Blackbirds', 2),
(31, 'Vienna United', 2),
(32, 'Raiffeisen Mattersburg Rocks', 2),
(33, 'SWARCO Raiders Tirol', 2),
(34, 'Pirlo Kufstein Towers', 2),
(35, 'BBU Salzburg', 2),
(36, 'KOS Celovec', 2),
(37, 'Vienna Timberwolves Landesliga', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`Event_ID`),
  ADD KEY `SportOfEvent` (`_Sport_ID`),
  ADD KEY `Team1OfEvent` (`_Team1_ID`),
  ADD KEY `Team2OfEvent` (`_Team2_ID`);

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`Player_ID`),
  ADD KEY `TeamOfPlayer` (`_Player_Team_ID`);

--
-- Indexes for table `sports`
--
ALTER TABLE `sports`
  ADD PRIMARY KEY (`Sport_ID`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`Team_ID`),
  ADD KEY `SportOfTeam` (`_Team_Sport_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `Event_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `Player_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sports`
--
ALTER TABLE `sports`
  MODIFY `Sport_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `Team_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `SportOfEvent` FOREIGN KEY (`_Sport_ID`) REFERENCES `sports` (`Sport_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Team1OfEvent` FOREIGN KEY (`_Team1_ID`) REFERENCES `teams` (`Team_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Team2OfEvent` FOREIGN KEY (`_Team2_ID`) REFERENCES `teams` (`Team_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `players`
--
ALTER TABLE `players`
  ADD CONSTRAINT `TeamOfPlayer` FOREIGN KEY (`_Player_Team_ID`) REFERENCES `teams` (`Team_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teams`
--
ALTER TABLE `teams`
  ADD CONSTRAINT `SportOfTeam` FOREIGN KEY (`_Team_Sport_ID`) REFERENCES `sports` (`Sport_ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
