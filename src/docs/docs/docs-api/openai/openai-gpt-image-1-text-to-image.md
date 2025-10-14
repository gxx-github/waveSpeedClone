# /docs/docs-api/openai/openai-gpt-image-1-text-to-image

来源: https://wavespeed.ai/docs/docs-api/openai/openai-gpt-image-1-text-to-image

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Openai](/docs/docs-api/openai/openai-dall-e-2 "Openai")Openai Gpt Image 1 Text To Image

# Openai Gpt Image 1 Text To Image

Openai Gpt Image 1 Text To Image

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/openai/gpt-image-1/text-to-image)

OpenAI’s latest image generation model: gpt-1-image.

## Features[](#features)

# GPT Image 1

GPT Image 1 is a new state-of-the-art image generation model. It is a natively multimodal language model that accepts both text and image inputs, and produces image outputs.

## Capabilities[](#capabilities)

*   Creates images across diverse styles
*   Follows custom guidelines
*   Leverages world knowledge
*   Renders text accurately

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/openai/gpt-image-1/text-to-image" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "size": "1024*1024",
    "quality": "medium",
    "enable_sync_mode": false,
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

prompt

string

Yes

\-

The positive prompt for the generation.

size

string

No

1024\*1024

1024\*1024, 1024\*1536, 1536\*1024

The size of the generated media in pixels (width\*height).

quality

string

No

medium

low, medium, high

The quality of the generated image.

enable\_sync\_mode

boolean

No

false

\-

If set to true, the function will wait for the image to be generated and uploaded before returning the response. It allows you to get the image directly in the response. This property is only available through the API.

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

[Openai Gpt Image 1 High Fidelity](/docs/docs-api/openai/openai-gpt-image-1-high-fidelity "Openai Gpt Image 1 High Fidelity")[Openai Sora](/docs/docs-api/openai/openai-sora "Openai Sora")