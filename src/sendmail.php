<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require "phpmailer/src/Exception.php";
    require "phpmailer/src/PHPMailer.php";

$mail = new PHPMailer(true); /* Создаем объект MAIL */
$mail->CharSet = "UTF-8"; /* Задаем кодировку UTF-8 */
$mail->IsHTML(true); /* Разрешаем работу с HTML */

$name = $_POST["name"]; /* Принимаем имя пользователя с формы .. */
$phone = $_POST["tel"]; /* Телефон */
$email = $_POST["email"]; /* E-mail */
$text = $_POST["text"]; /* Текст */

$email_template = "template_mail.html"; // Считываем файл разметки
$body = file_get_contents($email_template); // Сохраняем данные в $body
$body = str_replace('%name%', $name, $body); // Заменяем строку %name% на имя
$body = str_replace('%phone%', $phone, $body); // строку %phone% на телефон
$body = str_replace('%email%', $email, $body); // строку %email% на e-mail
$body = str_replace('%text%', $text, $body); // строку %text% на текст

$mail->addAddress("gusakov.den@mail.ru"); /* Здесь введите Email, куда отправлять */
$mail->setFrom('adm@' . $_SERVER['HTTP_HOST'], 'Tetratec');
$mail->Subject = "[Заявка с формы]"; /* Тема письма */
$mail->MsgHTML($body);

if (!$mail->send()) {
  $message = 'Ошибка!';
} else {
  $message = 'Данные отправлены!';
}

header('Location: '.$_SERVER['REQUEST_URI']);
?>