import Vapi from '@vapi-ai/web';

// Voice configurations
export const VoiceConfigs = {
  REAVA: { provider: "11labs", voiceId: "1zUSi8LeHs9M2mV8X6YS", model: "eleven_turbo_v2", stability: 0.5, similarityBoost: 0.8, style: 0.2, useSpeakerBoost: true },
  SOFIA: { provider: "11labs", voiceId: "EXAVITQu4vr4xnSDxMaL", model: "eleven_turbo_v2", stability: 0.6, similarityBoost: 0.7, style: 0.3, useSpeakerBoost: true },
  ZANE: { provider: "11labs", voiceId: "pNInz6obpgDQGcFmaJgB", model: "eleven_turbo_v2", stability: 0.4, similarityBoost: 0.9, style: 0.1, useSpeakerBoost: true }
};

export const createAssistantConfig = (expertName, topic, expertType, prompt) => {
  const voiceConfig = VoiceConfigs[expertName] || VoiceConfigs.REAVA;
  return {
    name: `${expertName} - ${expertType}`,
    model: { provider: "openai", model: "gpt-4", messages: [{ role: "system", content: prompt.replace('{user_topic}', topic) }], maxTokens: 150, temperature: 0.7 },
    voice: voiceConfig,
    firstMessage: `Hello! I'm ${expertName}, your ${expertType.toLowerCase()} assistant for ${topic}. How can I help you today?`,
    transcriber: { provider: "deepgram", model: "nova-2", language: "en-US" },
    recordingEnabled: false,
    silenceTimeoutSeconds: 30,
    maxDurationSeconds: 600,
    backgroundSound: "off"
  };
};

// Singleton Vapi client
let vapiInstance = null;
export const getVapiClient = () => {
  if (!vapiInstance) {
    vapiInstance = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
  }
  return vapiInstance;
};

// Start a Vapi conversation using default methods
export const startVapiConversation = async (expertName, topic, expertType, prompt) => {
  const vapi = getVapiClient();
  const config = createAssistantConfig(expertName, topic, expertType, prompt);

  try {
    // Replace with your actual SDK method e.g. vapi.start(config)
    await vapi.start(config);
    return vapi; // Return the client instance for further interaction
  } catch (error) {
    console.error("Error starting Vapi conversation:", error);
    throw error;
  }
};

// Stop the conversation
export const stopVapiConversation = async () => {
  const vapi = getVapiClient();
  if (vapi && typeof vapi.stop === "function") {
    await vapi.stop();
  }
};






