# /docs/docs-api/wavespeed-ai/video-upscaler-pro

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/video-upscaler-pro

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Video Upscaler Pro

# Video Upscaler Pro

Video Upscaler Pro

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/video-upscaler-pro)

Are you frustrated by the Sora 2 watermark? Does the low resolution make it impossible to focus on your creative work? Try our Video Upscaler model! The AI Video Upscaler Pro is our flagship model, redefining video enhancement. This cutting-edge AI technology transforms low-resolution, low-quality videos into stunning 4K cinematic masterpieces with seamless motion dynamics and perfect frame consistency. Get ready for unparalleled video quality that outperforms all other AI upscalers.

## Features[](#features)

# Video Upscaler Pro

Upscale videos to 720p, 1080p, 2K, or 4K with a simple upload. **This is the most advanced video upscaler in the world**, delivering the highest output quality and exceptional frame-to-frame consistency. If you want a cheaper option, try our [Standard Video Upscaler](https://wavespeed.ai/models/wavespeed-ai/video-upscaler) instead. No local setup required. Also, for Sora-2 wartermark removing, try [Watermark Remover](https://wavespeed.ai/models/wavespeed-ai/video-watermark-remover)!

## Why it looks great[](#why-it-looks-great)

*   **Temporal consistency:** minimizes flicker and ghosting across frames for stable motion.
*   **Detail reconstruction:** restores fine textures (hair, fabric, foliage) and sharp edges without over-sharpening.
*   **Artifact cleanup:** reduces compression blocks, ringing, and shimmering in challenging shots.
*   **Motion-aware upscaling:** preserves fast action and camera pans with fewer motion artifacts.
*   **Natural look:** balances perceptual quality with crispness to avoid plastic or overprocessed outputs.

## Limits and Performance[](#limits-and-performance)

*   **Max clip length per job:** up to 10 minutes
*   **Processing speed:** approximately 10–30 seconds of wall time to process 1 second of video (varies by resolution and queue load)

## Pricing[](#pricing)

Per-second billing with a 5-second minimum. The table below lists prices per 5 seconds for easy comparison.

Output Resolution

Cost per 5 seconds

720p

$0.10

1080p

$0.15

2K

$0.20

4K

$0.25

### Billing Rules[](#billing-rules)

*   **Minimum charge:** 5 seconds
*   **Per-second rate** = (price per 5 seconds) ÷ 5
*   **Billed duration** = video length in seconds (rounded up), with a 5-second minimum
*   **Total cost** = billed duration × per-second rate (by output resolution)

### Examples[](#examples)

*   3.2s @ 1080p → billed as 5s minimum → 5 × $0.03 = $0.15
*   12s @ 1080p → 12 × $0.03 = $0.36
*   23s @ 2K → per-second $0.04 → 23 × $0.04 = $0.92
*   2m01s (121s) @ 4K → per-second $0.05 → 121 × $0.05 = $6.05

## How to Use[](#how-to-use)

1.  Choose the target resolution and parameters.
2.  Upload your video (≤ 10 minutes).
3.  Submit the job and wait for processing.
4.  Preview and download the result.

## Pro tips for best quality[](#pro-tips-for-best-quality)

*   Upload the highest-quality source you have; avoid heavily compressed inputs when possible.
*   Keep original frame rate; avoid unnecessary re-encoding before upload.
*   Pick the lowest resolution that meets your delivery needs (1080p = speed/cost, 2K/4K = maximum detail).
*   For long videos, process in segments to parallelize and then merge.

## Notes[](#notes)

*   Actual processing time may vary based on resolution, model choice, and current queue.
*   For videos longer than 10 minutes, split into multiple segments, process separately, and merge afterward.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/video-upscaler-pro" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "target_resolution": "1080p"
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

The video to upscale.

target\_resolution

string

No

1080p

720p, 1080p, 2k, 4k

Target resolution to upscale to.

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

[Video Upscaler](/docs/docs-api/wavespeed-ai/video-upscaler "Video Upscaler")[Video Watermark Remover](/docs/docs-api/wavespeed-ai/video-watermark-remover "Video Watermark Remover")