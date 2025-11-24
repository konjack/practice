<?php
/** 接続情報 */
$host = "localhost";
$dbname = "anpi";
$user = "konjack";
$password = "konjack@709N";

/** PDO */
$pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);

/** テーブル一覧を取得する。 */
$table_list = get_table_list($pdo);

?>
<table>
    <tr>
        <th>Name</th>
    </tr>
    <?php foreach ($table_list as $table) : ?>
        <tr>
            <td><?php echo $table['Tables_in_anpi']; ?></td>
        </tr>
    <?php endforeach; ?>
</table>


<?php
function get_table_list($pdo) {
    $sql = "SHOW TABLES";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function show_create_table($pdo, $table_name) {
    $sql = "SHOW CREATE TABLE $table_name";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $result[0]['Create Table'];
}
