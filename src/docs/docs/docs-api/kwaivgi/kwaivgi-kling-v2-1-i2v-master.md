# /docs/docs-api/kwaivgi/kwaivgi-kling-v2.1-i2v-master

来源: https://wavespeed.ai/docs/docs-api/kwaivgi/kwaivgi-kling-v2.1-i2v-master

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Kwaivgi](/docs/docs-api/kwaivgi/kwaivgi-kling-effects "Kwaivgi")Kwaivgi Kling V2.1 I2V Master

# Kwaivgi Kling V2.1 I2V Master

Kwaivgi Kling V2.1 I2V Master

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/kwaivgi/kling-v2.1-i2v-master)

Kling 2.1 Master: The premium endpoint for Kling 2.1, designed for top-tier image-to-video generation with unparalleled motion fluidity, cinematic visuals, and exceptional prompt precision.

## Features[](#features)

# Kling 2.1

**Kling 2.1** is Kuaishou’s advanced image-to-video generation model released in 2025. Designed for high-fidelity cinematic output, Kling 2.1 transforms reference images — with optional text prompts — into visually rich, lifelike video clips.

## 🔧 Key Technology[](#-key-technology)

*   **3D Spatiotemporal Attention Architecture**  
    Enables realistic motion and coherent visual progression across frames.
    
*   **Real-World Physics Simulation**  
    Produces natural, fluid, and intricate character movements and scene dynamics.
    

## 🎬 Core Features[](#-core-features)

*   **Image-to-Video Transformation**  
    Generates cinematic sequences from static images, optionally guided by user text.
    
*   **AI-Assisted Prompting**  
    Offers intelligent prompt suggestions to help users craft effective input instructions.
    
*   **Multiple Video Variants**  
    Capable of producing diverse outputs from the same prompt for greater creative flexibility.
    

## 🚀 Performance[](#-performance)

Kling 2.1 marks a major leap over Kling 2.0 in:

*   **Visual Realism**
*   **Motion Coherence**
*   **Prompt Adherence**

In comparative evaluations, it rivals the quality of top-tier closed-source video generation models.

* * *

**Kling 2.1** sets a new benchmark for generative video, blending artistry, physics, and AI precision.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/kwaivgi/kling-v2.1-i2v-master" \
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

[Kwaivgi Kling V2.0 T2V Master](/docs/docs-api/kwaivgi/kwaivgi-kling-v2.0-t2v-master "Kwaivgi Kling V2.0 T2V Master")[Kwaivgi Kling V2.1 I2V Pro](/docs/docs-api/kwaivgi/kwaivgi-kling-v2.1-i2v-pro "Kwaivgi Kling V2.1 I2V Pro")