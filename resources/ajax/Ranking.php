<?php
function nvl (&$key, $else = "") {
        return (isset($key) ? $key : ((!empty($else)) ? $else : ""));
}
$current_page = 1;
$offset_page = 0;
$limit_per_page = 25;
include 'Conecta.php';
if (!isset($_REQUEST["action"])) {
    $result = array("ranking"=>array(),"total"=>0);
    $current_page = $_REQUEST["page"];
    $limit_per_page = "";
    if (isset($_REQUEST["limit"]))
        $limit_per_page = $_REQUEST["limit"];
    $offset_page = $_REQUEST["start"];
    $cd_rank = "";
    if (isset($_REQUEST["cd_rank"]))
        $cd_rank = $_REQUEST["cd_rank"];
    $cd_usuar = "";
    if (isset($_REQUEST["cd_usuar"]))
        $cd_usuar = $_REQUEST["cd_usuar"];
    $cd_fase = "";
    if (isset($_REQUEST["cd_fase"]))
        $cd_fase = $_REQUEST["cd_fase"];
    $cd_nivel = "";
    if (isset($_REQUEST["cd_nivel"]))
        $cd_nivel = $_REQUEST["cd_nivel"];
    $nr_pontos = "";
    if (isset($_REQUEST["nr_pontos"]))
        $nr_pontos = $_REQUEST["nr_pontos"];
    $nr_tempo = "";
    if (isset($_REQUEST["nr_tempo"]))
        $nr_tempo = $_REQUEST["nr_tempo"];
    $query = "select IFNULL(Ranking.cd_rank, 0) cd_rank, Usuarios.nm_usuar,IFNULL(Ranking.cd_usuar, 0) cd_usuar, Fases.nr_fase,IFNULL(Ranking.cd_fase, 0) cd_fase, Niveis.nr_nivel,IFNULL(Ranking.cd_nivel, 0) cd_nivel,IFNULL(Ranking.nr_pontos, 0) nr_pontos,IFNULL(Ranking.nr_tempo, 0) nr_tempo from Ranking, Fases, Niveis, Usuarios where 1 = 1  and Ranking.cd_usuar = Usuarios.cd_usuar and Ranking.cd_fase = Fases.cd_fase and Ranking.cd_nivel = Niveis.cd_nivel";
    if ($cd_rank != "") 
        $query = $query . " and Ranking.cd_rank = " .$cd_rank;
    if ($cd_usuar != "") 
        $query = $query . " and Ranking.cd_usuar = " .$cd_usuar;
    if ($cd_fase != "") 
        $query = $query . " and Ranking.cd_fase = " .$cd_fase;
    if ($cd_nivel != "") 
        $query = $query . " and Ranking.cd_nivel = " .$cd_nivel;
    if ($nr_pontos != "") 
        $query = $query . " and Ranking.nr_pontos = " .$nr_pontos;
    if ($nr_tempo != "") 
        $query = $query . " and Ranking.nr_tempo = " .$nr_tempo;
    if (isset($_REQUEST["limit"]))
        $query = $query . " limit " .$limit_per_page. " offset " .$offset_page;
    $dbresult = mysql_query($query);
    if (mysql_affected_rows() > 0) {
        while($row = mysql_fetch_array($dbresult))
        {
            array_push($result["ranking"],
                array(
                    "cd_rank"=>(float)utf8_encode($row["cd_rank"]),
                    "nm_usuar"=>addslashes((string)utf8_encode($row["nm_usuar"])),
                    "cd_usuar"=>(float)utf8_encode($row["cd_usuar"]),
                    "nr_fase"=>addslashes((string)utf8_encode($row["nr_fase"])),
                    "cd_fase"=>(float)utf8_encode($row["cd_fase"]),
                    "nr_nivel"=>addslashes((string)utf8_encode($row["nr_nivel"])),
                    "cd_nivel"=>(float)utf8_encode($row["cd_nivel"]),
                    "nr_pontos"=>(float)utf8_encode($row["nr_pontos"]),
                    "nr_tempo"=>(float)utf8_encode($row["nr_tempo"])
                )
            );
        }
    }
    $query = "select IFNULL(Ranking.cd_rank, 0) cd_rank, Usuarios.nm_usuar,IFNULL(Ranking.cd_usuar, 0) cd_usuar, Fases.nr_fase,IFNULL(Ranking.cd_fase, 0) cd_fase, Niveis.nr_nivel,IFNULL(Ranking.cd_nivel, 0) cd_nivel,IFNULL(Ranking.nr_pontos, 0) nr_pontos,IFNULL(Ranking.nr_tempo, 0) nr_tempo from Ranking, Fases, Niveis, Usuarios where 1 = 1  and Ranking.cd_usuar = Usuarios.cd_usuar and Ranking.cd_fase = Fases.cd_fase and Ranking.cd_nivel = Niveis.cd_nivel";
    if ($cd_rank != "") 
        $query = $query . " and Ranking.cd_rank = " .$cd_rank;
    if ($cd_usuar != "") 
        $query = $query . " and Ranking.cd_usuar = " .$cd_usuar;
    if ($cd_fase != "") 
        $query = $query . " and Ranking.cd_fase = " .$cd_fase;
    if ($cd_nivel != "") 
        $query = $query . " and Ranking.cd_nivel = " .$cd_nivel;
    if ($nr_pontos != "") 
        $query = $query . " and Ranking.nr_pontos = " .$nr_pontos;
    if ($nr_tempo != "") 
        $query = $query . " and Ranking.nr_tempo = " .$nr_tempo;
    $dbresult = mysql_query($query);
    $result["total"] = mysql_affected_rows();
    mysql_close();
}
else if ($_REQUEST["action"] == "create") {
    $inputPayload = file_get_contents("php://input");
    $inputPayload = json_decode($inputPayload);
    $query = "insert into ranking values("
                    ."NULL".","
                    .nvl($inputPayload->cd_usuar, "NULL").","
                    .nvl($inputPayload->cd_fase, "NULL").","
                    .nvl($inputPayload->cd_nivel, "NULL").","
                    .nvl($inputPayload->nr_pontos, "NULL").","
                    .nvl($inputPayload->nr_tempo, "NULL").
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
    $query = "update ranking set ".
        "cd_usuar=".nvl($inputPayload->cd_usuar, "NULL").",".
        "cd_fase=".nvl($inputPayload->cd_fase, "NULL").",".
        "cd_nivel=".nvl($inputPayload->cd_nivel, "NULL").",".
        "nr_pontos=".nvl($inputPayload->nr_pontos, "NULL").",".
        "nr_tempo=".nvl($inputPayload->nr_tempo, "NULL").
        " where cd_rank=".nvl($inputPayload->cd_rank, "NULL");
    $dbresult = mysql_query($query);
    if(mysql_affected_rows()>0)
        $result = array("success"=>true,"message"=>"Registro Alterado");
    Else
        $result = array("success"=>false,"message"=>mysql_error());
    mysql_close();
} else if ($_REQUEST["action"] == "delete") {
    $inputPayload = file_get_contents("php://input");
    $inputPayload = json_decode($inputPayload);
    $query = "delete from ranking".
        " where cd_rank=".nvl($inputPayload->cd_rank, "NULL");
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
