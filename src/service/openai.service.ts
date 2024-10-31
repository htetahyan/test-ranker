import { AzureOpenAI } from "openai";
import { type Completion } from "openai/resources/index";

// Environment variables or manual values
const endpoint = process.env["AZURE_OPENAI_ENDPOINT"] || "<endpoint>";
const apiKey = process.env["AZURE_OPENAI_API_KEY"] || "<api key>";

// Azure OpenAI deployment name and API version
const apiVersion = "2023-03-15-preview";
const deploymentName = "gpt-4o";

// Chat prompt and max tokens
const maxTokens = 4000;

function getClient(): AzureOpenAI {
  return new AzureOpenAI({
    endpoint,
    apiKey,
    apiVersion,
    deployment: deploymentName,
  });
}

async function getCompletion(
  client: AzureOpenAI,
  prompt: string,
  max_tokens: number
): Promise<any> {
  const completion = await  client.chat.completions.create({messages: [
    {
      role: "user",
      name: "user",
      content: prompt,
    },
  ],
  
    model: "",
    max_tokens,

    
  });
console.log(completion.choices[0].message);
return completion;

}

// Validation function for the quiz format


// Clean and parse response into a JavaScript array
async function cleanAndParseResponse(response: any): Promise<any[]> {
  // Log the received response
  console.log("Received response:", response);

  // Clean up the response to remove the markdown code block formatting
  const cleanedResponse = response.content
    .replace(/```json\n/, '')
    .replace(/```javascript$/, '')       // Remove the opening markdown code block
    .replace(/```$/, '')       // Remove the closing markdown code block
    .trim();                   // Trim any surrounding whitespace

  try {
    // Parse the cleaned response as a JavaScript object or array
    const parsedData = JSON.parse(cleanedResponse);

    // Ensure the result is always an array
    return Array.isArray(parsedData) ? parsedData : [parsedData];
  } catch (error: any) {
    console.error("Error parsing response as JSON:", cleanedResponse, error);
    throw new Error("Invalid JSON format: " + error.message);
  }
}
// Process completion choices
async function printChoices(completion: any): Promise<any> {
  for (const choice of completion.choices) {
    console.log(`Choice: ${choice.message}`);
    
    const parsedData = await cleanAndParseResponse(choice.message);
    return parsedData; // Returning the parsed data for further usage
  }
}

// Main function to initiate completion
export async function main(prompt: string) {
  console.log("== Get completions Sample ==");

  const client = getClient();
  const completion = await getCompletion(client, prompt, maxTokens);
  return await printChoices(completion);
}
 