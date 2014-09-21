<?php
include 'Conecta.php';
create table if not exists Classes ( 
        cd_cls INTEGER  auto_increment PRIMARY KEY,
        tx_cls VARCHAR(255)  
);
create table if not exists Fases ( 
        cd_fase INTEGER  auto_increment PRIMARY KEY,
        nr_fase INTEGER  ,
        nm_fase VARCHAR(255)  ,
        cd_cls INTEGER  
);
create table if not exists Jogo ( 
        versao INTEGER  auto_increment PRIMARY KEY,
        nome VARCHAR(255)  ,
        cd_cls INTEGER  
);
create table if not exists Niveis ( 
        cd_nivel INTEGER  auto_increment PRIMARY KEY,
        cd_fase INTEGER  ,
        nr_nivel INTEGER  ,
        nm_nivel VARCHAR(255)  ,
        nr_blocos INTEGER  ,
        nr_gravid INTEGER  ,
        nr_tempo_ger INTEGER  ,
        nr_tempo INTEGER  ,
        nr_pontos INTEGER  ,
        in_random INTEGER  ,
        tx_excluir VARCHAR(14)  ,
        cd_cls INTEGER  
);
create table if not exists Ranking ( 
        cd_rank INTEGER  auto_increment PRIMARY KEY,
        cd_usuar INTEGER  ,
        cd_fase INTEGER  ,
        cd_nivel INTEGER  ,
        nr_pontos INTEGER  ,
        nr_tempo INTEGER  
);
create table if not exists Usuarios ( 
        cd_usuar INTEGER  auto_increment PRIMARY KEY,
        nm_usuar VARCHAR(255)  ,
        ar_foto BLOB  ,
        cd_usuar_faceb VARCHAR(255)  
);
alter table Niveis add FOREIGN KEY (cd_fase) REFERENCES Fases(cd_fase);
alter table Ranking add FOREIGN KEY (cd_usuar) REFERENCES Usuarios(cd_usuar);
alter table Ranking add FOREIGN KEY (cd_fase) REFERENCES Fases(cd_fase);
alter table Ranking add FOREIGN KEY (cd_nivel) REFERENCES Niveis(cd_nivel);
?>
