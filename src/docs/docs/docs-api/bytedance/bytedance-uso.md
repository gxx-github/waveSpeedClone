# /docs/docs-api/bytedance/bytedance-uso

来源: https://wavespeed.ai/docs/docs-api/bytedance/bytedance-uso

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Bytedance](/docs/docs-api/bytedance/bytedance-avatar-omni-human "Bytedance")Bytedance Uso

# Bytedance Uso

Bytedance Uso

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/bytedance/uso)

USO (Unified Style-Subject Optimized) is a model developed by ByteDance’s UXO Team that unifies style-driven and subject-driven generation tasks.

## Features[](#features)

USO (Unified Style-Subject Optimized) is a model developed by ByteDance’s UXO Team that unifies style-driven and subject-driven generation tasks.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/bytedance/uso" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "sync_model": false
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

No

\-

The positive prompt for the generation.

reference\_images

array

Yes

\-

\-

A list of images to use as style references. At least 1 image is required. max 4 images.

seed

integer

No

\-

\-1 ~ 2147483647

The random seed to use for the generation. -1 means a random seed will be used.

sync\_model

boolean

No

false

\-

Sync model to the latest version.

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

[Bytedance Seedream V4 Sequential](/docs/docs-api/bytedance/bytedance-seedream-v4-sequential "Bytedance Seedream V4 Sequential")[Bytedance Waver 1.0](/docs/docs-api/bytedance/bytedance-waver-1.0 "Bytedance Waver 1.0")