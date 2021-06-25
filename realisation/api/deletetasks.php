<?php
$id = $_POST["sid"];
$dbh = new PDO("mysql:host=localhost:3306;dbname=todolist","root","solicode24");
$sql = "DELETE FROM tasks WHERE id = $id";
$getStudents = $dbh->prepare($sql) ;
$getStudents->execute();
?>
