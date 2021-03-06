class SlideBar {

	constructor(){
		//ð¥è®°å½æ¯å¦æä¸é¼ æ äº
		this.isDown = false
	}

	//è¿åº¦æ¡
	static controlBar = document.querySelector('.control-bar')
	//è¦è¢«æå¨çåç¹
	static touchCircle = document.querySelector('.touch-circle')
	//ç½è²è¿åº¦
	static progressLine = document.querySelector('.progress-line')
	//åºé¨çå¤§æå­
	static controlText = document.querySelector('.card-titles')
	
	//ð¥è®°å½ï¼åç¹ï¼è·ï¼æææå¨ï¼çè·ç¦»æ°æ®
	static moveInfo = {}
	


	
	//â¡ï¸åå§åæ¶åè¦åçä¸äºåºç¡çè®¡ç®
	static basicCalculate(){
		//ðåç¹æå¤§ç§»å¨è·ç¦» maxMoveWidth = è¿åº¦æ¡å®½åº¦ - åç¹çå®½åº¦
		const slideSpanWidth = this.controlBar.getBoundingClientRect().width - this.touchCircle.getBoundingClientRect().width
		this.moveInfo.maxMoveWidth = Math.round(slideSpanWidth) //åèäºå¥
		// console.log(this.moveInfo.maxMoveWidth) //ç®åºæå¤§è·ç¦»ä¸ºï¼635px
		
		//ðè·ååºé¨æ é¢å­çåå§å¤§å°
		this.moveInfo.fontSize = parseInt(getComputedStyle(this.controlText).fontSize)//åå°æ°ç¹åä¸¤ä½
		// console.log(this.moveInfo.fontSize) //åå§å­ä½å¤§å°ä¸ºï¼16
	}
	
	
	
	//ð¥æ·»å ãâ­ï¸åç¹ãçäºä»¶
	static setEvents(){
			//æä¸äºä»¶âââââââââââââââââ
			this.touchCircle.addEventListener('touchstart',(e)=>{
				// é²æ­¢é¡µé¢ä¸ä¸æ»å¨
				e.preventDefault()
				// console.log('ç¹å»äº')
				/*
					å ä¸ºåªæ¯æ¨ªåæå¨ æä»¥ä¸»è¦è®°å½ä¸¤ä¸ªæ°æ®
					ä¸ä¸ªæ¯æææä¸å»æ¶åçxåæ ç¹  ç¶åæ¯æä¸å»çæ¶å åç¹å·²ç»æçtransformçå¼ å ä¸ºæå¯è½åç¹å¹¶ä¸æ¯å¨åå§ä½ç½®
				*/
				//è·å¾åç´ çææææ°æ°æ®
				const transform = getComputedStyle(this.touchCircle).transform 
				//è·å¾åç´ çåæ è±¡é
				const matrix = new DOMMatrixReadOnly(transform) 
				//å®ä¹ä¸ä¸ªåéï¼è®°å½æä¸æ¶â­ï¸åç¹ç X åæ 
				this.moveInfo.basicTransX = Math.round(matrix.m41)
				//å®ä¹ä¸ä¸ªåéï¼è®°å½ææðæä¸ç X åæ  (ð¥ç§»å¨ç«¯è¿ä¼è®°å½ä¸è¿ä¸²åæ ï¼è®°å¾å[0]!)
				this.moveInfo.startX = Math.round(e.changedTouches[0].clientX)
				// console.log(this.moveInfo)
				// this.isDown = true //ç¡®è®¤ç¹ä¸äº
			},{passive:false})
			

			
			//ç§»å¨äºä»¶ ââââââââââââââ
			//ðPC ç«¯çåæ³ï¼ç§»å¨ç«¯åä¸éè¦å¤æ­æ¯å¦ç¹ä¸äº
			// this.touchCircle.addEventListener('mousemove',(e)=>{
			// 	//ðè®¡ç®åç¹è·éãæå¨å°åªå¿çè·ç¦»ã = (ç§»å¨ä¸­ææçxåæ ) åå» (ä¸å¼å§ start X åæ ) + (å·²æçåç¹ç X åæ å¼ basicTransX) 
			// 	//ðPC ç«¯çåæ³ï¼ç§»å¨ç«¯åä¸éè¦å¤æ­æ¯å¦ç¹ä¸äº
			// 	if(this.isDown){
			// 		let tranX = e.clientX - this.moveInfo.startX + this.moveInfo.basicTransX
			// 		console.log(tranX)
			//		èµå¼ç»ç¹ä¸­çåç¹
			// 		e.currentTarget.style.transform = `translateX(${tranX}px)`
			// 	}else{
			// 		return
			// 	}
			// })
			this.touchCircle.addEventListener('touchmove',(e)=>{
				// é²æ­¢é¡µé¢ä¸ä¸æ»å¨
				e.preventDefault()
				

				//ðè®¡ç®åç¹è·éãæå¨å°åªå¿çè·ç¦»ã = (ç§»å¨ä¸­ææçxåæ ) åå» (ä¸å¼å§ start X åæ ) + (å·²æçåç¹ç X åæ å¼ basicTransX) 
				let transX = e.changedTouches[0].clientX - this.moveInfo.startX + this.moveInfo.basicTransX
				
				//å¤æ­åç¹ç§»å¨çæå¤§æå°å¼
				if(transX < 0){
					transX = 0 //æå·¦è¾¹
				}else if(transX > this.moveInfo.maxMoveWidth){
					transX = this.moveInfo.maxMoveWidth //æå³è¾¹
				}
				//ðèµå¼ç»ç¹å°çåç¹ï¼è®©åç¹è·çè½å¤æå¨èµ·æ¥
				e.currentTarget.style.transform = `translateX(${transX}px)`

				//ðè®©è¿åº¦æ¡è·éç§»å¨
				/*
					-320 ~ 0 
					0    ~ 320
					TransX - 320 = progressBarçç§»å¨è·ç¦»
				*/
				this.progressLine.style.transform = `translateX(${transX-this.moveInfo.maxMoveWidth}px)`

				//è®¡ç®æ»é¿åº¦è·ç§»å¨è·ç¦»çæ¯ä¾ï¼ç¶åç¨äºæ§å¶æå­çå¤§å°
				const percentRation = (transX / this.moveInfo.maxMoveWidth) 

				//å©ç¨æ¯ä¾ * åå§å¤§å°æ¥æ¹åæå­å¤§å°
				this.controlText.style.fontSize = this.moveInfo.fontSize * (1 + percentRation) + 'px'
				// console.log(this.controlText.style.fontSize);

			},{passive:false})
	}
	

	//SlideBar åå§åè¦è°ç¨çæ¹æ³ï¼éä¸­æ¾è¿é
	static sliderBarinit(){
		this.setEvents()
		this.basicCalculate()
	}
}




//ðððââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ




class Card {
	constructor(CARD_DATA) {
		this.domCard = Card.mockCard.cloneNode(true) //çæå¤§ Card äºï¼åéå¡ç
		// console.log(this.domCard)//æå° 4 ä¸ª one-card div åç´ 
		// this.appendCard()//çæå¤§ Card äºï¼è°ç¨æ·»å å¡çå°å®¹å¨åçæ¹æ³(å ä¸ºé»è®¤åªå±ç¤ºä¸ä¸ªï¼æä»¥è¿ä¸æ­¥çå»)
		this.littleCardDom = Card.mockLittleCard.cloneNode(true)
		this.initCardContent(CARD_DATA)//çæå¤§ Card ä¸ï¼è°ç¨æ¹æ³ï¼ä¼ å¥æ°æ®
		// console.log(this.domCard);
	}
	
	//è·åå¤§å¡çå®¹å¨
	static cardStage = document.querySelector('.card-stage')
	//è·åå¤§å¡ç
	static mockCard = document.querySelector('.one-card')
	//è·åå°å¡çå®¹å¨
	static littleCardBox = document.querySelector('.card-click-stage')
	//è·åå°å¡ç
	static mockLittleCard = document.querySelector('.card-color-board')
	//è·åå¤§å¡çåºç¡çæ ·å¼ä¿¡æ¯
	static basicCardInfo = this.mockCard.getBoundingClientRect()
	

