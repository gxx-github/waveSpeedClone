# /docs/docs-api/wavespeed-ai/hunyuan-video-foley

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/hunyuan-video-foley

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Hunyuan Video Foley

# Hunyuan Video Foley

Hunyuan Video Foley

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/hunyuan-video-foley)

Upload a video and provide a text description to generate realistic audio.

## Features[](#features)

# HunyuanVideo-Foley

## What is HunyuanVideo-Foley?[](#what-is-hunyuanvideo-foley)

**HunyuanVideo-Foley** is Tencent Hunyuan’s video-to-audio model that synthesizes realistic Foley and ambient sound directly from video. It aligns on-screen actions and scene context to produce timing-accurate, high-quality audio tracks.

## Why this?[](#why-this)

Traditional audio generators struggle with **generalization**, **semantic alignment**, and **clean quality**. HunyuanVideo-Foley addresses these pain points head-on.

## What it can do[](#what-it-can-do)

*   **Multi-scene synchronization** – High-quality audio aligned to complex, fast-cut visuals.
*   **Multi-modal balance** – Blends visual cues with optional text prompts for intent-aware sound.
*   **48 kHz hi-fi output** – Professional clarity with low noise and artifacts.
*   **SOTA performance** – Leading results in fidelity, sync, and semantic alignment benchmarks.

## From short clips to cinematic cuts[](#from-short-clips-to-cinematic-cuts)

Whether you’re polishing a social clip or finishing an animated short, HunyuanVideo-Foley can help with you.

**Example (ASMR):**

*   **Silent video description:** close-up of hands slicing fresh kiwi on a wooden board; crisp macro textures; soft natural light.
*   **Text prompt:** Generate realistic kiwi cutting and peeling sounds; gentle tapping; calm ASMR ambience.

## Designed for[](#designed-for)

*   **Post & Studios** – Fast Foley passes for animatics, rough cuts, and indie films.
*   **Creators & Social Teams** – Auto-sound shorts/reels with consistent timing.
*   **Education & Prototyping** – Demonstrate AV alignment or test sound design ideas quickly.

## How to Use (HunyuanVideo-Foley)[](#how-to-use-hunyuanvideo-foley)

1.  **Upload video** _(required)_ – Add the silent (or low-sound) clip you want to sound.
    
2.  **Write prompt** _(optional)_ – Briefly describe the mood or key sounds, e.g.
    
    *   Rainy street ambience, soft footsteps, distant cars.
    *   Kitchen ASMR: chopping vegetables, sizzling pan.
3.  **Set seed** – use a fixed number to reproduce the same result; change it for variants.
    
4.  **Run** – Click **Run** (the button shows the cost).
    
5.  **Review & iterate** – If timing or tone isn’t right, tweak the prompt or seed and run again.
    

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/hunyuan-video-foley" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "seed": -1
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

video

string

Yes

\-

The video for generating the output.

prompt

string

No

\-

The positive prompt for the generation.

seed

integer

No

\-1

\-1 ~ 2147483647

The random seed to use for the generation. -1 means a random seed will be used.

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

[Hunyuan Image 3](/docs/docs-api/wavespeed-ai/hunyuan-image-3 "Hunyuan Image 3")[Hunyuan Video I2V](/docs/docs-api/wavespeed-ai/hunyuan-video-i2v "Hunyuan Video I2V")