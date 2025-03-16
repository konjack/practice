/** まずは簡単なoberserを作成する。 */
/**
 * できること
 * ・値が変更されたら、console.logに表示(通知)する
 * observerはlistnerをもつ
 * observerは通知するべきタイミングでlistnerに通知する
 * 
 * そのためには、
 * observerはlistnerが誰か知る必要がある
 * observerは通知をするタイミングを知らないといけない。
 * 
 */

/** この関数全体で1つのobserverオブジェクト。 */
console.log('==== observer_1.js ====');
function obeservable(value) {
	let currentValue = value;
console.log('init: ', currentValue);

	/** listnerは関数で定義する */
	const listners = [];
	function subscribe(listner) {
		listners.push(listner);
	}
	
	/** listnersに通知を行う。 */
	function notify(newValue) {
		listners.forEach(listner => listner(newValue));
	}
	
	/** setterの役割を持つ */
	function accessor(newValue) {
		/** 通知のタイミング */
		if(newValue!==null && newValue !== currentValue) {
			/** まずは値の更新 */	
			currentValue = newValue;	
			/** 通知 */
			notify(newValue);
		}	
	}

	accessor.subscribe = subscribe;
	return accessor;
}

const accessor = obeservable(5);
accessor.subscribe(currentValue => console.log('changed :', currentValue));
accessor(10);
accessor(11);
console.log('==== observer_1.js ====');
console.log('');