	//åå§åæ¶ï¼å é¤æ§çå¤§å°å¡ç
	static cardRemove(){
		this.mockCard.remove()
		this.mockLittleCard.remove()
	}
	
	
	//çæå¤§ Card ä¸ï¼æ³¨å¥å¤§å¡çåå®¹  +  å°å¡çåå®¹
	initCardContent(CARD_DATA){
		const {texts,color,detailText,imgUrl,colorName} = CARD_DATA
		//å¤§å¡çåå®¹
		this.domCard.style.backgroundColor = color
		this.domCard.firstElementChild.firstElementChild.innerText = detailText//ð¥ð¥ç¨å­åç´ çå­åç´ å»éå°æå­ï¼
		this.domCard.firstElementChild.lastElementChild.src = imgUrl
		//å°å¡çåå®¹
		this.littleCardDom.style.backgroundColor = color
		this.littleCardDom.firstElementChild.innerText = colorName[0].toUpperCase()
	}

	//çæå¤§ Card åï¼æ·»å å¡çå°å¡çå®¹å¨åçæ¹æ³ï¼æ³¨æè¿éè¦ç»åç¬¬ 7 æ­¥æ¥ä½¿ç¨ï¼é»è®¤åå±ç¤ºä¸ä¸ª
	appendCard(){
		Card.cardStage.appendChild(this.domCard) //ð¥æ³¨æè¿éä½¿ç¨ Card ç±»æ¥è°ç¨ï¼
	}

	//è®¾ç½®å¤§ + å°å¡ççå®½åé« å¯ä»¥ä¿è¯æ¯ä¸ªå¡ççå°ºå¯¸ä¸æ¨¡ä¸æ ·
	setCardSize() {
		this.domCard.style.width = Card.basicCardInfo.width + 'px' //ð¥æ³¨æï¼è¿éè¦ç¨ Card ç±»æ¥è°ç¨ basicCardInfoï¼ï¼
		this.domCard.style.height = Card.basicCardInfo.height + 'px' //ð¥æ³¨æï¼è¿éè¦ç¨ Card ç±»æ¥è°ç¨ basicCardInfoï¼ï¼
	}

	//å°å¡çæ·»å å°ç¶åç´ ä¸­ï¼å®¹å¨ï¼
	appendLittleCard(){
		Card.littleCardBox.appendChild(this.littleCardDom) //ð¥æ³¨æè¿éä½¿ç¨ Card ç±»æ¥è°ç¨ï¼
		// Card.littleCardBox.style.padding = '0 2rem 0 12rem;'
	}
	
}





//ðððââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ





