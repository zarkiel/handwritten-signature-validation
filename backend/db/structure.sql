-- MySQL dump 10.13  Distrib 5.7.17, for Win32 (AMD64)
--
-- Host: localhost    Database: signature_verification
-- ------------------------------------------------------
-- Server version	11.3.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `active_storage_attachments`
--

DROP TABLE IF EXISTS `active_storage_attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `active_storage_attachments` (
  `id` uuid NOT NULL DEFAULT uuid(),
  `name` varchar(255) NOT NULL,
  `record_type` varchar(255) NOT NULL,
  `record_id` uuid NOT NULL,
  `blob_id` uuid NOT NULL,
  `created_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_active_storage_attachments_uniqueness` (`record_type`,`record_id`,`name`,`blob_id`),
  KEY `index_active_storage_attachments_on_blob_id` (`blob_id`),
  CONSTRAINT `fk_rails_c3b3935057` FOREIGN KEY (`blob_id`) REFERENCES `active_storage_blobs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `active_storage_attachments`
--

LOCK TABLES `active_storage_attachments` WRITE;
/*!40000 ALTER TABLE `active_storage_attachments` DISABLE KEYS */;
INSERT INTO `active_storage_attachments` VALUES ('d75d734d-5921-11f0-9734-047c16832f77','photo','Worker','ab0fa6ea-ae2e-4acb-a53f-01dcf7b5bee6','d75d31dc-5921-11f0-9734-047c16832f77','2025-07-04 16:57:13.847822'),('2fdb13ca-5875-11f0-977c-047c16832f77','images','Customer','b924dc7c-32f1-45c4-adc8-091b951ba3d5','2fdac17a-5875-11f0-977c-047c16832f77','2025-07-03 20:21:19.579562'),('cd9e11c5-5875-11f0-977c-047c16832f77','images','Customer','b924dc7c-32f1-45c4-adc8-091b951ba3d5','cd9dca57-5875-11f0-977c-047c16832f77','2025-07-03 20:25:44.259834'),('fcb6bdff-5875-11f0-977c-047c16832f77','images','Customer','b924dc7c-32f1-45c4-adc8-091b951ba3d5','fcb67a4d-5875-11f0-977c-047c16832f77','2025-07-03 20:27:03.274526'),('fcbb0a05-5875-11f0-977c-047c16832f77','images','Customer','b924dc7c-32f1-45c4-adc8-091b951ba3d5','fcbab7da-5875-11f0-977c-047c16832f77','2025-07-03 20:27:03.302679'),('fcc08d6a-5875-11f0-977c-047c16832f77','images','Customer','b924dc7c-32f1-45c4-adc8-091b951ba3d5','fcc0393f-5875-11f0-977c-047c16832f77','2025-07-03 20:27:03.338853');
/*!40000 ALTER TABLE `active_storage_attachments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `active_storage_blobs`
--

DROP TABLE IF EXISTS `active_storage_blobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `active_storage_blobs` (
  `id` uuid NOT NULL DEFAULT uuid(),
  `key` varchar(255) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `content_type` varchar(255) DEFAULT NULL,
  `metadata` text DEFAULT NULL,
  `service_name` varchar(255) NOT NULL,
  `byte_size` bigint(20) NOT NULL,
  `checksum` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_active_storage_blobs_on_key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `active_storage_blobs`
--

LOCK TABLES `active_storage_blobs` WRITE;
/*!40000 ALTER TABLE `active_storage_blobs` DISABLE KEYS */;
INSERT INTO `active_storage_blobs` VALUES ('d75d31dc-5921-11f0-9734-047c16832f77','zmusujzjz9t87popde2og6oci2ex','1.png','image/png','{\"identified\":true,\"width\":128,\"height\":128,\"analyzed\":true}','local',2284,'NuzmYotvXQD53PRT+ejCkw==','2025-07-04 16:57:13.845915'),('2fdac17a-5875-11f0-977c-047c16832f77','8dh4b48flkg0cr6pa0kc77a531r7','original_1_1.png','image/png','{\"identified\":true,\"width\":576,\"height\":343,\"analyzed\":true}','local',103437,'RIInlxRhmsHvOPkJ01661Q==','2025-07-03 20:21:19.577432'),('cd9dca57-5875-11f0-977c-047c16832f77','nkhq1sh8413fjlz7fy8g5gpzur8g','original_1_3.png','image/png','{\"identified\":true,\"width\":576,\"height\":343,\"analyzed\":true}','local',103212,'5Tlt+ttApeJpbUBWRfNRJA==','2025-07-03 20:25:44.256525'),('fcb67a4d-5875-11f0-977c-047c16832f77','ku26ui7jipzd287re6q1h337zs2l','original_1_2.png','image/png','{\"identified\":true,\"width\":576,\"height\":349,\"analyzed\":true}','local',104542,'mUYMvncGSwb6lT4gTvT9ww==','2025-07-03 20:27:03.271341'),('fcbab7da-5875-11f0-977c-047c16832f77','9p2eevzuhdgbngbp45jn1qi4bzft','original_1_4.png','image/png','{\"identified\":true,\"width\":546,\"height\":355,\"analyzed\":true}','local',101876,'iQ4KqPjXCAxlNw3hUITidA==','2025-07-03 20:27:03.298911'),('fcc0393f-5875-11f0-977c-047c16832f77','996m589zdnt1omafoic6s4lwsrnp','original_1_5.png','image/png','{\"identified\":true,\"width\":588,\"height\":325,\"analyzed\":true}','local',99627,'p78ENO0CC1kcJF0nRw7P0A==','2025-07-03 20:27:03.334364');
/*!40000 ALTER TABLE `active_storage_blobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `active_storage_variant_records`
--

DROP TABLE IF EXISTS `active_storage_variant_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `active_storage_variant_records` (
  `id` uuid NOT NULL DEFAULT uuid(),
  `blob_id` uuid NOT NULL,
  `variation_digest` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_active_storage_variant_records_uniqueness` (`blob_id`,`variation_digest`),
  CONSTRAINT `fk_rails_993965df05` FOREIGN KEY (`blob_id`) REFERENCES `active_storage_blobs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `active_storage_variant_records`
--

LOCK TABLES `active_storage_variant_records` WRITE;
/*!40000 ALTER TABLE `active_storage_variant_records` DISABLE KEYS */;
/*!40000 ALTER TABLE `active_storage_variant_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ar_internal_metadata`
--

DROP TABLE IF EXISTS `ar_internal_metadata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ar_internal_metadata` (
  `key` varchar(255) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ar_internal_metadata`
--

LOCK TABLES `ar_internal_metadata` WRITE;
/*!40000 ALTER TABLE `ar_internal_metadata` DISABLE KEYS */;
INSERT INTO `ar_internal_metadata` VALUES ('environment','development','2025-06-13 12:44:17.818313','2025-06-13 12:44:17.818314');
/*!40000 ALTER TABLE `ar_internal_metadata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers` (
  `id` uuid NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `name` varchar(500) NOT NULL DEFAULT '',
  `lastname1` varchar(500) NOT NULL DEFAULT '',
  `lastname2` varchar(500) NOT NULL DEFAULT '',
  `document_type_id` uuid NOT NULL,
  `document_number` varchar(500) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `index_customers_on_document_type_id` (`document_type_id`),
  CONSTRAINT `fk_rails_68fb63f948` FOREIGN KEY (`document_type_id`) REFERENCES `dictionaries` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES ('b924dc7c-32f1-45c4-adc8-091b951ba3d5','2025-07-03 20:21:19.570791','2025-07-04 16:56:51.982553','Estefany Ruby','Sepulveda','Muñoz','6381f9db-8e9a-4954-99fe-67302c18f9a2','11111111');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dictionaries`
--

DROP TABLE IF EXISTS `dictionaries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dictionaries` (
  `id` uuid NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `collection` int(10) unsigned NOT NULL DEFAULT 0,
  `name` varchar(255) NOT NULL DEFAULT '',
  `description` text NOT NULL DEFAULT '',
  `position` int(10) unsigned NOT NULL DEFAULT 0,
  `status` tinyint(3) unsigned NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `index_dictionaries_on_collection` (`collection`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dictionaries`
--

LOCK TABLES `dictionaries` WRITE;
/*!40000 ALTER TABLE `dictionaries` DISABLE KEYS */;
INSERT INTO `dictionaries` VALUES ('0f015e8a-1c66-4993-8337-474fad818427','2025-04-15 18:59:34.917000','2025-06-08 16:59:47.923000',7,'Pasaporte','',0,1),('9a1c258e-106c-4b93-9992-4c75c2ea229c','2025-04-15 18:59:28.226000','2025-04-15 18:59:28.226000',7,'Carnet de Extranjería','',0,1),('6381f9db-8e9a-4954-99fe-67302c18f9a2','2025-04-15 18:58:00.183000','2025-04-15 18:58:00.183000',7,'Documento Nacional de Identidad','',0,1);
/*!40000 ALTER TABLE `dictionaries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` uuid NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `name` varchar(500) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_roles_on_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES ('7e8e630f-4d56-4e00-a22d-d1bb16bcf35d','2025-04-15 23:50:26.412000','2025-04-15 23:50:26.412000','ADMINISTRADOR');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schema_migrations`
--

DROP TABLE IF EXISTS `schema_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schema_migrations` (
  `version` varchar(255) NOT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schema_migrations`
--

LOCK TABLES `schema_migrations` WRITE;
/*!40000 ALTER TABLE `schema_migrations` DISABLE KEYS */;
INSERT INTO `schema_migrations` VALUES ('20250613174408'),('20250620174248'),('20250620174738');
/*!40000 ALTER TABLE `schema_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_roles` (
  `id` uuid NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `user_id` uuid DEFAULT NULL,
  `role_id` uuid DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_user_roles_on_user_id_and_role_id` (`user_id`,`role_id`),
  KEY `index_user_roles_on_role_id` (`role_id`) USING BTREE,
  KEY `index_user_roles_on_user_id` (`user_id`) USING BTREE,
  CONSTRAINT `fk_rails_318345354e` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_rails_3369e0d5fc` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES ('8508d196-29eb-40b1-a3c0-63bb24a83d8b','2025-04-15 23:55:04.479000','2025-04-15 23:55:04.479000','3e81f28e-948d-42f7-b926-3e122035da6f','7e8e630f-4d56-4e00-a22d-d1bb16bcf35d');
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` uuid NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `worker_id` uuid NOT NULL,
  `username` varchar(100) NOT NULL DEFAULT '',
  `password` varchar(100) NOT NULL DEFAULT '',
  `status` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_users_on_username` (`username`),
  KEY `index_users_on_worker_id` (`worker_id`) USING BTREE,
  CONSTRAINT `fk_rails_79dca46b80` FOREIGN KEY (`worker_id`) REFERENCES `workers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('3e81f28e-948d-42f7-b926-3e122035da6f','2025-04-15 23:54:13.983000','2025-04-15 23:54:13.983000','ab0fa6ea-ae2e-4acb-a53f-01dcf7b5bee6','admin','d033e22ae348aeb5660fc2140aec35850c4da997',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workers`
--

DROP TABLE IF EXISTS `workers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workers` (
  `id` uuid NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `name` varchar(500) NOT NULL DEFAULT '',
  `lastname1` varchar(500) NOT NULL DEFAULT '',
  `lastname2` varchar(500) NOT NULL DEFAULT '',
  `document_type_id` uuid NOT NULL,
  `document_number` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `index_workers_on_document_type_id` (`document_type_id`) USING BTREE,
  CONSTRAINT `fk_rails_d18a7cf18f` FOREIGN KEY (`document_type_id`) REFERENCES `dictionaries` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workers`
--

LOCK TABLES `workers` WRITE;
/*!40000 ALTER TABLE `workers` DISABLE KEYS */;
INSERT INTO `workers` VALUES ('ab0fa6ea-ae2e-4acb-a53f-01dcf7b5bee6','2025-05-19 11:26:26.151000','2025-07-04 16:57:14.481894','Carlos Alberto','Calatayud','Condori','6381f9db-8e9a-4954-99fe-67302c18f9a2','123456789');
/*!40000 ALTER TABLE `workers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'signature_verification'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-09 14:29:51
