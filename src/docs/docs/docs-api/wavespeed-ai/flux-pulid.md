# /docs/docs-api/wavespeed-ai/flux-pulid

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/flux-pulid

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Flux Pulid

# Flux Pulid

Flux Pulid

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/flux-pulid)

FLUX-PuLID combines FLUX.1 \[dev\] with Personalized User Likeness ID (PuLID) technology, enabling high-quality personalized image generation from reference photos with exceptional realism and custom likenesses.

## Features[](#features)

# ⚡ FLUX-PuLID — Personalized Image Generation

**FLUX-PuLID** fuses the power of **FLUX.1 \[dev\]** with advanced **Personalized User Likeness ID (PuLID)** technology, enabling **consistent character identity** across different scenes, outfits, and artistic styles. Whether you want to turn a photo into a **fantasy elf**, **cyberpunk warrior**, or **cinematic portrait**, FLUX-PuLID ensures your face stays unmistakably _you_.

* * *

## 🎨 Why it looks great[](#-why-it-looks-great)

*   **🧠 ID consistency:** preserves facial structure, proportions, and expression across all generated images.
*   **👗 Flexible restyling:** change outfits, lighting, or environment — from elegant fashion to sci-fi armor.
*   **🧝 Realistic transformations:** morph your likeness into new worlds — elves, heroes, mecha pilots, or film characters.
*   **🎥 Cinematic detail:** uses FLUX’s filmic rendering core for smooth tones, accurate skin, and realistic depth of field.
*   **🎭 Creative control:** adjust _guidance scale_ for balance between faithfulness and artistic freedom.

* * *

## ⚙️ Limits and Performance[](#️-limits-and-performance)

*   **Max resolution:** up to **1536 × 1536 px**
*   **Input:** image reference + descriptive prompt
*   **Output formats:** `jpeg`, `png`, `webp`

* * *

## 💰 Pricing[](#-pricing)

Each image costs **$0.02**.

Type

Price per Image

FLUX-PuLID

$0.02

* * *

## 🚀 How to Use[](#-how-to-use)

1.  🖼️ **Upload a reference image** — ensure the face in the image is clear and well-lit.
2.  ✍️ **Write a descriptive prompt** — specify the new style, outfit, or theme.
3.  🎚️ **Adjust settings** — size, guidance scale, seed, and output format.
4.  ▶️ **Click “Run”** to generate your personalized image instantly.

* * *

## 💡 Pro Tips[](#-pro-tips)

*   Keep the face visible and well-lit in the input image for best likeness.
*   Use **3.0–4.0 guidance scale** for natural balance between realism and creativity.
*   Try cinematic or fantasy prompts for striking artistic results.

* * *

## 🧾 Notes[](#-notes)

Please double-check your image upload URL — if there’s an issue, the preview will not appear.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/flux-krea-dev-lora" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "size": "1024*1024",
    "guidance_scale": 3.5,
    "seed": -1,
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

prompt

string

Yes

\-

The positive prompt for the generation.

image

string

Yes

\-

size

string

No

1024\*1024

256 ~ 1536 per dimension

The size of the generated media in pixels (width\*height).

guidance\_scale

number

No

3.5

0.0 ~ 20.0

The guidance scale to use for the generation.

seed

integer

No

\-1

\-1 ~ 2147483647

The random seed to use for the generation. -1 means a random seed will be used.

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

[Flux Krea Dev LoRA](/docs/docs-api/wavespeed-ai/flux-krea-dev-lora "Flux Krea Dev LoRA")[Flux Redux Dev](/docs/docs-api/wavespeed-ai/flux-redux-dev "Flux Redux Dev")