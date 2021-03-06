//ä¸ãðð ç¨ç±»å®ä¹çæ¹å¼å®ä¹è¾å¥æ¡çååæ¹æ³ ââââââââââââââââââââââââââââââââââââââââââââââââ
class InputBar{
    constructor(){ //ç±»ä¼¼ä¸ä¸ªæé å½æ°
        //ðå®ä¾é½ä¼æä¸é¢è¿ä¸ª inputEle å±æ§,ç¨è¿äºå±æ§æ¥è·ååç´ ï¼ï¼ç±»ä¼¼ const / let ï¼ï¼
        this.inputEle = document.querySelector('input')//è¿éè·å # çè¯å°±ä¸ç¨.äº
        this.inputBtnBox = document.querySelector('.input-buttons')
    }

    //ååæ¹æ³
    init(){
        //è·å¾ä¸é¢ inputEle çå¼ç¨ï¼ä¸é¢å·²ç»è·åäºåç´ äºï¼æä»¥è¿éå°±ä¸ç¨åè·åäº
        //èç¦
        this.inputEle.addEventListener('focus',(e)=>{ //ç®­å¤´å½æ°ç this æ¯å¨åå»ºçæ¶åå°±ç»å®äºèªèº«çå®ä¾ãinputEleãï¼æä»¥è¦ç»å¸¸ç¨å° this çè¯å¯ä»¥ç¨ç®­å¤´å½æ°
            // this.inputEle.style.width = '20rem' // js æ·»å æ ·å¼
            this.inputEle.classList.add('input-focus')//CSS æ·»å æ ·å¼
            this.inputBtnBox.style.opacity = 1      
        })
        //å¤±ç¦
        this.inputEle.addEventListener('blur',(e)=>{
            this.inputEle.classList.remove('input-focus')
            this.inputBtnBox.style.opacity = 0
        })

    }
}

const inputBarInstance = new InputBar() //è°ç¨ new ä¸ä¸ªå®ä¾
inputBarInstance.init() //ððè°ç¨å®ä¾çååæ¹æ³,æ³¨æï¼ï¼ðð å¦ææ¯æ¾å¨ constructor(){} åå»å®ä¹çè¯ï¼å°±ä¸ç¨ç¨ .init æ¥è°ç¨äºï¼new çæ¶åç´æ¥å°±æäº ðð





//äºãðð åå»ºå¡ççååæ¹æ³ï¼1.åè·å  2.ç¶åä» DOM æ ä¸ç§»åºï¼åå­ä¸­è¿æï¼  3.ç¶ååå¨ååæ¹æ³ä¸­è¿è¡æ·±åé ââââââââââââââââââââââ
const templateCard = document.querySelector('.todo-card')//ðððå¾å³é®ï¼ä¸é¢ææç this é½æåå®ï¼ï¼
templateCard.remove() //ç§»é¤å¡çæ¨¡çï¼åå­ä¸­è¿æï¼ä¸é¢ä¼å©ç¨ï¼


class ToDoCard {
    constructor(card) { //constructor ä¸è¬ç¨æ¥ååç´ çãå±æ§è®¾ç½®ã

        this.card = card.cloneNode(true) ////ä¸ãå®ä¹å¡ççå®¹å¨, æ¯æ¬¡è°ç¨è¿ä¸ªæ¹æ³é½ä¼ãæ·±æ·è´ä¸ä¸ª Card åç´ ã, è°è°ç¨å°±æ·è´è°ï¼å ä¸ºè¿éç¨ templateCard æ¥è°ç¨ï¼æä»¥ä¼æ·è´ templateCard
        this.editBlock = this.card.querySelector('.edit-block')//ðè·åå°ç¼è¾åºå(å¨å¡ç this.card. åå» query ä¼æ´å¿«)
        this.cardContainer = document.querySelector('.todo-Card-container') 
        this.fourIconsBar = this.card.querySelector('.four-icons') //ððè·åå°åä¸ªå¾æ çç¶çº§
        this.fourIcons = this.card.querySelector('.four-icons').children //ððè·åå°åä¸ªå¾æ çå­çº§ï¼ç¶åå¨ä¸é¢ä¼æå®è½¬ä¸ºæ°ç»
        this.doneIcon = this.card.querySelector('.icon-left-done-init')
        this.colorBoard = this.card.querySelector('.color-board')
        this.cardNumBox = document.querySelector('.todo-number') //æ³¨æï¼è¿éæ¯ documentï¼å ä¸ºä¸å¨ card ä¸ï¼ï¼


        this.cardState = { //ä¸ï¼ð è®¡æ¶å¨ï¼å­å¨ç¶ææ°æ®ï¼ç¨æ¥å¤æ­æ¯å¦è¦ä¿ææ¶èå¾æ ,false åè¡¨ç¤ºæ²¡æç¹å»è¿
            isFav: false
        }

        this.clickTimed = 0
        this.clickCount = 0

        this.deleteId = 0

        this.init() //è¿éè°ç¨äº init æ¹æ³ï¼æä»¥åå»ºå½æ°çæ¶åé»è®¤å°±ä¼æ§è¡è¿ä¸ªæ¹æ³ï¼ï¼
    }

