# /docs/docs-api/wavespeed-ai/hunyuan-avatar

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/hunyuan-avatar

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Hunyuan Avatar

# Hunyuan Avatar

Hunyuan Avatar

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/hunyuan-avatar)

Hunyuan Avatar is an audio-driven conversational AI video generation model. Create talking or singing videos from a single image and audio input. Our endpoint starts with $0.15 per 5 seconds video generation (480p/720p) and supports a maximum generation length of 120 seconds.

## Features[](#features)

Hunyuan Avatar - High-Fidelity Audio-Driven Human Animation

Transform audio and images into high-quality AI avatar videos with Hunyuan Avatar, an advanced audio-driven human animation model designed for creating dynamic, emotion-controllable, and multi-character dialogue videos.

Overview HunyuanAvatar is a High-Fidelity Audio-Driven Human Animation model for Multiple Characters. The model excels at generating highly dynamic videos while preserving character consistency, achieving precise emotion alignment between characters and audio, and enabling multi-character audio-driven animation through innovative multimodal diffusion transformer (MM-DiT) architecture.

Key Capabilities Create production-ready avatar videos with:

*   Character Consistency Preservation Generate dynamic videos while maintaining strong character consistency Character image injection module eliminates condition mismatch between training and inference Fine-tune facial characteristics across different poses and expressions
    
*   Audio-Driven Animation High-fidelity audio-driven human animation capabilities Audio Emotion Module (AEM) extracts and transfers emotional cues from reference images Face-Aware Audio Adapter (FAA) enables independent audio injection for multi-character scenarios
    
*   Multi-Character Support Generate multi-character dialogue videos from single inputs Independent audio injection via cross-attention for multiple characters Realistic avatars in dynamic, immersive scenarios
    

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/hunyuan-avatar" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "resolution": "480p"
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

\-

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

[Hidream I1 Full](/docs/docs-api/wavespeed-ai/hidream-i1-full "Hidream I1 Full")[Hunyuan Image 2.1](/docs/docs-api/wavespeed-ai/hunyuan-image-2.1 "Hunyuan Image 2.1")