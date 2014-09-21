<?php
$current_page = 1;
$offset_page = 0;
$limit_per_page = 25;
include 'Conecta.php';
if (!isset($_REQUEST["action"])) {
    $result = array("audios"=>array(),"total"=>0);
    $current_page = $_REQUEST["page"];
    $limit_per_page = "";
    if (isset($_REQUEST["limit"]))
        $limit_per_page = $_REQUEST["limit"];
    $offset_page = $_REQUEST["start"];
    $cd_audio = "";
    if (isset($_REQUEST["cd_audio"]))
        $cd_audio = $_REQUEST["cd_audio"];
    $ar_audio = "";
    if (isset($_REQUEST["ar_audio"]))
        $ar_audio = $_REQUEST["ar_audio"];
    $query = "select IFNULL(Audios.cd_audio, 0) cd_audio,IFNULL(Audios.ar_audio, 0) ar_audio from Audios where 1 = 1 ";
    if ($cd_audio != "") 
        $query = $query . " and Audios.cd_audio = " .$cd_audio;
    if ($ar_audio != "") 
        $query = $query . " and Audios.ar_audio = " .$ar_audio;
    if (isset($_REQUEST["limit"]))
        $query = $query . " limit " .$limit_per_page. " offset " .$offset_page;
    $dbresult = mysql_query($query);
    if (mysql_affected_rows() > 0) {
        while($row = mysql_fetch_array($dbresult))
        {
            array_push($result["audios"],
                array(
                    "cd_audio"=>(float)utf8_encode($row["cd_audio"]),
                    "ar_audio"=>(string)utf8_encode($row["ar_audio"])
                )
            );
        }
    }
    $query = "select IFNULL(Audios.cd_audio, 0) cd_audio,IFNULL(Audios.ar_audio, 0) ar_audio from Audios where 1 = 1 ";
    if ($cd_audio != "") 
        $query = $query . " and Audios.cd_audio = " .$cd_audio;
    if ($ar_audio != "") 
        $query = $query . " and Audios.ar_audio = " .$ar_audio;
    $dbresult = mysql_query($query);
    $result["total"] = mysql_affected_rows();
    mysql_close();
}
else if ($_REQUEST["action"] == "create") {
    $inputPayload = file_get_contents("php://input");
    $inputPayload = json_decode($inputPayload);
    $query = "insert into audios values("
                    ."NULL".","
                    ." '".htmlspecialchars($inputPayload->ar_audio)."'".
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
    $query = "update audios set ".
        "ar_audio="." '".htmlspecialchars($inputPayload->ar_audio)."'".
        " where cd_audio=".$inputPayload->cd_audio;
    $dbresult = mysql_query($query);
    if(mysql_affected_rows()>0)
        $result = array("success"=>true,"message"=>"Registro Alterado");
    Else
        $result = array("success"=>false,"message"=>mysql_error());
    mysql_close();
} else if ($_REQUEST["action"] == "delete") {
    $inputPayload = file_get_contents("php://input");
    $inputPayload = json_decode($inputPayload);
    $query = "delete from audios".
        " where cd_audio=".$inputPayload->cd_audio;
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
