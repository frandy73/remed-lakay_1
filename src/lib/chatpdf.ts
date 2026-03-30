export interface ChatPDFMessage {
  role: "user" | "assistant";
  content: string;
}

export const sendMessageToChatPDF = async (messages: ChatPDFMessage[]) => {
  const apiKey = process.env.CHATPDF_API_KEY;
  const sourceId = process.env.CHATPDF_SOURCE_ID;

  if (!apiKey || !sourceId) {
    throw new Error("CHATPDF_API_KEY oswa CHATPDF_SOURCE_ID manke nan anviwònman an.");
  }

  const response = await fetch("/api/chatpdf/v1/chats/message", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sourceId: sourceId,
      messages: [
        {
          role: "user",
          content: "Sistèm: Ou se Konpè Fèy, yon gwo doktè fey ak ekspè nan medsin tradisyonèl ayisyen. Reponn keksyon yo tou senp, san w pa janm mansyone paj, dokiman, oswa PDF (pa egzanp, pa janm di 'paj 5'). Reponn sèlman an kreyòl ayisyen pwofesyonèl.",
        },
        {
          role: "assistant",
          content: "Onè! Mwen se Konpè Fèy. Mwen konprann mission mwen byen: m ap bay solisyon ak remèd fèy tou senp, san m pa janm pale de dokiman oswa paj. Kouman mwen ka sèvi w jodi a?",
        },
        // We only send the last 8 messages from the history to stay under the 10-message limit
        ...messages.slice(-8),
      ],
    }),
  });

  const responseText = await response.text();

  if (!response.ok) {
    let errorMessage = "Erè nan ChatPDF API";
    try {
      const errorData = JSON.parse(responseText);
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      errorMessage = responseText || `API error with status ${response.status}`;
    }
    throw new Error(errorMessage);
  }

  try {
    const data = JSON.parse(responseText);
    return data.content;
  } catch (e) {
    console.error("Failed to parse ChatPDF response:", responseText);
    throw new Error("Repons AI a pa t ka li byen.");
  }
};
