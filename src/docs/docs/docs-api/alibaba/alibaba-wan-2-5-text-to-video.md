# /docs/docs-api/alibaba/alibaba-wan-2.5-text-to-video

来源: https://wavespeed.ai/docs/docs-api/alibaba/alibaba-wan-2.5-text-to-video

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Alibaba](/docs/docs-api/alibaba/alibaba-qwen-image-translate "Alibaba")Alibaba Wan 2.5 Text To Video

# Alibaba Wan 2.5 Text To Video

Alibaba Wan 2.5 Text To Video

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/alibaba/wan-2.5/text-to-video)

Alibaba WAN 2.5 is a state-of-the-art text/image-to-video generation model available on Alibaba Cloud’s DashScope platform. This powerful model produces high-quality videos in 480p, 720p, or 1080p resolution, complete with synchronized audio, from simple text or image prompts. Compared to Google Veo3, it offers a more affordable solution with faster video generation speeds, making it an excellent choice for creating audio-embedded videos efficiently.

## Features[](#features)

# Alibaba WAN 2.5 Text-to-Video Model

**Alibaba WAN 2.5** is an advanced text-to-video model provided by Alibaba Cloud’s DashScope platform. This model generates high-quality **480p/720p/1080p** videos from text prompts.

## What makes it stand out?[](#what-makes-it-stand-out)

*   **More affordable:** Wan 2.5 is more streamlined and cost-effective - reducing creator expenses and offering more options.
*   **One-pass A/V sync:** Wan 2.5 creates a fully synchronized video (audio/voiceover + lip-sync) from a single, well-structured prompt - no separate recording or manual alignment required.
*   **Multilingual friendly:** Wan 2.5 reliably processes like Chinese prompts for A/V-synced videos.
*   **Longer duration & more video size options:** Wan 2.5 delivers up to 10 seconds and 6 aspect/size options, enabling more storytelling room and publishing flexibility.
*   **Custom Voice:** Add your own audio or let the model generate one for you. Plug-and-play, easy to swap!

## Designed For[](#designed-for)

*   **Marketing teams:** Fast, polished demos/tutorials—low cost, consistent style.
*   **Global enterprises:** Multilingual, lip-synced videos with subtitles for efficient localization.
*   **Storytellers & YouTubers:** Immersive narratives while maintaining cadence and quality—driving growth.
*   **Corporate training teams:** HD videos over docs—clearer key points, better communication.

## Pricing[](#pricing)

The table below lists prices for easy comparsion.

Output Resolution

Duration (5s)

Duration (10s)

480p

$0.25

$0.50

720p

$0.50

$1.00

1080p

$0.75

$1.50

### Billing Rules[](#billing-rules)

*   **Minimum charge:** 5 seconds
*   **Per-second rate** = (price per 5 seconds) ÷ 5
*   **Billed duration** = video length in seconds (rounded up), with a 5-second minimum
*   **Total cost** = billed duration × per-second rate (by output resolution)

## How to Use[](#how-to-use)

1.  Write your prompt.
2.  Upload an audio file (optional) for voice/music.
3.  Choose the video size (resolution/aspect).
4.  Select the video duration (e.g., 5s / 10s).
5.  Submit and wait for processing.
6.  Preview and download the result.

## Note[](#note)

**Audio limits**

*   **Formats:** `wav`, `mp3`
*   **Length:** **3–30 seconds**
*   **File size:** **≤ 15 MB**

**Over-limit handling**

*   If the audio **exceeds** the target `duration` (5s or 10s), the model **keeps only the first 5s/10s**; the rest is discarded.
*   If the audio is **shorter** than the video duration, the **extra video part is silent**.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/alibaba/wan-2.5/text-to-video" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "size": "1280*720",
    "duration": 5,
    "enable_prompt_expansion": false,
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

audio

string

No

\-

\-

Audio URL to guide generation (optional). Audio: ≥3s WAV/MP3, ≤15 MB

size

string

No

1280\*720

832\*480, 480\*832, 1280\*720, 720\*1280, 1920\*1080, 1080\*1920

The size of the generated media in pixels (width\*height).

duration

integer

No

5

5, 10

The duration of the generated media in seconds.

enable\_prompt\_expansion

boolean

No

false

\-

If set to true, the prompt optimizer will be enabled.

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

[Alibaba Wan 2.5 Text To Image](/docs/docs-api/alibaba/alibaba-wan-2.5-text-to-image "Alibaba Wan 2.5 Text To Image")[Alibaba Wan 2.5 Text To Video Fast](/docs/docs-api/alibaba/alibaba-wan-2.5-text-to-video-fast "Alibaba Wan 2.5 Text To Video Fast")