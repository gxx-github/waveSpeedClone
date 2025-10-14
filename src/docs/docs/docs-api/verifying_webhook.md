# /docs/docs-api/verifying_webhook

来源: https://wavespeed.ai/docs/docs-api/verifying_webhook

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")Verifying Webhook

# Verifying Webhooks from WaveSpeedAI

To ensure the authenticity and integrity of webhook events sent by **WaveSpeedAI**, we strongly recommend verifying every incoming webhook request. This protects your system from spoofed or replayed requests and ensures that only legitimate events are processed.

* * *

## Why Verify Webhooks?[](#why-verify-webhooks)

Webhook endpoints are publicly accessible and may receive requests from anyone. Without verification, a malicious actor could send forged requests to your endpoint, which might trigger unintended or insecure behavior in your system.

By verifying WaveSpeedAI webhook signatures, you can:

*   Ensure the event came from WaveSpeedAI
*   Detect any payload tampering
*   Prevent replay attacks by checking timestamps

* * *

## Getting Your Webhook Secret[](#getting-your-webhook-secret)

You can retrieve your webhook secret by calling the WaveSpeedAI API:

```
curl --location --request GET 'https://api.wavespeed.ai/api/v3/webhook/secret' \
--header 'Authorization: Bearer ${YOUR_API_KEY}'
```

This secret is used to generate HMAC-SHA256 signatures for each webhook request. Keep this key safe and secure. If it’s ever compromised, regenerate it immediately.

**Important**: The webhook secret returned by the API includes a `whsec_` prefix. When computing the signature, you must remove this prefix and use only the remaining string as the HMAC key (do not base64 decode it).

* * *

## Signature Header Format[](#signature-header-format)

WaveSpeedAI includes the following headers in every webhook request:

webhook-id: 45b392b22c3b449fa935bd4dc webhook-timestamp: 1758798328 webhook-signature: v3,424a292e812c06273bc4efd6b451010a5f046454ae15e6a7c0834428ca76255d Content-Type: application/json

*   `webhook-id`: Unique identifier for the webhook event
*   `webhook-timestamp`: The Unix timestamp when the event was generated
*   `webhook-signature`: `v3,<hex_signature>` formatted HMAC signature for verifying the request

The signature is computed using: {webhook-id}.{webhook-timestamp}.{raw\_body}

Constants used:

```
const (
  WebhookSignatureVersion = "v3"
  WebhookSignatureSeparator = ","
  WebhookContentSeparator = "."
  WebhookMaxAgeSeconds = 300 // 5 minutes
)
```

* * *

## How to Verify the Signature[](#how-to-verify-the-signature)

### Step 1: Extract Required Headers and Raw Body[](#step-1-extract-required-headers-and-raw-body)

From the incoming HTTP request:

*   Get the `webhook-id`
*   Get the `webhook-timestamp`
*   Get the `webhook-signature`
*   Capture the **raw, unparsed** request body

### Step 2: Construct the Signature Payload[](#step-2-construct-the-signature-payload)

Join the fields using the `.` separator: {webhook-id}.{webhook-timestamp}.{raw\_body}

### Step 3: Compute the HMAC SHA256 Signature[](#step-3-compute-the-hmac-sha256-signature)

Use your webhook secret to compute the signature: HMAC\_SHA256(key\_without\_prefix, “{webhook-id}.{webhook-timestamp}.{raw\_body}”)

**Important**: **Remove the `whsec_` prefix from your secret before using it as the HMAC key. Do not base64 decode the remaining string.**

### Step 4: Compare Signatures Securely[](#step-4-compare-signatures-securely)

The `webhook-signature` header is structured as: v3,<hex\_signature>

To extract the actual signature value, split by the comma (`,`) and use the second part. Then, use a constant-time comparison function to compare it against your computed HMAC.

### Step 5: Validate Timestamp (recommended)[](#step-5-validate-timestamp-recommended)

Reject requests where the timestamp is too old (older than `WebhookMaxAgeSeconds`, default: 5 minutes).

