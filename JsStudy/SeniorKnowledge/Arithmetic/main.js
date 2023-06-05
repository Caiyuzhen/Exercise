/*
	算法与数据结构
		What?
			算法通常与数据结构一起实现, 效率会最大化
			
			算法
				输入数据, 处理数据, 输出结果

			JS 中最常见的数据结构
				数组
				对象 
				栈  Stack 							后进先出 （LIFO）
				队列								先进先出 （FIFO）
				链表(单向链表、双向链表)
				树（二叉树 - 每个节点最多就 2 个子节点） 方便搜索
				图
				堆
				散列表
*/

// 算法 ——————————————————————————————————————————————————————
// 排序算法


// 搜索算法


// 数据处理


// 图形处理


// 机器学习


// 推荐算法



// 数据结构 ——————————————————————————————————————————————————————
// 🚀栈的数据结构示例
class Stack {
	constructor() {
		this.items = []
	}

	push(ele) {
		this.items.push(ele) //🔥 从最后面开始存数据
	}

	pop() { // 移除栈顶元素
		if(this.isEmpty()) {
			return '栈为空' 
		}
		return this.items.pop()  //🔥 pop() 是移除最后一个元素并返回该元素
	}

	peek() {  //输出栈中最后一个数据
		if(this.isEmpty()) {
			return '栈为空'
		}
		return this.items[this.items.length - 1] //🔥 从最后面开始取数据
	}

	isEmpty() {
		return this.items.length === 0
	}

	printStack() { //输出栈中所有的数据
		let str = ''
		for(let i = 0 ; i < this.items.length ; i++) {
			str += this.items[i] + ' '
		}
		return str
	}
}

let stack = new Stack()
console.log(stack.isEmpty())  // true
stack.push(10)
stack.push(20)
stack.push(30)
console.log(stack.printStack()) // 10 20 30
console.log(stack.peek()) // 30
console.log(stack.pop()) // 30
console.log(stack.printStack()) // 10 20





// 🚀队列的数据结构示例
class Queue {
	constructor() {
		this.items = []
	}

	enqueue(ele) { // 向队列尾部添加一个（或多个）新的项
		this.items.push(ele)
	}

	dequeue() { // 移除队列的第一项，并返回被移除的元素
		if(this.isEmpty()) {
			return '队列为空'
		}
		return this.items.shift() //shift() 方法为移除数组的第一个元素并返回该元素
	}

	front() { // 返回队列中第一个元素
		if(this.isEmpty()) {
			return '队列为空'
		}
		return this.items[0]
	}

	isEmpty() {
		return this.items.length === 0
	}


	size() { //返回总数
		return this.items.length
	}
	
	clear() { //清零
		this.items = []
	}

	print() {
		console.log(this.items)
	}
}

const queue = new Queue()
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
queue.print() // 输出: [1, 2, 3]
console.log(queue.size()) // 输出: 3
console.log(queue.front()) // 输出: 1
console.log(queue.dequeue()) // 输出: 1
queue.print()  // 输出: [2, 3]
console.log(queue.isEmpty()) // 输出: false
queue.clear()
console.log(queue.isEmpty()) // 输出: true





// 🚀链表数据结构
class Node2 {
	constructor(data) {
		this.data = data 
		this.next = null 
	}
}


class LinkedList {
	constructor() {
		this.head = null  // 单向链表的话, 只要获取了 头(第一个元素), 就能知道所有的数据
		this.length = 0 
	}

	append(data) { //添加链表数据
		let newNode = new Node2(data) 
		let current

		if (this.head === null) {
			this.head = newNode 

		} else {
			current = this.head // current 一开始指向链表的第一个对象
			while (current.next !== null) {
				current = current.next //把 current 设置为下一个元素 next() 也就是链表中的下一个对象
			}
		current.next = newNode //如果 current.next 为 null, 说明已经到了链表的最后一个对象, 就把 newNode 赋值给 current.next
		}

		this.length++  //链条有多长
	}

	insert(position, data) { // 插入链表数据
		if (position < 0 || position > this.length) { // position 不能小于 0, 也不能大于链表的长度
			return false 
		}

		const newNode = new Node2(data) 

		if (position === 0) {
			newNode.next = this.head 
			this.head = newNode 
		} else {
			let current = this.head 
			let previous = null 
			let index = 0 

			while (index < position) {
				previous = current 
				current = current.next 
				index++ 
			}

			newNode.next = current 
			previous.next = newNode 
		}

		this.length++ 
		return true 
	}

	removeAt(position) { //删除链表数据
		if (position < 0 || position >= this.length) {
			return null 
		}

		let current = this.head 

		if (position === 0) {
			this.head = current.next 
		} else {
			let previous = null 
			let index = 0 

			while (index < position) {
				previous = current 
				current = current.next 
				index++ 
			}

			previous.next = current.next 
		}

		this.length-- 
		return current.data 
	}

