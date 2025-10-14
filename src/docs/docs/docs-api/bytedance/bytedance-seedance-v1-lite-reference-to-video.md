# /docs/docs-api/bytedance/bytedance-seedance-v1-lite-reference-to-video

来源: https://wavespeed.ai/docs/docs-api/bytedance/bytedance-seedance-v1-lite-reference-to-video

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Bytedance](/docs/docs-api/bytedance/bytedance-avatar-omni-human "Bytedance")Bytedance Seedance V1 Lite Reference To Video

# Bytedance Seedance V1 Lite Reference To Video

Bytedance Seedance V1 Lite Reference To Video

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/bytedance/seedance-v1-lite/reference-to-video)

ByteDance Seedance lite reference-to-video allows the use of 1 to 4 images as reference to create a high-quality video.

## Features[](#features)

ByteDance Seedance lite reference-to-video allows the use of 1 to 4 images as reference to create a high-quality video.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/bytedance/seedance-v1-lite/reference-to-video" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "duration": 5,
    "camera_fixed": false
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

reference\_images

array

Yes

\-

\-

A list of images to use as style references. At least 1 image is required. max 4 images.

duration

integer

No

5

5 ~ 10

The duration of the generated media in seconds.

camera\_fixed

boolean

No

false

\-

Whether to fix the camera position.

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

[Bytedance Seedance V1 Lite I2V 720p](/docs/docs-api/bytedance/bytedance-seedance-v1-lite-i2v-720p "Bytedance Seedance V1 Lite I2V 720p")[Bytedance Seedance V1 Lite T2V 1080p](/docs/docs-api/bytedance/bytedance-seedance-v1-lite-t2v-1080p "Bytedance Seedance V1 Lite T2V 1080p")