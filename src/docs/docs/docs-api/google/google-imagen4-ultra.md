# /docs/docs-api/google/google-imagen4-ultra

来源: https://wavespeed.ai/docs/docs-api/google/google-imagen4-ultra

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Google](/docs/docs-api/google/google-gemini-2.5-flash-image-edit "Google")Google Imagen4 Ultra

# Google Imagen4 Ultra

Google Imagen4 Ultra

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/google/imagen4-ultra)

Google’s highest quality image generation model

## Features[](#features)

# Google Imagen 4 Ultra

**Imagen 4 Ultra** is Google’s **flagship high-fidelity image generation model**, offering unmatched visual quality, detail precision, and stylistic versatility. Designed for professional creators and production pipelines, it pushes the limits of realism and aesthetic control in AI-generated imagery.

* * *

## 🌟 Why it stands out[](#-why-it-stands-out)

*   **Unparalleled Photorealism:** Captures ultra-fine surface textures, natural lighting gradients, and lifelike skin, fabric, and material details.
    
*   **2K-Resolution Mastery:** Natively supports ultra-high-resolution outputs up to **2048 × 2048 px**, preserving composition balance and clarity even at large scale.
    
*   **Advanced Lighting & Color Accuracy:** Delivers cinematic exposure, dynamic contrast, and true-to-life color grading for production-ready visuals.
    
*   **Text & Typography Precision:** Generates legible, stylized typography — ideal for posters, magazines, product packaging, and digital design.
    
*   **Style Versatility:** Excels across photography, hyperrealism, illustration, fantasy art, and branded visual design, adapting intuitively to tone and mood.
    
*   **Several Images in One Click:** Instantly generate multiple high-quality image variations per prompt — perfect for fast exploration and creative selection.
    

* * *

## ⚙️ Capabilities[](#️-capabilities)

*   Input: text prompt
    
*   Enhanced semantic understanding for multi-subject, complex lighting, and layered compositions
    
*   Works with descriptive prompts such as:
    
    *   _“A cinematic portrait of an astronaut illuminated by warm sunlight filtering through a space station window.”_
    *   _“Luxury product photography of a perfume bottle on marble, soft reflections and shallow focus.”_

* * *

## 💰 Pricing[](#-pricing)

*   **$0.058 per image**
*   Commercial use allowed

* * *

## 💡 Best Use Cases[](#-best-use-cases)

*   **Advertising & Branding** — Create visually stunning, print-ready assets with precision detail.
*   **Film & Media Production** — Generate high-resolution concept art and cinematic stills.
*   **Product & Fashion Design** — Showcase materials and craftsmanship with photorealistic lighting.
*   **Fine Art & Illustration** — Achieve painterly or hyper-detailed results with exceptional control.

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
curl --location --request POST "https://api.wavespeed.ai/api/v3/google/imagen4-ultra" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "aspect_ratio": "1:1",
    "resolution": "1k",
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

resolution

string

No

1k

1k, 2k

The target resolution of the generated media.

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

[Google Imagen4 Fast](/docs/docs-api/google/google-imagen4-fast "Google Imagen4 Fast")[Google Nano Banana Edit](/docs/docs-api/google/google-nano-banana-edit "Google Nano Banana Edit")