# /docs/docs-api/wavespeed-ai/qwen-image-edit-lora

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/qwen-image-edit-lora

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Qwen Image Edit LoRA

# Qwen Image Edit LoRA

Qwen Image Edit LoRA

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/qwen-image/edit-lora)

Qwen-Image-Edit — a 20B MMDiT model for next-gen image edit generation. Built on 20B Qwen-Image, it brings precise bilingual text editing (Chinese & English) while preserving style, and supports both semantic and appearance-level editing.

## Features[](#features)

# Qwen-Image-Edit-LoRA

**Qwen-Image-Edit with LoRA** is a **20B MMDiT-based next-gen image editing model**, Built on 20B Qwen-Image, it brings precise bilingual text editing (Chinese & English) while preserving style, and supports both semantic and appearance-level editing.

* * *

## Key Features[](#key-features)

*   **Precise bilingual text editing:** Directly add, delete, or modify text in **Chinese or English**, while preserving font, size, kerning, and style.
    
*   **LoRA integration:** Import up to **3 external LoRA weights (.safetensors)**, each with its own blending scale, for tailored effects.
    
*   **Style preservation:** Maintains palette, lighting, and overall artistic intent even under substantial edits.
    
*   **SOTA benchmark results:** Achieves state-of-the-art performance across multiple public image editing benchmarks.
    

* * *

## Limits and Performance[](#limits-and-performance)

*   **Max resolution per job**: up to **1536 × 1536 pixels**
*   **Max LoRAs**: 3 per job (with individual scaling controls)
*   **Output formats**: JPEG / PNG / WEBP
*   **Processing speed**: ~**6–12 seconds per image**
*   **Input**: Requires **image + prompt** (can include editing instructions and/or text edits)

* * *

## Pricing[](#pricing)

*   **$0.025 per image**
*   Each generated image is billed individually.

* * *

## How to Use[](#how-to-use)

1.  Upload or paste a link to your **source image**.
    
2.  Write a **prompt** describing desired edits (appearance or semantic).
    
3.  (Optional) Add up to **3 LoRAs**:
    
    *   Provide LoRA path/URL.
    *   Adjust **scale** for each (0.1–1.0 recommended).
4.  Adjust **size** (width & height, up to 1536×1536).
    
5.  (Optional) Add a **seed** for reproducibility.
    
6.  Run the job → preview results → refine with prompt or LoRA scaling.
    

* * *

## Pro tips for best results[](#pro-tips-for-best-results)

*   Use **appearance editing** for clean local changes (e.g., shirt color).
*   Use **semantic editing** for creative/global changes (e.g., pose, style transfer).
*   For **text edits**, clearly specify text content + style in the prompt.
*   Combine LoRAs for hybrid results, but keep scale balanced (too high may distort).
*   Lock the **seed** when testing multiple LoRAs to compare effects consistently.

* * *

## Note[](#note)

*   If you did not upload the image locally, please ensure that the image URL is accessible! A successfully accessible image will display a preview in the interface.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/qwen-image/edit-lora" \
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

image

string

Yes

\-

The image to generate an image from.

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

[Qwen Image Edit](/docs/docs-api/wavespeed-ai/qwen-image-edit "Qwen Image Edit")[Qwen Image Edit Plus](/docs/docs-api/wavespeed-ai/qwen-image-edit-plus "Qwen Image Edit Plus")