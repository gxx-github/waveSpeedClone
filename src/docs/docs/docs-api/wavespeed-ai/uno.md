# /docs/docs-api/wavespeed-ai/uno

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/uno

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Uno

# Uno

Uno

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/uno)

An AI model that transforms input images into new ones based on text prompts, blending reference visuals with your creative directions.

## Features[](#features)

# UNO – Universal In‑Context Diffusion Transformer 📸

A powerful subject-driven image synthesis model (developed by ByteDance Research) enabling both **single-subject** and **multi-subject** image generation with high consistency and controllability using diffusion transformers.

## Implementation ✨[](#implementation-)

This model leverages a two-stage **progressive cross‑modal alignment** strategy, combined with **Universal Rotary Position Embedding (UnoPE)**:

1.  **Stage I**: Fine-tune a pretrained T2I (text-to-image) model using generated single-subject in-context data.
2.  **Stage II**: Further train on multi-subject paired data to support scenes with multiple specified subjects. :contentReference\[oaicite:1\]{index=1}

### Highlights:[](#highlights)

*   Built on **Diffusion Transformers (DiT)** with FLUX.1-dev backbone
*   UnoPE maintains subject identity and reduces confusion across multiple subjects :contentReference\[oaicite:2\]{index=2}
*   Input: 1–4 reference images + text prompt
*   Output: synthesized image reflecting consistent subject(s) in context

## Key Features[](#key-features)

*   ✅ **High-consistency, multi-subject generation**—preserves unique subject traits across images :contentReference\[oaicite:3\]{index=3}
*   🔁 **Single → multi subject scaling** via staged training
*   🔧 **Controllable layout** and reference identity handling
*   📐 Handles varying aspect ratios and resolutions (512–704px+) :contentReference\[oaicite:4\]{index=4}

## Predictions Examples 🌟[](#predictions-examples-)

*   Generating images of the same person in different settings
*   Placing multiple consistent products or characters in a single scene
*   Virtual try-on and identity-preserving e-commerce renders

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/uno" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "image_size": "square_hd",
    "num_images": 1,
    "num_inference_steps": 28,
    "guidance_scale": 3.5,
    "output_format": "jpeg"
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

images

array

Yes

\[\]

\-

URL of images to use while generating the image.

image\_size

string

No

square\_hd

square\_hd, square, portrait\_4\_3, portrait\_16\_9, landscape\_4\_3, landscape\_16\_9

The aspect ratio of the generated image.

prompt

string

Yes

\-

The positive prompt for the generation.

seed

integer

No

\-

\-1 ~ 2147483647

The random seed to use for the generation.

num\_images

integer

No

1

1 ~ 4

The number of images to generate.

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

1 ~ 20

The guidance scale to use for the generation.

output\_format

string

No

jpeg

jpeg, png

The format of the output image.

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

[Think Sound](/docs/docs-api/wavespeed-ai/think-sound "Think Sound")[Video Face Swap](/docs/docs-api/wavespeed-ai/video-face-swap "Video Face Swap")