class AppController  {
	// ææå¤§å¡ççä¿¡æ¯æ°æ®
	static CARD_DATAS = [
        // texts,color,detailText,imgUrl
	    {
	      texts:['Keep',"Learning","Code"],
	      color:'#4700D8',
	      colorName:'blue',
	      detailText:'There are going to be days where youâre undone, stressed out, tired, spent. And Iâll still love you just as much in those moments as I ever have, maybe even a little more, because itâll mean you let me get close enough to know the real you. Thatâs all I want. ',
	      imgUrl:'./assets/page1.png'
	    },
	    {
	      texts:['Coding',"Is","Fun"],
	      color:'#E84A5F',
	      colorName:'red',
	      detailText:'Ask me to define my love for you and Iâll say itâs captured in every beautiful memory of our past, detailed out in the vivid visions of our dreams, and future plans, but most of all itâs right now, in the moment where everything Iâve ever wanted in my life is standing right in front of me and smiling. ',
	      imgUrl:'./assets/page2.png'
	    },
	    {
	      texts:["Create","Some","Difference"],
	      color:'#17B978',
	      colorName:'Green',
	      detailText:'I love you the way a drowning man loves air. And it would destroy me to have  you just a little.',
	      imgUrl:'./assets/page3.png'
	    },
	    {
	      texts:['Never',"Stop","Learning"],
	      color:'#892CDC',
	      colorName:'purple',
	      detailText:'There is never a time or place for true love. It happens accidentally, in a heartbeat, in a single flashing, throbbing moment.',
	      imgUrl:'./assets/page4.png'
	    },
	    {
	      texts:['Enjoy',"Your","Time"],
	      color:'#F8CB2E',
	      colorName:'yellow',
	      detailText:'The problems of your past are your business. The problems of your future are my privilege.',
	      imgUrl:'./assets/page5.png'
	    }
	]
	
	// ææ Card å¡ççãå®ä¾ãçæ°ç»ï¼ãä¸åª one-card divï¼ãï¼ð¥ð¥ð¥è¿åæ¬äºå°å¡ççæ°ç»ï¼å ä¸ºé½å¨æ´ä¸ª Card çå®ä¾ä¸­ï¼ï¼ï¼
	static ALL_CARDS = []
	
	//ð¥å¤æ­å½åé¡µé¢ä¸­åºç°çå¤§å¡ççç´¢å¼ä½ç½®
	static CURRENT_INDEX = 0 

	//è·åå¤§å¡ççå®¹å¨
	static cardStage = document.querySelector('.card-stage')


	//ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ


	//çæå¤§ Card å­ï¼è®©å¤§å¡çå®ä¾åï¼éåå¹¶ä¼ å¥ CARD_DATA æ°æ®ðð
	static createCard(){
		this.CARD_DATAS.forEach((dataItem,index)=>{
			this.ALL_CARDS.push(new Card(dataItem)) //å®ä¾å Card
		})
	}
	

	//ððçæå¤§ Card ä¸ï¼åå§åææå¤§å¡çï¼è®©å¡çä¸ä¸ªä¸ä¸ªåºæ¥, é»è®¤è®©å¶å®å¶ä»éè
	static cardInit(){
		this.ALL_CARDS.forEach((cardInstance,index)=>{ //cardInstanceå°±æ¯ Card() å®ä¾ï¼
			// console.log(cardInstance);
			if(index===0){
				cardInstance.appendCard()
			}else{
				//å¶ä»çå¤§å¡çåéè, æ¾å¥½éèåçä½ç½®ï¼è®©åé¢åºæ¥åæä¸ªå¨ç»
				cardInstance.domCard.style.position = 'absolute' //ç¨ç»å¯¹å®ä½è®©å¡çé½å å¨ä¸èµ·
				cardInstance.domCard.style.top = '2rem'
				cardInstance.domCard.style.transform = 'translateY(60px)'
				cardInstance.domCard.style.opacity = '0'
				// console.log(cardInstance.domCard)  //cardInstance.domCard è¿ä¸ªææ¯å·ä½ç divï¼
				//è®©å°å¡ççç¬¬ä¸å¼ é»è®¤æå¤§ï¼å¶ä»åç¼©å°
				cardInstance.littleCardDom.style.transform = 'scale(0.8)'
				cardInstance.appendCard() //ä¸é¢èå¥½ååæå®ä»¬æ·»å å° DOM æ ä¸
			}
			//åæ¶ä¹è®¾ç½®å¡ççå¤§å°
			cardInstance.setCardSize() 
			//åæ¶ä¹çæå°å¡çï¼æå°å¡çæ·»å å°ææ¡£æ ä¸­
			cardInstance.appendLittleCard()
		})	
	}


	//ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ


