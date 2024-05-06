/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80031
 Source Host           : localhost:3306
 Source Schema         : users

 Target Server Type    : MySQL
 Target Server Version : 80031
 File Encoding         : 65001

 Date: 06/05/2024 18:09:51
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `category` int NULL DEFAULT NULL,
  `cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `isPublish` int NULL DEFAULT NULL,
  `editTime` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES (14, 'aaaa', '<p>21312w</p>', 2, '/newsuploads/07a9bbfa244319229739a8351836bd70', 1, '2023-11-28');
INSERT INTO `news` VALUES (15, '山西安泽县永鑫通海铁路物流公司施工事故导致7人遇难', '<p>新华社太原11月25日电（记者赵阳）记者从山西省临汾市委宣传部获悉，安泽县山西永鑫通海铁路物流有限责任公司施工事故目前被埋7人已确认遇难。</p><p>　　<img alt=\"\" src=\"http://i.ce.cn/ce/xwzx/gnsz/gdxw/202311/25/W020231125722937466270.JPG\"/></p><p>　　这是11月25日拍摄的事故搜救现场（无人机照片）。新华社记者 赵阳 摄</p><p>　　记者在现场看到，现场共有8个近30米高的柱体建筑呈“一”字形南北方向排列，其中南侧第一个建筑的顶板发生坍塌，搜救人员在建筑底部搭建木板，防止上空脚手架发生二次坍塌，在底部搜救区域有大量混凝土堆积，现场搜救人员正在进行破拆施工。</p><p>　　24日22时许，山西永鑫通海铁路物流有限责任公司施工现场发生一起浇筑通廊混凝土支架模型脱落事件。当日20时30分左右，由中铝国际（天津）建设有限公司施工的原料煤棚第8段28.5米处梁板混凝土浇筑30立方米，施工到22时许突然发生脚手架坍塌，有6名工人和1名混凝土泵车指挥人员掉到底部，被钢筋混凝土掩埋。</p><p>（责任编辑：王炬鹏）</p>', 1, '/newsuploads/986cc1cc0a9aef033f7e059c6dd1abcf', 1, '2023-11-28');
INSERT INTO `news` VALUES (16, 'abcd', '<p>120110</p>', 3, '/newsuploads/3f0eb24341f04e46f3fb75442fcea236', 0, '2023-11-26');

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `introduction` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `detail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `editTime` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES (3, 'aaa1', 'bbbw', 'ccc', '/productuploads/d720d20b1bd3448152418e3f08aaeadf', '2023-11-26');
INSERT INTO `product` VALUES (5, 'qweq', '12312', 'erwer', '/productuploads/6988bdd7df88c30beabb0865b58b4aa4', '2023-11-26');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `gender` int NULL DEFAULT NULL,
  `introduction` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `role` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'admin', '123', 1, 'wqioe', '/avataruploads/698b898c0a8f09ad51345b77d3d041b9', 1);
INSERT INTO `user` VALUES (6, 'bbb', '123', 0, 'wewqe', '', 1);
INSERT INTO `user` VALUES (10, 'ccc', '123', NULL, NULL, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
