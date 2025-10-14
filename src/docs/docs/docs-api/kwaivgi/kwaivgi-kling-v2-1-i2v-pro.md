# /docs/docs-api/kwaivgi/kwaivgi-kling-v2.1-i2v-pro

来源: https://wavespeed.ai/docs/docs-api/kwaivgi/kwaivgi-kling-v2.1-i2v-pro

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Kwaivgi](/docs/docs-api/kwaivgi/kwaivgi-kling-effects "Kwaivgi")Kwaivgi Kling V2.1 I2V Pro

# Kwaivgi Kling V2.1 I2V Pro

Kwaivgi Kling V2.1 I2V Pro

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/kwaivgi/kling-v2.1-i2v-pro)

Kling 2.1 Pro is an advanced endpoint for the Kling 2.1 model, offering professional-grade videos with enhanced visual fidelity, precise camera movements, and dynamic motion control, perfect for cinematic storytelling.

## Features[](#features)

# Kling 2.1 Pro

**Kling 2.1 Pro** is a high-end extension of the Kling 2.1 image-to-video model, designed for professional creators seeking cinematic quality and control.

## 🎥 Key Features[](#-key-features)

*   **Enhanced Visual Fidelity**  
    Delivers sharper details, refined lighting, and more realistic rendering.
    
*   **Precise Camera Movements**  
    Supports complex tracking, dolly, pan, and zoom effects for narrative depth.
    
*   **Dynamic Motion Control**  
    Allows fine-tuned control over character and object motion for high-impact storytelling.
    

## 🎬 Use Case[](#-use-case)

Perfect for creators, filmmakers, and studios aiming to generate cinematic sequences from images and prompts with a high degree of realism and directorial control.

* * *

**Kling 2.1 Pro** brings professional-grade visual storytelling to the next generation of generative video.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/kwaivgi/kling-v2.1-i2v-pro" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "guidance_scale": 0.5,
    "duration": 5
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

negative\_prompt

string

No

\-

The negative prompt for the generation.

image

string

Yes

\-

First frame of the video; Supported image formats include.jpg/.jpeg/.png; The image file size cannot exceed 10MB, and the image resolution should not be less than 300\*300px.

guidance\_scale

number

No

0.5

0.00 ~ 1.00

The guidance scale to use for the generation.

duration

integer

No

5

5, 10

The duration of the generated media in seconds.

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

[Kwaivgi Kling V2.1 I2V Master](/docs/docs-api/kwaivgi/kwaivgi-kling-v2.1-i2v-master "Kwaivgi Kling V2.1 I2V Master")[Kwaivgi Kling V2.1 I2V Pro Start End Frame](/docs/docs-api/kwaivgi/kwaivgi-kling-v2.1-i2v-pro-start-end-frame "Kwaivgi Kling V2.1 I2V Pro Start End Frame")