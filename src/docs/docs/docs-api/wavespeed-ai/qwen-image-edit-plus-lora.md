# /docs/docs-api/wavespeed-ai/qwen-image-edit-plus-lora

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/qwen-image-edit-plus-lora

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Qwen Image Edit Plus LoRA

# Qwen Image Edit Plus LoRA

Qwen Image Edit Plus LoRA

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/qwen-image/edit-plus-lora)

Qwen-Image-Edit-Plus — a 20B MMDiT model for next-gen image edit generation with improved multi-image editing, single-image consistency, and native support for ControlNet.

## Features[](#features)

# Qwen-Image-Edit-Plus-LoRA

A next-gen image editing model built on **Qwen-Image 20B**. It delivers precise **bilingual (Chinese & English) text editing**, supports both **appearance-level** and **semantic-level** edits, and preserves the original style.

* * *

## Why choose this?[](#why-choose-this)

*   **Dual-mode editing**
    
    *   **Appearance editing**: add/remove/modify elements while keeping all other regions pixel-accurate and unchanged.
    *   **Semantic editing**: higher-level changes—IP creation, pose/rotation, style transfer—allow global pixel updates while keeping semantic intent.
*   **Precise text editing (CN/EN)** Edit on-image text directly (add/delete/replace) while retaining the original **font, size, kerning, and style**.
    
*   **Style preservation** Maintains palette, lighting, brushwork, and overall look even under substantial edits.
    
*   **Strong benchmark results** Evaluated across multiple public editing benchmarks with **state-of-the-art** performance.
    

* * *

## Designed for[](#designed-for)

*   **Design & Marketing teams** – Rapid visual iterations, brand-safe edits, and multilingual comps.
*   **E-commerce & Social** – Clean product touch-ups, quick hero swaps, localized text.
*   **Creators & Studios** – Concepting, IP style moves, pose/angle changes without repainting.

* * *

## Pricing[](#pricing)

Just **$0.025** per image !!!

* * *

## How to use[](#how-to-use)

1.  Enter a prompt (supports detailed narrative & embedded text).
2.  Upload images. (Up to 3 images)
3.  Set size (width & height, up to 1536×1536).
4.  Add one or more LoRAs (Up to 3):
    *   Paste the path/URL of the LoRA .safetensors file.
    *   Adjust the scale (e.g., 0.5 for subtle effect, 1.0 for full strength).
5.  (Optional) Set seed for reproducibility.
6.  Choose output format (JPEG / PNG / WEBP).
7.  Run → preview results → iterate with different LoRA scales.

### How to use LoRA?[](#how-to-use-lora)

*   Please refer to the following article: [Use your LoRA](/docs/docs-api/wavespeed-ai/wavespeed-ai/qwen-image/edit-plus-lora)

* * *

## Note[](#note)

If you did not upload the image locally, please ensure that the image URL is accessible! A successfully accessible image will display a preview in the interface.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/qwen-image/edit-plus-lora" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "loras": [],
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

loras

array

No

max 3 items

List of LoRAs to apply (maximum 3).

loras\[\].path

string

Yes

\-

Path to the LoRA model

loras\[\].scale

float

Yes

\-

0.0 ~ 4.0

Scale of the LoRA model

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

[Qwen Image Edit Plus](/docs/docs-api/wavespeed-ai/qwen-image-edit-plus "Qwen Image Edit Plus")[Qwen Image LoRA Trainer](/docs/docs-api/wavespeed-ai/qwen-image-lora-trainer "Qwen Image LoRA Trainer")