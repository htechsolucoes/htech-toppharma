export default async function handler(req, res) {
  try {
    const path = Array.isArray(req.query.path)
      ? req.query.path.join("/")
      : req.query.path || "";

    if (!path.startsWith("core/v1/agent")) {
      return res.status(404).json({
        error: "Endpoint não permitido"
      });
    }

    const apiUrl = `${process.env.CRM_API_URL}/${path}`;

    const response = await fetch(apiUrl, {
      method: req.method,
      headers: {
        Authorization: `Bearer ${process.env.CRM_TOKEN}`,
        Accept: "application/json"
      }
    });

    const contentType = response.headers.get("content-type");

    const data = contentType?.includes("application/json")
      ? await response.json()
      : await response.text();

    return res.status(response.status).json(data);
  } catch (error) {
    console.error("Erro na Vercel Function:", error);

    return res.status(500).json({
      error: "Erro ao comunicar com a API do CRM"
    });
  }
}