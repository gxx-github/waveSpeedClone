# /docs/docs-api/wavespeed-ai/flux-1-srpo-image-to-image

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/flux-1-srpo-image-to-image

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Flux 1 Srpo Image To Image

# Flux 1 Srpo Image To Image

Flux 1 Srpo Image To Image

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/flux-1-srpo/image-to-image)

FLUX.1 SRPO \[dev\] is a cutting-edge, 12-billion-parameter flow transformer designed to generate stunning, high-quality images from image with exceptional aesthetics. Perfect for both personal and commercial use.

## Features[](#features)

# flux-1-srpo/image-to-image

**FLUX.1 SRPO \[dev\]** is a **12-billion-parameter rectified flow transformer** designed to enhance and reimagine images with **exceptional clarity and aesthetic balance**. It excels at high-quality image restoration, upscaling, and stylization — producing sharp, detailed results suitable for both **personal** and **commercial** use.

* * *

## 🌟 Key Features[](#-key-features)

*   **Next-Generation Super-Resolution** Enhances image sharpness and texture detail while preserving natural color balance.
    
*   **Aesthetic Refinement** Improves visual composition and lighting consistency for art, portraits, and photography.
    
*   **Flexible Style Fidelity** Retains the original artistic tone or applies subtle enhancement depending on your prompt.
    
*   **Wide Format Support** Outputs in both **JPEG** and **PNG** for web, print, or design workflows.
    
*   **Developer-Friendly \[dev\] Build** Offers faster inference and adjustable parameters for integration and research testing.
    

* * *

## ⚙️ Capabilities[](#️-capabilities)

*   **Input:** Image (JPEG / PNG)
*   **Output:** Enhanced image (JPEG / PNG)
*   **Supported Tasks:** Super-resolution, refinement, detail recovery, aesthetic enhancement

* * *

## 💰 Pricing[](#-pricing)

Per image just need **$0.025** !!!

* * *

## 💡 Best Use Cases[](#-best-use-cases)

*   **Photography & Retouching** — Sharpen, restore, or elevate existing visuals.
*   **Design & Media Production** — Create polished assets for advertising and social content.
*   **AI Art Enhancement** — Refine outputs from generative models with smoother tones and richer detail.
*   **Commercial Print & Branding** — Prepare upscale, high-fidelity assets for professional production.

* * *

## 📝 Notes[](#-notes)

*   Clear, high-resolution inputs produce the best enhancement results.
*   For heavily stylized or low-detail images, subtle artifacts may appear.
*   Available output formats: **JPEG** or **PNG**.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/flux-1-srpo/image-to-image" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "strength": 0.8,
    "num_inference_steps": 28,
    "seed": -1,
    "guidance_scale": 3.5,
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

The image to generate an image from.

strength

number

No

0.8

0.00 ~ 1.00

Strength indicates extent to transform the reference image.

num\_inference\_steps

integer

No

28

1 ~ 50

The number of inference steps to perform.

seed

integer

No

\-1

\-1 ~ 2147483647

The random seed to use for the generation. -1 means a random seed will be used.

guidance\_scale

number

No

3.5

1.0 ~ 20.0

The guidance scale to use for the generation.

output\_format

string

No

jpeg

jpeg, png

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

[Flux 1 Srpo](/docs/docs-api/wavespeed-ai/flux-1-srpo "Flux 1 Srpo")[Flux 1.1 Pro](/docs/docs-api/wavespeed-ai/flux-1.1-pro "Flux 1.1 Pro")