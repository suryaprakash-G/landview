-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 23, 2021 at 05:11 PM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `landview`
--

-- --------------------------------------------------------

--
-- Table structure for table `featured`
--

CREATE TABLE `featured` (
  `sl` int(11) NOT NULL,
  `id` varchar(500) NOT NULL,
  `date` varchar(100) NOT NULL,
  `city` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `lands`
--

CREATE TABLE `lands` (
  `id` int(255) NOT NULL,
  `name` varchar(500) NOT NULL,
  `images` int(11) NOT NULL DEFAULT 0,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `location` varchar(500) NOT NULL,
  `address` varchar(300) NOT NULL,
  `price` float NOT NULL,
  `area` varchar(300) NOT NULL,
  `about` longtext NOT NULL,
  `city` varchar(300) NOT NULL,
  `type` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lands`
--

INSERT INTO `lands` (`id`, `name`, `images`, `date`, `location`, `address`, `price`, `area`, `about`, `city`, `type`) VALUES
(1, 'surya nagar', 0, '2021-03-20 07:10:05', '{40.737858909774445,-73.95651410400913}', 'surya nagar,\r\nmadurai highway,\r\ntrichy,', 1.3, '127', 'lolololo dsvsdvfdsb fd df df \r\ndf dfvfdsvcdsfv\r\nsd sdvds', 'trichy', 'land'),
(2, 'vandaloor', 0, '2021-03-20 07:48:49', '{40.738328227424354,-73.96449466806827}', 'vandaloor bus sto pinsde zoo', 1.5, '255 sqft', 'zoo kulla poikalam without ticket \r\ndaily soru acomodatino free', 'chennai', 'housing, land');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `featured`
--
ALTER TABLE `featured`
  ADD PRIMARY KEY (`sl`);

--
-- Indexes for table `lands`
--
ALTER TABLE `lands`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `featured`
--
ALTER TABLE `featured`
  MODIFY `sl` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lands`
--
ALTER TABLE `lands`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
