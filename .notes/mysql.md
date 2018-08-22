# 修改表中一列的属性

1. 修改 `loginModel` 中的 `language` 列排序规则为 `utf8_unicode_ci`。

  ```mysql
  ALTER TABLE `loginModel` CHANGE `language` `language` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL;
  ```

  |名字|类型|长度/值|默认|排序规则|属性|
  |-|-|-|-|-|-|
  |language|VARCHAR|255|NULL|utf8_unicode_ci||

2. 修改 `loginModel` 中的 `phonr_number`表名为 `phone_number`。

  ```sql
  ALTER TABLE `loginModel` CHANGE `phonr_number` `phone_number` INT(11) NULL DEFAULT NULL;
  ```

# Cheet sheet

```sql
# Insert
INSERT INTO `potluck` (`id`,`name`,`food`,`confirmed`,`signup_date`) VALUES (NULL, "John", "Casserole","Y", '2012-04-11');

# Grant privileges
GRANT ALL PRIVILEGES ON * . * TO 'root'@'localhost';

# Create user
CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';
```