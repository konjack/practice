<?php

$root = './';
$path_list = glob($current_path . './*');
$result = [];

foreach ($path_list as $path) {
	if (is_dir($path)) {
		$result[$path] = search_files($path);
	} else {
		$result["./"][] = $path;
	}
}



function search_files(string $root): array
{
	$stack = [$root];
	$result = [];

	while (count($stack) > 0) {
		$current_path = array_pop($stack);
		$path_list = glob($current_path . '/*');

		foreach ($path_list as $path) {
			if (is_dir($path)) {
				/** ディレクトリだったら探索対象に追加。 */
				array_unshift($stack, $path);
			} else {
				$result[] = $path;
			}
		}
	}

	return $result;
}

?>

<!DOCTYPE html>
<html lang="ja">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>ファイル一覧</title>
</head>

<body>
	<?php foreach ($result as $root => $path_list) { ?>
		<details>
			<summary><?= $root ?></summary>
			<?php foreach ($path_list as $path) { ?>
				<div><a href="<?= $path ?>"><?= $path ?></a></div>
			<?php } ?>
		</details>
	<?php } ?>
</body>

</html>