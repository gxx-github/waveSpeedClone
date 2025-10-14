# /docs/docs-api/wavespeed-ai/qwen-image-text-to-image

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/qwen-image-text-to-image

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Qwen Image Text To Image

# Qwen Image Text To Image

Qwen Image Text To Image

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/qwen-image/text-to-image)

Qwen-Image — a 20B MMDiT model for next-gen text-to-image generation.

## Features[](#features)

# Qwen-Image (Text-to-Image)

Qwen-Image is a **20B MMDiT-based text-to-image generation model**, especially strong at **native text rendering** in both English and Chinese. It is a powerful creative tool for posters, comics, and visual storytelling, while also excelling at general image generation from photorealism to anime.

* * *

## Why it looks great[](#why-it-looks-great)

*   **SOTA text rendering**: Rivals GPT-4o in English and **best-in-class for Chinese**.
*   **In-pixel text generation**: Text is fully integrated into the image (no overlays).
*   **Bilingual typography**: Handles diverse fonts, styles, and complex layouts.
*   **General image capability**: Excels across styles—photorealistic, anime, impressionist, minimalist.

* * *

## Limits and Performance[](#limits-and-performance)

*   **Max resolution per job**: up to **1536 × 1536 pixels**
*   **Custom size**: manually set width & height
*   **Output formats**: JPEG / PNG / WEBP
*   **Processing speed**: ~**5–8 seconds per image** (depends on size & queue)
*   **Input prompt**: supports detailed, multi-line descriptions

* * *

## Price[](#price)

Only **$0.02** per image!!!

* * *

## How to Use[](#how-to-use)

1.  Write a **prompt** describing the image (can include embedded text).
2.  Adjust **size** (width & height, up to 1536×1536).
3.  Set a **seed** for reproducibility.
4.  Choose **output\_format**.
5.  Run the job and download the generated image.

* * *

## Pro tips for best quality[](#pro-tips-for-best-quality)

*   For **poster design**, explicitly describe font style, placement, and mood.
*   For **bilingual text**, specify both Chinese and English in the prompt.
*   Use **consistent seeds** to regenerate similar layouts with slight variations.
*   Keep **height:width ratio** balanced for best typography results.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/qwen-image/text-to-image" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "size": "1024*1024",
    "seed": -1,
    "output_format": "jpeg",
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

[Qwen Image LoRA Trainer](/docs/docs-api/wavespeed-ai/qwen-image-lora-trainer "Qwen Image LoRA Trainer")[Qwen Image Text To Image LoRA](/docs/docs-api/wavespeed-ai/qwen-image-text-to-image-lora "Qwen Image Text To Image LoRA")