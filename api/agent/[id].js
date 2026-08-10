export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const response = await fetch(`https://api.wts.chat/core/v1/agent/${id}`, {
      headers: {
        "Authorization": `Bearer ${process.env.API_TOKEN}`,
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: text });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar dados do CRM" });
  }
}