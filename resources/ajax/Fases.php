<?php
function nvl (&$key, $else = "") {
        return (isset($key) ? $key : ((!empty($else)) ? $else : ""));
}
$current_page = 1;
$offset_page = 0;
$limit_per_page = 25;
include 'Conecta.php';
if (!isset($_REQUEST["action"])) {
    $result = array("fases"=>array(),"total"=>0);
    $current_page = $_REQUEST["page"];
    $limit_per_page = "";
    if (isset($_REQUEST["limit"]))
        $limit_per_page = $_REQUEST["limit"];
    $offset_page = $_REQUEST["start"];
    $cd_fase = "";
    if (isset($_REQUEST["cd_fase"]))
        $cd_fase = $_REQUEST["cd_fase"];
    $nr_fase = "";
    if (isset($_REQUEST["nr_fase"]))
        $nr_fase = $_REQUEST["nr_fase"];
    $nm_fase = "";
    if (isset($_REQUEST["nm_fase"]))
        $nm_fase = $_REQUEST["nm_fase"];
    $cd_cls = "";
    if (isset($_REQUEST["cd_cls"]))
        $cd_cls = $_REQUEST["cd_cls"];
    $query = "select IFNULL(Fases.cd_fase, 0) cd_fase,IFNULL(Fases.nr_fase, 0) nr_fase,IFNULL(Fases.nm_fase, 0) nm_fase,IFNULL(Fases.cd_cls, 0) cd_cls from Fases where 1 = 1 ";
    if ($cd_fase != "") 
        $query = $query . " and Fases.cd_fase = " .$cd_fase;
    if ($nr_fase != "") 
        $query = $query . " and Fases.nr_fase = " .$nr_fase;
    if ($nm_fase != "") 
        $query = $query . " and Fases.nm_fase like '%" .$nm_fase. "%'";
    if ($cd_cls != "") 
        $query = $query . " and Fases.cd_cls = " .$cd_cls;
    if (isset($_REQUEST["limit"]))
        $query = $query . " limit " .$limit_per_page. " offset " .$offset_page;
    $dbresult = mysql_query($query);
    if (mysql_affected_rows() > 0) {
        while($row = mysql_fetch_array($dbresult))
        {
            array_push($result["fases"],
                array(
                    "cd_fase"=>(float)utf8_encode($row["cd_fase"]),
                    "nr_fase"=>(float)utf8_encode($row["nr_fase"]),
                    "nm_fase"=>(string)utf8_encode($row["nm_fase"]),
                    "cd_cls"=>(float)utf8_encode($row["cd_cls"])
                )
            );
        }
    }
    $query = "select IFNULL(Fases.cd_fase, 0) cd_fase,IFNULL(Fases.nr_fase, 0) nr_fase,IFNULL(Fases.nm_fase, 0) nm_fase,IFNULL(Fases.cd_cls, 0) cd_cls from Fases where 1 = 1 ";
    if ($cd_fase != "") 
        $query = $query . " and Fases.cd_fase = " .$cd_fase;
    if ($nr_fase != "") 
        $query = $query . " and Fases.nr_fase = " .$nr_fase;
    if ($nm_fase != "") 
        $query = $query . " and Fases.nm_fase like '%" .$nm_fase. "%'";
    if ($cd_cls != "") 
        $query = $query . " and Fases.cd_cls = " .$cd_cls;
    $dbresult = mysql_query($query);
    $result["total"] = mysql_affected_rows();
    mysql_close();
}
else if ($_REQUEST["action"] == "create") {
    $inputPayload = file_get_contents("php://input");
    $inputPayload = json_decode($inputPayload);
    $query = "insert into fases values("
                    ."NULL".","
                    .nvl($inputPayload->nr_fase, "NULL").","
                    ." '".htmlspecialchars(nvl($inputPayload->nm_fase, "NULL"))."'".","
                    .nvl($inputPayload->cd_cls, "NULL").
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
    $query = "update fases set ".
        "nr_fase=".nvl($inputPayload->nr_fase, "NULL").",".
        "nm_fase="." '".htmlspecialchars(nvl($inputPayload->nm_fase, "NULL"))."'".",".
        "cd_cls=".nvl($inputPayload->cd_cls, "NULL").
        " where cd_fase=".nvl($inputPayload->cd_fase, "NULL");
    $dbresult = mysql_query($query);
    if(mysql_affected_rows()>0)
        $result = array("success"=>true,"message"=>"Registro Alterado");
    Else
        $result = array("success"=>false,"message"=>mysql_error());
    mysql_close();
} else if ($_REQUEST["action"] == "delete") {
    $inputPayload = file_get_contents("php://input");
    $inputPayload = json_decode($inputPayload);
    $query = "delete from fases".
        " where cd_fase=".nvl($inputPayload->cd_fase, "NULL");
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
