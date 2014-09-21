<?php
$current_page = 1;
$offset_page = 0;
$limit_per_page = 25;
include 'Conecta.php';
if (!isset($_REQUEST["action"])) {
    $result = array("videos"=>array(),"total"=>0);
    $current_page = $_REQUEST["page"];
    $limit_per_page = "";
    if (isset($_REQUEST["limit"]))
        $limit_per_page = $_REQUEST["limit"];
    $offset_page = $_REQUEST["start"];
    $cd_video = "";
    if (isset($_REQUEST["cd_video"]))
        $cd_video = $_REQUEST["cd_video"];
    $ar_video = "";
    if (isset($_REQUEST["ar_video"]))
        $ar_video = $_REQUEST["ar_video"];
    $query = "select IFNULL(Videos.cd_video, 0) cd_video,IFNULL(Videos.ar_video, 0) ar_video from Videos where 1 = 1 ";
    if ($cd_video != "") 
        $query = $query . " and Videos.cd_video = " .$cd_video;
    if ($ar_video != "") 
        $query = $query . " and Videos.ar_video = " .$ar_video;
    if (isset($_REQUEST["limit"]))
        $query = $query . " limit " .$limit_per_page. " offset " .$offset_page;
    $dbresult = mysql_query($query);
    if (mysql_affected_rows() > 0) {
        while($row = mysql_fetch_array($dbresult))
        {
            array_push($result["videos"],
                array(
                    "cd_video"=>(float)utf8_encode($row["cd_video"]),
                    "ar_video"=>(string)utf8_encode($row["ar_video"])
                )
            );
        }
    }
    $query = "select IFNULL(Videos.cd_video, 0) cd_video,IFNULL(Videos.ar_video, 0) ar_video from Videos where 1 = 1 ";
    if ($cd_video != "") 
        $query = $query . " and Videos.cd_video = " .$cd_video;
    if ($ar_video != "") 
        $query = $query . " and Videos.ar_video = " .$ar_video;
    $dbresult = mysql_query($query);
    $result["total"] = mysql_affected_rows();
    mysql_close();
}
else if ($_REQUEST["action"] == "create") {
    $inputPayload = file_get_contents("php://input");
    $inputPayload = json_decode($inputPayload);
    $query = "insert into videos values("
                    ."NULL".","
                    ." '".htmlspecialchars($inputPayload->ar_video)."'".
        ")";
    $dbresult = mysql_query($query);
    if(mysql_affected_rows()>0)
        $result = array("success"=>true,"message"=>"Registro Criado");
    Else
        $result = array("success"=>false,"message"=>mysql_error().$query);
    mysql_close();
} else if ($_REQUEST["action"] == "update") {
    $inputPayload = file_get_contents("php://input");
    $inputPayload = json_decode($inputPayload);
    $query = "update videos set ".
        "ar_video="." '".htmlspecialchars($inputPayload->ar_video)."'".
        " where cd_video=".$inputPayload->cd_video;
    $dbresult = mysql_query($query);
    if(mysql_affected_rows()>0)
        $result = array("success"=>true,"message"=>"Registro Alterado");
    Else
        $result = array("success"=>false,"message"=>mysql_error());
    mysql_close();
} else if ($_REQUEST["action"] == "delete") {
    $inputPayload = file_get_contents("php://input");
    $inputPayload = json_decode($inputPayload);
    $query = "delete from videos".
        " where cd_video=".$inputPayload->cd_video;
    $dbresult = mysql_query($query);
    if(mysql_affected_rows()>0)
        $result = array("success"=>true,"message"=>"Registro Excluido", "id"=>htmlspecialchars($inputPayload->id));
    Else
        $result = array("success"=>false,"message"=>mysql_error());
    mysql_close();
}
if (isset($_REQUEST["callback"])) {
    header("Content-Type: text/javascript");
    echo $_REQUEST["callback"]. "(" .json_encode($result). ");";
} else {
    header("Content-Type: application/x-json");
    echo json_encode($result);
}
?>
