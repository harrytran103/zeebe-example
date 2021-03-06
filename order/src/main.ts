import { ZBClient } from "zeebe-node";
import * as path from "path";

const zbc = new ZBClient('zeebe:26500');

zbc
  .deployWorkflow(path.join(__dirname, "..", "bpmn", "order-zeebe.bpmn"))
  .then(console.log);

zbc.createWorker({
  taskType: "save-order-z",
  taskHandler: (job, complete) => {
    const { id } = job.variables;
    console.log(`Persisted order: ${id}`);
    complete.success();
  }
});
