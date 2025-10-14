# /docs/docs-api/wavespeed-ai/qwen-image-text-to-image-lora

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/qwen-image-text-to-image-lora

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Qwen Image Text To Image LoRA

# Qwen Image Text To Image LoRA

Qwen Image Text To Image LoRA

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/qwen-image/text-to-image-lora)

Qwen-Image LoRa — a 20B MMDiT model for next-gen text-to-image generation with LoRA.

## Features[](#features)

# Qwen-Image-LoRA

**Qwen-Image-LoRA** extends the base **20B MMDiT text-to-image model** by allowing users to plug in custom **LoRA weights** (.safetensors) for fine-tuned control over style, characters, or artistic domains. This makes it a versatile tool for creators who want both world-class text rendering and personalized generation.

* * *

## Why it looks great[](#why-it-looks-great)

*   **LoRA integration**: Import external `.safetensors` LoRA weights and control blending strength via `scale`.
*   **SOTA text rendering**: Rivals GPT-4o in English and is **best-in-class for Chinese** typography.
*   **In-pixel text generation**: Text is seamlessly integrated into images (no overlays).
*   **Bilingual support**: Handles Chinese & English with diverse fonts and complex layouts.
*   **General image excellence**: Photorealistic, anime, impressionist, or minimalist styles—all supported.

* * *

## Limits and Performance[](#limits-and-performance)

*   **Max resolution per job**: up to **1024 × 1024 pixels**
*   **LoRA path**: provide `<owner>/<model-name>` or external `.safetensors` URL
*   **LoRA scale**: adjustable strength (default = 1.0)
*   **Output formats**: JPEG / PNG / WEBP
*   **Processing speed**: ~**6–10 seconds per image**
*   **Input prompt**: supports multi-line descriptive text

* * *

## Pricing[](#pricing)

*   **$0.025 per image**
*   Each image is billed individually.

* * *

## How to Use[](#how-to-use)

1.  Enter a **prompt** (supports detailed narrative & embedded text).
    
2.  Set **size** (width & height, up to 1024×1024).
    
3.  Add one or more **LoRAs**:
    
    *   Paste the **path/URL** of the LoRA `.safetensors` file.
    *   Adjust the **scale** (e.g., `0.5` for subtle effect, `1.0` for full strength).
4.  (Optional) Set **seed** for reproducibility (`-1` = random).
    
5.  Choose output format (JPEG / PNG).
    
6.  Run → preview results → iterate with different LoRA scales.
    

* * *

## Pro tips for best quality[](#pro-tips-for-best-quality)

*   Use **specific LoRAs** for characters, art styles, or IP consistency.
*   Combine multiple LoRAs for hybrid results (e.g., anime + steampunk).
*   Adjust **scale** carefully—too high may distort, too low may fade.
*   Lock the **seed** to maintain subject consistency when swapping LoRAs.

* * *

## Reference[](#reference)

*   [Use your LoRA](https://wavespeed.ai/blog/posts/Stop-TrainingStart-Creating-Use-LoRA-on-WaveSpeedAI)
    
*   [Train your LoRA](https://wavespeed.ai/blog/posts/How-to-Train-Your-Own-LoRA-Model-Without-Coding)
    

* * *

## Note[](#note)

*   Please use [wavespeed-ai/qwen-image-lora-trainer](https://wavespeed.ai/models/wavespeed-ai/qwen-image-lora-trainer) to make sure your LoRA can use in this model!
*   Or the corresponding model from official platform! (Civitai or Hugging Face)

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/qwen-image/text-to-image-lora" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "size": "1024*1024",
    "loras": [],
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

[Qwen Image Text To Image](/docs/docs-api/wavespeed-ai/qwen-image-text-to-image "Qwen Image Text To Image")[Real Esrgan](/docs/docs-api/wavespeed-ai/real-esrgan "Real Esrgan")