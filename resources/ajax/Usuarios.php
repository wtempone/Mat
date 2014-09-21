<?php
function nvl (&$key, $else = "") {
        return (isset($key) ? $key : ((!empty($else)) ? $else : ""));
}
$current_page = 1;
$offset_page = 0;
$limit_per_page = 25;
include 'Conecta.php';
if (!isset($_REQUEST["action"])) {
    $result = array("usuarios"=>array(),"total"=>0);
    $current_page = $_REQUEST["page"];
    $limit_per_page = "";
    if (isset($_REQUEST["limit"]))
        $limit_per_page = $_REQUEST["limit"];
    $offset_page = $_REQUEST["start"];
    $cd_usuar = "";
    if (isset($_REQUEST["cd_usuar"]))
        $cd_usuar = $_REQUEST["cd_usuar"];
    $nm_usuar = "";
    if (isset($_REQUEST["nm_usuar"]))
        $nm_usuar = $_REQUEST["nm_usuar"];
    $ar_foto = "";
    if (isset($_REQUEST["ar_foto"]))
        $ar_foto = $_REQUEST["ar_foto"];
    $cd_usuar_faceb = "";
    if (isset($_REQUEST["cd_usuar_faceb"]))
        $cd_usuar_faceb = $_REQUEST["cd_usuar_faceb"];
    $query = "select IFNULL(Usuarios.cd_usuar, 0) cd_usuar,IFNULL(Usuarios.nm_usuar, 0) nm_usuar,IFNULL(Usuarios.ar_foto, 0) ar_foto,IFNULL(Usuarios.cd_usuar_faceb, 0) cd_usuar_faceb from Usuarios where 1 = 1 ";
    if ($cd_usuar != "") 
        $query = $query . " and Usuarios.cd_usuar = " .$cd_usuar;
    if ($nm_usuar != "") 
        $query = $query . " and Usuarios.nm_usuar like '%" .$nm_usuar. "%'";
    if ($ar_foto != "") 
        $query = $query . " and Usuarios.ar_foto = " .$ar_foto;
    if ($cd_usuar_faceb != "") 
        $query = $query . " and Usuarios.cd_usuar_faceb like '%" .$cd_usuar_faceb. "%'";
    if (isset($_REQUEST["limit"]))
        $query = $query . " limit " .$limit_per_page. " offset " .$offset_page;
    $dbresult = mysql_query($query);
    if (mysql_affected_rows() > 0) {
        while($row = mysql_fetch_array($dbresult))
        {
            array_push($result["usuarios"],
                array(
                    "cd_usuar"=>(float)utf8_encode($row["cd_usuar"]),
                    "nm_usuar"=>(string)utf8_encode($row["nm_usuar"]),
                    "ar_foto"=>(string)utf8_encode($row["ar_foto"]),
                    "cd_usuar_faceb"=>(string)utf8_encode($row["cd_usuar_faceb"])
                )
            );
        }
    }
    $query = "select IFNULL(Usuarios.cd_usuar, 0) cd_usuar,IFNULL(Usuarios.nm_usuar, 0) nm_usuar,IFNULL(Usuarios.ar_foto, 0) ar_foto,IFNULL(Usuarios.cd_usuar_faceb, 0) cd_usuar_faceb from Usuarios where 1 = 1 ";
    if ($cd_usuar != "") 
        $query = $query . " and Usuarios.cd_usuar = " .$cd_usuar;
    if ($nm_usuar != "") 
        $query = $query . " and Usuarios.nm_usuar like '%" .$nm_usuar. "%'";
    if ($ar_foto != "") 
        $query = $query . " and Usuarios.ar_foto = " .$ar_foto;
    if ($cd_usuar_faceb != "") 
        $query = $query . " and Usuarios.cd_usuar_faceb like '%" .$cd_usuar_faceb. "%'";
    $dbresult = mysql_query($query);
    $result["total"] = mysql_affected_rows();
    mysql_close();
}
else if ($_REQUEST["action"] == "create") {
    $inputPayload = file_get_contents("php://input");
    $inputPayload = json_decode($inputPayload);
    $query = "insert into usuarios values("
                    ."NULL".","
                    ." '".htmlspecialchars(nvl($inputPayload->nm_usuar, "NULL"))."'".","
                    ." '".htmlspecialchars(nvl($inputPayload->ar_foto, "NULL"))."'".","
                    ." '".htmlspecialchars(nvl($inputPayload->cd_usuar_faceb, "NULL"))."'".
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
    $query = "update usuarios set ".
        "nm_usuar="." '".htmlspecialchars(nvl($inputPayload->nm_usuar, "NULL"))."'".",".
        "ar_foto="." '".htmlspecialchars(nvl($inputPayload->ar_foto, "NULL"))."'".",".
        "cd_usuar_faceb="." '".htmlspecialchars(nvl($inputPayload->cd_usuar_faceb, "NULL"))."'".
        " where cd_usuar=".nvl($inputPayload->cd_usuar, "NULL");
    $dbresult = mysql_query($query);
    if(mysql_affected_rows()>0)
        $result = array("success"=>true,"message"=>"Registro Alterado");
    Else
        $result = array("success"=>false,"message"=>mysql_error());
    mysql_close();
} else if ($_REQUEST["action"] == "delete") {
    $inputPayload = file_get_contents("php://input");
    $inputPayload = json_decode($inputPayload);
    $query = "delete from usuarios".
        " where cd_usuar=".nvl($inputPayload->cd_usuar, "NULL");
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
