export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const response = await fetch(`https://api.wts.chat/core/v1/agent/${id}`, {
        headers: {
          "Authorization": process.env.API_TOKEN,
          "Accept": "application/json"
        }
      });

      if (!response.ok) {
        const text = await response.text();
        return res.status(response.status).json({ error: text });
      }

      const data = await response.json();
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: "Erro ao buscar dados do CRM" });
    }
  }

  if (req.method === "PUT") {
    const { availability } = req.body;

    if (!availability) {
      return res.status(400).json({ error: "availability é obrigatório" });
    }

    try {
      const response = await fetch(`https://api.wts.chat/core/v1/agent/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": process.env.API_TOKEN,
          "Accept": "application/json",
          "Content-Type": "application/*+json"
        },
        body: JSON.stringify({
          fields: ["Availability"],
          availability
        })
      });

      if (!response.ok) {
        const text = await response.text();
        return res.status(response.status).json({ error: text });
      }

      const data = await response.json().catch(() => ({}));
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: "Erro ao atualizar status" });
    }
  }

  return res.status(405).json({ error: "Método não permitido" });
}