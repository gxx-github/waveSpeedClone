# /docs/docs-api/wavespeed-ai/wan-flf2v

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/wan-flf2v

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Wan Flf2v

# Wan Flf2v

Wan Flf2v

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/wan-flf2v)

Wan-2.1 flf2v generates dynamic videos by intelligently bridging a given first frame to a desired end frame through smooth, coherent motion sequences.

## Features[](#features)

# Wan FLF2V

Wan FLF2V (First-Last Frame Video Generation) is an open-source video generation model developed by the Alibaba Tongyi Wanxiang team. Its open-source license is Apache 2.0. Users only need to provide two images as the starting and ending frames, and the model automatically generates intermediate transition frames, outputting a logically coherent and naturally flowing 720p high-definition video.

## Core Technical Highlights[](#core-technical-highlights)

*   Precise First-Last Frame Control: The matching rate of first and last frames reaches 98%, defining video boundaries through starting and ending scenes, intelligently filling intermediate dynamic changes to achieve scene transitions and object morphing effects.
*   Stable and Smooth Video Generation: Using CLIP semantic features and cross-attention mechanisms, the video jitter rate is reduced by 37% compared to similar models, ensuring natural and smooth transitions.
*   Multi-functional Creative Capabilities: Supports dynamic embedding of Chinese and English subtitles, generation of anime/realistic/fantasy and other styles, adapting to different creative needs.
*   720p HD Output: Directly generates 1280×720 resolution videos without post-processing, suitable for social media and commercial applications.
*   Open-source Ecosystem Support: Model weights, code, and training framework are fully open-sourced, supporting deployment on mainstream AI platforms.

# Technical Principles and Architecture

*   DiT Architecture: Based on diffusion models and Diffusion Transformer architecture, combined with Full Attention mechanism to optimize spatiotemporal dependency modeling, ensuring video coherence.
*   3D Causal Variational Encoder: Wan-VAE technology compresses HD frames to 1/128 size while retaining subtle dynamic details, significantly reducing memory requirements.
*   Three-stage Training Strategy: Starting from 480P resolution pre-training, gradually upgrading to 720P, balancing generation quality and computational efficiency through phased optimization.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/wan-flf2v" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "duration": 5,
    "size": "832*480",
    "num_inference_steps": 30,
    "guidance_scale": 5,
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

first\_image

string

Yes

\-

\-

URL of the starting image.

last\_image

string

Yes

\-

\-

URL of the ending image.

prompt

string

No

\-

negative\_prompt

string

No

\-

The negative prompt for the generation.

duration

integer

No

5

5 ~ 10

The duration of the generated media in seconds.

size

string

No

832\*480

832\*480, 480\*832, 1280\*720, 720\*1280

The size of the generated media in pixels (width\*height).

num\_inference\_steps

integer

No

30

1 ~ 40

The number of inference steps to perform.

guidance\_scale

number

No

5

0.00 ~ 20.00

The guidance scale to use for the generation.

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

[Wan 2.2 Video Edit](/docs/docs-api/wavespeed-ai/wan-2.2-video-edit "Wan 2.2 Video Edit")[Pixverse Lipsync](/docs/docs-api/pixverse/pixverse-lipsync "Pixverse Lipsync")