* * *

## Demo Code[](#demo-code)

### Python Example[](#python-example)

```
import hmac
import hashlib
import time
 
def verify_wavespeed_signature(payload: bytes, headers: dict, secret: str, max_age: int = 300) -> bool:
    webhook_id = headers.get("webhook-id")
    timestamp = headers.get("webhook-timestamp")
    signature_header = headers.get("webhook-signature")
 
    if not (webhook_id and timestamp and signature_header):
        raise Exception("Missing required headers")
 
    parts = signature_header.split(',')
    if len(parts) != 2 or parts[0] != 'v3':
        raise Exception("Invalid signature header format")
 
    received_signature = parts[1]
    # payload must be raw request body bytes
    signed_content = f"{webhook_id}.{timestamp}.{payload.decode()}".encode()
 
    # Remove whsec_ prefix; do not base64 decode
    key_without_prefix = secret[6:] if secret.startswith('whsec_') else secret
    expected_signature = hmac.new(key_without_prefix.encode(), signed_content, hashlib.sha256).hexdigest()
 
    # Validate timestamp
    if abs(time.time() - int(timestamp)) > max_age:
        raise Exception("Signature timestamp too old")
 
    if not hmac.compare_digest(expected_signature, received_signature):
        raise Exception("Invalid signature")
 
    return True
 
# Example with real data
payload = b'{"id":"45b392b22c3b449fa935bd4dc","model":"wavespeed-ai/flux-dev","outputs":["https://d2p7pge43lyniu.cloudfront.net/output/18058184-5df8-4d05-9e1b-7ad84c8b963e-u1_9bfd4537-e541-4ad0-a0f6-4812b11a37f1.jpeg"],"urls":{"get":"https://api.wavespeed.ai/api/v3/predictions/45b392b22c3b449fa935bd4dc2219dfe/result"},"has_nsfw_contents":[false],"status":"completed","created_at":"2025-09-25T09:12:48.239112031Z","error":"","executionTime":6710,"timings":{"inference":6710}}'
headers = {
    "webhook-id": "45b392b22c3b449fa935bd4dc",
    "webhook-timestamp": "1758798328",
    "webhook-signature": "v3,424a292e812c06273bc4efd6b451010a5f046454ae15e6a7c0834428ca76255d",
}
# <your secret>
secret = "whsec_e9EE3BdyXSxcB4ZyZUKjQUEoQX4sF9P1+eMpb/KluCM="
 
print(verify_wavespeed_signature(payload, headers, secret))
```

### JavaScript (Node.js) Example[](#javascript-nodejs-example)

```
const crypto = require('crypto');
 
function verifyWaveSpeedAISignature(payload, headers, secret, maxAgeSeconds = 300) {
  const id = headers['webhook-id'];
  const timestamp = headers['webhook-timestamp'];
  const signatureHeader = headers['webhook-signature'];
 
  if (!id || !timestamp || !signatureHeader) {
    throw new Error('Missing required headers');
  }
 
  const [version, receivedSignature] = signatureHeader.split(',');
  if (version !== 'v3' || !receivedSignature) {
    throw new Error('Invalid signature header format');
  }
 
  // Use raw body string (do not re-serialize)
  const signedContent = `${id}.${timestamp}.${payload}`;
 
  // Remove whsec_ prefix; do not base64 decode
  const keyWithoutPrefix = secret.startsWith('whsec_') ? secret.slice(6) : secret;
  const expectedSignature = crypto
    .createHmac('sha256', keyWithoutPrefix)
    .update(signedContent)
    .digest('hex');
 
  const ageSeconds = Math.abs(Date.now() / 1000 - parseInt(timestamp, 10));
  if (ageSeconds > maxAgeSeconds) {
    throw new Error('Signature timestamp too old');
  }
 
  if (!crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(receivedSignature))) {
    throw new Error('Invalid signature');
  }
 
  return true;
}
 
// Example with real data
const payload = '{"id":"45b392b22c3b449fa935bd4dc","model":"wavespeed-ai/flux-dev","outputs":["https://d2p7pge43lyniu.cloudfront.net/output/18058184-5df8-4d05-9e1b-7ad84c8b963e-u1_9bfd4537-e541-4ad0-a0f6-4812b11a37f1.jpeg"],"urls":{"get":"https://api.wavespeed.ai/api/v3/predictions/45b392b22c3b449fa935bd4dc2219dfe/result"},"has_nsfw_contents":[false],"status":"completed","created_at":"2025-09-25T09:12:48.239112031Z","error":"","executionTime":6710,"timings":{"inference":6710}}';
const headers = {
  'webhook-id': '45b392b22c3b449fa935bd4dc',
  'webhook-timestamp': '1758798328',
  'webhook-signature': 'v3,424a292e812c06273bc4efd6b451010a5f046454ae15e6a7c0834428ca76255d',
};
// <your secret>;
const secret = 'whsec_e9EE3BdyXSxcB4ZyZUKjQUEoQX4sF9P1+eMpb/KluCM=' 
 
console.log(verifyWaveSpeedAISignature(payload, headers, secret));
```

