# /docs/docs-api/openai/openai-sora-2-text-to-video

来源: https://wavespeed.ai/docs/docs-api/openai/openai-sora-2-text-to-video

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Openai](/docs/docs-api/openai/openai-dall-e-2 "Openai")Openai Sora 2 Text To Video

# Openai Sora 2 Text To Video

Openai Sora 2 Text To Video

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/openai/sora-2/text-to-video)

OpenAI’s Sora 2 is new state of the art video and audio generation model. Building on the foundation of Sora, this new model introduces capabilities that have been difficult for prior video models to achieve– such as more accurate physics, sharper realism, synchronized audio, enhanced steerability, and an expanded stylistic range.

## Features[](#features)

# OpenAI Sora 2 — Text-to-Video

Sora 2 is a state-of-the-art video+audio generator. It advances prior video models with more accurate physics, sharper realism, **synchronized audio**, stronger steerability, and a wider stylistic range—built on the original Sora foundation.

* * *

## Why it looks great[](#why-it-looks-great)

*   **Physics-aware motion:** learns contact, inertia, and momentum so objects move and collide believably.
*   **Temporal consistency:** stable identities, minimal flicker/ghosting, and clean frame-to-frame transitions.
*   **Synchronized audio:** lip-sync alignment, beat-aware cuts, and ambience that matches on-screen action.
*   **High-frequency detail:** preserves fine textures (skin, fabric, foliage) without plastic over-sharpening.
*   **Complex scene reasoning:** handles multiple subjects, occlusions, depth, and long camera moves coherently.
*   **Cinematic camera literacy:** natural pans, push-ins, and handheld vibes without warping or jelly-artifacts.
*   **Wide stylistic range:** from photoreal and documentary to anime, 3D, and illustrative aesthetics.
*   **Strong steerability:** responds predictably to prompt edits and control settings (duration, fps, motion strength).

* * *

## How to Use[](#how-to-use)

1.  **Prompt:** describe scene, style, camera, and audio cues.
2.  **Duration:** select **4s**, **8s**, or **12s**.
3.  **Submit:** start generation; preview and download when ready.

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

**Billing Rules:** Pricing scales linearly with duration (flat **$0.10/s**). Durations are fixed at 4s, 8s, or 12s.

* * *

## Note[](#note)

Please follow the user rules from OpenAI, you can find details in the reference: [What images are permitted and prohibited in Sora-2](https://medium.com/@social_18794/what-images-are-permitted-and-prohibited-in-sora-2-a91d2ccc873e)

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/openai/sora-2/text-to-video" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "size": "720*1280",
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

prompt

string

Yes

\-

The positive prompt for the generation.

size

string

No

720\*1280

720\*1280, 1280\*720

The size of the generated media in pixels (width\*height).

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

[Openai Sora 2 Image To Video Pro](/docs/docs-api/openai/openai-sora-2-image-to-video-pro "Openai Sora 2 Image To Video Pro")[Openai Sora 2 Text To Video Pro](/docs/docs-api/openai/openai-sora-2-text-to-video-pro "Openai Sora 2 Text To Video Pro")