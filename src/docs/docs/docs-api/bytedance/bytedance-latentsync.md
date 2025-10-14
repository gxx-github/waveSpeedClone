# /docs/docs-api/bytedance/bytedance-latentsync

来源: https://wavespeed.ai/docs/docs-api/bytedance/bytedance-latentsync

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Bytedance](/docs/docs-api/bytedance/bytedance-avatar-omni-human "Bytedance")Bytedance Latentsync

# Bytedance Latentsync

Bytedance Latentsync

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/bytedance/latentsync)

Latent Sync harnesses the power of stable diffusion and TREPA to deliver precise, high-resolution lip synchronization for dynamic and realistic video generation. $0.15 per 5 seconds video generation.

## Features[](#features)

Bytedance Latent Sync harnesses the power of stable diffusion and TREPA to deliver precise, high-resolution lip synchronization for dynamic and realistic video generation. Our framework directly models complex audio-visual correlations using Stable Diffusion. Additionally, we found that diffusion-based lip sync methods exhibit inferior temporal consistency. We propose Temporal REPresentation Alignment (TREPA) to enhance temporal consistency while preserving lip-sync accuracy. TREPA uses temporal representations extracted by large-scale self-supervised video models to align the generated frames with the ground truth frames. Our endpoint supports mp4 for video input and mp3/aac/wav/m4a audio files for the audio input.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/bytedance/latentsync" \
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

[Bytedance Dreamina V3.1 Text To Image](/docs/docs-api/bytedance/bytedance-dreamina-v3.1-text-to-image "Bytedance Dreamina V3.1 Text To Image")[Bytedance Lipsync Audio To Video](/docs/docs-api/bytedance/bytedance-lipsync-audio-to-video "Bytedance Lipsync Audio To Video")