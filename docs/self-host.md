# 🏠 Self-Host SoloLaunch in 15 Minutes

SoloLaunch is 100% open-source (MIT licensed) and designed to run entirely on free tiers or your own cloud account.

---

## Architecture Overview

```
Client (Browser) ──> CloudFront CDN ──> S3 Static Bucket (HTML/CSS/JS)
                         │
                         └──> Lambda Function URL (Hono API)
                                    │
                                    ├──> Aurora Serverless v2 / Postgres
                                    ├──> Amazon Bedrock (Nova / Claude)
                                    └──> GitHub / npm / PyPI APIs
```

---

## Option 1: Deploy to AWS with SST v3 (Recommended)

### Prerequisites
1. **Node.js 20+** installed
2. **AWS CLI** configured (`aws configure` with an active AWS account)
3. A free **GitHub Personal Access Token** (optional, prevents rate limits)

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DreamFaang78/sololaunch.git
   cd sololaunch
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   AWS_REGION=us-east-1
   BEDROCK_MODEL_ID=amazon.nova-lite-v1:0
   GITHUB_TOKEN=ghp_your_personal_token_here
   ```

4. **Deploy with SST:**
   ```bash
   npx sst deploy --stage production
   ```
   SST will provision:
   - S3 Bucket & CloudFront distribution
   - Hono API Lambda function
   - Aurora Serverless v2 PostgreSQL database
   - Nightly ingestion cron job

5. **Point Your Custom Domain (`alphacreation.online`):**
   In your Route 53 or DNS provider (GoDaddy, Namecheap, Cloudflare), add a CNAME record:
   ```
   CNAME sololaunch.alphacreation.online -> <CloudFront-Domain>.cloudfront.net
   ```

---

## Option 2: Run Locally (Zero Cloud, 10 Seconds)

You can run SoloLaunch on your computer without deploying to AWS:

1. Clone and enter the folder:
   ```bash
   git clone https://github.com/DreamFaang78/sololaunch.git
   cd sololaunch
   ```

2. Open `index.html` directly in any web browser:
   - On Windows: Double-click `index.html` or run `start index.html`
   - On macOS: `open index.html`
   - On Linux: `xdg-open index.html`

Or start a local preview web server:
```bash
npx serve .
```

---

## Cost Optimization & Free Tier Guarantee

- **S3 & CloudFront**: Covered by AWS Free Tier (1 TB data transfer/month free).
- **Lambda**: Covered by AWS Free Tier (1 million requests/month free).
- **Bedrock (AI)**: Amazon Nova Lite costs ~$0.00006 per 1,000 input tokens. A $100 AWS credit covers ~1,500,000 idea queries.
- **Database**: Aurora scales to zero when idle.
