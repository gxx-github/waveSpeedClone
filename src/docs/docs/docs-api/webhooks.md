# /docs/docs-api/webhooks

来源: https://wavespeed.ai/docs/docs-api/webhooks

WaveSpeedAI APIWebhooks

# Webhooks

Webhooks allow you to receive asynchronous notifications when your AI generation tasks are completed. Instead of polling the API for results, you can specify a webhook URL that will receive a POST request with the generation results.

## Using Webhooks[](#using-webhooks)

To use webhooks, simply add the `webhook` parameter to your API request URL. The webhook URL should be a publicly accessible HTTPS endpoint that can receive POST requests.

## Request Format[](#request-format)

When using webhooks, the request format remains the same as the standard API, with the webhook URL specified as a query parameter.

cURLPython

```bash

curl --location --request POST 'https://api.wavespeed.ai/api/v3/wavespeed-ai/flux-dev-lora?webhook=https://your.app.user/endpoints' \
--header 'Content-Type: application/json'  \
--header 'Authorization: Bearer YOUR_API_KEY' \
--data-raw '{
  "prompt": "Octopus vs. crab chess game, underwater setting, vibrant colors"
}'
  
```

## Webhook Response[](#webhook-response)

Your webhook endpoint will receive notifications for both successful and failed tasks. The status field in the response will indicate the task outcome:

*   `completed`: Task completed successfully
*   `failed`: Task failed due to an error (check the `error` field for details)

When your webhook endpoint is called, you’ll receive a POST request with the following structure:

```
{
    "id": "<task_id>",
    "model": "wavespeed-ai/flux-dev-lora",
    "input": {
        "prompt": "Octopus vs. crab chess game, underwater setting, vibrant colors"
    },
    "outputs": [
        "<output_url>"    // Only present when status is "completed"
    ],
    "urls": {
        "get": "https://api.wavespeed.ai/api/v3/predictions/<task_id>/result"
    },
    "has_nsfw_contents": [
        false
    ],
    "status": "completed",  // or "failed"
    "created_at": "<created_at>",
    "error": "<error>",     // Contains error details when status is "failed"
}
```

## Best Practices[](#best-practices)

1.  **Secure Endpoints**: Ensure your webhook endpoint is secured with HTTPS
2.  **Implement Retry Logic**: Your endpoint should be able to handle temporary failures
3.  **Verify Requests**: Implement proper authentication for your webhook endpoint
4.  **Quick Response**: Your webhook handler should respond quickly with a 2xx status code
5.  **Handle Duplicates**: Implement idempotency to handle potential duplicate webhook deliveries

## Error Handling[](#error-handling)

If your webhook endpoint is unavailable or returns an error, we will retry the webhook delivery up to 3 times with exponential backoff. Make sure your endpoint is reliable and can handle the expected load.

[Authentication](/docs/docs-authentication "Authentication")[Verifying Webhook](/docs/docs-api/verifying_webhook "Verifying Webhook")