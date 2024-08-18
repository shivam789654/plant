function api() {
  console.log("Entering API function");

  var promptText = document.getElementById("promptInput").value;

  var xhr = new XMLHttpRequest();

  xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
          console.log("Response received:");
          console.log(xhr);
          try {
              var jsonResponse = JSON.parse(xhr.responseText);
              console.log("Parsed JSON response:", jsonResponse);
              document.getElementById("responseOutput").textContent = JSON.stringify(jsonResponse, null, 2);
          } catch (error) {
              console.error("Error parsing JSON response:", error);
              document.getElementById("responseOutput").textContent = "Error parsing response.";
          }
      } else {
          console.error("Request failed. Status:", xhr.status, "Response:", xhr.responseText);
          document.getElementById("responseOutput").textContent = "Request failed with status " + xhr.status;
      }
  };

  xhr.onerror = function() {
      console.error("Network error or CORS issue.");
      document.getElementById("responseOutput").textContent = "Network error or CORS issue.";
  };

  xhr.open("POST", "https://api.openai.com/v1/chat/completions", true);
  xhr.setRequestHeader("Authorization", "Bearer sk- open ai api key");
  xhr.setRequestHeader("Content-Type", "application/json");

  var data = JSON.stringify({
      "model": "gpt-3.5-turbo",
      "messages": [
          {"role": "system", "content": "You are a helpful assistant."},
          {"role": "user", "content": promptText}
      ],
      "max_tokens": 50
  });

  xhr.send(data);
}
