# /docs/docs-api/wavespeed-ai/image-face-swap-pro

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/image-face-swap-pro

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Image Face Swap Pro

# Image Face Swap Pro

Image Face Swap Pro

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/image-face-swap-pro)

Instantly swap faces with AI Face Swap online. Enjoy the fun of face swapping in photos. No watermark.

## Features[](#features)

# WaveSpeedAI Face Swap Pro

**Face Swap Pro** is an advanced **AI-powered face replacement model** that enables realistic, seamless, and watermark-free face swaps in static images. By combining powerful face recognition, alignment, and blending algorithms, it ensures lifelike results while preserving lighting, pose, and expression fidelity.

* * *

## ⚙️ Why it looks so cool[](#️-why-it-looks-so-cool)

*   **Instant Face Swapping** Upload a base image and a reference face — the model replaces the original face with the target identity while maintaining natural contours and lighting.
    
*   **Realistic Blending** Automatically adapts skin tone, lighting direction, and expression for ultra-smooth integration.
    
*   **Expression & Pose Preservation** The source image’s emotion, head tilt, and gaze direction are retained for believable results.
    
*   **Watermark-Free Results** Every generation is clean, production-ready, and suitable for both fun edits and professional use.
    

* * *

## 🧠 How to use[](#-how-to-use)

*   **Input:**
    
    *   `image` → The base photo to edit
    *   `face_image` → The reference face to swap in
*   **Output:** JPEG / PNG / WEBP image with replaced face
    
*   **AI Engine:** WaveSpeedAI Face Identity Alignment & Lighting Consistency Module
    

* * *

## 💰 Pricing[](#-pricing)

Operation

Price (USD)

**Face Swap (per image)**

**$0.020**

* * *

## 💡 Best Use Cases[](#-best-use-cases)

*   **Social Media & Entertainment** — Fun, shareable, and creative swaps in portraits and group photos.
*   **Film & Advertising** — Quick mockups for casting, storyboarding, and concept design.
*   **Photography & Visual Design** — Replace faces for privacy, retouching, or creative effects.
*   **Virtual Production** — Generate realistic composites for narrative or promotional visuals.

* * *

## 📝 Notes[](#-notes)

*   For **best results**, use clear, front-facing portraits with consistent lighting between both faces.
*   Avoid overly complex or low-resolution images — clarity improves blending accuracy.
*   Ensure you have **permission** to use all uploaded images and likenesses.
*   If you are working with anime or illustrated characters, the output quality may be significantly lower due to visual style differences.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/image-face-swap-pro" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "output_format": "jpeg",
    "enable_base64_output": false,
    "enable_sync_mode": false
}'

# Get the result
curl --location --request GET "https://api.wavespeed.ai/api/v3/predictions/${requestId}/result" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}"
```

## Parameters[](#parameters)

### Task Submission Parameters[](#task-submission-parameters)

#### Request Parameters[](#request-parameters)

Parameter

Type

Required

Default

Range

Description

image

string

Yes

\-

The image that contains the face to be replaced.

face\_image

string

Yes

\-

\-

The face image as reference.

output\_format

string

No

jpeg

jpeg, png, webp

The format of the output image.

enable\_base64\_output

boolean

No

false

\-

If enabled, the output will be encoded into a BASE64 string instead of a URL. This property is only available through the API.

enable\_sync\_mode

boolean

No

false

\-

If set to true, the function will wait for the image to be generated and uploaded before returning the response. It allows you to get the image directly in the response. This property is only available through the API.

#### Response Parameters[](#response-parameters)

Parameter

Type

Description

code

integer

HTTP status code (e.g., 200 for success)

message

string

Status message (e.g., “success”)

data.id

string

Unique identifier for the prediction, Task Id

data.model

string

Model ID used for the prediction

data.outputs

array

Array of URLs to the generated content (empty when status is not `completed`)

data.urls

object

Object containing related API endpoints

data.urls.get

string

URL to retrieve the prediction result

data.has\_nsfw\_contents

array

Array of boolean values indicating NSFW detection for each output

data.status

string

Status of the task: `created`, `processing`, `completed`, or `failed`

data.created\_at

string

ISO timestamp of when the request was created (e.g., “2023-04-01T12:34:56.789Z”)

data.error

string

Error message (empty if no error occurred)

data.timings

object

Object containing timing details

data.timings.inference

integer

Inference time in milliseconds

#### Result Request Parameters[](#result-request-parameters)

[Image Face Swap](/docs/docs-api/wavespeed-ai/image-face-swap "Image Face Swap")[Image Upscaler](/docs/docs-api/wavespeed-ai/image-upscaler "Image Upscaler")