	//ð¤å¡ççç¹å»äº¤äºâ¡ï¸
	static cardSetUpEvent(){
		
		//ð  è®¡ç®ä¸­å¿ç¹çæ¹æ³
		function calCenterPos(CARD_INFO){
			//ð  è®¡ç®ä¸­å¿ç¹ä¸ï¼å®ä¹è®¡ç®å¤§å¡ççä¸­å¿ç¹çæ¹æ³(å¡çè·ç¦»ç»å¸å·¦è¾¹çè·ç¦» + å¡ççå®½åº¦çä¸å)
			const CENTER_X =  Math.round(CARD_INFO.left) + Math.round(CARD_INFO.width / 2)
			const CENTER_Y =  Math.round(CARD_INFO.top) + Math.round(CARD_INFO.height / 2)
			return {
				CENTER_X,	//å¡ççä¸­å¿ç¹ç X åæ 
				CENTER_Y,	//å¡ççä¸­å¿ç¹ç Y åæ 
				CARD_HALF_WIDTH: Math.round(CARD_INFO.width / 2), //å¡ççä¸åå®½åº¦
				CARD_HALF_HEIGHT: Math.round(CARD_INFO.height / 2), //å¡ççä¸åé«åº¦
			}
		}

		//ðææç¹å»å¡çæ¶åå¡çæè½¬çæ¹æ³
		//ðè®¡ç®å¬å¼ä¸º-> æå¤§æè½¬å¼ rotateX * ãæææ¥è§¦ç¹ãä¸ãå¡çä¸­å¿ç¹çè·ç¦»ã / å¡ççä¸å
		function cardTransMove( e, type ){
			// console.log(this);
			if(type === 'move'){ //ð¥ð¥å¦ææ¯ç§»å¨äºä»¶çè¯ï¼ç¦ç¨ç¼å¨ææï¼ä¸ç¶æ¯æ¬¡é½è¦ç­ä¸ªè¿æ¸¡å¨ç»ï¼
				this.ALL_CARDS[this.CURRENT_INDEX].domCard.style.transition = 'none'

				//ð  è®¡ç®ä¸­å¿ç¹äºï¼æ§è¡å½æ°ï¼ç¨ ðcenterPos è¿ä¸ªåéæ¥è·å¾ææ° return åºæ¥ç Xï¼Y åæ 
				const centerPos = calCenterPos(e.currentTarget.getBoundingClientRect())
				// console.log(centerPos);

				//è·å¾å½åææçç¹å»ä½ç½®
				const TOUCH_X = Math.round(e.changedTouches[0].clientX)
				const TOUCH_Y = Math.round(e.changedTouches[0].clientY)

				/* 
					è·å¾ãææãè·ãå¡çä¸­å¿ç¹ãç DIS è·ç¦»
					x æ­£ å·¦ä¾§   xè´ å³ä¾§
					y æ­£ ä¸æ¹   yè´ ä¸æ¹
				*/
				const DIS_X = TOUCH_X - centerPos.CENTER_X
				const DIS_Y = TOUCH_Y - centerPos.CENTER_Y


				//è·å¾è¦æè½¬çæ¯å¼
				const RATION_X = DIS_X / centerPos.CARD_HALF_WIDTH
				const RATION_Y = DIS_Y / centerPos.CARD_HALF_HEIGHT

				//åºç¨æè½¬æ¯å¼æè½¬ï¼è®©å¡çæ ¹æ®æ¯å¼è½¬å¨
				setTimeout(() =>{
					this.ALL_CARDS[this.CURRENT_INDEX].domCard.style.transform = `rotateX(${30 * RATION_X}deg)   rotateY(${-30 * RATION_Y}deg)`
				},1)
			}else{
				this.ALL_CARDS[this.CURRENT_INDEX].domCard.style.transition = `transform 0.4s 0s ease-in-out`
			}
		}

		//ð¥ææç¹å»å¼å§,è°ç¨ä¸æ¹çå½æ°ï¼è®°å¾ç¨ call è°ç¨æ¥ä¿®æ­£ this æåï¼
		// ç¹å»å¼å§, è¿ä¸ªæ¹æ³åå¨ Card çç¶åç´ ä¸èé Card å®ä¾ï¼ï¼
		this.cardStage.addEventListener('touchstart',(e)=>{
			//æ³¨æè¿éç¨callè¿è¡è°ç¨!!æ¯ä¸ºäºè®© card cardTransMove ä¸­ç this æå AppController è¿ä¸ª classï¼å¦åä¼ undefined
			cardTransMove.call(this, e, 'start')
		})


		
		//ð¥ææç¹å»åç§»å¨, è¿ä¸ªæ¹æ³åå¨ Card çç¶åç´ ä¸èé Card å®ä¾ï¼ï¼
		this.cardStage.addEventListener('touchmove',(e)=>{
			// é»æ­¢é»è®¤è¡ä¸º å¨å¡çä¸æ»å¨çæ¶å ä¸ä¼è®©é¡µé¢ä¸ä¸æ»å¨
			e.preventDefault()
			cardTransMove.call(this,e,'move')
		},{passive:false}) //è¿æ ·åå»ä¹ä¸ä¼æ¾å¤§ï¼ä¹ä¸è½ç¨ææå»æ¾å¤§äº



		//ð¥ææç¹å»ç»æ
		this.cardStage.addEventListener('touchend',(e)=>{
			//ç»å½åé¡µé¢ä¸­çå¡çå åè¿æ¸¡ææ
			this.ALL_CARDS[this.CURRENT_INDEX].domCard.style.transition = `transform 0.3s 0s ease-in-out`
			//ðè®©å¡ççè§åº¦æ¢å¤å°é»è®¤ç¶æ
			setTimeout(() => {
				this.ALL_CARDS[this.CURRENT_INDEX].domCard.style.transform = `rotateX(0deg) rotateY(0deg)`
			}, 1);
		})



		//ðç¹å»å°å¡çåæ¢å¤§å¡ççæ¹æ³(å ä¸ä½ç½®çå¤æ­æ¯ä¸ºäºå®ç°æææ¨ªæ»ä¹ä¼è§¦åé¡µé¢åæ¢)
		this.ALL_CARDS.forEach((cardInstance,index)=>{
			let touchPos = {}
			cardInstance.littleCardDom.addEventListener('touchstart',(e)=>{
				//è®°å½ææç¹å»çä½ç½®(ä¸¤ç§æ¹æ³)
				// touchPos = {
				// 	X: e.changedTouches[0].clientX, // æ³¨ææ¯ç¨changedTouches[0] æ¥è®°å½ï¼
				// 	Y: e.changedTouches[0].clientY	// æ³¨ææ¯ç¨changedTouches[0] æ¥è®°å½ï¼
				// }
				touchPos.X = e.changedTouches[0].clientX
				touchPos.Y = e.changedTouches[0].clientY
				// console.log(touchPos);
			})

			//æ¯è¾ææç§»å¼åè·ç¹å»ä¹åçä½ç½®å·®å¼ï¼å¦ææ²¡ååå°±è¯æäºç¹äºè¿å¼ å°å¡ç
			cardInstance.littleCardDom.addEventListener('touchend',(e)=>{
				if(touchPos.X === e.changedTouches[0].clientX && touchPos.Y === e.changedTouches[0].clientY){

					//ð¥ð¥ð¥è°ç¨åæ¢å¤§å¡ççæ¹æ³ï¼ä¼ å¥å½åç¹å»çå°å¡ççç´¢å¼
					this.cardAnimation(index) 
					// console.log('ç¹å»äºå°å¡ç');
					// console.log('ç¹å»äºç¬¬'+index+'å¼ å°å¡ç'); //ð¥è¿ä¸ª index å¾éè¦ï¼å°ä¼å¨ä¸é¢ä¸¤å¤è¿ç¨å°ï¼
					// console.log(this.ALL_CARDS);
				}
			})
		})
	}



