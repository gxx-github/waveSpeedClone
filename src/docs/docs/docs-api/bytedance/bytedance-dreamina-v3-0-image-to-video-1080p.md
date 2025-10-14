# /docs/docs-api/bytedance/bytedance-dreamina-v3.0-image-to-video-1080p

来源: https://wavespeed.ai/docs/docs-api/bytedance/bytedance-dreamina-v3.0-image-to-video-1080p

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Bytedance](/docs/docs-api/bytedance/bytedance-avatar-omni-human "Bytedance")Bytedance Dreamina V3.0 Image To Video 1080p

# Bytedance Dreamina V3.0 Image To Video 1080p

Bytedance Dreamina V3.0 Image To Video 1080p

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/bytedance/dreamina-v3.0/image-to-video-1080p)

Dreamina V3.0 provides the ability to respond to text or image inputs with more accuracy and natural dynamic expression, generating 1080P high-quality videos with professional-level visual quality. It offers a diverse and expressive style, featuring multiple scenes in the narrative.

## Features[](#features)

Dreamina V3.0 provides the ability to respond to text or image inputs with more accuracy and natural dynamic expression, generating 1080P high-quality videos with professional-level visual quality. It offers a diverse and expressive style, featuring multiple scenes in the narrative.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/bytedance/dreamina-v3.0/image-to-video-1080p" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "seed": -1,
    "duration": 5
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

The image to be used for the generation.

seed

integer

No

\-1

\-1 ~ 2147483647

The random seed to use for the generation. -1 means a random seed will be used.

duration

integer

No

5

5

The duration of the generated media.

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

[Bytedance Dreamina V3.0 Edit](/docs/docs-api/bytedance/bytedance-dreamina-v3.0-edit "Bytedance Dreamina V3.0 Edit")[Bytedance Dreamina V3.0 Image To Video 720p](/docs/docs-api/bytedance/bytedance-dreamina-v3.0-image-to-video-720p "Bytedance Dreamina V3.0 Image To Video 720p")