    init(){ //ð ä¸è¬ç¨æ¥å®ä¹ä¸äºåå§åçè®¾ç½®,æ¯å¦å®ä¹ä¸äºé¼ æ äº¤äºäºä»¶ï¼é¡ºä¾¿è°ç¨ä¸äºæ¹æ³
        this.appendCard() //è°ç¨ä¸é¢çæ¹æ³
         
        //ä¸ï¼ð¦ å®ç°åå»æè½è¾å¥çäºä»¶(ä¸æ³è§¦ååå»çäºä»¶)
        this.card.addEventListener('mousedown',(e)=>{
            e.preventDefault()//ä¸ãåé»æ­¢é»è®¤çåå»è¿è¡ç¼è¾äºä»¶
            e.stopPropagation()//äºãåé»æ­¢ card åå¶ä»åç´ çåæ³¡ï¼å¦åè¾¹è·éè¿å»ä¸é¢çåç´ ä¼è®©å®ç»§ç»­è¢«ç¹å»å°, ðè½ç¶é»æ­¢åæ³¡ä½æ¯ä»£ç è¿æ¯æ§è¡ä¸å»äºï¼ï¼


            clearTimeout(this.clickTimeId)//ä¸ãåéç½®å®æ¶å¨
            this.clickCount ++ //åãå®æ¶å¨+1

            if(this.clickCount === 2){
                this.editBlock.focus() //äºãèç¦ (ç¨focus()çæ¹æ³çè¯ï¼åæ ä¼è·åæåé¢ï¼å¨ focus() çå½æ°åéè¦å¤çä¸ä¸)
            }

            this.clickTimeId = setTimeout(()=>{ 
                this.clickCount = 0 //å­ãå®æ¶å¨éç½®ï¼è¶è¿ï¼100 æ¯«ç§å°±è¿åï¼å ä¸ºåå»ä¸è¬ä¸ä¼è¶è¿ 100 æ¯«ç§
            },200) 
        })




        //äºï¼ð¦ å¤çåæ ä¸èç¦å¨æåé¢çäºä»¶(html åï¼åæ æ¯ä¸ä¸ªå¯¹è±¡)
        this.editBlock.addEventListener('focus',(e)=>{
            const selection = getSelection()    //ä¼è¿åä¸ä¸ªå¯¹è±¡ï¼ç¨æ¥è·ååæ ä½ç½®
            const range = selection.getRangeAt(0)   //è®¾ç½®æåçåæ å¯¹è±¡
            const textNode = this.editBlock.childNodes[0] //è·åææ¬èç¹ï¼å ä¸ºææ¬èç¹åªå¨åç´ çç¬¬ä¸ä¸ªå­éï¼
            range.setStart(textNode,textNode.length)  //è·åè¿ä¸ªææ¬èç¹ï¼åè·åè¿ä¸ªææ¬èç¹çé¿åº¦
        })



        //é¼ æ ç§»å¥å¡çåºåï¼å¾æ åºç°
        this.card.addEventListener('mouseenter',(e)=>{
            
            //ðå·¦è¾¹ä¸ä¸ª icon
            this.doneIcon.classList.remove('icon-left-done-init')
            this.doneIcon.firstElementChild.classList.remove('svg-done-init') //ç¬¬ä¸ä¸ªå­çº§ä¸º svg ï¼

            
            // ðå³è¾¹åä¸ª icon
            const fourIconsArr = [...this.fourIcons] //ðæåä¸ª icon è½¬åä¸ºæ°ç»
            fourIconsArr.forEach(items=>{
                items.classList.remove('icon-init-right') //æ¹æ³ä¸ï¼ç§»é¤åå§åçç±»å
                // items.style.opacity = 1  //æ¹æ³äºï¼æ¹ååå§åçç±»å
                items.firstElementChild.classList.remove('svg-init') //ðå©ç¨ firstElementChild æ¥è·å svg ï¼ï¼
            })
        })



        //é¼ æ ç§»åºå¡çåºåï¼ææå¾æ æ¶å¤±
        this.card.addEventListener('mouseleave',(e)=>{


            //ðå·¦è¾¹ä¸ä¸ª icon
            this.doneIcon.classList.add('icon-left-done-init')
            this.doneIcon.firstElementChild.classList.add('svg-done-init') //ç¬¬ä¸ä¸ªå­çº§ä¸º svg ï¼


            // ðå³è¾¹åä¸ª icon
            const fourIconsArr = [...this.fourIcons] //ðæåä¸ª icon è½¬åä¸ºæ°ç»
            fourIconsArr.forEach((items,index)=>{


                //ð¦ å¤æ­æ¶è icon æ¯å¦è¢«ç¹å»äº =>   this.cardState.isFav è¡¨ç¤ºãååä¹åä¸º trueãï¼ index === 3 è¡¨ç¤ºãæ¯æ¶è iconã
                if(this.cardState.isFav && index === 3){  
                    return
                }
                else{ 
                    items.classList.add('icon-init-right') //æ¹æ³ä¸ï¼æ·»å åå§åçç±»å,ç¸å½äºæåä¸ª icon ç§»åºå»
                    // items.style.opacity = 1  //æ¹æ³äºï¼æ¹ååå§åçç±»å,ç¸å½äºæåä¸ª icon ç§»åºå»
                    items.firstElementChild.classList.add('svg-init') //ðå©ç¨ firstElementChild æ¥è·å svg ï¼ï¼
                }
            })


            //ç§»åºå¡çåï¼è²æ¿ä¹åºè¯¥æ¶å¤±æï¼
            setTimeout(()=>{
                this.colorBoard.classList.add('color-board-init')
            },400)

        })





        //ç¹å»è²çå®ç°å¡ççé¢è²ååï¼ðç» color board æ·»å äºä»¶å§æï¼è®©å·ä½ç color åæ³¡ï¼ï¼
        this.colorBoard.addEventListener('click',(e)=>{
            // console.log(e.target.className)//è¿æ¶åä¸è½ç¨ currentTargetï¼å ä¸º currentTarget æ¯äºä»¶çè§¦åèï¼èä¸æ¯è¢«ç¹å»çåç´ ï¼å¦æä¼ä¸ç´æ¯ colorBoard ï¼
            //ðå ä¸ºä¼ç¹å° colorBoardï¼æä»¥è¦å¤æ­ä¸ä¸ï¼å¤æ­ç¹å»çæ¯ color ç span èä¸æ¯ colorBoard ç div ï¼
            if(e.target.nodeName === 'SPAN'){ 
                // console.log(e.target.className) 
                const colorClass = e.target.className //ððè·å¾å·ä½ç¹å»çç±»å
                // console.log(colorClass)

                //ððæè·¯ï¼åååºç¬¬ä¸ä¸ªç±»åï¼åå ä¸ä¸é¢è·å¾çç±»åï¼ãæ´ä½ä½ä¸ºä¸ç»æ°çç±»åãå»ãæ¿ä»£åæ¥çç±»åãï¼ï¼
                const basicClass = this.card.className.split(' ')[0] //ððåååºç¬¬ä¸ä¸ªç±»åï¼ç®çæ¯ä¸ºäºä¸ä¸æ­¥ï¼ï¼
                this.card.className = basicClass + ' ' + colorClass //ðð ä¸ï¼className æ¯æ¿æ¢ç±»åçä½ç¨ï¼ï¼äºï¼ç©ºæ ¼æ¯ä¸ºäºéå¼å®ä»¬ï¼ï¼
            }
        })



        //ç¹å» ãé¢è² iconã åºç°è²æ¿çææ, å¯ä»¥å©ç¨ä¸é¢å®ä¹çç fourIcons
        this.fourIcons[1].addEventListener('click',(e)=>{
          this.colorBoard.classList.toggle('color-board-init')  //ðð toggle åæ¢(å¼å³ï¼sçææï¼ðæ³¨æï¼å¨ä¸è¾¹é¼ æ ç§»åºçæ¹æ³éä¹åºè¯¥å ä¸è®©è²æ¿æ¶å¤±çé»è¾ï¼ï¼
        })



        //ç¹å»æ¶èæé®æå¡çåºå®ä½ (å©ç¨äºè®¡æ°å¨çåç)
        this.fourIcons[3].addEventListener('click',(e)=>{
            this.cardState.isFav = !this.cardState.isFav; //ðð ååï¼ä¹ç±»ä¼¼å¼å³ï¼ä¸å¼å§æ¯ true çè¯ç¹ä¸ä¸ å°±æ¯ false
            e.currentTarget.children[0].children[1].style.fill = this.cardState.isFav ? '#FFC60A' : 'white'
            // console.log(e.currentTarget.children[0].children[1]) //box çå­çº§->svg çå­çº§->path
        })



        //é¿æè¿è¡å¡ççå é¤

        //â­ï¸ æä¸ï¼ç¶åå¼å§è½¬å
        this.fourIcons[0].addEventListener('mousedown',(e)=>{
            const target = e.currentTarget.children[1].firstElementChild ///éä¸­çä¸ç» icon çç¬¬ä¸ä¸ªå­çº§å«
            
            target.style.strokeDashoffset = '0' //ç®æ æ¯ 0 è½¬ä¸å
            const styles = getComputedStyle(target)

            //å¦ææä¸çè¿åº¦è¾¾å°äº 100%ï¼å°±å é¤è¿ä¸ªå¡ç
            this.deleteId = setInterval(()=>{

                if(parseInt(styles.strokeDashoffset) === 0){
                    this.deleteCard() //æ§è¡å é¤å¡ççæ¹æ³
                    
                    clearInterval(this.deleteId) //ððð å¦æ = 0 å°±å é¤è¿ä¸ªè®¡æ¶å¨
                }
            },100)

        })

        //â­ï¸æ¬èµ·ï¼ååéåå» 
        this.fourIcons[0].addEventListener('mouseup', (e) =>{
            const target = e.currentTarget.children[1].firstElementChild
            const styles = getComputedStyle(target)//ðððð è·åå°åç´ çå±æ§ï¼ï¼ç¶ååå¨ä¸ä¸æ­¥è¿è¡å¤æ­

            // console.log(styles.strokeDashoffset)

            //ð å¤æ­ä¸ä¸ï¼å¦ææ²¡æè¾¾å° 0 ï¼ä¹å°±æ¯è½¬æ»¡çæåµä¸ï¼å°±è®©å®è½¬åå»
            if(parseInt(styles.strokeDashoffset) > 0){//ðððð è¦è½¬åä¸ä¸æ°æ®ï¼ï¼
                target.style.strokeDashoffset = '88'

                // ðæ³¨æï¼é¼ æ æ¬èµ·æ¥çæ¶åä¹è¦æ¸é¤è®¡æ¶å¨ï¼å ä¸ºååä¹ä¼å°è¾¾ 0ï¼
                clearInterval(this.deleteId)

            }
        })

    }

    
    // ðä¸é¢å·ä½çéææ¹æ³é½æ¯åç¬åç! å¨ class åä¸ç¨å functionX XXï¼


