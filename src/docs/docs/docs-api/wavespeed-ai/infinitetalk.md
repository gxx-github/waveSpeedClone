# /docs/docs-api/wavespeed-ai/infinitetalk

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/infinitetalk

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Infinitetalk

# Infinitetalk

Infinitetalk

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/infinitetalk)

InfiniteTalk is an audio-driven conversational AI video generation model. Create talking or singing videos from a single image and audio input. Our endpoint starts with $0.15 per 5 seconds (480p) or $0.3 per 5 seconds (720p) video generation and supports a maximum generation length of 10 minutes.

## Features[](#features)

# InfiniteTalk

## What is InfiniteTalk?[](#what-is-infinitetalk)

InfiniteTalk produces videos with precise lip sync, aligning the head, face, and body movements to the audio. It maintains identity across unlimited-length videos and also offers image-to-video generation, turning static photos into lively speaking or singing videos.

## Why it looks great[](#why-it-looks-great)

*   **Accurate lip synchronization:** aligns lip motion precisely with audio, preserving natural rhythm and pronunciation.
    
*   **Full-body coherence:** captures head movements, facial expressions, and posture changes beyond the lips.
    
*   **Identity preservation:** maintains consistent facial identity and visual style across frames.
    
*   **Image-to-video capability:** turns static photos into realistic speaking or singing videos.
    
*   **Instruction following:** accepts text prompts to control scene, pose, or behavior while syncing to audio.
    

## Pricing[](#pricing)

Output Resolution

Cost per 5 seconds

Max Length

480p

$0.15

10 minutes

720p

$0.30

10 minutes

## Billing Rules[](#billing-rules)

*   Minimum charge: 5 seconds
    
*   Per-second rate = (price per 5 seconds) ÷ 5
    
*   Billed duration = video length in seconds (rounded up), with a 5-second minimum
    
*   Total cost = billed duration × per-second rate (by output resolution)
    

## How to Use[](#how-to-use)

1.  Upload the **audio** file.
2.  Upload the **image** (the person to animate).
3.  (Optional) Upload a **mask\_image** to specify which regions can move.
4.  (Optional) Add a **prompt** to guide expression, style, or pose.
5.  Select the **resolution** (**480p** or **720p**).
6.  Set the **seed** (set a fixed number for reproducibility).
7.  Submit the job and download the result once it’s ready.

## Note[](#note)

*   Max clip length per job: up to **10 minutes**
*   Processing speed: approximately **10–30 seconds** of wall time per **1 second** of video (varies by resolution and queue load)

## More Versions[](#more-versions)

*   [Video-to-video version](https://wavespeed.ai/models/wavespeed-ai/infinitetalk/video-to-video)
*   [Multi-character version](https://wavespeed.ai/models/wavespeed-ai/infinitetalk/multi)

## Reference[](#reference)

*   [Build your own digital human](https://wavespeed.ai/blog/posts/create-an-ai-anchor-5-minutes)

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/infinitetalk" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "resolution": "480p",
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

audio

string

Yes

\-

\-

The audio for generating the output.

image

string

Yes

\-

The image for generating the output.

mask\_image

string

No

\-

Optional mask image to specify the person in the image to animate.

prompt

string

No

\-

The positive prompt for the generation.

resolution

string

No

480p

480p, 720p

The resolution of the output video.

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

[Imagen4](/docs/docs-api/wavespeed-ai/imagen4 "Imagen4")[Infinitetalk Multi](/docs/docs-api/wavespeed-ai/infinitetalk-multi "Infinitetalk Multi")