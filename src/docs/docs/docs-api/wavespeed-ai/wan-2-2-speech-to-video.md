# /docs/docs-api/wavespeed-ai/wan-2.2-speech-to-video

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/wan-2.2-speech-to-video

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Wan 2.2 Speech To Video

# Wan 2.2 Speech To Video

Wan 2.2 Speech To Video

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/wan-2.2/speech-to-video)

Wan-2.2-S2V is a video model that generates high-quality videos from static images and audio, with realistic facial expressions, body movements. Our endpoint starts with $0.15 per 5 seconds video generation (480p) and supports a maximum generation length of 10 minutes.

## Features[](#features)

# Wan-2.2-S2V

## What is Wan-2.2-S2V?[](#what-is-wan-22-s2v)

Wan-2.2-S2V is a video model that generates high-quality videos from static images and audio, with realistic facial expressions, body movements, and professional camera work for film and television applications.

## Pricing[](#pricing)

Our endpoint starts with **$0.15 per 5 seconds (480p) or $0.3 per 5 seconds (720p)** video generation and supports a maximum generation length of **10 minutes**.

## How Wan-2.2-S2V Works[](#how-wan-22-s2v-works)

Wan-2.2-S2V leverages advanced AI technology to understand both audio signals and visual information.

Audio Analysis: Wan-2.2-S2V uses a powerful audio encoder (Wav2Vec) to understand the nuances of speech, including rhythm, tone, and pronunciation patterns.

Visual Understanding: Built on the robust Wan2.2 video diffusion model (you can visit our Wan2.2 workflow for t2v/i2v eneration), Wan-2.2-S2V understands human anatomy, facial expressions, and body movements.

Perfect Synchronization: Through sophisticated attention mechanisms, Wan-2.2-S2V learns to perfectly align lip movements with audio while maintaining natural facial expressions and body language.

Instruction Following: Unlike simpler methods, Wan-2.2-S2V can follow text prompts to control the scene, pose, and overall behavior while maintaining audio synchronization.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/wan-2.2/speech-to-video" \
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

image

string

Yes

\-

The image for generating the output.

audio

string

Yes

\-

\-

The audio for generating the output.

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

[Wan 2.2 Image To Image](/docs/docs-api/wavespeed-ai/wan-2.2-image-to-image "Wan 2.2 Image To Image")[Wan 2.2 T2V 480p](/docs/docs-api/wavespeed-ai/wan-2.2-t2v-480p "Wan 2.2 T2V 480p")