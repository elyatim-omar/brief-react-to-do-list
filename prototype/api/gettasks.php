<?php
$dbh = new PDO("mysql:host=localhost:3306;dbname=todolist","root","solicode24");
$sql = " SELECT * FROM tasks ";
$Query = $dbh->query($sql);
$gettasks = $Query->fetchAll(PDO::FETCH_ASSOC);
print_r(json_encode($gettasks));
?>