import httpClient from "./httpClient";

export async function askChatAssistant(messages) {
  const response = await httpClient.post("/api/chat/ask", { messages });
  return response.data;
}
