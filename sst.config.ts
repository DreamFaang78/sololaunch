/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "sololaunch",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    // ── 1. Database (Aurora Serverless v2 with scale-to-zero) ──
    const database = new sst.aws.Postgres("SoloLaunchDb", {
      // Scaled down to minimize AWS credit consumption
    });

    // ── 2. Hono API on AWS Lambda Function URL ────────────────
    const api = new sst.aws.Function("SoloLaunchApi", {
      handler: "src/api/index.app",
      url: true,
      link: [database],
      environment: {
        BEDROCK_MODEL_ID: "amazon.nova-lite-v1:0",
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      },
      permissions: [
        {
          actions: ["bedrock:InvokeModel"],
          resources: ["*"],
        },
      ],
    });

    // ── 3. Nightly Scheduled Ingestion Worker ─────────────────
    new sst.aws.Cron("NightlyIngestionCron", {
      schedule: "cron(0 2 * * ? *)", // 2 AM UTC daily
      job: {
        handler: "src/ingestion/github.searchGitHubRepos",
        link: [database],
      },
    });

    // ── 4. S3 + CloudFront Static Hosting ─────────────────────
    const site = new sst.aws.StaticSite("SoloLaunchWeb", {
      path: "./",
      domain: $app.stage === "production" ? "sololaunch.alphacreation.online" : undefined,
      environment: {
        API_URL: api.url,
      },
    });

    return {
      apiUrl: api.url,
      siteUrl: site.url,
    };
  },
});
