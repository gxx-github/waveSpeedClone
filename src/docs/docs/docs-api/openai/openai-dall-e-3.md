# /docs/docs-api/openai/openai-dall-e-3

来源: https://wavespeed.ai/docs/docs-api/openai/openai-dall-e-3

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Openai](/docs/docs-api/openai/openai-dall-e-2 "Openai")Openai Dall E 3

# Openai Dall E 3

Openai Dall E 3

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/openai/dall-e-3)

OpenAI’s image generation model: dall-e-3.

## Features[](#features)

# OpenAI DALL·E 3

**DALL·E 3** is OpenAI’s most advanced text-to-image system, capable of generating **highly detailed, realistic, and creative visuals** directly from natural language descriptions. It builds upon OpenAI’s extensive world knowledge and artistic training to create images that are accurate, expressive, and aligned with your intent.

* * *

## 🎨 Key Features[](#-key-features)

*   **Natural Language Understanding** Converts descriptive prompts into coherent, visually rich images with impressive contextual accuracy.
    
*   **Flexible Visual Styles** Supports multiple artistic directions — from photorealistic renderings to digital art, concept sketches, and more.
    
*   **Text Rendering** Accurately incorporates text and signage into generated images for posters, packaging, and editorial design.
    
*   **Global Knowledge Integration** Leverages OpenAI’s broad factual grounding to produce culturally and contextually accurate imagery.
    

* * *

## 🛡️ Safety & Reliability[](#️-safety--reliability)

*   Built-in safety filters to prevent generation of unsafe or restricted content.
    
*   Incorporates **C2PA metadata** for content authenticity and traceability.
    
*   Optional moderation sensitivity parameter:
    
    *   `auto` (default) – Standard filtering
    *   `low` – Less restrictive filtering for research and artistic use

* * *

## ⚙️ Capabilities[](#️-capabilities)

*   **Input:** Text prompt (supports natural language)
    
*   **Output:** Static image
    
*   **Supported Styles:** Photorealistic, digital painting, illustration, abstract, minimalist, cinematic, and more
    
*   **Supported Quality:** `standard`, `hd`
    
*   **Resolution Options:**
    
    *   `1024×1024`
    *   `1024×1792`
    *   `1792×1024`

* * *

## 💰 Pricing[](#-pricing)

Quality

Resolution

Price per Image (USD)

**Standard**

1024×1024

**$0.040**

**Standard**

1024×1792 / 1792×1024

**$0.080**

**HD**

1024×1024

**$0.080**

**HD**

1024×1792 / 1792×1024

**$0.120**

* * *

## 💡 Best Use Cases[](#-best-use-cases)

*   **Marketing & Branding** — Generate ad-ready visuals and concept mockups effortlessly.
*   **Design & Illustration** — Quickly iterate creative ideas and styles.
*   **Education & Media** — Create visual assets for courses, articles, and storytelling.
*   **Content Creation** — Produce social posts, thumbnails, and blog images with minimal effort.

* * *

## 📝 Notes[](#-notes)

*   For best results, use **clear, focused prompts** (e.g., _“A cinematic portrait of a woman standing under neon lights in Tokyo”_).
*   All generations comply with **OpenAI’s content and safety guidelines**.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/openai/dall-e-3" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "size": "1024*1024",
    "quality": "standard",
    "style": "vivid",
    "enable_sync_mode": false,
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

size

string

No

1024\*1024

1024\*1024, 1024\*1792, 1792\*1024

The size of the generated media in pixels (width\*height).

quality

string

No

standard

hd, standard

The quality of the generated image.

style

string

No

vivid

vivid, natural

The style of the generated image.

enable\_sync\_mode

boolean

No

false

\-

If set to true, the function will wait for the image to be generated and uploaded before returning the response. It allows you to get the image directly in the response. This property is only available through the API.

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

[Openai Dall E 2](/docs/docs-api/openai/openai-dall-e-2 "Openai Dall E 2")[Openai Gpt Image 1](/docs/docs-api/openai/openai-gpt-image-1 "Openai Gpt Image 1")