# /docs/docs-api/wavespeed-ai/neta-lumina

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/neta-lumina

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Neta Lumina

# Neta Lumina

Neta Lumina

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/neta-lumina)

Generate images with Neta Lumina, a high‑quality anime‑style image‑generation model developed by Neta.art Lab.

## Features[](#features)

# Neta Lumina,

Neta Lumina is a high‑quality anime‑style image‑generation model developed by Neta.art Lab.

Building on the open‑source Lumina‑Image‑2.0 released by the Alpha‑VLLM team at Shanghai AI Laboratory, we fine‑tuned the model with a vast corpus of high‑quality anime images and multilingual tag data. The preliminary result is a compelling model with powerful comprehension and interpretation abilities (thanks to Gemma text encoder), ideal for illustration, posters, storyboards, character design, and more.

## Key Features[](#key-features)

*   Optimized for diverse creative scenarios such as Furry, Guofeng (traditional‑Chinese aesthetics), pets, etc.
*   Wide coverage of characters and styles, from popular to niche concepts. (Still support danbooru tags!)
*   Accurate natural‑language understanding with excellent adherence to complex prompts.
*   Native multilingual support, with Chinese, English, and Japanese recommended first.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/neta-lumina" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "size": "1024*1024",
    "seed": -1,
    "output_format": "jpeg",
    "enable_base64_output": false,
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

size

string

No

1024\*1024

256 ~ 1536 per dimension

The size of the generated media in pixels (width\*height).

seed

integer

No

\-1

\-1 ~ 2147483647

The random seed to use for the generation. -1 means a random seed will be used.

output\_format

string

No

jpeg

jpeg, png, webp

The format of the output image.

enable\_base64\_output

boolean

No

false

\-

If enabled, the output will be encoded into a BASE64 string instead of a URL. This property is only available through the API.

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

[Multitalk](/docs/docs-api/wavespeed-ai/multitalk "Multitalk")[Qwen Image Edit](/docs/docs-api/wavespeed-ai/qwen-image-edit "Qwen Image Edit")