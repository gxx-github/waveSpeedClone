# /docs/docs-api/wavespeed-ai/flux-kontext-max

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/flux-kontext-max

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Flux Kontext Max

# Flux Kontext Max

Flux Kontext Max

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/flux-kontext-max)

FLUX.1 Kontext \[max\] is a model with greatly improved prompt adherence and typography generation meet premium consistency for editing without compromise on speed.

## Features[](#features)

# FLUX.1 Kontext \[max\]

FLUX.1 Kontext \[max\] is a 12 billion parameter rectified flow transformer capable of editing images based on text instructions.

## Key Features[](#key-features)

1.  Change existing images based on an edit instruction.
2.  Have character, style and object reference without any finetuning.
3.  Robust consistency allows users to refine an image through multiple successive edits with minimal visual drift.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/flux-kontext-max" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "guidance_scale": 3.5,
    "enable_sync_mode": false
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

image

string

Yes

\-

The image to generate an image from.

seed

integer

No

\-

\-1 ~ 2147483647

The random seed to use for the generation.

guidance\_scale

number

No

3.5

1.0 ~ 20.0

The guidance scale to use for the generation.

aspect\_ratio

No

\-

21:9, 16:9, 4:3, 3:2, 1:1, 2:3, 3:4, 9:16, 9:21

The aspect ratio of the generated media.

enable\_sync\_mode

boolean

No

false

\-

If set to true, the function will wait for the image to be generated and uploaded before returning the response. It allows you to get the image directly in the response. This property is only available through the API.

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

[Flux Kontext Dev Ultra Fast](/docs/docs-api/wavespeed-ai/flux-kontext-dev-ultra-fast "Flux Kontext Dev Ultra Fast")[Flux Kontext Max Multi](/docs/docs-api/wavespeed-ai/flux-kontext-max-multi "Flux Kontext Max Multi")