<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Content-Type: application/json; charset=UTF-8');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
    exit;
}

// Support both JSON body and standard Form POST
$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);
if (!is_array($input)) {
    $input = $_POST;
}

$name = trim($input['name'] ?? '');
$phone = trim($input['phone'] ?? '');
$email = trim($input['email'] ?? '');
$subject = trim($input['subject'] ?? 'সাধারণ তথ্য বা অনুসন্ধান');
$message = trim($input['message'] ?? '');

// Validation
if (empty($name) || empty($phone) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'অনুগ্রহ করে আপনার নাম, ফোন নম্বর এবং বার্তা লিখুন।']);
    exit;
}

// Recipient email addresses
$recipients = [
    'subhranil.naskar@gmail.com',
    'subhraanilnaskar@gmail.com',
    'editor@baruipur.online'
];

$to = implode(', ', $recipients);
$emailSubject = "=?UTF-8?B?" . base64_encode("[Baruipur Online] " . $subject . " - " . $name) . "?=";

$replyTo = (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) ? $email : 'editor@baruipur.online';

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=UTF-8';
$headers[] = 'From: Baruipur Online <editor@baruipur.online>';
$headers[] = 'Reply-To: ' . $replyTo;
$headers[] = 'X-Mailer: PHP/' . phpversion();

date_default_timezone_set('Asia/Kolkata');
$timeStr = date('d-m-Y h:i A');
$ip = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';

$cleanName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$cleanPhone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$cleanEmail = !empty($email) ? htmlspecialchars($email, ENT_QUOTES, 'UTF-8') : 'দেওয়া হয়নি';
$cleanSubject = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');
$cleanMessage = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

$emailBody = <<<HTML
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>নতুন যোগাযোগ বার্তা - Baruipur Online</title>
</head>
<body style="font-family: Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f3f4f6; margin: 0; padding: 24px; color: #1f2937;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); border: 1px solid #e5e7eb;">
    <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: #ffffff; padding: 24px; text-align: left;">
      <h1 style="margin: 0; font-size: 22px; font-weight: bold; letter-spacing: -0.5px;">Baruipur Online</h1>
      <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9;">নতুন যোগাযোগ বার্তা (Contact Form Submission)</p>
    </div>
    
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr style="border-bottom: 1px solid #f3f4f6;">
          <td style="padding: 10px 0; font-weight: 600; color: #6b7280; width: 130px;">প্রেরকের নাম:</td>
          <td style="padding: 10px 0; color: #111827; font-weight: bold;">{$cleanName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f3f4f6;">
          <td style="padding: 10px 0; font-weight: 600; color: #6b7280;">মোবাইল নম্বর:</td>
          <td style="padding: 10px 0; color: #111827;"><a href="tel:{$cleanPhone}" style="color: #dc2626; text-decoration: none; font-weight: bold;">{$cleanPhone}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #f3f4f6;">
          <td style="padding: 10px 0; font-weight: 600; color: #6b7280;">ইমেল আইডি:</td>
          <td style="padding: 10px 0; color: #111827;">{$cleanEmail}</td>
        </tr>
        <tr style="border-bottom: 1px solid #f3f4f6;">
          <td style="padding: 10px 0; font-weight: 600; color: #6b7280;">বিষয়:</td>
          <td style="padding: 10px 0; color: #111827; font-weight: 600;">{$cleanSubject}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; font-weight: 600; color: #6b7280; vertical-align: top;">বিস্তারিত বার্তা:</td>
          <td style="padding: 12px 0; color: #1f2937; line-height: 1.6; background-color: #f9fafb; border-radius: 8px; padding: 12px; margin-top: 6px;">{$cleanMessage}</td>
        </tr>
      </table>

      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px dashed #e5e7eb; font-size: 12px; color: #9ca3af; display: flex; justify-content: space-between;">
        <span>জমা দেওয়ার সময়: {$timeStr}</span> | <span>IP: {$ip}</span>
      </div>
    </div>
    
    <div style="background-color: #f9fafb; padding: 12px 24px; font-size: 11px; color: #9ca3af; text-align: center; border-top: 1px solid #f3f4f6;">
      এই ইমেলটি <a href="https://baruipur.online" style="color: #dc2626; text-decoration: none;">baruipur.online</a> থেকে পাঠানো হয়েছে।
    </div>
  </div>
</body>
</html>
HTML;

$mailSent = @mail($to, $emailSubject, $emailBody, implode("\r\n", $headers));

// Log submission locally for record keeping
$logData = [
    'timestamp' => date('c'),
    'name' => $name,
    'phone' => $phone,
    'email' => $email,
    'subject' => $subject,
    'message' => $message,
    'ip' => $ip,
    'mail_sent' => $mailSent
];

$logFile = __DIR__ . '/contact_submissions.jsonl';
@file_put_contents($logFile, json_encode($logData, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX);

// Return response
echo json_encode([
    'success' => true,
    'message' => 'আপনার বার্তা সফলভাবে গৃহীত হয়েছে।'
]);
