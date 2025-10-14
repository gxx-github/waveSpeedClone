# /docs/docs-api/wavespeed-ai/infinitetalk-multi

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/infinitetalk-multi

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Infinitetalk Multi

# Infinitetalk Multi

Infinitetalk Multi

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/infinitetalk/multi)

InfiniteTalk Multi is an audio-driven multi-character conversational AI video generation model. Create talking or singing videos from a single image and 2 audio inputs. Our endpoint starts with $0.15 per 5 seconds (480p) or $0.3 per 5 seconds (720p) video generation and supports a maximum generation length of 10 minutes.

## Features[](#features)

# InfiniteTalk Multi

## What is InfiniteTalk?[](#what-is-infinitetalk)

InfiniteTalk creates videos with accurate lip sync while matching head, face, and body movements to the audio. It maintains identity across unlimited-length videos and also allows image-to-video creation, transforming static photos into lively speaking or singing videos.

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

1.  Upload the **left and right** audio files.
2.  Upload your image (The image should clearly show **two people**).
3.  Select the speaking order (**left to right, right to left, or meanwhile**).
4.  Select the resolution (**480p or 720p**).
5.  Write the prompt if needed.
6.  Submit the job and download the results once they’re ready.

## Note[](#note)

*   Max clip length per job: up to **10 minutes**
    
*   Processing speed: approximately **10–30 seconds** of wall time per 1 second of video (varies by resolution and queue load)
    

## More Versions[](#more-versions)

*   [Video-to-video version](https://wavespeed.ai/models/wavespeed-ai/infinitetalk/video-to-video)
*   [Single-character version](https://wavespeed.ai/models/wavespeed-ai/infinitetalk)

## Reference[](#reference)

*   [Build your own digital human](https://wavespeed.ai/blog/posts/create-an-ai-anchor-5-minutes)

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/infinitetalk/multi" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "order": "meanwhile",
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

left\_audio

string

Yes

\-

\-

The audio of the persion on the left for generating the output.

right\_audio

string

Yes

\-

\-

The audio of the persion on the right for generating the output.

image

string

Yes

\-

The image for generating the output.

prompt

string

No

\-

The positive prompt for the generation.

order

string

No

meanwhile

meanwhile, left\_right, right\_left

The order of the two audio sources in the output video, "meanwhile" means both audio sources will play at the same time, "left\_right" means the left audio will play first then the right audio will play, "right\_left" means the right audio will play first then the left audio will play.

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

[Infinitetalk](/docs/docs-api/wavespeed-ai/infinitetalk "Infinitetalk")[Infinitetalk Video To Video](/docs/docs-api/wavespeed-ai/infinitetalk-video-to-video "Infinitetalk Video To Video")