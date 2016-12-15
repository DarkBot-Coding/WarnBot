<?php

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
/*$servername = "localhost";
$username = "root";
$password = "";
$dbname = "warnbot";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
?>*/
<form method="POST" action="">
  <input type="text" id='ID' name='ID'>
  <input type="submit">
</form>
<?php
if(isset($_POST['ID'])) {
  /*$DiscordID = $_POST["ID"];
  $DiscordID = mysqli_real_escape_string($conn,$DiscordID);
  $sqlQuery = "SELECT id, user, discord_id, reason, serverName FROM warns WHERE discord_id = '$DiscordID'";
  $result = $conn->query($sqlQuery);
  if ($result->num_rows > 0) {
       // output data of each row
       while($row = $result->fetch_assoc()) {
           echo "<br> id: ". $row["id"]. "<br> - UserName: ". $row["user"]. "<br> - Discord ID: " . $row["discord_id"] . "<br> - Reason of warn: " . $row["reason"] . "<br> - Server " . $row["serverName"] . "<br>";
       }
  } else {
       echo "0 results";
  }*/
}

?>
<html>
<head>
<title> WarnBot Dashboard</title>
<link rel="stylesheet" href="/css/styles.css" charset="utf-8">
<link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet">
</head>
<body>
  <div id="footer">
    <h3 id="footer">Website created by <strong>PaulB</strong> edited by DarkN-exus</h3>
  </div>
</body>
<html>
