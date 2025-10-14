# /docs/docs-api/google/google-imagen4-fast

来源: https://wavespeed.ai/docs/docs-api/google/google-imagen4-fast

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Google](/docs/docs-api/google/google-gemini-2.5-flash-image-edit "Google")Google Imagen4 Fast

# Google Imagen4 Fast

Google Imagen4 Fast

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/google/imagen4-fast)

Google’s Imagen 4 flagship model

## Features[](#features)

# Google Imagen 4 Fast

**Imagen 4 Fast** is the **high-speed, cost-efficient** variant of Google’s Imagen 4 image generation model. It delivers near-identical visual fidelity to the standard version but at significantly higher speed and lower cost — ideal for creative iteration, social content, and rapid prototyping.

* * *

## ⚡ Why it stands out[](#-why-it-stands-out)

*   **10× Faster Generation** Creates high-quality images in a fraction of the time, enabling instant visual feedback for creators.
*   **Cost-Effective Performance** Optimized for efficiency — generate more images on the same budget without compromising clarity or color accuracy.
*   **Cinematic and Artistic Range** Handles both photorealistic and stylized compositions with balanced lighting and rich texture detail.
*   **Enhanced Text Rendering** Maintains Imagen 4’s superior typography performance, producing crisp, legible text for posters and designs.
*   **Resolution Flexibility** Supports multiple aspect ratios up to **2 K resolution**, suitable for digital media and print layouts.

* * *

## ⚙️ How to use[](#️-how-to-use)

*   Input: text prompt
    
*   Resolution: up to **2048 × 2048 px**
    
*   Compatible with descriptive prompts such as:
    
    *   _“A futuristic city at sunrise, glowing glass towers and flying cars in the distance.”_
    *   _“A close-up portrait of a woman in soft studio lighting, ultra-realistic detail.”_

* * *

## 💰 Pricing[](#-pricing)

*   **$0.018 per image**
*   Commercial use allowed

* * *

## 💡 Best Use Cases[](#-best-use-cases)

*   **Rapid Concepting** — Quickly explore visual directions during creative brainstorming.
*   **Social Media & Marketing** — Generate eye-catching visuals for campaigns in seconds.
*   **Design & Illustration** — Produce high-resolution imagery for posters, banners, and print layouts.
*   **Product Visualization** — Render realistic textures, materials, and lighting for prototypes.

* * *

## 📝 Notes[](#-notes)

Please ensure your prompts comply with **Google’s Safety Guidelines**. If an error occurs, review your prompt for restricted content, adjust it, and try again.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/google/imagen4-fast" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "aspect_ratio": "1:1",
    "num_images": 1,
    "enable_base64_output": false
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

prompt

string

Yes

\-

The positive prompt for the generation.

aspect\_ratio

string

No

1:1

1:1, 16:9, 9:16, 4:3, 3:4

The aspect ratio of the generated media.

num\_images

integer

No

1

1 ~ 4

The number of images to generate.

negative\_prompt

string

No

\-

The negative prompt for the generation.

seed

integer

No

\-

\-1 ~ 2147483647

The random seed to use for the generation.

enable\_base64\_output

boolean

No

false

\-

If enabled, the output will be encoded into a BASE64 string instead of a URL. This property is only available through the API.

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

[Google Imagen4](/docs/docs-api/google/google-imagen4 "Google Imagen4")[Google Imagen4 Ultra](/docs/docs-api/google/google-imagen4-ultra "Google Imagen4 Ultra")