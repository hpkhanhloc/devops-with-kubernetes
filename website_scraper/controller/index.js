const k8s = require("@kubernetes/client-node");
const mustache = require("mustache");
const request = require("request");
const fs = require("fs").promises;

const kc = new k8s.KubeConfig();

kc.loadFromCluster();

const opts = {};
kc.applyToRequest(opts);

const client = kc.makeApiClient(k8s.CoreV1Api);

const sendRequestToApi = async (api, method = "get", options = {}) =>
  new Promise((resolve, reject) =>
    request[method](
      `${kc.getCurrentCluster().server}${api}`,
      { ...opts, ...options, headers: { ...options.headers, ...opts.headers } },
      (err, res) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log(res.status);
          console.log(res.body);
          resolve(JSON.parse(res.body));
        }
      }
    )
  );

const fieldsFromDummySite = (object) => {
  console.log(`object: ${object}`);
  return {
    dummysite_name: object.metadata.name,
    container_name: object.metadata.name,
    deployment_name: `${object.metadata.name}-dep`,
    namespace: object.metadata.namespace,
    image: object.spec.image,
    website_url: object.spec.website_url,
  };
};

const getJobYAML = async (fields) => {
  const deploymentTemplate = await fs.readFile("deployment.mustache", "utf-8");
  return mustache.render(deploymentTemplate, fields);
};

const createDeployment = async (fields) => {
  console.log(
    "Create new dummy website from",
    fields.website_url,
    "to namespace",
    fields.namespace
  );

  const yaml = await getJobYAML(fields);

  return sendRequestToApi(
    `/apis/apps/v1/namespaces/${fields.namespace}/deployments`,
    "post",
    {
      headers: {
        "Content-Type": "application/yaml",
      },
      body: yaml,
    }
  );
};

const createService = async (fields) => {
  console.log(
    "Create new service fordummy website from",
    fields.website_url,
    "to namespace",
    fields.namespace
  );
  const serviceTemplate = await fs.readFile("service.mustache", "utf-8");
  const yaml = mustache.render(serviceTemplate);

  return sendRequestToApi(
    `/api/v1/namespaces/${fields.namespace}/services`,
    "post",
    {
      headers: {
        "Content-Type": "application/yaml",
      },
      body: yaml,
    }
  );
};

const main = async () => {
  (await client.listPodForAllNamespaces()).body;

  request(
    `${kc.getCurrentCluster().server}/apis/stable.dwk/v1/dummysites`,
    opts,
    (error, response, body) => {
      if (error) {
        console.log(`error: ${error}`);
      }
      if (response) {
        console.log(`statusCode: ${response.statusCode}`);
      }
      console.log(`body: ${body}`);
      const fields = fieldsFromDummySite(JSON.parse(body).items[0]);
      createService(fields);
      createDeployment(fields);
    }
  );
};

main();
