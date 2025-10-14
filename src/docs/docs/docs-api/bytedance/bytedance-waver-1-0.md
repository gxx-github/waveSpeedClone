# /docs/docs-api/bytedance/bytedance-waver-1.0

来源: https://wavespeed.ai/docs/docs-api/bytedance/bytedance-waver-1.0

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Bytedance](/docs/docs-api/bytedance/bytedance-avatar-omni-human "Bytedance")Bytedance Waver 1.0

# Bytedance Waver 1.0

Bytedance Waver 1.0

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/bytedance/waver-1.0)

Waver1.0 is Bytedance’s all-in-one video generation model that excels in text-to-video (T2V), image-to-video (I2V), and text-to-image (T2I) generation.

## Features[](#features)

Waver 1.0 is Bytedance’s all-in-one video generation model that excels in text-to-video (T2V), image-to-video (I2V), and text-to-image (T2I) generation.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/bytedance/waver-1.0" \
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

image

string

Yes

\-

The image for generating the output.

prompt

string

Yes

\-

The positive prompt for the generation.

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

[Bytedance Uso](/docs/docs-api/bytedance/bytedance-uso "Bytedance Uso")[Google Gemini 2.5 Flash Image Edit](/docs/docs-api/google/google-gemini-2.5-flash-image-edit "Google Gemini 2.5 Flash Image Edit")