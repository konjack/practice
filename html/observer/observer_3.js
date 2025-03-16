/** 
 * observer_2.jsの改善案
 * ・ cは、cの計算方法の定義とcを計算するためのobservableな値を指定するだけにしたい
 * ・ obserbalbeな値同士を計算させてできた、新たなobservableな値をcomputed valueと呼ぶ。
 *  */

/** この関数全体で1つのobserverオブジェクト。 */
function observable(value) {
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

/**
 * 
 * @param {function}calculation 
 * @param {array<accessor>} dependencies
 * @return {accessor}
 */
function computed(calculation, dependencies) {
	/** 計算結果が初期値。 */
	let currentValue = observable(calculation());
	
	/** 依存先のobservableに通知方法を登録する。 */
	function listner() {
		/** 計算値(c)を更新する処理を通知時に実行する関数として登録する。 */
		currentValue(calculation());
	}
	dependencies.forEach(dependency => {
		dependency.subscribe(listner);
	})
	
	function getter() {
		return currentValue();
	}
	getter.subscribe = currentValue.subscribe;
	return getter;
}

const a = observable(1);
const b = observable(2);
const c = computed(function(){ return a() + b(); }, [a, b]);
const d = computed(function(){ return b() + c(); }, [b, c]);
const e = computed(function(){ return c() + d(); }, [c, d]);
a(2);
console.log(a(), b(), c(), d(), e());