	indexOf(data) { // 查找链表数据
		let current = this.head 
		let index = 0 

		while (current !== null) {
			if (current.data === data) {
				return index 
			}
			current = current.next 
			index++ 
		}

		return -1 
	}

	isEmpty() { //判断链表是否为空
		return this.length === 0 
	}

	size() { //返回链表长度
		return this.length 
	}

	toString() { //返回链表数据
		let current = this.head 
		let str = '' 

		while (current !== null) {
			str += current.data + ' ' 
			current = current.next 
		}

		return str.trim() // trim() 方法用于删除字符串的头尾空格
	}
}
  
// 使用示例
const linkedList = new LinkedList() 
linkedList.append(1) 
linkedList.append(2) 
linkedList.append(3) 
console.log(linkedList.toString())  // 输出: 1 2 3
console.log(linkedList.size())  // 输出: 3
console.log(linkedList.isEmpty())  // 输出: false
console.log(linkedList.indexOf(2))  // 输出: 1
linkedList.insert(1, 4) 
console.log(linkedList.toString())  // 输出: 1 4 2 3
linkedList.removeAt(2) 
console.log(linkedList.toString())  // 输出: 1 4 3





// 🚀二叉树的数据结构
class Node3 {
	constructor(data) {
		this.data = data 
		this.left = null 
		this.right = null 
	}
}


class BinaryTree {
	constructor() {
		this.root = null 
	}

	insert(data) { //插入数据
		const newNode = new Node3(data) 

		if (this.root === null) {
			this.root = newNode  // 建立根节点
		} else {
			this.insertNode(this.root, newNode) 
		}
	}

	insertNode(node, newNode) { //插入 node
		if (newNode.data < node.data) { // newNode.data < node.data 说明要插入的数据在 node 的左侧
			if (node.left === null) {
				node.left = newNode 
			} else {
				this.insertNode(node.left, newNode) 
			}
		} else {
			if (node.right === null) {
				node.right = newNode 
			} else {
				this.insertNode(node.right, newNode) 
			}
		}
	}

	search(data) { //搜索 node 上的数据
		return this.searchNode(this.root, data) 
	}

	searchNode(node, data) { //搜索 node
		if (node === null) {
			return false 
		}

		if (data < node.data) { // data < node.data 说明要查找的数据在 node 的左侧
			return this.searchNode(node.left, data) 
		} else if (data > node.data) {
			return this.searchNode(node.right, data) 
		} else {
			return true 
		}
	}

	remove(data) { // 删除 node 上的数据
		this.root = this.removeNode(this.root, data) 
	}

	removeNode(node, data) { // 删除 node
		if (node === null) {
			return null 
		}

		if (data < node.data) {
			node.left = this.removeNode(node.left, data) 
			return node 
		} else if (data > node.data) {
			node.right = this.removeNode(node.right, data) 
			return node 
		} else {
		if (node.left === null && node.right === null) {
			node = null 
			return node 
		}

		if (node.left === null) {
			node = node.right 
			return node 
		} else if (node.right === null) {
			node = node.left 
			return node 
		}

		const minNode = this.findMinNode(node.right)  // 找到右侧子树中最小的节点
			node.data = minNode.data 
			node.right = this.removeNode(node.right, minNode.data) 
			return node 
		}
	}

	findMinNode(node) { // 找到右侧子树中最小的节点
		if (node.left === null) {
			return node 
		} else {
			return this.findMinNode(node.left) 
		}
	}

	// 👇递归调用, 遍历所有树, 并按照小到大的顺序处理节点的数据
	inOrderTraversal(callback) { // 遍历当前节点的左子树。这会将控制权传递给左子树，并继续按照中序遍历的顺序遍历左子树的节点
		this.inOrderTraversalNode(this.root, callback) 
	}

	inOrderTraversalNode(node, callback) { // 中序遍历 node
		if (node !== null) {
			this.inOrderTraversalNode(node.left, callback) 
			callback(node.data) 
			this.inOrderTraversalNode(node.right, callback) 
		}
	}

	preOrderTraversal(callback) {
		this.preOrderTraversalNode(this.root, callback) 
	}

	preOrderTraversalNode(node, callback) { // 递归调用, 遍历当前节点的右子树。这会将控制权传递给右子树
		if (node !== null) {
			callback(node.data) 
			this.preOrderTraversalNode(node.left, callback) 
			this.preOrderTraversalNode(node.right, callback) 
		}
	}

	postOrderTraversal(callback) {
		this.postOrderTraversalNode(this.root, callback) 
	}

	postOrderTraversalNode(node, callback) {
		if (node !== null) {
			this.postOrderTraversalNode(node.left, callback) 
			this.postOrderTraversalNode(node.right, callback) 
			callback(node.data) 
		}
	}
}
  
// 使用示例
const binaryTree = new BinaryTree() 
binaryTree.insert(10) 
binaryTree.insert(6) 
binaryTree.insert
  




