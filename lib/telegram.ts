interface TelegramResponse {
  ok: boolean;
  description?: string;
}

export async function sendTelegramMessage(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("Telegram credentials missing");
    return { ok: false, description: "Server configuration error" };
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: "HTML",
        }),
      }
    );

    const data: TelegramResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending Telegram message:", error);
    return { ok: false, description: "Network error" };
  }
}
