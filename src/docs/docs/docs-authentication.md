# /docs/docs-authentication

来源: https://wavespeed.ai/docs/docs-authentication

Authentication

# Authentication

## API Key[](#api-key)

All WaveSpeedAI APIs require authentication using an API key. You must include your API key in the request headers for all API calls:

## Obtaining an API Key[](#obtaining-an-api-key)

To obtain an API key:

1.  Go to the [WaveSpeedAI Dashboard](https://wavespeed.ai/accesskey)
2.  Sign in to your account or create a new account
3.  Navigate to the API Keys section
4.  Generate a new API key
5.  Copy and securely store your API key

## Security Best Practices[](#security-best-practices)

*   **Never share your API key**: Keep your API key confidential
*   **Don’t hardcode API keys**: Use environment variables or secure key management systems
*   **Rotate keys periodically**: Regularly generate new API keys and deprecate old ones
*   **Use restricted keys**: When possible, create keys with limited permissions

## Example Usage[](#example-usage)

cURLPythonJavaScript

```bash

curl --location --request POST "https://api.wavespeed.ai/v1/endpoint" \
--header "Authorization: Bearer YOUR_API_KEY" \
--header "Content-Type: application/json" \
--data-raw '{"param1": "value1", "param2": "value2"}'
```

[Using in N8N](/docs/docs-n8n "Using in N8N")[Webhooks](/docs/docs-api/webhooks "Webhooks")