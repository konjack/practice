// オブザーバーパターンを実装するファクトリ関数
function createObservable(target) {
	// オブザーバー（購読者）を保持する配列
	const observers = [];
	
	return {
	  // observer 関数を登録
	  subscribe(fn) {
		observers.push(fn);
	  },
	  // observer 関数の登録解除
	  unsubscribe(fn) {
		const index = observers.indexOf(fn);
		if (index > -1) {
		  observers.splice(index, 1);
		}
	  },
	  // Proxy オブジェクト：target の変更を監視
	  proxy: new Proxy(target, {
		set(obj, prop, value) {
		  const oldValue = obj[prop];
		  // 実際にプロパティ値を更新
		  obj[prop] = value;
		  // 全ての observer に対して変更を通知
		  observers.forEach(observer => observer(prop, value, oldValue));
		  return true;
		}
	  })
	}
  }
  
  // 使用例
  
  // 監視対象のオブジェクトを作成
  const observable = createObservable({ name: 'Alice', age: 25 });
  
  // observer を登録（例：コンソールに変更内容を表示）
  observable.subscribe((prop, newValue, oldValue) => {
	console.log(`プロパティ "${prop}" が ${oldValue} から ${newValue} に変更されました。`);
  });
  
  // Proxy オブジェクトを介してプロパティを更新
  observable.proxy.name = 'Bob';  // コンソールに通知が出力される
  observable.proxy.age = 30;        // コンソールに通知が出力される