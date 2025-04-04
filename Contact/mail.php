<?php
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($_POST["message"]));
    $messagesubject = strip_tags(trim($_POST["messagesubject"]));

    $message = html_entity_decode($message);

    if (empty($name) || empty($email) || empty($message) || empty($messagesubject) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid input.");
    }

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->SMTPDebug = 2;
        $mail->Host = 'smtp.gmail.com';
        $mail->Port = 587;
        $mail->SMTPSecure = 'tls';
        $mail->SMTPAuth = true;
        $mail->Username = 'nicholasfortune.contact@gmail.com';
        $mail->Password = getenv('SMTP_PASSWORD');

        $mail->setFrom($email, $name);
        $mail->addAddress('nicholasfortune.contact@gmail.com', 'Contact Form Script');

        $mail->Subject = $messagesubject;
        $mail->Body    = "Provided Subject: $messagesubject\n\nSender Name: $name\nSender Email: $email\n\nMessage Begin\n--------------------------------------------\n\n$message";

        if ($mail->send()) {
            header('Location: Thank_You/Thank_You.html');
            exit; 
        } else {
            echo "Failed to send message.";
        }
    } catch (Exception $e) {
        echo "Mailer Error: " . $mail->ErrorInfo;
    }
} else {
    die("Invalid request.");
}
?>