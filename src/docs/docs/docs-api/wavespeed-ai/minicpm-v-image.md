# /docs/docs-api/wavespeed-ai/minicpm-v-image

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/minicpm-v-image

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Minicpm V Image

# Minicpm V Image

Minicpm V Image

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/minicpm-v/image)

MiniCPM-V 4.5 is the latest and most capable model in the MiniCPM-V series.

## Features[](#features)

# MiniCPM-V 4.5 AI Video Understanding

## Overview[](#overview)

MiniCPM-V is a series of efficient end-side multimodal LLMs (MLLMs), which accept images, videos and text as inputs and deliver high-quality text outputs, including support for text-based queries, video queries, single-image queries, and multi-image queries to generate captions or responses.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/minicpm-v/image" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "preset_prompt": "describe",
    "seed": -1,
    "enable_sync_mode": true
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

Image to be analyzed.

preset\_prompt

string

No

describe

describe, caption

Preset prompt for image analysis.

custom\_prompt

string

No

\-

\-

Custom prompt for image analysis.

seed

integer

No

\-1

\-1 ~ 2147483647

The random seed to use for the generation.

enable\_sync\_mode

boolean

No

true

\-

This model only supports sync mode.

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

[Magi 1 24b](/docs/docs-api/wavespeed-ai/magi-1-24b "Magi 1 24b")[Minicpm V Video](/docs/docs-api/wavespeed-ai/minicpm-v-video "Minicpm V Video")