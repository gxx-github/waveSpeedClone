# /docs/docs-api/wavespeed-ai/flux-dev-lora

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/flux-dev-lora

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Flux Dev LoRA

# Flux Dev LoRA

Flux Dev LoRA

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/flux-dev-lora)

Super fast endpoint for the FLUX.1 \[dev\] model with LoRA support, enabling rapid and high-quality image generation using pre-trained LoRA adaptations for personalization, specific styles, brand identities, and product-specific outputs.

## Features[](#features)

# Flux-dev-lora

**FLUX.1 \[dev\]** is a **12B parameter rectified flow transformer** for advanced **text-to-image generation**. It supports prompt-only generation as well as **image inpainting and LoRA customization**, making it a flexible tool for both research and creative workflows.

* * *

## Why it looks great[](#why-it-looks-great)

*   **High-quality output**: Cutting-edge visual fidelity, second only to _FLUX.1 \[pro\]_.
*   **Prompt alignment**: Strong competitive prompt following, rivaling closed-source alternatives.
*   **Efficient training**: Trained with **guidance distillation** for better speed-performance balance.
*   **Flexible editing**: Supports **image + mask editing**, **LoRA fine-tuning**, and **custom strength control**.
*   **Open weights**: Enables research, experimentation, and innovative creative pipelines.

* * *

## Limits and Performance[](#limits-and-performance)

*   **Max resolution**: up to **1536 × 1536 pixels**
    
*   **Optional inputs**:
    
    *   **image** (for img2img)
    *   **mask\_image** (for inpainting)
*   **LoRA support**: add multiple **.safetensors** with adjustable **scale**
    
*   **Inference controls**:
    
    *   **num\_inference\_steps** (default ~28)
    *   **guidance\_scale** (default ~3.5)
    *   **strength** (the strength of transform the reference image)
*   **Output format**: JPEG / PNG / WEBP
    
*   **Seed**: reproducibility (`-1` = random)
    

* * *

## Pricing[](#pricing)

Just **$0.015 per image** !!

* * *

## How to Use[](#how-to-use)

1.  **Write a prompt** — detailed scene + style (lighting, realism, mood).
    
2.  _(Optional)_ Upload an **image** to guide generation.
    
3.  _(Optional)_ Add a **mask image** for inpainting.
    
4.  Adjust parameters:
    
    *   **Strength** (the strength of transform the reference image).
    *   **LoRAs** (add path/URL + scale).
    *   **Size** (width & height, up to 1024×1024).
    *   **Inference steps** and **guidance scale**.
5.  Set **num\_images** (default 1).
    
6.  (Optional) Fix **seed** for reproducibility.
    
7.  Choose **output format** and run.
    

* * *

## Pro tips[](#pro-tips)

*   Use **higher inference steps** for more detail, lower for speed.
*   Adjust **guidance scale** to balance prompt strength vs. creativity (3–7 recommended).
*   Apply **mask + strength** for clean local edits (inpainting).
*   Blend multiple **LoRAs** for hybrid style outputs.
*   Use consistent **seeds** when testing parameter changes for controlled comparison.

* * *

## Notes[](#notes)

*   The **image URL** must be valid and accessible; otherwise, the job may fail.
*   For **mask\_image**, do not upload the original or unprocessed image directly — ensure the mask is correctly prepared.
*   **LoRA files** must be uploaded from trusted platforms and set to public access to be usable.
*   Parameters such as **num\_inference\_steps** (and others) directly affect runtime: the larger the value, the longer the generation will take.

* * *

## Reference[](#reference)

*   [Use your LoRA](https://wavespeed.ai/blog/posts/Stop-TrainingStart-Creating-Use-LoRA-on-WaveSpeedAI)
    
*   [Train your LoRA](https://wavespeed.ai/blog/posts/How-to-Train-Your-Own-LoRA-Model-Without-Coding)
    

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/flux-dev-lora" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "strength": 0.8,
    "loras": [
        {
            "path": "strangerzonehf/Flux-Super-Realism-LoRA",
            "scale": 1
        }
    ],
    "size": "1024*1024",
    "num_inference_steps": 28,
    "guidance_scale": 3.5,
    "num_images": 1,
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

No

\-

mask\_image

string

No

\-

The mask image tells the model where to generate new pixels (white) and where to preserve the original image (black). It acts as a stencil or guide for targeted image editing.

strength

number

No

0.8

0.00 ~ 1.00

Strength indicates extent to transform the reference image.

loras

array

No

max 4 items

List of LoRAs to apply (max 4).

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

size

string

No

1024\*1024

256 ~ 1536 per dimension

The size of the generated media in pixels (width\*height).

num\_inference\_steps

integer

No

28

1 ~ 50

The number of inference steps to perform.

guidance\_scale

number

No

3.5

0.0 ~ 20.0

The guidance scale to use for the generation.

num\_images

integer

No

1

1 ~ 4

The number of images to generate.

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

[Flux Dev](/docs/docs-api/wavespeed-ai/flux-dev "Flux Dev")[Flux Dev LoRA Trainer](/docs/docs-api/wavespeed-ai/flux-dev-lora-trainer "Flux Dev LoRA Trainer")