export function createApp() {
	console.log('this is a test app')
	console.log(this) //moduleC
}

console.log(this) //undefined


