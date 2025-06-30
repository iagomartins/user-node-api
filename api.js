import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
const SECRET_KEY = "2516aadd29f56b14757b658f077dfecb";

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Olá, esta é a rota padrão da API.");
});

const users = [
  {
    name: "admin",
    email: "admin@spsgroup.com.br",
    type: "admin",
    password: "1234",
  },
];

const appPort = app.listen(3001, () => {
  const port = appPort.address().port;
  console.log(`app is running at http://localhost:${port}`);
});

// Rota para login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.email === username);
  if (!user) {
    return res.status(401).json({ message: "Credenciais inválidas." });
  }

  const isPasswordValid = password === user.password;
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Credenciais inválidas." });
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
  return res.json({ token, user });
});

app.get("/users/:email", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    const { email } = req.params;

    const search = users.find((search) => search.email === email);

    if (!search) res.status(404).json("Usuário não existe!");
    return res.json({ message: "Acesso autorizado!", user: search });
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }
});

app.get("/users", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return res.json({ message: "Acesso autorizado!", users });
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }
});

app.post("/users", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    const { name, email, type, password } = req.body;

    const user = {
      name,
      email,
      type,
      password,
    };

    const alreadyExists = users.find((e) => e.email === user.email) || false;

    if (!alreadyExists) {
      users.push(user);
      return res.json({ message: "Usuário criado!", users });
    } else {
      return res
        .status(403)
        .json({ message: "E-mail de usuário já existente." });
    }
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }
});

app.patch("/users/:username", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    const { name, email, type, password } = req.body;
    const user = {
      name,
      email,
      type,
      password,
    };
    const { username } = req.params;

    const update = users.find((update) => update.email === username);

    if (!update) return res.status(404).json("Usuário não existe!");

    update.name = name ? name : update.name;
    update.email = email ? email : update.email;
    update.type = type ? type : update.type;
    update.password = password ? password : update.password;
    return res.json({ message: "Cadastro atualizado!", user });
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }
});

app.delete("/users/:email", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    const { email } = req.params;

    let deleteIndex = 0;
    const deleteUser = users.find((deleteUser, i) => {
      deleteIndex = i;
      return deleteUser.email === email;
    });

    if (!deleteUser) return res.status(404).json("Usuário não existe!");

    if (deleteUser.email === "admin@spsgroup.com.br")
      return res.status(403).json("Usuário admin não pode ser excluído!");

    users.splice(deleteIndex, 1);

    return res.json("Deletado com sucesso!");
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado." });
  }
});
