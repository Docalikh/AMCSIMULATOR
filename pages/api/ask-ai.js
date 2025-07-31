
export default async function handler(req, res) {
  const { messages } = req.body;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.7,
    }),
  });

  const json = await response.json();
  const reply = json.choices?.[0]?.message?.content || "Sorry, I didn't understand that.";
  res.status(200).json({ reply });
}
