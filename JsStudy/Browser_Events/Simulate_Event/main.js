/*
	js 模拟 Event 事件, 一般用在自动化测试中
		步骤：
			const event = new MouseEvent
				可先添加一个事件来观察一下这个事件的名称是什么, 比如是 MouseEvent

			调用 dispatchEvent 来派遣事件
				TEST_ELE.dispatchEvent(event)

		可模拟的事件
			用户自定义事件
				CustomEvent

			系统自带事件
				大类别
					PointerEvent

					TouchEvent

					UIEvent

					WheelEvent

					TransitionEvent

					AnimationEvent

					FocusEvent

					InputEvent

					KeyboardEvent

					MouseEvent


				子类别
					CompositionEvent

					ClipboardEvent

					DragEvent

					BeforeUnloadEvent

					HashChangeEvent

					PageTransitionEvent

					PopStateEvent

					StorageEvent

					BeforeInstallPromptEvent

					CloseEvent

					ApplicationCacheErrorEvent

					ApplicationCacheEvent

					ApplicationCacheProgressEvent

					ApplicationCacheStatusEvent

					BeforeUnloadEvent

					ErrorEvent

					PageTransitionEvent

					PopStateEvent

					StorageEvent

					BeforeInstallPromptEvent

					CloseEvent

					ApplicationCacheErrorEvent

					ApplicationCacheEvent



		
*/ 



//案例一，模拟 MouseEvent 事件
	//添加事件
	document.addEventListener('mousemove',(e)=>{
		console.log(e);
	})

	//手动触发上面那个事件
	const EVENT_INSTANCE = new MouseEvent('mousemove')//可传入两个参数, 第二个参数可选, 可以传入 mousemove 的 event 对象中的参数, 也可以不传

	setTimeout(()=>{
		// document.dispatchEvent(EVENT_INSTANCE) //调用 dispatchEvent 来派遣事件
	},2000) //2秒后触发





//案例二，模拟 Click 事件
	//添加事件
	const H1 = document.querySelector('h1')

	H1.addEventListener('click',(e)=>{
		console.log(e);
	})


//定义个类


	const CLICK_EVENT = new MouseEvent('click')

	setTimeout(()=>{
		H1.dispatchEvent(CLICK_EVENT)
	},3000)




//案例一，模拟 CustomEvent 事件
	const TEST_ELE = document.querySelector('.test-ele')

	TEST_ELE.addEventListener('abcde',(e)=>{
		console.log(e);
	})
	
	const MY_EVENT = new CustomEvent('abcde')

	setTimeout(()=>{
		TEST_ELE.dispatchEvent(MY_EVENT)
	},3000)