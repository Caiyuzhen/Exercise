onmessage = function(e) {
	const data = e.data;
	postMessage(data.sort((a,b) => a - b));//排序，如果 a-b 为负，则排在前面(小->大)并传递给主线程
}