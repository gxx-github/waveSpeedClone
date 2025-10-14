# /docs/docs-api/wavespeed-ai/wan-2.2-fun-control

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/wan-2.2-fun-control

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Wan 2.2 Fun Control

# Wan 2.2 Fun Control

Wan 2.2 Fun Control

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/wan-2.2/fun-control)

Wan2.2-Fun-Control is a next-generation video generation and control model launched by Alibaba PAI team. Through innovative Control Codes mechanism combined with deep learning and multi-modal conditional inputs, it can generate high-quality videos that comply with preset control conditions. The model is released under the Apache 2.0 license and supports commercial use. Our endpoint starts with $0.2 per 5 seconds (480p) or $0.4 per 5 seconds (720p) video generation and supports a maximum generation length of 120 seconds.

## Features[](#features)

# Wan2.2-Fun-Control

## What is Wan2.2-Fun-Control?[](#what-is-wan22-fun-control)

Wan2.2-Fun-Control is a next-generation video generation and control model launched by Alibaba PAI team. Through innovative Control Codes mechanism combined with deep learning and multi-modal conditional inputs, it can generate high-quality videos that comply with preset control conditions. The model is released under the Apache 2.0 license and supports commercial use.

## Key Features:[](#key-features)

*   Multi-modal Control: Supports multiple control conditions including Canny (line art), Depth, OpenPose (human pose), MLSD (geometric edges), and trajectory control
*   High-Quality Video Generation: Based on the Wan2.2 architecture, outputs film-level quality videos
*   Multi-language Support: Supports multi-language prompts including Chinese and English

## Pricing[](#pricing)

Our endpoint starts with **$0.2 per 5 seconds (480p) or $0.4 per 5 seconds (720p)** video generation and supports a maximum generation length of **120 seconds**.

## Tips[](#tips)

The composition style, as well as the camera position and human body pose of the reference image and the video should be as consistent as possible; otherwise, the probability of generation failure will increase significantly.

The aspect ratio of the input image and video should be the same to achieve the best output.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/wan-2.2/fun-control" \
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

video

string

Yes

\-

The video for generating the output.

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

[Wan 2.2 Animate](/docs/docs-api/wavespeed-ai/wan-2.2-animate "Wan 2.2 Animate")[Wan 2.2 I2V 480p](/docs/docs-api/wavespeed-ai/wan-2.2-i2v-480p "Wan 2.2 I2V 480p")