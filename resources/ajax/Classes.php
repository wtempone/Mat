<?php
function nvl (&$key, $else = "") {
        return (isset($key) ? $key : ((!empty($else)) ? $else : ""));
}
$current_page = 1;
$offset_page = 0;
$limit_per_page = 25;
include 'Conecta.php';
if (!isset($_REQUEST["action"])) {
    $result = array("classes"=>array(),"total"=>0);
    $current_page = $_REQUEST["page"];
    $limit_per_page = "";
    if (isset($_REQUEST["limit"]))
        $limit_per_page = $_REQUEST["limit"];
    $offset_page = $_REQUEST["start"];
    $cd_cls = "";
    if (isset($_REQUEST["cd_cls"]))
        $cd_cls = $_REQUEST["cd_cls"];
    $tx_cls = "";
    if (isset($_REQUEST["tx_cls"]))
        $tx_cls = $_REQUEST["tx_cls"];
    $query = "select IFNULL(Classes.cd_cls, 0) cd_cls,IFNULL(Classes.tx_cls, 0) tx_cls from Classes where 1 = 1 ";
    if ($cd_cls != "") 
        $query = $query . " and Classes.cd_cls = " .$cd_cls;
    if ($tx_cls != "") 
        $query = $query . " and Classes.tx_cls like '%" .$tx_cls. "%'";
    if (isset($_REQUEST["limit"]))
        $query = $query . " limit " .$limit_per_page. " offset " .$offset_page;
    $dbresult = mysql_query($query);
    if (mysql_affected_rows() > 0) {
        while($row = mysql_fetch_array($dbresult))
        {
            array_push($result["classes"],
                array(
                    "cd_cls"=>(float)utf8_encode($row["cd_cls"]),
                    "tx_cls"=>(string)utf8_encode($row["tx_cls"])
                )
            );
        }
    }
    $query = "select IFNULL(Classes.cd_cls, 0) cd_cls,IFNULL(Classes.tx_cls, 0) tx_cls from Classes where 1 = 1 ";
    if ($cd_cls != "") 
        $query = $query . " and Classes.cd_cls = " .$cd_cls;
    if ($tx_cls != "") 
        $query = $query . " and Classes.tx_cls like '%" .$tx_cls. "%'";
    $dbresult = mysql_query($query);
    $result["total"] = mysql_affected_rows();
    mysql_close();
}
else if ($_REQUEST["action"] == "create") {
    $inputPayload = file_get_contents("php://input");
    $inputPayload = json_decode($inputPayload);
    $query = "insert into classes values("
                    ."NULL".","
                    ." '".htmlspecialchars(nvl($inputPayload->tx_cls, "NULL"))."'".
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
    $query = "update classes set ".
        "tx_cls="." '".htmlspecialchars(nvl($inputPayload->tx_cls, "NULL"))."'".
        " where cd_cls=".nvl($inputPayload->cd_cls, "NULL");
    $dbresult = mysql_query($query);
    if(mysql_affected_rows()>0)
        $result = array("success"=>true,"message"=>"Registro Alterado");
    Else
        $result = array("success"=>false,"message"=>mysql_error());
    mysql_close();
} else if ($_REQUEST["action"] == "delete") {
    $inputPayload = file_get_contents("php://input");
    $inputPayload = json_decode($inputPayload);
    $query = "delete from classes".
        " where cd_cls=".nvl($inputPayload->cd_cls, "NULL");
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
