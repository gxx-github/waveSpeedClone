# /docs/docs-api/bytedance/bytedance-seedance-v1-pro-t2v-480p

来源: https://wavespeed.ai/docs/docs-api/bytedance/bytedance-seedance-v1-pro-t2v-480p

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Bytedance](/docs/docs-api/bytedance/bytedance-avatar-omni-human "Bytedance")Bytedance Seedance V1 Pro T2V 480p

# Bytedance Seedance V1 Pro T2V 480p

Bytedance Seedance V1 Pro T2V 480p

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/bytedance/seedance-v1-pro-t2v-480p)

ByteDance Seedance is an advanced AI video model that excels in coherent multi-shot video generation. It can deliver smooth, stable motion, and accurately follow detailed prompts for complex video content.

## Features[](#features)

# ByteDance Seedance V1 Pro (T2V - 480p)

**bytedance/seedance-v1-pro-t2v-480p** is a text-to-video generation model by ByteDance. It transforms written prompts into dynamic short-form videos with controllable aspect ratios, camera settings, and reproducible seeds. Designed for creators, it offers **cinematic quality** at **affordable pricing**.

## Why it looks great[](#why-it-looks-great)

*   **Text-to-video fidelity:** interprets prompts into coherent, cinematic video scenes.
*   **Dynamic motion range:** Wide dynamic range supporting both subtle and large-scale movements.
*   **Physical realism & stability:** Maintains physical realism and stability across motion sequences.
*   **Complex interactions:** Handles complex action sequences and multi-agent interactions.

## Limits and Performance[](#limits-and-performance)

*   **Output resolution:** 480p
*   **Duration options:** **5 seconds** or **10 seconds**
*   **Processing speed:** ~**20–60 seconds wall time per clip** (varies by prompt complexity and queue load)

## Pricing[](#pricing)

Duration

Cost per job

5 seconds

$0.15

10 seconds

$0.30

### Billing Rules[](#billing-rules)

*   **Minimum charge:** 5 seconds
*   **Per-second rate** = (price per 5 seconds) ÷ 5
*   **Billed duration** = video length in seconds (rounded up), with a 5-second minimum
*   **Total cost** = billed duration × per-second rate (by output resolution)

## How to Use[](#how-to-use)

1.  Write a **prompt** describing the scene, subject, and motion.
2.  Select **aspect\_ratio**: like 16:9, 9:16, or 1:1.
3.  Choose **duration** (5s or 10s).
4.  (Optional) Enable **camera\_fixed** for a locked viewpoint.
5.  (Optional) Set a **seed** for reproducibility.
6.  Submit the job and download your generated video.

## Pro tips for best quality[](#pro-tips-for-best-quality)

*   Use detailed prompts with cinematic language (lighting, angles, dynamics).
*   Pick aspect ratio according to publishing platform (**9:16** for TikTok/shorts, **16:9** for YouTube).
*   Start with **5s runs** for fast iteration; expand to 10s for final sequences.
*   Use **camera\_fixed** for product showcases, interviews, or static shots.
*   Keep seeds fixed if you need consistent multi-shot content.

## Use Cases[](#use-cases)

*   Creative video content generation
*   Prototype development for film and animation
*   Commercial video production
*   Educational and documentary content
*   Fantasy and surreal video creation

## Notes[](#notes)

*   Performance metrics based on specific benchmark datasets
*   Actual generation quality may vary with prompt complexity
*   Multi-shot consistency depends on prompt clarity and scene descriptions

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/bytedance/seedance-v1-pro-t2v-480p" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "aspect_ratio": "16:9",
    "duration": 5,
    "camera_fixed": false,
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

aspect\_ratio

string

No

16:9

21:9, 16:9, 4:3, 1:1, 3:4, 9:16, 9:21

The aspect ratio of the generated media.

duration

integer

No

5

5 ~ 10

The duration of the generated media in seconds.

camera\_fixed

boolean

No

false

\-

Whether to fix the camera position.

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

[Bytedance Seedance V1 Pro T2V 1080p](/docs/docs-api/bytedance/bytedance-seedance-v1-pro-t2v-1080p "Bytedance Seedance V1 Pro T2V 1080p")[Bytedance Seedance V1 Pro T2V 720p](/docs/docs-api/bytedance/bytedance-seedance-v1-pro-t2v-720p "Bytedance Seedance V1 Pro T2V 720p")