# /docs/docs-api/wavespeed-ai/qwen-image-edit-plus

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/qwen-image-edit-plus

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Qwen Image Edit Plus

# Qwen Image Edit Plus

Qwen Image Edit Plus

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/qwen-image/edit-plus)

Qwen-Image-Edit-Plus — a 20B MMDiT model for next-gen image edit generation with improved multi-image editing, single-image consistency, and native support for ControlNet.

## Features[](#features)

# Qwen-Image-Edit-Plus (20B, MMDiT)

A next-gen image editing model built on **Qwen-Image 20B**. It delivers precise **bilingual (Chinese & English) text editing**, supports both **appearance-level** and **semantic-level** edits, and preserves the original style.

## Why choose this?[](#why-choose-this)

*   **Dual-mode editing**
    
    *   **Appearance editing**: add/remove/modify elements while keeping all other regions pixel-accurate and unchanged.
    *   **Semantic editing**: higher-level changes—IP creation, pose/rotation, style transfer—allow global pixel updates while keeping semantic intent.
*   **Precise text editing (CN/EN)** Edit on-image text directly (add/delete/replace) while retaining the original **font, size, kerning, and style**.
    
*   **Style preservation** Maintains palette, lighting, brushwork, and overall look even under substantial edits.
    
*   **Strong benchmark results** Evaluated across multiple public editing benchmarks with **state-of-the-art** performance.
    

## Designed for[](#designed-for)

*   **Design & Marketing teams** – Rapid visual iterations, brand-safe edits, and multilingual comps.
*   **E-commerce & Social** – Clean product touch-ups, quick hero swaps, localized text.
*   **Creators & Studios** – Concepting, IP style moves, pose/angle changes without repainting.

## Example prompts[](#example-prompts)

*   **Appearance (CN)**: `在桌面右上角添加一杯拿铁，不改变其他区域。`
*   **Semantic (EN)**: `Turn the product into a cyberpunk style while keeping the brand logo and layout consistent.`
*   **Text edit (EN)**: `Replace the headline "Summer Sale" with "Autumn Sale" and keep the same font and size.`

## Pricing[](#pricing)

Just **$0.02** per image !!!

## How to use[](#how-to-use)

1.  Upload the source image.
2.  **Write the prompt** (Chinese or English).
3.  **Generate** — results arrive in moments.
4.  **Output Formats** - JPG / PNG / WEBP
5.  **Review & iterate** — keep the same **seed** for exact reproduction, or change it for A/B comparisons.

## Note[](#note)

If you did not upload the image locally, please ensure that the image URL is accessible! A successfully accessible image will display a preview in the interface.

## Recommended Resolutions[](#recommended-resolutions)

Aspect Ratio

Exact (W×H)

Exact Pixels

Rounded (W×H, ÷64)

Rounded Pixels

1:1

1448 × 1448

2,096,704

1408 × 1408

1,982,464

3:2

1773 × 1182

2,095,686

1728 × 1152

1,990,656

4:3

1672 × 1254

2,096,688

1664 × 1216

2,023,424

16:9

1936 × 1089

2,108,304

1920 × 1088

2,088,960

21:9

2212 × 948

2,096,976

2176 × 960

2,088,960

1:1

1024 × 1024

1,048,576

1024 × 1024

1,048,576

3:2

1254 × 836

1,048,344

1216 × 832

1,011,712

4:3

1182 × 887

1,048,434

1152 × 896

1,032,192

16:9

1365 × 768

1,048,320

1344 × 768

1,032,192

21:9

1564 × 670

1,047,880

1536 × 640

983,040

1:1

323 × 323

104,329

320 × 320

102,400

3:2

397 × 264

104,808

384 × 256

98,304

4:3

374 × 280

104,720

448 × 320

143,360

16:9

432 × 243

104,976

448 × 256

114,688

21:9

495 × 212

104,940

576 × 256

147,456

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/qwen-image/edit-plus" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
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

images

array

Yes

\[\]

\-

The images to edit. A maximum of 3 reference images can be uploaded.

size

string

No

\-

256 ~ 1536 per dimension

The size of the generated media in pixels (width\*height).

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

[Qwen Image Edit LoRA](/docs/docs-api/wavespeed-ai/qwen-image-edit-lora "Qwen Image Edit LoRA")[Qwen Image Edit Plus LoRA](/docs/docs-api/wavespeed-ai/qwen-image-edit-plus-lora "Qwen Image Edit Plus LoRA")