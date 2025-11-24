# DIコンテナを簡易的に実装してみる
https://zenn.dev/y_ahiru/articles/learn-a-di-container


# ::class
クラス名の解決を行う。
そのクラスの完全修飾名を取得できる。

!!! Note
	クラス名の解決はコンパイル時の変換のため、クラス名を作るタイミング（クラスがまだ存在しないタイミング）では、エラーにはならず、名前空間のみ出力される。
	```php
	namespace Bar {
		var_dump(ClassName::class); // string(11) "Bar\ClassName"
	}
	```

php8系以降では、オブジェクトに対しても::classを使うことができる。
その場合、名前空間の解決はコンパイル時ではなく、実行時に行われる。
```php
namespace Foo {
	class ClassName {
		
	}
	$c = new ClassName();
	print $c::class; // Foo\ClassName;
}
```

参考:
https://www.php.net/manual/ja/language.oop5.basic.php
