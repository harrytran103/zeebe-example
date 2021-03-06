import express from "express";
import * as path from "path";
import * as uuid from "uuid";
import { ZBClient } from "zeebe-node";
const app = express();

const zbc = new ZBClient('zeebe:26500');

const port = 3000;

app.use("/", express.static(path.join(__dirname, "static")));

app.put("/api/cart/order", async (req, res) => {
  const { customerId } = req.params;

  const items = [
    {
      articleId: "123",
      amount: "1"
    }
  ];

  const customer = {
    customerId,
    name: "Camunda",
    address: "Zossener Strasse 55\n10961 Berlin\nGermany"
  };

  const order = {
    items,
    customer
  };

  const id = uuid.v4();
  const traceId = uuid.v4();

  const payload = {
    id,
    traceId,
    order
  };

  await zbc.createWorkflowInstance("order-zeebe", payload);
  res.json({ traceId });
});

app.listen(port, () =>
  console.log(`Web store running on http://localhost:${port}`)
);
