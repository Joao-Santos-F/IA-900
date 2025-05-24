async function sendMessage() {
    const chatBox = document.getElementById("chatBox");
    const userInput = document.getElementById("userInput");
    const userMessage = userInput.value;
  
    if (!userMessage) return;
  
    const userDiv = document.createElement("div");
    userDiv.className = "user-message message";
    userDiv.textContent = userMessage;
    chatBox.appendChild(userDiv);
  
    userInput.value = "";
  
    chatBox.scrollTop = chatBox.scrollHeight;
  
    const endpoint = "https://ai-joaosantos9694585ai050764628291.openai.azure.com";
    const apiKey = "6QFdpa78jf70V1vu3dGRetX8R6QneSdUcMij7ijOkjI1OKkmOMjDJQQJ99BEACHYHv6XJ3w3AAAAACOGDmlx";
    const deploymentId = "gpt-4"; 
    const apiVersion = "2025-01-01-preview"; 
  
    const url = `${endpoint}/openai/deployments/${deploymentId}/chat/completions?api-version=${apiVersion}`;
  
    const data = {
      messages: [{ role: "user", content: userMessage }],
      max_tokens: 1000,
      temperature: 0.3, 
    };
  
    const headers = {
      "Content-Type": "application/json",
      "api-key": apiKey,
    };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const result = await response.json();
        const botMessage = result.choices[0].message.content;
  
        const botDiv = document.createElement("div");
        botDiv.className = "bot-message message";
        botDiv.textContent = botMessage;
        chatBox.appendChild(botDiv);
  
        chatBox.scrollTop = chatBox.scrollHeight;
      } else {
        console.error("Erro na requisição", response.status, response.statusText);
  
        const botDiv = document.createElement("div");
        botDiv.className = "bot-message message";
        botDiv.textContent = "Erro ao se comunicar com o serviço.";
        chatBox.appendChild(botDiv);
      }
    } catch (error) {
      console.error("Erro:", error);
  
      const botDiv = document.createElement("div");
      botDiv.className = "bot-message message";
      botDiv.textContent = "Erro ao se comunicar com o serviço.";
      chatBox.appendChild(botDiv);
    }
  }