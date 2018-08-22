<?php
	//************************Nawiązanie polaczenia PG*******************************

//zmienne do nawiazania polaczenie z serwerem Postgres i bazą danych Wojsko
	$db_host="localhost";
	$db_port="5432";
	$db_user="postgres";
	$db_pass="omega";
	$db_name="Wojsko";
	
//tekst do nawiązania polaczenia 
	$conn_string ="host=".$db_host." port=".$db_port." dbname=".$db_name." user=".$db_user." password=".$db_pass;
//zmienna do ktorej przypisana zostaje funkcja polaczenie z tekstem... 
    $polaczenie = pg_connect ("$conn_string") ;

/*
    jeżeli nie działa na nowej instalacji systemu tzn ze trzeba w xampp w plicu config php.ini odznaczyć komentarze przy bibliotekach pgsql
*/

    // sprawdzam status połączenia uwaga ! skrypt nie zabezpieczony przed sql injection.

    $stat = pg_connection_status($polaczenie);
    if ($stat === PGSQL_CONNECTION_OK) echo "poprawnie nawiazano polaczenie \n " ;
    //do tego miejsca ok

    //w tej linijce próbuje przypisać zmienna z js do php
    $zmiennaY = $_POST['szer'];
    $zmiennaX = $_POST['dl'];
       

//*******************************************************************************
    //wprowadzanie danych do bazy danych
    $zmiennaZ = "xyx";
    //$_POST['nazwa']='c';
    
    //request insert
    $query = "INSERT INTO public.jednostka(
	nazwa, b_dl, b_szer)
	VALUES ('$zmiennaZ','$zmiennaY','$zmiennaX')";
    $result = pg_query($query); 

    $sql = "SELECT * FROM public.jednostka";

    if (pg_query($sql)) 
    {echo " poprawnie wprowadzono dane";
    } else {
    echo "cannot insert" ;   
    };
    pg_close($polaczenie);

?>