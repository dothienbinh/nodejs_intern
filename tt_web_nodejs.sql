-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th9 10, 2022 lúc 12:03 PM
-- Phiên bản máy phục vụ: 10.4.24-MariaDB
-- Phiên bản PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `tt_web_nodejs`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `jobs`
--

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Desc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Status` tinyint(1) DEFAULT NULL,
  `StatusDesc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `IDNv` int(11) DEFAULT NULL,
  `IDCreator` int(11) DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `jobs`
--

INSERT INTO `jobs` (`id`, `Name`, `Desc`, `Status`, `StatusDesc`, `IDNv`, `IDCreator`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'thu viec update', 'sssssssss', 1, 'hoan thanh', 1, 1, NULL, '2022-09-07 16:27:24', '2022-09-09 17:07:33'),
(2, 'thu viec 9', 'abc xyz qwe rty uio', 1, 'chua hoan thanh', 1, 1, NULL, '2022-09-07 16:27:30', '2022-09-07 16:27:30'),
(3, 'thu viec 10', 'abc xyz qwe rty uio', 1, 'chua hoan thanh', 1, 1, NULL, '2022-09-07 16:27:34', '2022-09-07 16:27:34'),
(4, 'thu viec 11', 'abc xyz qwe rty uio', 1, 'chua hoan thanh', 1, 1, NULL, '2022-09-07 16:27:38', '2022-09-07 16:27:38'),
(5, 'thu viec 12', 'abc xyz qwe rty uio', 1, 'chua hoan thanh', 11, 11, NULL, '2022-09-07 16:28:05', '2022-09-07 16:28:05'),
(6, 'thu viec 13', 'abc xyz qwe rty uio', 1, 'chua hoan thanh', 11, 11, NULL, '2022-09-07 16:28:09', '2022-09-07 16:28:09'),
(7, 'thu viec 14', 'abc xyz qwe rty uio', 1, 'chua hoan thanh', 7, 7, NULL, '2022-09-07 16:28:35', '2022-09-07 16:28:35'),
(8, 'thu viec 15', 'abc xyz qwe rty uio', 1, 'chua hoan thanh', 7, 7, NULL, '2022-09-07 16:28:38', '2022-09-07 16:28:38');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Position` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Desc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `IDNv` int(11) DEFAULT NULL,
  `IDCreator` int(11) DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `reviews`
--

INSERT INTO `reviews` (`id`, `Name`, `Position`, `Desc`, `Type`, `IDNv`, `IDCreator`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(3, 'danh gia thang 4', 'inter', 'abc abc abc', 'danh gia', 1, 1, NULL, '2022-09-09 17:00:33', '2022-09-09 17:08:22'),
(5, 'danh gia thang 5', 'inter', 'abc abc abc', 'danh gia', 1, 1, NULL, '2022-09-09 17:00:41', '2022-09-09 17:08:43'),
(6, 'danh gia thang 10', 'HR', 'abc abc abc', 'danh gia', 7, 7, NULL, '2022-09-09 17:20:18', '2022-09-09 17:20:18'),
(7, 'danh gia thang 11', 'HR', 'abc abc abc', 'danh gia', 7, 7, NULL, '2022-09-09 17:20:24', '2022-09-09 17:20:24');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('create-job.js'),
('create-review.js'),
('create-user.js');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `MaNV` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `FirstName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `LastName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `UserName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Position` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Avatar` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Gender` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CMND` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `BHXH` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Address` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ManagerID` int(11) DEFAULT NULL,
  `Role` int(11) NOT NULL,
  `RefreshToken` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `MaNV`, `FirstName`, `LastName`, `Email`, `UserName`, `Password`, `Position`, `Phone`, `Avatar`, `Gender`, `CMND`, `BHXH`, `Address`, `ManagerID`, `Role`, `RefreshToken`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'B18DCAT022', 'Binh', 'Do Thien Binh', 'dothienbinh13@gmail.com', 'BinhDo', '$2a$10$0zFvNKLzT.47S5PDGXGdQOavhRo1rHKHqEh2LF4RIzzyhVyWJcBqO', 'inter', '1234567', NULL, '0', 'B1234567', 'B1234567', 'HaNoi', NULL, 3, NULL, NULL, '2022-09-07 16:14:40', '2022-09-09 17:20:01'),
