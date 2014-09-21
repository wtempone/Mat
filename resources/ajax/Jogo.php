<?php
function nvl (&$key, $else = "") {
        return (isset($key) ? $key : ((!empty($else)) ? $else : ""));
}
$current_page = 1;
$offset_page = 0;
$limit_per_page = 25;
include 'Conecta.php';
if (!isset($_REQUEST["action"])) {
    $result = array("jogo"=>array(),"total"=>0);
    $current_page = $_REQUEST["page"];
    $limit_per_page = "";
    if (isset($_REQUEST["limit"]))
        $limit_per_page = $_REQUEST["limit"];
    $offset_page = $_REQUEST["start"];
    $versao = "";
    if (isset($_REQUEST["versao"]))
        $versao = $_REQUEST["versao"];
    $nome = "";
    if (isset($_REQUEST["nome"]))
        $nome = $_REQUEST["nome"];
    $cd_cls = "";
    if (isset($_REQUEST["cd_cls"]))
        $cd_cls = $_REQUEST["cd_cls"];
    $query = "select IFNULL(Jogo.versao, 0) versao,IFNULL(Jogo.nome, 0) nome,IFNULL(Jogo.cd_cls, 0) cd_cls from Jogo where 1 = 1 ";
    if ($versao != "") 
        $query = $query . " and Jogo.versao = " .$versao;
    if ($nome != "") 
        $query = $query . " and Jogo.nome like '%" .$nome. "%'";
    if ($cd_cls != "") 
        $query = $query . " and Jogo.cd_cls = " .$cd_cls;
    if (isset($_REQUEST["limit"]))
        $query = $query . " limit " .$limit_per_page. " offset " .$offset_page;
    $dbresult = mysql_query($query);
    if (mysql_affected_rows() > 0) {
        while($row = mysql_fetch_array($dbresult))
        {
            array_push($result["jogo"],
                array(
                    "versao"=>(float)utf8_encode($row["versao"]),
                    "nome"=>(string)utf8_encode($row["nome"]),
                    "cd_cls"=>(float)utf8_encode($row["cd_cls"])
                )
            );
        }
    }
    $query = "select IFNULL(Jogo.versao, 0) versao,IFNULL(Jogo.nome, 0) nome,IFNULL(Jogo.cd_cls, 0) cd_cls from Jogo where 1 = 1 ";
    if ($versao != "") 
        $query = $query . " and Jogo.versao = " .$versao;
    if ($nome != "") 
        $query = $query . " and Jogo.nome like '%" .$nome. "%'";
    if ($cd_cls != "") 
        $query = $query . " and Jogo.cd_cls = " .$cd_cls;
    $dbresult = mysql_query($query);
    $result["total"] = mysql_affected_rows();
    mysql_close();
}
else if ($_REQUEST["action"] == "create") {
    $inputPayload = file_get_contents("php://input");
    $inputPayload = json_decode($inputPayload);
    $query = "insert into jogo values("
                    ."NULL".","
                    ." '".htmlspecialchars(nvl($inputPayload->nome, "NULL"))."'".","
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
    $query = "update jogo set ".
        "nome="." '".htmlspecialchars(nvl($inputPayload->nome, "NULL"))."'".",".
        "cd_cls=".nvl($inputPayload->cd_cls, "NULL").
        " where versao=".nvl($inputPayload->versao, "NULL");
    $dbresult = mysql_query($query);
    if(mysql_affected_rows()>0)
        $result = array("success"=>true,"message"=>"Registro Alterado");
    Else
        $result = array("success"=>false,"message"=>mysql_error());
    mysql_close();
} else if ($_REQUEST["action"] == "delete") {
    $inputPayload = file_get_contents("php://input");
    $inputPayload = json_decode($inputPayload);
    $query = "delete from jogo".
        " where versao=".nvl($inputPayload->versao, "NULL");
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
