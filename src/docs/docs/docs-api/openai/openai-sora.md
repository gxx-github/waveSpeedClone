# /docs/docs-api/openai/openai-sora

来源: https://wavespeed.ai/docs/docs-api/openai/openai-sora

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Openai](/docs/docs-api/openai/openai-dall-e-2 "Openai")Openai Sora

# Openai Sora

Openai Sora

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/openai/sora)

Sora is OpenAI’s video generation model, designed to take text, image, and video inputs and generate a new video as an output.

## Features[](#features)

Sora is OpenAI’s video generation model, designed to take text, image, and video inputs and generate a new video as an output. Try Sora 2: [https://wavespeed.ai/models/openai/sora-2](https://wavespeed.ai/models/openai/sora-2)

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/openai/sora" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "size": "480*480"
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

size

string

No

480\*480

480\*480, 480\*854, 854\*480, 720\*720, 720\*1280, 1280\*720, 1080\*1080, 1080\*1920, 1920\*1080

The size of the generated media in pixels (width\*height).

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

[Openai Gpt Image 1 Text To Image](/docs/docs-api/openai/openai-gpt-image-1-text-to-image "Openai Gpt Image 1 Text To Image")[Openai Sora 2 Image To Video](/docs/docs-api/openai/openai-sora-2-image-to-video "Openai Sora 2 Image To Video")