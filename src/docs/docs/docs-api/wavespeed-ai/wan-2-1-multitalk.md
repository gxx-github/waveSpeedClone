# /docs/docs-api/wavespeed-ai/wan-2.1-multitalk

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/wan-2.1-multitalk

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Wan 2.1 Multitalk

# Wan 2.1 Multitalk

Wan 2.1 Multitalk

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/wan-2.1/multitalk)

MultiTalk is an audio-driven conversational AI video generation model. Create talking or singing videos from a single image and audio input. Our endpoint starts with $0.15 per 5 seconds video generation and supports a maximum generation length of 10 minutes.

## Features[](#features)

# MultiTalk

## What is MultiTalk?[](#what-is-multitalk)

MultiTalk is a revolutionary framework for audio-driven multi-person conversational video generation developed by MeiGen-AI. Unlike traditional talking head generation methods that only animate facial movements, MultiTalk technology can generate realistic videos of people speaking, singing, and interacting while maintaining perfect lip synchronization with audio input. MultiTalk transforms static photos into dynamic speaking videos by making the person speak or sing exactly what you want them to say.

## Pricing[](#pricing)

Our endpoint starts with **$0.15 per 5 seconds** video generation and supports a maximum generation length of **10 minutes**.

## How MultiTalk Works[](#how-multitalk-works)

MultiTalk leverages advanced AI technology to understand both audio signals and visual information. This MultiTalk implementation combines MultiTalk + Wan2.1 + Uni3C for optimal results.

Audio Analysis: MultiTalk uses a powerful audio encoder (Wav2Vec) to understand the nuances of speech, including rhythm, tone, and pronunciation patterns.

Visual Understanding: Built on the robust Wan2.1 video diffusion model (you can visit our Wan2.1 workflow for t2v/i2v eneration), MultiTalk understands human anatomy, facial expressions, and body movements.

Camera Control: MultiTalk with Uni3C controlnet enables subtle camera movements and scene control, making the video more dynamic and professional-looking. Check out our Uni3C workflow for creating beautiful camera motion transfer.

Perfect Synchronization: Through sophisticated attention mechanisms, MultiTalk learns to perfectly align lip movements with audio while maintaining natural facial expressions and body language.

Instruction Following: Unlike simpler methods, MultiTalk can follow text prompts to control the scene, pose, and overall behavior while maintaining audio synchronization.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/wan-2.1/multitalk" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
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

[Wan 2.1 I2V 720p Ultra Fast](/docs/docs-api/wavespeed-ai/wan-2.1-i2v-720p-ultra-fast "Wan 2.1 I2V 720p Ultra Fast")[Wan 2.1 T2V 480p](/docs/docs-api/wavespeed-ai/wan-2.1-t2v-480p "Wan 2.1 T2V 480p")