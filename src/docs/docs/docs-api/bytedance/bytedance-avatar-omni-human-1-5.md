# /docs/docs-api/bytedance/bytedance-avatar-omni-human-1.5

来源: https://wavespeed.ai/docs/docs-api/bytedance/bytedance-avatar-omni-human-1.5

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Bytedance](/docs/docs-api/bytedance/bytedance-avatar-omni-human "Bytedance")Bytedance Avatar Omni Human 1.5

# Bytedance Avatar Omni Human 1.5

Bytedance Avatar Omni Human 1.5

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/bytedance/avatar-omni-human-1.5)

Instilling an Active Mind in Avatars via Cognitive Simulation. 0.15$ per second.

## Features[](#features)

Instilling an Active Mind in Avatars via Cognitive Simulation

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/bytedance/avatar-omni-human-1.5" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "enable_base64_output": false
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

The portrait image to animate, can be a URL or base64 encoded image. Better results with clear, front-facing portraits with good lighting.

audio

string

Yes

\-

\-

Optional background audio for the generated video, can be a URL or base64 encoded audio file.

enable\_base64\_output

boolean

No

false

\-

If enabled, the output will be encoded into a BASE64 string instead of a URL. This property is only available through the API.

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

[Bytedance Avatar Omni Human](/docs/docs-api/bytedance/bytedance-avatar-omni-human "Bytedance Avatar Omni Human")[Bytedance Dreamina V3.0 Edit](/docs/docs-api/bytedance/bytedance-dreamina-v3.0-edit "Bytedance Dreamina V3.0 Edit")