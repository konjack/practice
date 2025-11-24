<?php

class Container {
	/** @var array<string, string> */
	private $definitions = [];

	public function define(string $id, string $className): void {
		$this->definitions[$id] = $className;
	}

	/** idに対応するクラスのインスタンスを返す。 */
	public function get(string $id): object {
		if(isset($this->definitions[$id])) {
			$className = $this->definitions[$id];
			return new $className();
		}

		throw new \Exception("Class not found: $id");
	}

}

class Foo {}

$container = new Container();
$container->define('foo', Foo::class);
$foo = $container->get('foo');
var_dump(Foo::class);
var_dump($foo);