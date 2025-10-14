# /docs/docs-api/wavespeed-ai/video-watermark-remover

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/video-watermark-remover

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Video Watermark Remover

# Video Watermark Remover

Video Watermark Remover

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/video-watermark-remover)

The AI Video Watermark Remover is our flagship model designed to remove Sora 2 watermarks, logos, captions, and unwanted text from videos without compromising quality. Supporting a wide range of formats, it’s fast, efficient, and processes with the highest quality. Whether your video is a few seconds or several minutes long, we can handle it all. Our endpoint starts with $0.05 per 5 seconds video and supports a maximum video duration of 10 minutes.

## Features[](#features)

# AI Video Watermark Remover

Remove **Sora 2 watermarks**, logos, captions, lower-thirds, and other unwanted on-screen text—while preserving the original look of your footage. Upload your video and get a clean result with minimal artifacts. If you need upscaling instead, try our [AI Video Upscaler](https://wavespeed.ai/models/wavespeed-ai/video-upscaler). No local setup required!

## Why it looks great[](#why-it-looks-great)

*   **Temporal-aware inpainting:** avoids flicker, keeps motion stable across frames.
*   **Clean plate reconstruction:** rebuilds occluded details (textures, grain, lighting) beneath watermarks and captions.
*   **Smart text/logo targeting:** robust to semi-transparent overlays, moving corner bugs, ticker bars, and burned-in subs.
*   **Edge & texture fidelity:** preserves edges and fine detail without smearing or over-smoothing.
*   **Adaptive masking:** optional user hints accelerate and improve results on complex, fast-moving overlays.

## Limits and Performance[](#limits-and-performance)

*   **Max clip length per job:** up to **10 minutes**
*   **Processing speed:** approximately **5–20 seconds** of wall time to process **1 second** of video (varies by overlay complexity, resolution, and queue load)

## Pricing[](#pricing)

Per-second billing with a **5-second minimum**. The table below lists prices per **5 seconds** for easy comparison.

Task

Cost per 5 seconds

Watermark Removal

**$0.05**

### Billing Rules[](#billing-rules)

*   **Minimum charge:** 5 seconds
*   **Per-second rate** = (price per 5 seconds) ÷ 5
*   **Billed duration** = video length in seconds (rounded up), with a 5-second minimum
*   **Total cost** = billed duration × per-second rate

## How to Use[](#how-to-use)

2.  **Upload video:** Upload the video you want to deal with.
3.  **Submit the job:** Click the Run button.
4.  **Preview & download:** review the cleaned clip and download it.

## Notes[](#notes)

*   Longer videos will require **longer processing times**.
*   Please ensure your video **upload format and URL** are correct.
*   The price displayed on the “Run” button is only an estimated reference; the final, accurate price will be based on the actual deduction.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/video-watermark-remover" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{}'

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

[Video Upscaler Pro](/docs/docs-api/wavespeed-ai/video-upscaler-pro "Video Upscaler Pro")[Wan 2.1 14b LoRA Trainer](/docs/docs-api/wavespeed-ai/wan-2.1-14b-lora-trainer "Wan 2.1 14b LoRA Trainer")