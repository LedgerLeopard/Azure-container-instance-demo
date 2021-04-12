const msRestNodeAuth = require("@azure/ms-rest-nodeauth");
const ci = require("@azure/arm-containerinstance");
const config = require("./config");
const { 
  subsciption,
  tenant,
  secret,
  client,
} = require("./config");

const rg = "RnD-rg";
const ciName = "test-ci";
const containers = {
  image: "nginx",
  name: "some-test-ci",
  resources: {
    requests: {
      cpu: 1,
      memoryInGB: 1.5,
    },
  },
  ports: [
    {
      port: 80,
      protocol: "TCP"
    }
  ]
};
const containerGroupParams = {
  ipAddress: {
    dnsNameLabel: "ci-demo-LL",
    type: "Public",
    ports: [
      {
        port: 80,
        protocol: "TCP"
      }
    ]
  },
  location: "westeurope",
  osType: "Linux",
  restartPolicy: "OnFailure",
  sku: "Standard",
  containers: [containers],
};

async function main() {
const creds = await msRestNodeAuth.loginWithServicePrincipalSecret(client, secret, tenant);
const context = new ci.ContainerInstanceManagementClientContext(creds, subsciption);

const containersGroup = new ci.ContainerGroups(context);
await containersGroup.beginCreateOrUpdate(rg, ciName, containerGroupParams);
}

main();
