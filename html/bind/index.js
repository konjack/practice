class Store {
	constructor(value) {
		this.actions = {};
		this.listners = {};
		this.state = value;
	}
	
	/** 状態だけを更新する（セッター）のみを定義する。 */
	updateState(statePath, value) {
		if(statePath === 'state') {
			this.state = value;
		} else {
			const pathList = statePath.split('.');
			const lastKey = pathList.pop();
			let target = pathList.reduce((acc, key) => acc[key], this);
			target[lastKey] = value;
		}


		this.listners[statePath].forEach(listner => {
			listner(value);	
		});
	}

	/** 状態のある値が更新された時の処理を定義する。 */
	/** actionに対してではなく、stateに対する更新処理を定義する。 */
	/** このメソッドはコンポーネント内で定義してもらう。 */
	bindState(statePath, elementId) {
		/** 初期表示 */
		const element = document.querySelector('#'+elementId);

		const pathList = statePath.split('.');
		const lastKey = pathList.pop();
		let target = pathList.reduce((acc, key) => acc[key], this);
		element.innerHTML = target[lastKey];

		const listner = (value) => {
			element.innerHTML = value;
		}

		this.setListner(statePath, listner)
	}

	/** UI（input）から値が変更する場合と、値からUI（input）を更新する場合がある。 */
	bindInput(statePath, elementId) {
		const element = document.querySelector('#'+elementId);

		const pathList = statePath.split('.');
		const lastKey = pathList.pop();
		let target = pathList.reduce((acc, key) => acc[key], this);
		/** inputとかはinnerHTMLじゃなくてvalue */
		element.value = target[lastKey];

		/** 値から更新された時の処理。 */
		const listner = () => {
			element.value = target[lastKey];
		}
		this.setListner(statePath, listner);

		/** 画面上の値が更新されたらstateも更新する（updateState経由で更新する） */
		this.attachEvent(elementId, 'change', (store) => store.updateState(statePath, element.value));
	}

	setListner(statePath, listner) {
		if(statePath in this.listners) {
			this.listners[statePath].push(listner);
		} else {
			this.listners[statePath] = [listner];
		}	
	}

	/** イベントが起きたら、値を更新する時などに使用する。 */
	/** ボタンを押したらカウントアップ（値の更新）をする場合などに使用する。 */
	attachEvent(elementId, eventType, callback) {
		document.querySelector('#'+elementId).addEventListener(eventType, () => {
			callback(this);
		});
	}


}


/** 値の場合は、stateプロパティから直接参照できる。 */
/** ただし、値の更新をする場合は、updateStateメソッド経由で必ず行うこと。 */
const store = new Store(2);
const objectStore = new Store({
	name: 'tom',
	mail: {
		private: 'aaa@bbb.com',
		company: 'ccc@ddd.com',
	}
});
const inputStore = new Store({content: 'init'});



store.bindState('state', 'target');
store.attachEvent('count-up', 'click', (store) => store.updateState('state', ++store.state));


objectStore.bindState('state.mail.private', 'mail-private');
objectStore.bindState('state.mail.company', 'mail-company');
objectStore.updateState('state.mail.private', 'updated@email.com');
objectStore.updateState('state.mail.company', 'updated@email.com')


inputStore.bindInput('state.content', 'input');
inputStore.bindState('state.content', 'input-data')
inputStore.updateState('state.content', 'new value');

