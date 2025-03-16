/** 
 * 2つのobservableなオブジェクトを計算した結果をもつ
 * observableなオブジェクトを作成したい。
 *  */

console.log('==== observer_2.js ====');

/** この関数全体で1つのobserverオブジェクト。 */
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
		if(newValue!==undefined && newValue !== currentValue) {
			/** まずは値の更新 */	
			currentValue = newValue;	
			/** 通知 */
			notify(newValue);
		}	
		return currentValue;
	}

	accessor.subscribe = subscribe;
	return accessor;
}

const accessor_a = obeservable(5);
const accessor_b = obeservable(6);

/** a, bの値を合計した値が初期値となる。 */
const accessor_c = obeservable(calc());

/** aが変更されたら、a, bの値をもとにcの値を変更する。 */
accessor_a.subscribe(listner);
/** bも同様。 */
accessor_b.subscribe(listner);

accessor_a(10);
console.log(accessor_c()); // 10 + 6 = 16
accessor_b(11);
console.log(accessor_c()); // 10 + 11 = 21

function calc() {
	return accessor_a() + accessor_b();
}

function listner() {
	accessor_c(calc());
}

console.log('==== observer_2.js ====');
console.log('');