	//ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ


	//â¡ï¸å°å¡çè¢«éä¸­æ¶ååå¤§å°çæ¹æ³
	static hintLittleCard(touchIndex){
		this.ALL_CARDS.forEach((Card,littleCardIndex)=>{ //ð¥ð¥Card å°±åå«äºææå¤§å°å¡ççå®ä¾
			if(touchIndex === littleCardIndex){
				Card.littleCardDom.style.transform = `scale(1)`
			}else{
				Card.littleCardDom.style.transform = `scale(0.8)`
			}
		})
	}



	//ð´åæ¢å¤§å¡ççäº¤äºäºä»¶,touchIndex ç¬¬å å¼ å¨ cardSetUpEvent() ä¸­ç Card å®ä¾ç touchstart äºä»¶åå·²ç»å¤æ­äº
	static cardAnimation(touchIndex){
		//é¿åä¼ å¥ç index æ¯æ¬æ¥å·²ç»å¨å½åæ¾ç¤ºçå¡ççindexçå¼ï¼æ¯å½åå¼å°±ä¸ç¨åæ¢äº
		if(touchIndex !== this.CURRENT_INDEX){
			//æé¤æå½åå¼ ï¼é»è®¤ä¸ºç¬¬ä¸å¼ ï¼åï¼åæå¶ä»çæ¾å°æé¡¶å±,é¿åè¿æ¸¡è¿ç¨ä¸­å¡çè¢«è¦ç
			this.ALL_CARDS[touchIndex].domCard.style.transform = 'all 0.5s 0.35s ease-in-out'
			this.ALL_CARDS[touchIndex].domCard.style.zIndex = 3
			//æå¼å§æ²¡æ touchIndex , æä»¥å°±ç¨ CURRENT_INDEX ä¸º 0
			this.ALL_CARDS[this.CURRENT_INDEX].domCard.style.transform = 'all 1s ease-in-out'
			this.ALL_CARDS[this.CURRENT_INDEX].domCard.style.zIndex = 1

			// console.log(this.ALL_CARDS[index].domCard)
			this.hintLittleCard(touchIndex) //ä¹è¡å°å¡çè¢«éä¸­æ¶ååå¤§å°çæ¹æ³

			setTimeout(()=>{
				//å½åå¤§å¡çæ¶å¤±
				this.ALL_CARDS[this.CURRENT_INDEX].domCard.style.opacity = 0
				this.ALL_CARDS[this.CURRENT_INDEX].domCard.style.transform = `translateY(60px)`
				console.log(this.CURRENT_INDEX);

				//å¤§å¶ä»å¡çåºç°
				this.ALL_CARDS[touchIndex].domCard.style.opacity = 1
				this.ALL_CARDS[touchIndex].domCard.style.transform = 'translateY(0px)'
				this.CURRENT_INDEX = touchIndex
			},1)
		}
	}

	
	
	//APPController åå§åè¦è°ç¨çæææ¹æ³
	static appInit(){
		const container = document.querySelector('.container')
		 // ææå¤å±å®¹å¨åç´ çå®½åº¦ è®¾ç½®ä¸º å±å¹å®½åº¦
		 container.style.width = document.documentElement.clientWidth + 'px'

		SlideBar.sliderBarinit()
		Card.cardRemove()//åå§åæ¶ï¼æ¸é¤æ§çå¡ç
		this.createCard() //çæå¤§ Card ä¸ï¼è°ç¨è®©å¤§å¡çå®ä¾åï¼å¹¶ä¼ å¥æ°æ®çæ¹æ³
		this.cardInit() //åå§åå¤§å¡ç
		this.cardSetUpEvent()
	}
	

}




AppController.appInit()//è°ç¨éææ¹æ³