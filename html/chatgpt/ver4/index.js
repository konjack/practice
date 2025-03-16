class Node {
	constructor({ tagName, text = '', children = [] }) {
		this.tagName = tagName;   // 'div', 'Header', 'Sidebar' など
		this.text = text;         // テキストノードであればこちらに文字列
		this.children = children; // 子ノード(Node)の配列
	}
}


function parseHTMLtoNodes(html) {
	const tagRegex = /<\/?([A-Za-z]+)>/g;
	// 例： <Header> or </Header> などをマッチさせる

	let cursor = 0;
	let stack = [new Node({ tagName: 'root', children: [] })];
	// 仮想的なルートノードを作っておき、その children に展開していく

	let match;
	while ((match = tagRegex.exec(html)) !== null) {
		const tagPos = match.index;
		const fullTag = match[0];    // <Header> あるいは </Header> など
		const tagName = match[1];    // Header
		const isClosing = fullTag.startsWith('</'); // 閉じタグなら true

		// タグが登場する直前のテキストをテキストノードとして追加
		if (tagPos > cursor) {
			const text = html.slice(cursor, tagPos);
			const trimmed = text.trim();
			if (trimmed) {
				// カレントノードの子としてテキストノードを追加
				stack[stack.length - 1].children.push(new Node({ tagName: '', text: trimmed }));
			}
		}
		cursor = tagPos + fullTag.length;

		if (!isClosing) {
			// 開始タグ <TagName>
			const node = new Node({ tagName, children: [] });
			// カレントノードの子として追加
			stack[stack.length - 1].children.push(node);
			// スタックに積む
			stack.push(node);
		} else {
			// 閉じタグ </TagName>
			// スタックトップを pop して閉じる
			stack.pop();
		}
	}

	// 末尾にテキストが残っている場合の処理
	if (cursor < html.length) {
		const text = html.slice(cursor).trim();
		if (text) {
			stack[stack.length - 1].children.push(new Node({ tagName: '', text }));
		}
	}

	// 最終的に stack[0] が 'root' ノード。その子要素がパース結果
	return stack[0].children;
}


function bfsExpandDirectives(nodes, useMap) {
	// 幅優先探索なのでキューを使う
	const queue = [...nodes];

	while (queue.length > 0) {
		const currentNode = queue.shift();

		// もし currentNode が自前ディレクティブに該当するなら展開
		if (currentNode.tagName && useMap[currentNode.tagName]) {
			const Cls = useMap[currentNode.tagName];
			const instance = new Cls();

			// そのクラスの content() からさらにパースする
			const childHTML = instance.content();
			const childNodes = parseHTMLtoNodes(childHTML);

			// さらに子要素を BFS で展開する（ネストディレクティブを解決）
			bfsExpandDirectives(childNodes, instance.use || {});

			// currentNode の内容を「子ノードの展開結果」に置き換える
			// つまり currentNode 自体はただのコンテナになり、children だけ差し替える形
			currentNode.children = childNodes;

		} else {
			// 自前ディレクティブじゃない場合は、子ノードをキューに追加して、さらに深い階層を探す
			currentNode.children.forEach(child => queue.push(child));
		}
	}
}

function nodesToHTMLString(nodes) {
	let result = '';

	nodes.forEach((node) => {
		// テキストノードならそのまま出力
		if (!node.tagName) {
			result += node.text;
		} else {
			// 通常タグとして扱う（クラス名などはどうするか要件次第）
			// ここでは例として、 <div class="kj-header"> のようなクラスは
			// 'kj-' + tagName という単純な付け方をしてみる
			const className = 'kj-' + node.tagName.toLowerCase();

			result += `<div class="${className}">`;
			// 子ノードを再帰的に文字列化
			result += nodesToHTMLString(node.children);
			result += `</div>`;
		}
	});

	return result;
}

class Header {
	constructor() {
	}

	content() {
		return `
		<div>ToDo</div>
		<div>●さん</div>
		<button>ログアウト</div>
	  `;
	}
}

class Sidebar {
	constructor() {
		this.use = {Content};	
	}

	content() {
		return `
		<nav>ナビゲーション1</nav>
		<nav>ナビゲーション2</nav>
		<nav>ナビゲーション3</nav>
		<Content></Content>
	  `;
	}
}

class Content {
	constructor() {
		
	}

	content() {
		return `
		<div>コンテンツ</div>
	  `;
	}
}
class ToDo {
	constructor() {
		this.use = {
			Header,
			Sidebar,
			Content,
		};
	}
	before() { /* ... */ }
	after() { /* ... */ }

	content() {
		return `
		<Header>
			<Content></Content>
		</Header>
		<Sidebar></Sidebar>
		<Content></Content>
		<div>
			<div>aaa</div>
		</div>
	  `;
	}
}



// 1. ToDoをインスタンス化
const todo = new ToDo();
todo.before && todo.before(); // 必要ならライフサイクルを呼ぶ

// 2. ToDo.content() をパースして Nodeツリーを得る
let nodes = parseHTMLtoNodes(todo.content());
console.log('nodes: ', nodes);

// 3. BFS で自前ディレクティブを再帰展開
bfsExpandDirectives(nodes, todo.use);
console.log('nodes: ', nodes);

// 4. Nodeツリーを文字列化
const finalHTML = nodesToHTMLString(nodes);

todo.after && todo.after(); // 必要ならライフサイクル

console.log(finalHTML);
document.querySelector('#root').innerHTML = finalHTML;


// =>*/ 
// <div class="kj-header"> ... </div>
// <div class="kj-sidebar"> ... </div>
// <div class="kj-content"> ... </div>