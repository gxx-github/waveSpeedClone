# /docs/docs-api/wavespeed-ai/hidream-i1-full

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/hidream-i1-full

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Hidream I1 Full

# Hidream I1 Full

Hidream I1 Full

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/hidream-i1-full)

HiDream-I1 is a new open-source image generative foundation model with 17B parameters that achieves state-of-the-art image generation quality within seconds.

## Features[](#features)

# Hidream-I1

`HiDream-I1` is a new open-source image generative foundation model with 17B parameters that achieves state-of-the-art image generation quality within seconds.

## Key Features[](#key-features)

*   ✨ **Superior Image Quality** - Produces exceptional results across multiple styles including photorealistic, cartoon, artistic, and more. Achieves state-of-the-art HPS v2.1 score, which aligns with human preferences.
*   🎯 **Best-in-Class Prompt Following** - Achieves industry-leading scores on GenEval and DPG benchmarks, outperforming all other open-source models.
*   🔓 **Open Source** - Released under the MIT license to foster scientific advancement and enable creative innovation.
*   💼 **Commercial-Friendly** - Generated images can be freely used for personal projects, scientific research, and commercial applications.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/hidream-i1-full" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "size": "1024*1024",
    "seed": -1,
    "output_format": "jpeg",
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

[Hidream I1 Dev](/docs/docs-api/wavespeed-ai/hidream-i1-dev "Hidream I1 Dev")[Hunyuan Avatar](/docs/docs-api/wavespeed-ai/hunyuan-avatar "Hunyuan Avatar")