(2, 'B18DCAT023', 'A', 'Nguyen Van A', 'nguyenvana@gmail.com', 'BinhDo23', '$2a$10$LqxhIr//oltltdfzd4HX.eVam1YBLLS0bZkSWf6qnHj7ta5IQ84c.', NULL, '123456', NULL, '1', '1234567', '1234567', 'bac ninh', NULL, 2, NULL, NULL, '2022-09-07 16:16:54', '2022-09-07 16:16:54'),
(6, 'B18DCAT025', 'A', 'Nguyen Van A', 'ccccc@gmail.com', 'BinhDo25', '$2a$10$KQmspx65SepojwKcR02am.p7RRXVLUgxPqpb/gG1KgFBeueWsWuFe', NULL, '123456', NULL, '1', '1234567', '1234567', 'bac ninh', NULL, 2, NULL, NULL, '2022-09-07 16:22:01', '2022-09-07 16:22:01'),
(7, 'B18DCAT026', 'A', 'Nguyen Van A', 'd@gmail.com', 'BinhDo26', '$2a$10$SFQtrtqEldQzCYNRJWRHLOqBPyFO3qtCoxVV1aTx2Kata969Z5f92', 'HR', '123456', NULL, '1', '1234567', '1234567', 'bac ninh', NULL, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiTWFOViI6IkIxOERDQVQwMjYiLCJGaXJzdE5hbWUiOiJBIiwiTGFzdE5hbWUiOiJOZ3V5ZW4gVmFuIEEiLCJSb2xlIjoyLCJpYXQiOjE2NjI3NDQwMDcsImV4cCI6MTY2Mjc0NzYwN30.Y_3JOhc0AtCE62EfC5gExqfmd24Gb6EZsDMg2eXFJCg', NULL, '2022-09-07 16:23:06', '2022-09-09 17:20:07'),
(8, 'B18DCAT027', 'A', 'DO Van A', 'Q@gmail.com', 'BinhDo27', '$2a$10$SFQtrtqEldQzCYNRJWRHLOqBPyFO3qtCoxVV1aTx2Kata969Z5f92', 'Manager', '123456', NULL, '1', '1234567', '1234567', 'bac ninh', NULL, 1, NULL, NULL, '2022-09-07 16:24:41', '2022-09-07 16:24:41'),
(9, 'B18DCAT028', 'A', 'DO ', 'Q@gmail.com', 'BinhDo28', '$2a$10$SFQtrtqEldQzCYNRJWRHLOqBPyFO3qtCoxVV1aTx2Kata969Z5f92', 'inter', '123456', NULL, '1', '1234567', '1234567', 'bac ninh', NULL, 0, NULL, NULL, '2022-09-07 16:25:13', '2022-09-07 16:25:13'),
(10, 'B18DCAT029', 'C', 'F', 'Fc@gmail.com', 'BinhDo29', '$2a$10$SFQtrtqEldQzCYNRJWRHLOqBPyFO3qtCoxVV1aTx2Kata969Z5f92', 'inter', '123456', NULL, '1', '1234567', '1234567', 'bac ninh', NULL, 0, NULL, NULL, '2022-09-07 16:25:36', '2022-09-07 16:25:36'),
(11, 'B18DCAT030', 'LE', 'Nguyen', 'Fc@gmail.com', 'BinhDo30', '$2a$10$SFQtrtqEldQzCYNRJWRHLOqBPyFO3qtCoxVV1aTx2Kata969Z5f92', 'inter', '123456', NULL, '1', '1234567', '1234567', 'bac ninh', NULL, 0, NULL, NULL, '2022-09-07 16:25:57', '2022-09-07 16:28:20'),
(12, 'B18DCAT031', 'LE Van', 'Nguyen', 'Fc@gmail.com', 'BinhDo31', '$2a$10$SFQtrtqEldQzCYNRJWRHLOqBPyFO3qtCoxVV1aTx2Kata969Z5f92', 'inter', '123456', NULL, '1', '1234567', '1234567', 'bac ninh', NULL, 0, NULL, NULL, '2022-09-07 16:26:13', '2022-09-07 16:26:13');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `MaNV` (`MaNV`),
  ADD UNIQUE KEY `UserName` (`UserName`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
