<?php

class Container {
	/** @var array<string, string> */
	private $definitions = [];

	public function define(string $id, string $className): void {
		$this->definitions[$id] = $className;
	}

	/** idに対応するクラスのインスタンスを返す。 */
	public function get(string $id): object {
		// 明示的にインスタンス化するクラス名だけ登録されるので、コンテナに登録されていないクラスもnewできるようにする必要がある。
		$className = $this->definitions[$id] ?? $id; 
		echo PHP_EOL . 'クラス {'.$className.'} のインスタンス化の開始。' . PHP_EOL;
		
		/** クラスを作成するために必要なパラメータを取得する。 */
		$reflection = new ReflectionClass($className);
		// クラスのコンストラクタを表すReflectionMethodオブジェクトを取得する。
		$constructor = $reflection->getConstructor();
		if($constructor === null) {
			// コンストラクタが定義されていない場合は、クラスを作成する。
			echo 'コンストラクタが定義されていないので、クラスを作成する。' . PHP_EOL;
			return new $className(); 
		}
		
		// コンストラクタのパラメータを表すReflectionParameterオブジェクトの配列を取得する。
		$parameters = $constructor->getParameters();
		echo 'コンストラクタのパラメータの数: ' . count($parameters) . PHP_EOL;

		// コンストラクタのパラメータごとに型名を取得して、その型名に対応するクラスのインスタンスを取得する。
		$arguments = [];
		foreach($parameters as $parameter) {
			$type = $parameter->getType();
			$typeName = $type->getName();
			echo 'インスタンス化に必要なパラメータの型名: ' . $typeName . PHP_EOL;
			$arguments[] = $this->get($typeName); // 再帰的にインスタンスを作成する。
		}

		// 生成したインスタンスを返す。
		return new $className(...$arguments);
	}
}

class Bar {}

class Foo {
    public $bar;

    public function __construct(Bar $bar)
    {
        $this->bar = $bar;
    }
}

$container = new Container();
$container->define('foo', Foo::class);
$foo = $container->get('foo');
echo PHP_EOL . '=== 生成されたクラス ===' . PHP_EOL;
var_dump($foo);

