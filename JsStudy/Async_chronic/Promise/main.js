/*
	Promise
		ð ä¼ å¥ Promise åç ()=>{..} åè°å½æ° ... æ¯ðåæ­¥ä»£ç !!!
		ð Promise çåè°å½æ°åç resolveãreject å½æ°æ¯ðå¼æ­¥ä»£ç !!!
			æ¯å¦
				new Promise((resolve,reject)=>{console.log(2)})
					ð¥ð¥è¿ä¸ª console.log(2) æ¯ä¸å¼å§å°±ä¼åæ­¥æ§è¡çï¼ï¼ï¼


		Promise å®ä¾çéè¦å±æ§!!
			ð[[PromiseState]] è¡¨ç¤º Promise çç¶æ, ç¶æåªè½æ¹åä¸æ¬¡ï¼ï¼ä» pending å° resolved æå° rejected
				pending 	å¾å®ç¶æ
				fullfilled  æå&è§£å³ç¶æ  ââââââââ resolve()æ§è¡
				rejected 	å¤±è´¥&æç»ç¶æ  ââââââââ	reject()æ§è¡

			ð[[PromiseResult]] è¡¨ç¤ºå¼
				resolve() å®ä¾ä¸­ä¼ å¥çå¼
				reject() å®ä¾ä¸­ä¼ å¥çå¼

*/ 


/*	
	å®ä¾å
		ä¸å®è¦ä¼ å¥ä¸ä¸ªå½æ°, å½æ°è¦è®¾ç½®ä¸¤ä¸ªåæ°,
		æ³¨æ resolve,reject é¡ºåºæ¯æè¦æ±ç
		resolveãreject é½æ¯å½æ°ð ä¸å¯ä»¥ä¼ å¼, è· Promise ç¸äºç»å®
*/


//å®ä¹åéè¯·æ±çæ¹æ³
function getDataFormUrl(url, data, callback){
	const ramdomDelay = Math.round().toFixed(3) * 1000
	setTimeout(()=>{
		callback()
	},ramdomDelay)
}


//æ§è¡ä¸é¢çæ¹æ³
const PROMISE_TEST = new Promise((resolve,reject)=>{ 
	getDataFormUrl('http://localhost:8080','abc',(resdata)=>{
		console.log(resdata);
		// resolve()
		reject('æç»äº')
	})
})

console.log(PROMISE_TEST);