### Go Example[](#go--example)

```
 
package main
 
import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"strconv"
	"strings"
	"time"
)
 
// verifyWaveSpeedSignature verifies a WaveSpeedAI webhook signature
// Returns true if valid, error if invalid
func verifyWaveSpeedSignature(payload []byte, headers map[string]string, secret string) (bool, error) {
	webhookID := headers["webhook-id"]
	timestamp := headers["webhook-timestamp"]
	signatureHeader := headers["webhook-signature"]
 
	if webhookID == "" || timestamp == "" || signatureHeader == "" {
		return false, fmt.Errorf("missing required headers")
	}
 
	parts := strings.Split(signatureHeader, ",")
	if len(parts) != 2 || parts[0] != "v3" {
		return false, fmt.Errorf("invalid signature header format")
	}
 
	receivedSignature := parts[1]
	signedContent := fmt.Sprintf("%s.%s.%s", webhookID, timestamp, string(payload))
 
	// Remove whsec_ prefix
	keyWithoutPrefix := secret
	if strings.HasPrefix(secret, "whsec_") {
		keyWithoutPrefix = secret[6:]
	}
 
	expectedSignature := hmac.New(sha256.New, []byte(keyWithoutPrefix))
	expectedSignature.Write([]byte(signedContent))
	expectedSigHex := hex.EncodeToString(expectedSignature.Sum(nil))
 
	// Timestamp validation
	webhookTime, err := strconv.ParseInt(timestamp, 10, 64)
	if err != nil {
		return false, fmt.Errorf("invalid timestamp: %v", err)
	}
 
	age := time.Now().Unix() - webhookTime
	if age < 0 {
		age = -age
	}
	if age > 300 {
		return false, fmt.Errorf("signature timestamp too old")
	}
 
	// Constant-time comparison
	if !hmac.Equal([]byte(expectedSigHex), []byte(receivedSignature)) {
		return false, fmt.Errorf("invalid signature")
	}
 
	return true, nil
}
 
func main() {
	// Example with real data from documentation
	payload := []byte(`{"id":"45b392b22c3b449fa935bd4dc","model":"wavespeed-ai/flux-dev","outputs":["https://d2p7pge43lyniu.cloudfront.net/output/18058184-5df8-4d05-9e1b-7ad84c8b963e-u1_9bfd4537-e541-4ad0-a0f6-4812b11a37f1.jpeg"],"urls":{"get":"https://api.wavespeed.ai/api/v3/predictions/45b392b22c3b449fa935bd4dc2219dfe/result"},"has_nsfw_contents":[false],"status":"completed","created_at":"2025-09-25T09:12:48.239112031Z","error":"","executionTime":6710,"timings":{"inference":6710}}`)
	
	headers := map[string]string{
		"webhook-id":        "45b392b22c3b449fa935bd4dc",
		"webhook-timestamp": "1758802746",
		"webhook-signature": "v3,cf2866ec96051d73399f0b8627ea7bafd7dbac73725f80b855383a9b64f0c7d8",
	}
	// <your secret>;
	secret := "whsec_e9EE3BdyXSxcB4ZyZUKjQUEoQX4sF9P1+eMpb/KluCM="
 
	result, err := verifyWaveSpeedSignature(payload, headers, secret)
	if err != nil {
		fmt.Printf("Verification failed: %v\n", err)
		return
	}
	
	fmt.Printf("Verification result: %t\n", result)
}
 
```

