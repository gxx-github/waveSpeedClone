# /docs/docs-api/kwaivgi/kwaivgi-kling-v2.1-t2v-master

来源: https://wavespeed.ai/docs/docs-api/kwaivgi/kwaivgi-kling-v2.1-t2v-master

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Kwaivgi](/docs/docs-api/kwaivgi/kwaivgi-kling-effects "Kwaivgi")Kwaivgi Kling V2.1 T2V Master

# Kwaivgi Kling V2.1 T2V Master

Kwaivgi Kling V2.1 T2V Master

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/kwaivgi/kling-v2.1-t2v-master)

Kling v2.1 is the latest evolution of Kuaishou’s AI-powered video‑generation model, designed to seamlessly create short, cinematic‑quality clips (typically 5–10 s at 720p or 1080p) from a single image or a text prompt. It represents a major leap forward from Kling 2.0, emphasizing motion fidelity, visual coherence, and prompt accuracy .

## Features[](#features)

# Kling v2.1

**Kling v2.1** is an AI video generation model developed by **KlingAI (Kuaishou)**. It is purpose-built for creators, artists, and production teams seeking fast, realistic video generation from image and text prompts. Ideal for rapid prototyping, rough drafts, and creative iteration, it balances performance with affordability—while maintaining high-quality motion dynamics and visual coherence.

* * *

## 🔍 Overview[](#-overview)

Kling 2.1 leverages 3D spatiotemporal attention, advanced motion synthesis, and cinematic camera simulation to transform static inputs into dynamic, photorealistic video clips. The **i2v-standard** variant provides a lightweight version for scalable generation tasks without sacrificing essential quality.

* * *

## ✨ Key Features[](#-key-features)

*   **Smooth Motion**
    
    *   Advanced stabilization techniques ensure jitter-free movement across frames, even during complex sequences.
*   **High-Fidelity Rendering**
    
    *   Realistic modeling of skin, fluids, materials, and reflections to preserve physical consistency.
*   **Prompt Understanding**
    
    *   Enhanced context-aware interpretation of complex actions, camera directives, and stylistic cues.
*   **Camera Control**
    
    *   Supports cinematic moves like dolly zooms, panning, and programmable motion paths for enhanced visual storytelling.

* * *

## 🎯 Use Cases[](#-use-cases)

*   **Short-Form Video Production**
    
    *   Generate fast and engaging clips for TikTok, YouTube Shorts, Instagram Reels, etc.
*   **Storyboarding and Previsualization**
    
    *   Create visual drafts for films, ads, or animation projects with dynamic composition.
*   **Promotional Content**
    
    *   High-resolution marketing videos for commercial brands or product showcases.
*   **Artistic Video Creation**
    
    *   Stylized, experimental outputs suitable for NFTs, video art, and immersive storytelling.
*   **Game and Simulation Previews**
    
    *   Generate scene previews for virtual environments and narrative cutscenes in game development.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/kwaivgi/kling-v2.1-t2v-master" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "aspect_ratio": "16:9",
    "duration": 5,
    "guidance_scale": 0.5
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

aspect\_ratio

string

No

16:9

16:9, 9:16, 1:1

The aspect ratio of the generated media.

duration

integer

No

5

5, 10

The duration of the generated media in seconds.

guidance\_scale

number

No

0.5

0.0 ~ 1.0

The guidance scale to use for the generation.

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

[Kwaivgi Kling V2.1 I2V Standard](/docs/docs-api/kwaivgi/kwaivgi-kling-v2.1-i2v-standard "Kwaivgi Kling V2.1 I2V Standard")[Kwaivgi Kling V2.5 Turbo Pro Image To Video](/docs/docs-api/kwaivgi/kwaivgi-kling-v2.5-turbo-pro-image-to-video "Kwaivgi Kling V2.5 Turbo Pro Image To Video")