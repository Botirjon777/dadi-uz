"use server";

import { sendTelegramMessage } from "@/lib/telegram";

export async function sendContactFormAction(formData: FormData) {
  const ism = formData.get("ism") as string;
  const telefon = formData.get("telefon") as string;
  const kompaniya = formData.get("kompaniya") as string;
  const xabar = formData.get("xabar") as string;

  if (!ism || !telefon || !xabar) {
    return { success: false, message: "Barcha majburiy maydonlarni to'ldiring." };
  }

  const message = `
<b>🚀 Yangi murojaat!</b>

<b>Ism:</b> ${ism}
<b>Telefon:</b> ${telefon}
${kompaniya ? `<b>Kompaniya:</b> ${kompaniya}` : ""}
<b>Xabar:</b>
${xabar}
  `.trim();

  try {
    const result = await sendTelegramMessage(message);
    if (result.ok) {
      return { success: true };
    } else {
      console.error("Telegram API error:", result.description);
      return { success: false, message: "Xabar yuborishda xatolik yuz berdi." };
    }
  } catch (error) {
    console.error("Action error:", error);
    return { success: false, message: "Tizimda xatolik yuz berdi." };
  }
}
