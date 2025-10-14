# /docs/docs-api/openai/openai-sora-2-image-to-video

来源: https://wavespeed.ai/docs/docs-api/openai/openai-sora-2-image-to-video

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Openai](/docs/docs-api/openai/openai-dall-e-2 "Openai")Openai Sora 2 Image To Video

# Openai Sora 2 Image To Video

Openai Sora 2 Image To Video

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/openai/sora-2/image-to-video)

OpenAI’s Sora 2 is new state of the art video and audio generation model. Building on the foundation of Sora, this new model introduces capabilities that have been difficult for prior video models to achieve– such as more accurate physics, sharper realism, synchronized audio, enhanced steerability, and an expanded stylistic range.

## Features[](#features)

# OpenAI Sora 2 — Image-to-Video

Turn a single reference image into a coherent video clip with synchronized audio. Built on Sora 2’s core advances, the image-to-video pipeline preserves identity, lighting, and composition while synthesizing believable motion and camera dynamics.

* * *

## Why it looks great[](#why-it-looks-great)

*   **Identity lock-in:** preserves faces, style, textures, and scene layout from the reference image.
*   **Parallax & depth hallucination:** infers 3D structure for convincing foreground/background separation.
*   **Physics-aware motion:** contact, inertia, and secondary motion (hair, cloth) behave naturally.
*   **Temporal consistency:** minimal flicker/ghosting with stable subject features across frames.
*   **Smart background extension:** clean inpainting beyond the original frame for wider moves.
*   **Cinematic camera moves:** subtle pans, push-ins, arcs, and handheld vibes without warping.
*   **Synchronized audio:** optional voice/ambience that matches on-screen action and pacing.
*   **Strong steerability:** prompt edits and controls (duration, fps, motion strength) produce predictable changes.

* * *

## How to Use[](#how-to-use)

1.  **Upload** a single reference image (PNG/JPEG).
2.  Add a short **prompt** for mood, motion style, or camera behavior.
3.  **Duration:** choose **4s**, **8s**, or **12s**.
4.  **Submit** the job; **preview** and **download** the result.

* * *

## Pricing[](#pricing)

Duration

Total ($)

4s

0.40

8s

0.80

12s

1.20

**Billing Rules:** Linear pricing at **$0.10/s**. Available durations are 4s, 8s, and 12s.

* * *

## Notes[](#notes)

*   Best results come from **high-resolution, clean** source images with clear subjects and lighting.
*   For big perspective shifts, start with **shorter durations** or lower motion strength, then iterate.
*   Ensure you own the rights to your image; outputs inherit input content constraints.
*   Please follow the user rules from **OpenAI**, you can find details in the reference: [What images are permitted and prohibited in Sora-2](https://medium.com/@social_18794/what-images-are-permitted-and-prohibited-in-sora-2-a91d2ccc873e)

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/openai/sora-2/image-to-video" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "duration": 4
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

image

string

Yes

\-

The image for generating the output.

prompt

string

Yes

\-

The positive prompt for the generation.

duration

integer

No

4

4, 8, 12

The duration of the generated video in seconds.

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

[Openai Sora](/docs/docs-api/openai/openai-sora "Openai Sora")[Openai Sora 2 Image To Video Pro](/docs/docs-api/openai/openai-sora-2-image-to-video-pro "Openai Sora 2 Image To Video Pro")