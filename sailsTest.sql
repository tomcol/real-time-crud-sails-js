/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50525
 Source Host           : localhost
 Source Database       : sailsTest

 Target Server Type    : MySQL
 Target Server Version : 50525
 File Encoding         : utf-8

 Date: 05/19/2014 21:07:00 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `person`
-- ----------------------------
DROP TABLE IF EXISTS `person`;
CREATE TABLE `person` (
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `emailAddress` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Records of `person`
-- ----------------------------
BEGIN;
INSERT INTO `person` VALUES ('first oneaaa', 'first oneaaaa', null, null, null, null, '1', null, '2014-05-19 08:50:40'), ('second', 'one', null, null, null, null, '2', null, '2014-05-19 06:14:58'), ('third', 'one', null, null, '111-222-3333', null, '19', '2014-05-18 14:20:36', '2014-05-19 06:15:07'), ('fourth', 'one', null, null, '111-222-3333', null, '39', '2014-05-18 15:25:02', '2014-05-19 06:28:14'), ('blahblah5', 'blahblah', null, null, '111-222-3333', null, '40', '2014-05-18 15:26:00', '2014-05-19 08:50:36'), ('blahblah5', 'blahblah', null, null, '111-222-3333', null, '41', '2014-05-18 15:28:33', '2014-05-18 15:28:33'), ('blahblah5', 'blahblah', null, null, '111-222-3333', null, '42', '2014-05-18 15:30:17', '2014-05-18 15:30:17'), ('blahblah17', 'blahblah', null, null, '111-222-3333', null, '43', '2014-05-18 15:30:30', '2014-05-18 15:30:30'), ('blahblah78', 'blahblah', null, null, '111-222-3333', null, '44', '2014-05-18 15:32:04', '2014-05-18 15:32:04'), ('blahblah78', 'blahblah', null, null, '111-222-3333', null, '45', '2014-05-19 03:37:01', '2014-05-19 03:37:01'), ('xxxxxx', 'blahblah', null, null, '111-222-3333', null, '46', '2014-05-19 03:37:56', '2014-05-19 03:37:56'), ('kjhkjh', 'khkjhk', null, null, '111-222-3333', null, '55', '2014-05-19 05:10:54', '2014-05-19 06:17:56'), ('testaaa', 'testffff', null, null, '111-222-3333', null, '56', '2014-05-19 05:11:34', '2014-05-19 06:09:15'), ('testtest', 'testtest', null, null, '111-222-3333', null, '57', '2014-05-19 05:28:15', '2014-05-19 05:28:15'), ('ssdsd', 'sdsds', null, null, '111-222-3333', null, '58', '2014-05-19 05:38:27', '2014-05-19 05:38:27'), ('jkhksjhds', 'khkjhsdds', null, null, '111-222-3333', null, '59', '2014-05-19 05:49:37', '2014-05-19 05:49:37'), ('new one', 'new one', null, null, '111-222-3333', null, '60', '2014-05-19 06:10:54', '2014-05-19 06:10:54'), ('another new one', 'test test test ', null, null, '111-222-3333', null, '61', '2014-05-19 06:11:49', '2014-05-19 06:11:49'), ('final new test', 'test test test ', null, null, '111-222-3333', null, '62', '2014-05-19 06:12:31', '2014-05-19 06:12:31'), ('test', 'new one', null, null, '111-222-3333', null, '63', '2014-05-19 06:29:19', '2014-05-19 06:29:19'), ('test', 'test', null, null, '111-222-3333', null, '64', '2014-05-19 06:59:37', '2014-05-19 06:59:37'), ('test', 'test', null, null, '111-222-3333', null, '65', '2014-05-19 07:00:19', '2014-05-19 07:00:19'), ('this is my', 'new one', null, null, '111-222-3333', null, '66', '2014-05-19 07:25:59', '2014-05-19 07:43:35'), ('hi there', 'sare', null, null, '111-222-3333', null, '67', '2014-05-19 07:43:47', '2014-05-19 08:42:36'), ('hgfhgfgh', 'hfhhgf', null, null, '111-222-3333', null, '68', '2014-05-19 08:42:48', '2014-05-19 08:42:48');
COMMIT;

