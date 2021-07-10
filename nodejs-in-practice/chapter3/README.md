# Buffers: 使用比特 字节以及编码

## 修改数据编码

如果没有提供编码格式，那么文件操作以及许多网络操作会将数据作为Buffer类型返回.

可以通过```Buffer.isBuffer```判断是否是buffer

### 技巧15 Buffer转换为其他格式

可以使用toString方法把buffer转换为其他格式，参数是要转换为的格式,默认是utf-8

### 技巧16 使用Buffer来修改字符串编码

可以使用```Buffer.from```将字符串转换为buffer，然后toString成为目标格式

## 二进制文件转换为JSON

### 技巧17 使用Buffer来转换原始数据

通过坐标访问 slice复制

## 创建你自己的二进制协议

### 技巧18 创建自己的网络协议
