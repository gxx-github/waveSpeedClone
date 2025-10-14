# /docs/docs-api/wavespeed-ai/infinitetalk-video-to-video

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/infinitetalk-video-to-video

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Infinitetalk Video To Video

# Infinitetalk Video To Video

Infinitetalk Video To Video

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/infinitetalk/video-to-video)

InfiniteTalk is an audio-driven conversational AI video generation model. Create talking or singing videos from a single video and audio input. Our endpoint starts with $0.15 per 5 seconds (480p) or $0.3 per 5 seconds (720p) video generation and supports a maximum generation length of minutes.

## Features[](#features)

# InfiniteTalk Video-to-Video

## What is InfiniteTalk?[](#what-is-infinitetalk)

InfiniteTalk creates new videos by combining an input **silent video** and an **audio track**. It ensures precise lip synchronization while aligning head, face, and body movements with the audio. With optional masking and prompting, you can control which areas move and how the scene appears. The model also maintains visual identity for natural and consistent results.

## Why it looks great[](#why-it-looks-great)

*   **Accurate lip synchronization:** matches lip motion precisely to the audio.
*   **Full-body coherence:** aligns head pose, facial expressions, and posture with speech.
*   **Mask control:** optional mask images let you define which regions can move.
*   **Instruction following:** prompts can guide style, pose, or behavior.
*   **Identity preservation:** ensures consistent visual identity across all frames.

## Pricing[](#pricing)

Output Resolution

Cost per 5 seconds

Max Length

480p

$0.15

minutes

720p

$0.30

10 minutes

## Billing Rules[](#billing-rules)

*   Minimum charge: 5 seconds
*   Per-second rate = (price per 5 seconds) ÷ 5
*   Billed duration = video length in seconds (rounded up), with a 5-second minimum
*   Total cost = billed duration × per-second rate (by output resolution)

## How to Use[](#how-to-use)

1.  Upload the **audio file**.
2.  Upload a video as the base.
3.  (Optional) Upload a **mask image** to control which regions can move.
4.  (Optional) Write a **prompt** to guide the style, pose, or expressions.
5.  Select the **output resolution (480p or 720p)**.
6.  Set the **seed** if you want reproducibility.
7.  Submit the job and download the generated video.

## Note[](#note)

*   Max clip length per job: **10 minutes**
*   Processing speed: ~**10–30 seconds** of wall time per 1 second of video (varies by resolution and queue load)

## More Versions[](#more-versions)

*   [Single-character version](https://wavespeed.ai/models/wavespeed-ai/infinitetalk)
*   [Multi-character version](https://wavespeed.ai/models/wavespeed-ai/infinitetalk/multi)

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/infinitetalk/video-to-video" \
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

video

string

Yes

\-

The video for generating the output.

mask\_image

string

No

\-

Optional mask image to specify the person in the video to animate.

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

[Infinitetalk Multi](/docs/docs-api/wavespeed-ai/infinitetalk-multi "Infinitetalk Multi")[Instant Character](/docs/docs-api/wavespeed-ai/instant-character "Instant Character")