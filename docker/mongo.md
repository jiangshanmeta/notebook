# Docker-Mongo

目前是在ubuntu下获取mongo的image并且生成container

## 获取mongodb镜像

```bash
docker pull mongo:latest
```

## 创建并运行容器

容器名称也叫mongo

```bash
docker run -itd --name mongo -p 27017:27017 mongo
```

## 启动docker container

mongo是container的名称

```bash
sudo docker container start mongo
```

## 把mongodb的数据导入到容器中的mongo数据库

[参考文章](https://davejansen.com/how-to-dump-restore-a-mongodb-database-from-a-docker-container/)

把dump导入到container中

```bash
sudo docker cp /home/meta/下载/dump/anon_traveler mongo:/dump
```

anon_traveler是一个数据库的dump的目录

mongo是container名称

最后一个dump是导入的地址，mongorestore默认从这里读

```bash
sudo docker exec -i mongo /usr/bin/mongorestore   --db anon_traveler 
```

第一个mongo指容器名称

执行导入，指定db名称为anon_traveler
