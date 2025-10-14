# /docs/docs-api/wavespeed-ai/step1x-edit

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/step1x-edit

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Step1x Edit

# Step1x Edit

Step1x Edit

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/step1x-edit)

Step1X-Edit transforms your photos with simple instructions into stunning, professional-quality edits—rivaling top proprietary tools.

## Features[](#features)

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/step1x-edit" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "guidance_scale": 4,
    "num_inference_steps": 30
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

The image URL to generate an image from. Needs to match the dimensions of the mask.

negative\_prompt

string

No

\-

The negative prompt for the generation.

seed

integer

No

\-

\-1 ~ 2147483647

The random seed to use for the generation.

guidance\_scale

number

No

4

0 ~ 20

The guidance scale to use for the generation.

num\_inference\_steps

integer

No

30

1 ~ 50

The number of inference steps to perform.

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

[Song Generation](/docs/docs-api/wavespeed-ai/song-generation "Song Generation")[Think Sound](/docs/docs-api/wavespeed-ai/think-sound "Think Sound")