    updateNum(){
        this.cardNumBox.innerText = this.cardContainer.children.length //ðð TODO æ°é = å­çº§çé¿åº¦
    }



    appendCard(){ //ð ä¸è¬ç¨æ¥å®ä¹å·ä½çæ¹æ³ï¼æ¯å¦å é¤å¡çï¼æ·»å å¡çï¼ç­ç­(ðç¶åè®°å¾å¨ init çæ¹æ³é£è¿è¡è°ç¨ï¼ï¼ï¼)
        this.cardContainer.appendChild(this.card)

        this.updateNum()

        
    }

    deleteCard(){ //ð ä¸è¬ç¨æ¥å®ä¹å·ä½çæ¹æ³ï¼æ¯å¦å é¤å¡çï¼æ·»å å¡çï¼ç­ç­
        this.card.style.width = '0px'
        this.card.style.paddingLeft = '0px'
        this.card.style.paddingRight = '0px'
        this.card.style.marginRight = '0px'
        this.card.style.opacity = 0
        this.fourIconsBar.style.display = 'none'
        this.editBlock.style.opacity = 0

        setTimeout(()=>{
            this.card.remove() //ç­ä¸é¢çæ ·å¼åå®ååç§»é¤å¡ç
            this.updateNum()
        },400) //å ä¸ºååè¿ç¨æ 350msï¼æä»¥ 400ms ååä» DOM æ ä¸ç§»é¤å¡ç
    }



    // å¡çå®æåï¼ðð ç§»å¨å¡çå° Done çåºåï¼æ¬è´¨ä¸æ¯åå é¤åæ¥çå¡çåå¨ done åºåå»åéä¸å¼ åºæ¥ï¼
    moveCardToDone(){
        this.cardText = this.editBlock.innerText //æå½åå¡ççæå­ä¿¡æ¯å­ä¸æ¥
        this.card.classList.add('to-card-done-ani')

        setTimeout(()=>{
            this.card.remove
            this.updateNum()
        },1600)
        
        setTimeout(()=>{
            new DoneCard(doneCard,this.cardText,this.colorIndex)
        },600)//æ°å»ºä¸å¼ å¡çï¼ä¼ å¥ä¹åå¡ççåæ°
    }
}


//æå¡çå®ä¾å
const card1 = new ToDoCard(templateCard)
const card2 = new ToDoCard(templateCard)
const card3 = new ToDoCard(templateCard)

