<?php

class database {
      //nos variables
      protected $_host;
      protected $_dbname;
      protected $_username;
      protected $_password;

      protected $_db;

    public function getDb() {
        return $this->_db;
    }
      // Créer l'object à partir du constructeur
      public function __construct($_host, $_dbname, $_username, $_password) {
          $this->_host = $_host;
          $this->_dbname = $_dbname;
          $this->_username = $_username;
          $this->_password = $_password;
          $this->_db = $this->PDOConnexion();
      }

      // Fonction permettant de se connecter
      public function PDOConnexion() {
          $bdd = new PDO('mysql:host='.$this->_host.'; dbname='.$this->_dbname, $this->_username, $this->_password);
          $bdd ->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
          $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
          // Faire un return de la BDD ou non en fonction de ou on utilise la connexion
          return $bdd;
      }

      public function verify_login($token) {
        $stmt = $this->_db->prepare('SELECT * FROM logins WHERE pseudo=:token');
        // echo "rowCount : $count\n<br>";
        $results = $stmt->execute(array('token' => $token));
        $count = $stmt->rowCount(); // Compter les rows retournés.
        if($count>0) {        
            // Login existant;
            return false;
        }else{
            // Login non existant;
            return true;
        }
    }


  }




$db = new database("localhost", "logins", "root", "");

$log = $_POST["login"];

echo $db->verify_login($log);

  ?>