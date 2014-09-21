<?php
function nvl (&$key, $else = "") {
        return (isset($key) ? $key : ((!empty($else)) ? $else : ""));
}
$current_page = 1;
$offset_page = 0;
$limit_per_page = 25;
include 'Conecta.php';
if (!isset($_REQUEST["action"])) {
    $result = array("niveis"=>array(),"total"=>0);
    $current_page = $_REQUEST["page"];
    $limit_per_page = "";
    if (isset($_REQUEST["limit"]))
        $limit_per_page = $_REQUEST["limit"];
    $offset_page = $_REQUEST["start"];
    $cd_nivel = "";
    if (isset($_REQUEST["cd_nivel"]))
        $cd_nivel = $_REQUEST["cd_nivel"];
    $cd_fase = "";
    if (isset($_REQUEST["cd_fase"]))
        $cd_fase = $_REQUEST["cd_fase"];
    $nr_nivel = "";
    if (isset($_REQUEST["nr_nivel"]))
        $nr_nivel = $_REQUEST["nr_nivel"];
    $nm_nivel = "";
    if (isset($_REQUEST["nm_nivel"]))
        $nm_nivel = $_REQUEST["nm_nivel"];
    $nr_blocos = "";
    if (isset($_REQUEST["nr_blocos"]))
        $nr_blocos = $_REQUEST["nr_blocos"];
    $nr_gravid = "";
    if (isset($_REQUEST["nr_gravid"]))
        $nr_gravid = $_REQUEST["nr_gravid"];
    $nr_tempo_ger = "";
    if (isset($_REQUEST["nr_tempo_ger"]))
        $nr_tempo_ger = $_REQUEST["nr_tempo_ger"];
    $nr_tempo = "";
    if (isset($_REQUEST["nr_tempo"]))
        $nr_tempo = $_REQUEST["nr_tempo"];
    $nr_pontos = "";
    if (isset($_REQUEST["nr_pontos"]))
        $nr_pontos = $_REQUEST["nr_pontos"];
    $in_random = "";
    if (isset($_REQUEST["in_random"]))
        $in_random = $_REQUEST["in_random"];
    $tx_excluir = "";
    if (isset($_REQUEST["tx_excluir"]))
        $tx_excluir = $_REQUEST["tx_excluir"];
    $cd_cls = "";
    if (isset($_REQUEST["cd_cls"]))
        $cd_cls = $_REQUEST["cd_cls"];
    $query = "select IFNULL(Niveis.cd_nivel, 0) cd_nivel, Fases.nr_fase,IFNULL(Niveis.cd_fase, 0) cd_fase,IFNULL(Niveis.nr_nivel, 0) nr_nivel,IFNULL(Niveis.nm_nivel, 0) nm_nivel,IFNULL(Niveis.nr_blocos, 0) nr_blocos,IFNULL(Niveis.nr_gravid, 0) nr_gravid,IFNULL(Niveis.nr_tempo_ger, 0) nr_tempo_ger,IFNULL(Niveis.nr_tempo, 0) nr_tempo,IFNULL(Niveis.nr_pontos, 0) nr_pontos,IFNULL(Niveis.in_random, 0) in_random,IFNULL(Niveis.tx_excluir, 0) tx_excluir,IFNULL(Niveis.cd_cls, 0) cd_cls from Niveis, Fases where 1 = 1  and Niveis.cd_fase = Fases.cd_fase";
    if ($cd_nivel != "") 
        $query = $query . " and Niveis.cd_nivel = " .$cd_nivel;
    if ($cd_fase != "") 
        $query = $query . " and Niveis.cd_fase = " .$cd_fase;
    if ($nr_nivel != "") 
        $query = $query . " and Niveis.nr_nivel = " .$nr_nivel;
    if ($nm_nivel != "") 
        $query = $query . " and Niveis.nm_nivel like '%" .$nm_nivel. "%'";
    if ($nr_blocos != "") 
        $query = $query . " and Niveis.nr_blocos = " .$nr_blocos;
    if ($nr_gravid != "") 
        $query = $query . " and Niveis.nr_gravid = " .$nr_gravid;
    if ($nr_tempo_ger != "") 
        $query = $query . " and Niveis.nr_tempo_ger = " .$nr_tempo_ger;
    if ($nr_tempo != "") 
        $query = $query . " and Niveis.nr_tempo = " .$nr_tempo;
    if ($nr_pontos != "") 
        $query = $query . " and Niveis.nr_pontos = " .$nr_pontos;
    if ($in_random != "") 
        $query = $query . " and Niveis.in_random = " .$in_random;
    if ($tx_excluir != "") 
        $query = $query . " and Niveis.tx_excluir like '%" .$tx_excluir. "%'";
    if ($cd_cls != "") 
        $query = $query . " and Niveis.cd_cls = " .$cd_cls;
    if (isset($_REQUEST["limit"]))
        $query = $query . " limit " .$limit_per_page. " offset " .$offset_page;
    $dbresult = mysql_query($query);
    if (mysql_affected_rows() > 0) {
        while($row = mysql_fetch_array($dbresult))
        {
            array_push($result["niveis"],
                array(
                    "cd_nivel"=>(float)utf8_encode($row["cd_nivel"]),
                    "nr_fase"=>addslashes((string)utf8_encode($row["nr_fase"])),
                    "cd_fase"=>(float)utf8_encode($row["cd_fase"]),
                    "nr_nivel"=>(float)utf8_encode($row["nr_nivel"]),
                    "nm_nivel"=>(string)utf8_encode($row["nm_nivel"]),
                    "nr_blocos"=>(float)utf8_encode($row["nr_blocos"]),
                    "nr_gravid"=>(float)utf8_encode($row["nr_gravid"]),
                    "nr_tempo_ger"=>(float)utf8_encode($row["nr_tempo_ger"]),
                    "nr_tempo"=>(float)utf8_encode($row["nr_tempo"]),
                    "nr_pontos"=>(float)utf8_encode($row["nr_pontos"]),
                    "in_random"=>(int)utf8_encode($row["in_random"]),
                    "tx_excluir"=>(string)utf8_encode($row["tx_excluir"]),
                    "cd_cls"=>(float)utf8_encode($row["cd_cls"])
                )
            );
        }
    }
    $query = "select IFNULL(Niveis.cd_nivel, 0) cd_nivel, Fases.nr_fase,IFNULL(Niveis.cd_fase, 0) cd_fase,IFNULL(Niveis.nr_nivel, 0) nr_nivel,IFNULL(Niveis.nm_nivel, 0) nm_nivel,IFNULL(Niveis.nr_blocos, 0) nr_blocos,IFNULL(Niveis.nr_gravid, 0) nr_gravid,IFNULL(Niveis.nr_tempo_ger, 0) nr_tempo_ger,IFNULL(Niveis.nr_tempo, 0) nr_tempo,IFNULL(Niveis.nr_pontos, 0) nr_pontos,IFNULL(Niveis.in_random, 0) in_random,IFNULL(Niveis.tx_excluir, 0) tx_excluir,IFNULL(Niveis.cd_cls, 0) cd_cls from Niveis, Fases where 1 = 1  and Niveis.cd_fase = Fases.cd_fase";
    if ($cd_nivel != "") 
        $query = $query . " and Niveis.cd_nivel = " .$cd_nivel;
    if ($cd_fase != "") 
        $query = $query . " and Niveis.cd_fase = " .$cd_fase;
    if ($nr_nivel != "") 
        $query = $query . " and Niveis.nr_nivel = " .$nr_nivel;
    if ($nm_nivel != "") 
        $query = $query . " and Niveis.nm_nivel like '%" .$nm_nivel. "%'";
    if ($nr_blocos != "") 
        $query = $query . " and Niveis.nr_blocos = " .$nr_blocos;
    if ($nr_gravid != "") 
        $query = $query . " and Niveis.nr_gravid = " .$nr_gravid;
    if ($nr_tempo_ger != "") 
        $query = $query . " and Niveis.nr_tempo_ger = " .$nr_tempo_ger;
    if ($nr_tempo != "") 
        $query = $query . " and Niveis.nr_tempo = " .$nr_tempo;
    if ($nr_pontos != "") 
        $query = $query . " and Niveis.nr_pontos = " .$nr_pontos;
    if ($in_random != "") 
        $query = $query . " and Niveis.in_random = " .$in_random;
    if ($tx_excluir != "") 
        $query = $query . " and Niveis.tx_excluir like '%" .$tx_excluir. "%'";
    if ($cd_cls != "") 
        $query = $query . " and Niveis.cd_cls = " .$cd_cls;
    $dbresult = mysql_query($query);
    $result["total"] = mysql_affected_rows();
    mysql_close();
}
else if ($_REQUEST["action"] == "create") {
    $inputPayload = file_get_contents("php://input");
    $inputPayload = json_decode($inputPayload);
    $query = "insert into niveis values("
                    ."NULL".","
                    .nvl($inputPayload->cd_fase, "NULL").","
                    .nvl($inputPayload->nr_nivel, "NULL").","
                    ." '".htmlspecialchars(nvl($inputPayload->nm_nivel, "NULL"))."'".","
                    .nvl($inputPayload->nr_blocos, "NULL").","
                    .nvl($inputPayload->nr_gravid, "NULL").","
                    .nvl($inputPayload->nr_tempo_ger, "NULL").","
                    .nvl($inputPayload->nr_tempo, "NULL").","
                    .nvl($inputPayload->nr_pontos, "NULL").","
                    .nvl($inputPayload->in_random, "NULL").","
                    ." '".htmlspecialchars(nvl($inputPayload->tx_excluir, "NULL"))."'".","
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
    $query = "update niveis set ".
        "cd_fase=".nvl($inputPayload->cd_fase, "NULL").",".
        "nr_nivel=".nvl($inputPayload->nr_nivel, "NULL").",".
        "nm_nivel="." '".htmlspecialchars(nvl($inputPayload->nm_nivel, "NULL"))."'".",".
        "nr_blocos=".nvl($inputPayload->nr_blocos, "NULL").",".
        "nr_gravid=".nvl($inputPayload->nr_gravid, "NULL").",".
        "nr_tempo_ger=".nvl($inputPayload->nr_tempo_ger, "NULL").",".
        "nr_tempo=".nvl($inputPayload->nr_tempo, "NULL").",".
        "nr_pontos=".nvl($inputPayload->nr_pontos, "NULL").",".
        "in_random=".nvl($inputPayload->in_random, "NULL").",".
        "tx_excluir="." '".htmlspecialchars(nvl($inputPayload->tx_excluir, "NULL"))."'".",".
        "cd_cls=".nvl($inputPayload->cd_cls, "NULL").
        " where cd_nivel=".nvl($inputPayload->cd_nivel, "NULL");
    $dbresult = mysql_query($query);
    if(mysql_affected_rows()>0)
        $result = array("success"=>true,"message"=>"Registro Alterado");
    Else
        $result = array("success"=>false,"message"=>mysql_error());
    mysql_close();
} else if ($_REQUEST["action"] == "delete") {
    $inputPayload = file_get_contents("php://input");
    $inputPayload = json_decode($inputPayload);
    $query = "delete from niveis".
        " where cd_nivel=".nvl($inputPayload->cd_nivel, "NULL");
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