### Raw HTTP Shell (for manual testing)[](#raw-http-shell-for-manual-testing)

```
ID="45b392b22c3b449fa935bd4dc"
TIMESTAMP=$(date +%s)
BODY='{"id":"45b392b22c3b449fa935bd4dc","model":"wavespeed-ai/flux-dev","outputs":["https://d2p7pge43lyniu.cloudfront.net/output/18058184-5df8-4d05-9e1b-7ad84c8b963e-u1_9bfd4537-e541-4ad0-a0f6-4812b11a37f1.jpeg"],"urls":{"get":"https://api.wavespeed.ai/api/v3/predictions/45b392b22c3b449fa935bd4dc2219dfe/result"},"has_nsfw_contents":[false],"status":"completed","created_at":"2025-09-25T09:12:48.239112031Z","error":"","executionTime":6710,"timings":{"inference":6710}}'
MESSAGE="$ID.$TIMESTAMP.$BODY"
# <your secret>;
SECRET="whsec_e9EE3BdyXSxcB4ZyZUKjQUEoQX4sF9P1+eMpb/KluCM="
 
# Remove whsec_ prefix (do not base64 decode)
KEY_WITHOUT_PREFIX="${SECRET#whsec_}"
 
# Compute hex signature
SIGNATURE=$(printf "%s" "$MESSAGE" | openssl dgst -sha256 -hmac "$KEY_WITHOUT_PREFIX" | sed 's/^.* //')
 
echo  "\"webhook-id\"": "\"$ID\"",
echo "\"webhook-timestamp\"": \""$TIMESTAMP\"",
echo "\"webhook-signature\"": \""v3,$SIGNATURE\""
 
curl -X POST https://your-webhook-url.com \
  -H "webhook-id: $ID" \
  -H "webhook-timestamp: $TIMESTAMP" \
  -H "webhook-signature: v3,$SIGNATURE" \
  -H "Content-Type: application/json" \
  -d "$BODY"
```

* * *

## Troubleshooting[](#troubleshooting)

*   **Signature verification fails**: Check that all three components match exactly: `id`, `timestamp`, and `raw_body`. Any character difference will cause failure (including whitespace, newlines, field order).
*   **Timestamp expired**: The `webhook-timestamp` used to generate the signature must match the request header and be within 5 minutes.
*   **Key processing error**: Must remove `whsec_` prefix and use the remaining string directly as HMAC key (do not base64 decode).
*   **Body contains base64 fields**: This is fine. Use the raw request body bytes as-is for signature verification.

* * *

## Summary[](#summary)

*   Every webhook from WaveSpeedAI includes: `webhook-id`, `webhook-timestamp`, and `webhook-signature`
*   The signature is computed as: `HMAC_SHA256(key_without_prefix, "webhook-id.timestamp.body")`
*   **Important**: Remove the `whsec_` prefix from your secret before using it as the HMAC key
*   Signature format: `v3,<hex_signature>`
*   Verify both the signature and the timestamp for security
*   Use the **raw, unparsed** request body for signature verification

Webhook verification is critical for security. Never trust webhook data without validation.

* * *

For any questions or issues, contact [support@wavespeed.ai](mailto:support@wavespeed.ai) or refer to the WaveSpeedAI developer portal.

[Webhooks](/docs/docs-api/webhooks "Webhooks")[Openai Dall E 2](/docs/docs-api/openai/openai-dall-e-2 "Openai Dall E 2")