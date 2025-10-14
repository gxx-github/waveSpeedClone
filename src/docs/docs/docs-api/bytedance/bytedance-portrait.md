# /docs/docs-api/bytedance/bytedance-portrait

来源: https://wavespeed.ai/docs/docs-api/bytedance/bytedance-portrait

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Bytedance](/docs/docs-api/bytedance/bytedance-avatar-omni-human "Bytedance")Bytedance Portrait

# Bytedance Portrait

Bytedance Portrait

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/bytedance/portrait)

ByteDance Seedream Portrait is a state-of-the-art AI portrait enhancement model that specializes in creating stunning, professional-quality portraits. It intelligently enhances facial features, adjusts skin tones, and optimizes lighting while maintaining natural aesthetics.

## Features[](#features)

ByteDance Seedream Portrait is a state-of-the-art AI portrait enhancement model that specializes in creating stunning, professional-quality portraits. It intelligently enhances facial features, adjusts skin tones, and optimizes lighting while maintaining natural aesthetics.

### Key Features[](#key-features)

*   **Intelligent Enhancement**: Advanced AI algorithms for natural-looking portrait enhancement
*   **Professional Quality**: Studio-grade results with perfect lighting and skin tones
*   **Natural Aesthetics**: Maintains authenticity while improving visual appeal
*   **Fast Processing**: Quick turnaround for efficient workflows

### Use Cases[](#use-cases)

*   **Portrait Enhancement**: Improve lighting, skin texture, and overall aesthetics
*   **Professional Headshots**: Create polished business portraits
*   **Social Media Content**: Perfect photos for social platforms
*   **Event Photography**: Enhance wedding and event portraits

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/bytedance/portrait" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "seed": -1,
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

image

string

Yes

\-

The image to edit, can be a URL or base64 encoded image.

seed

integer

No

\-1

\-1 ~ 2147483647

The random seed to use for the generation. -1 means a random seed will be used.

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

[Bytedance Lipsync Audio To Video](/docs/docs-api/bytedance/bytedance-lipsync-audio-to-video "Bytedance Lipsync Audio To Video")[Bytedance Seedance V1 Lite I2V 1080p](/docs/docs-api/bytedance/bytedance-seedance-v1-lite-i2v-1080p "Bytedance Seedance V1 Lite I2V 1080p")