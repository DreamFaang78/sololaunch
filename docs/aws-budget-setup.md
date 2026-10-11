# 💰 AWS Budget Alerts Setup ($0 Out-of-Pocket Guarantee)

Per PRD Section 15 (Next Steps, Item 2), SoloLaunch relies on a $100 AWS promotional credit. To guarantee you never incur an accidental out-of-pocket charge, configure automated AWS Budgets alerts at **$20**, **$50**, and **$80**.

---

## Option 1: Via AWS CLI (One Command)

Replace `YOUR_EMAIL@DOMAIN.COM` and `YOUR_ACCOUNT_ID`:

```bash
aws budgets create-budget \
  --account-id YOUR_ACCOUNT_ID \
  --budget '{
    "BudgetName": "SoloLaunch-100-Credit-Guard",
    "BudgetLimit": { "Amount": "100.0", "Unit": "USD" },
    "TimeUnit": "MONTHLY",
    "BudgetType": "COST"
  }' \
  --notifications-with-subscribers '[
    {
      "Notification": {
        "NotificationType": "ACTUAL",
        "ComparisonOperator": "GREATER_THAN",
        "Threshold": 20.0,
        "ThresholdType": "PERCENTAGE"
      },
      "Subscribers": [{ "SubscriptionType": "EMAIL", "Address": "YOUR_EMAIL@DOMAIN.COM" }]
    },
    {
      "Notification": {
        "NotificationType": "ACTUAL",
        "ComparisonOperator": "GREATER_THAN",
        "Threshold": 50.0,
        "ThresholdType": "PERCENTAGE"
      },
      "Subscribers": [{ "SubscriptionType": "EMAIL", "Address": "YOUR_EMAIL@DOMAIN.COM" }]
    },
    {
      "Notification": {
        "NotificationType": "ACTUAL",
        "ComparisonOperator": "GREATER_THAN",
        "Threshold": 80.0,
        "ThresholdType": "PERCENTAGE"
      },
      "Subscribers": [{ "SubscriptionType": "EMAIL", "Address": "YOUR_EMAIL@DOMAIN.COM" }]
    }
  ]'
```

---

## Option 2: Via AWS Management Console

1. Navigate to **Billing and Cost Management** ➔ **Budgets** ➔ **Create budget**.
2. Select **Cost budget (Recommended)**.
3. Name: `SoloLaunch-Credit-Guard`.
4. Set fixed amount to **$100.00** USD monthly.
5. In **Alerts**:
   - Alert 1: Trigger at **20%** ($20) ➔ Send email notification.
   - Alert 2: Trigger at **50%** ($50) ➔ Send email notification.
   - Alert 3: Trigger at **80%** ($80) ➔ Send urgent email notification.
6. Click **Confirm and Create**.

---

## Cost Traps Avoided in SoloLaunch
- **No NAT Gateway**: We use Aurora Data API and public Lambda URLs (saves ~$32/month).
- **No AWS WAF**: CloudFront default protections suffice for MVP (saves ~$10+/month).
- **No Managed OpenSearch**: PostgreSQL `pg_trgm` provides built-in full-text search (saves ~$35+/month).
- **Aurora Scale-to-Zero**: Pauses compute during zero-traffic hours.
