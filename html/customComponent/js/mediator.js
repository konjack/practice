
/** 静的クラス */
class Mediator {
	static standby_list = [];

	/** 
	 * コンポーネント名、イベント名、タスク（コールバック関数）を入力として、standby_listに登録するメソッド
	 */
	static standby(component, eventName, task) {
		this.standby_list.push({ component, eventName, task });
	}

	/** 
	 * 待機中のタスクを実行するメソッド
	 */
	static ask(eventName, data) {
		const task = this.standby_list.find(task => task.eventName === eventName);
		if (task) {
			task.task(data);
		}
	}
}

export default Mediator;