<?php
ini_set( 'session.cookie_httponly', 1 );

//CONSTANTS
define("ROOT_FOLDER",   $_SERVER["DOCUMENT_ROOT"]);

define("UPLOAD_LIMIT",      1024 * 1024 * 1024 * 2.01);
define("ALLOWED_FORMATS",   ["FLV","MP4","WMV","AVI","MOV","M4V","MPG","MPEG","WEBM","MOV","MKV","3GP"]);

define("ADMIN_PASSWORD",    "poops");

define("DB_HOST",           "localhost");
define("DB_DATABASE",       "vidlii_live");
define("DB_USER",           "vidlii");
define("DB_PASSWORD",       "");
define("DB_CHARSET",       "latin1");

define("CSS_FILE",          "https://www.vidlii.com/css/m.css?8");
define("PROFILE_CSS_FILE",  "https://www.vidlii.com/css/profile.css?5");
define("COSMIC_CSS_FILE",   "https://www.vidlii.com/css/cosmicpanda.css?5");
define("PROFILE_JS_FILE",   "https://www.vidlii.com/js/profile.js?9");
define("COSMIC_JS_FILE",    "https://www.vidlii.com/js/cosmicpanda.js?3");
define("MAIN_JS_FILE",      "https://www.vidlii.com/js/main3.js?22");

//AUTOLOAD CLASSES
spl_autoload_register(function ($class) { include ROOT_FOLDER."/_includes/_classes/" . $class . ".class.php"; });
require_once ROOT_FOLDER."/_includes/PHPfunctions.php";

//ini_set( 'session.cookie_httponly', 1 );
session_start(["cookie_lifetime" => 0, "gc_maxlifetime" => 455800]);

if (!isset($_SESSION["sec_actions"])) { $_SESSION["sec_actions"] = 0; }

if (isset($_COOKIE["css"]) && $_COOKIE["css"] == "deleted") {
    setcookie("css", null, -1);
}

//SETUP CLASSES
$DB         = new Database(false);
$_USER      = new User(NULL,$DB,true);
$_PAGE      = new Page();
$_GUMP      = new GUMP();
$_THEMES    = new Themes($DB, $_USER);

if ($_USER->logged_in && (!isset($_SERVER["HTTP_X_REQUESTED_WITH"]) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest')) {
    require_once ROOT_FOLDER."/_includes/inbox.php";
}

//VidLii Player Script/CSS Version
$VLPVERSION = round(mt_rand(0,10000));

$LOGO_VALUE = $DB->execute("SELECT value FROM settings WHERE name = 'logo'", true)["value"];

if ($LOGO_VALUE == "0") { $LOGO_VALUE = "img/Vidlii6.png"; } else { $LOGO_VALUE = "img/$LOGO_VALUE.png"; }

if (!isset($_SESSION["secret_id"])) {

    $_SESSION["secret_id"] = random_string("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 14);

}


$_SESSION["ten2020Holiday"] = date("d", time());

//Load for traffic regulation
if ($_SESSION["ten2020Holiday"] > 20) { $_SESSION["ten2020Holiday"] = "Today"; }

if ($_USER->logged_in && $_USER->username == "VidLssii") {
    session_destroy();
    $_USER->logout();
    redirect("/"); exit();
}

if ($_USER->logged_in && strpos($_SERVER["REQUEST_URI"], "api?") === false && count($_POST) > 0 && isset($_SERVER['HTTP_ORIGIN'])) {

    if (empty($_SERVER['HTTP_ORIGIN']) || strpos($_SERVER['HTTP_ORIGIN'], "vidlii.com") === false) {

        //$_POST = [];

    }

}