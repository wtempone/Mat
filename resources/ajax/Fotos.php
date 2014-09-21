<?php
$current_page = 1;
$offset_page = 0;
$limit_per_page = 25;
include 'Conecta.php';
if (!isset($_REQUEST["action"])) {
    $result = array("fotos"=>array(),"total"=>0);
    $current_page = $_REQUEST["page"];
    $limit_per_page = "";
    if (isset($_REQUEST["limit"]))
        $limit_per_page = $_REQUEST["limit"];
    $offset_page = $_REQUEST["start"];
    $cd_foto = "";
    if (isset($_REQUEST["cd_foto"]))
        $cd_foto = $_REQUEST["cd_foto"];
    $ar_foto = "";
    if (isset($_REQUEST["ar_foto"]))
        $ar_foto = $_REQUEST["ar_foto"];
    $query = "select IFNULL(Fotos.cd_foto, 0) cd_foto,IFNULL(Fotos.ar_foto, 0) ar_foto from Fotos where 1 = 1 ";
    if ($cd_foto != "") 
        $query = $query . " and Fotos.cd_foto = " .$cd_foto;
    if ($ar_foto != "") 
        $query = $query . " and Fotos.ar_foto = " .$ar_foto;
    if (isset($_REQUEST["limit"]))
        $query = $query . " limit " .$limit_per_page. " offset " .$offset_page;
    $dbresult = mysql_query($query);
    if (mysql_affected_rows() > 0) {
        while($row = mysql_fetch_array($dbresult))
        {
            array_push($result["fotos"],
                array(
                    "cd_foto"=>(float)utf8_encode($row["cd_foto"]),
                    "ar_foto"=>(string)utf8_encode($row["ar_foto"])
                )
            );
        }
    }
    $query = "select IFNULL(Fotos.cd_foto, 0) cd_foto,IFNULL(Fotos.ar_foto, 0) ar_foto from Fotos where 1 = 1 ";
    if ($cd_foto != "") 
        $query = $query . " and Fotos.cd_foto = " .$cd_foto;
    if ($ar_foto != "") 
        $query = $query . " and Fotos.ar_foto = " .$ar_foto;
    $dbresult = mysql_query($query);
    $result["total"] = mysql_affected_rows();
    mysql_close();
}
else if ($_REQUEST["action"] == "create") {
    $inputPayload = file_get_contents("php://input");
    $inputPayload = json_decode($inputPayload);
    $query = "insert into fotos values("
                    ."NULL".","
                    ." '".htmlspecialchars($inputPayload->ar_foto)."'".
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
    $query = "update fotos set ".
        "ar_foto="." '".htmlspecialchars($inputPayload->ar_foto)."'".
        " where cd_foto=".$inputPayload->cd_foto;
    $dbresult = mysql_query($query);
    if(mysql_affected_rows()>0)
        $result = array("success"=>true,"message"=>"Registro Alterado");
    Else
        $result = array("success"=>false,"message"=>mysql_error());
    mysql_close();
} else if ($_REQUEST["action"] == "delete") {
    $inputPayload = file_get_contents("php://input");
    $inputPayload = json_decode($inputPayload);
    $query = "delete from fotos".
        " where cd_foto=".$inputPayload->cd_foto;
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
