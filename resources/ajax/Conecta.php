    <?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    //nome do servidor (127.0.0.1)
    $servidor = "127.0.0.1";
    //usu�rio do banco de dados
    $user = "root";
    //senha do banco de dados
    $senha = "";
    //nome da base de dados
    $db = "MatDB2";
    //executa a conex�o com o banco, caso contr�rio mostra o erro ocorrido
    $conexao = mysql_connect($servidor,$user,$senha) or die (mysql_error());
    //seleciona a base de dados daquela conex�o, caso contr�rio mostra o erro ocorrido
    $banco = mysql_select_db($db, $conexao) or die(mysql_error());
?>
