/* 
	常用 Node 模块
		fs  - 文件系统模块
		http - HTTP 请求模块
		path - 路径模块
		os - 操作系统模块
		events - 事件模块
		stream - 处理流数据, 例如读取和写入大型文件、网络通讯等
		util - 一些实用的工具函数（继承、类型判断、错误处理等）
		crypto - 加密模块(加密和解密数据, 包括哈希算法、加密算法等)
		url - 解析和处理 URL 地址（获取协议、主机名、路径、查询参数等）
		querystring - 解析和格式 URL 的查询字符串
		buffer - 处理二进制数据（比如创建、读取、修改缓冲区）
 */


const express = require('express');

// ESM 写法
import * as fs from 'node:fs';
import { copyFile, constants } from 'node:fs/promises';


// commonJS 解构赋值的写法
const { copyFile, constants } = require('node:fs/promises');
const fs = require('node:fs'); // Node 模块可以直接 node:XX 进行导入入
const fs = require('fs');


console.log(express);