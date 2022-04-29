<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->Charset = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

$mail->setFrom('development-w@ya.ru', 'Клиент сайта');
$mail->addAddress('development-w@ya.ru');
$mail->Subject = 'Заявка с сайта';

$body = '<h1>Новая заявка с сайта</h1>';
if (trim(!empty($_POST['name']))) {
    $body .= '<p>Имя: '.$_POST['name'].'</p>';
    $body .= '<p>Email: '.$_POST['email'].'</p>';
}
$mail->Body = $body;
if (!$mail->send()) {
    $message = 'Ошибка отправки';
    $response = ['message'=>$message];

    header('Content-type: application/json');
    echo json_encode($response);
}
?>