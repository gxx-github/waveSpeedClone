# /docs/docs-api/bytedance/bytedance-seedream-v3.1

来源: https://wavespeed.ai/docs/docs-api/bytedance/bytedance-seedream-v3.1

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Bytedance](/docs/docs-api/bytedance/bytedance-avatar-omni-human "Bytedance")Bytedance Seedream V3.1

# Bytedance Seedream V3.1

Bytedance Seedream V3.1

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/bytedance/seedream-v3.1)

ByteDance Seedream V3.1 is a text-to-image model that is sourced from the same technology as Seedream, and focuses on upgrading the visual effects of the generated images. This version has made significant improvements in terms of picture aesthetics, style accuracy, and richness of details, while also retaining the ability to respond to text inputs.

## Features[](#features)

# ByteDance Seedream V3.1

ByteDance Seedream V3.1 is a text-to-image model that is sourced from the same technology as Seedream, and focuses on upgrading the visual effects of the generated images. This version has made significant improvements in terms of picture aesthetics, style accuracy, and richness of details, while also retaining the ability to respond to text inputs.

## Key Features[](#key-features)

*   High-quality image generation
*   Photorealistic output
*   Fast synchronous inference
*   Stable and reliable

## Input Requirements[](#input-requirements)

*   Text prompt describing the desired image
*   Maximum prompt length: 100 characters
*   Supports both Chinese and English prompts

## Output[](#output)

*   High-quality images with flexible resolution (512~2048)
*   URL format for easy access
*   Usage statistics included

## Use Cases[](#use-cases)

*   Digital art creation
*   Content generation
*   Visual design
*   Creative inspiration

## Limitations[](#limitations)

*   Supported image sizes: 512~2048 pixels
*   Single image generation per request
*   Text-to-image only (no image-to-image or inpainting)

## Out-of-Scope Use[](#out-of-scope-use)

This model should not be used for:

*   Generating harmful or misleading content
*   Creating copyrighted material without permission
*   Any illegal or unethical purposes

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/bytedance/seedream-v3.1" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "size": "1024*1024",
    "seed": -1,
    "enable_prompt_expansion": true,
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

512 ~ 2048 per dimension

The size of the generated media in pixels (width\*height).

seed

integer

No

\-1

\-1 ~ 2147483647

The random seed to use for the generation. -1 means a random seed will be used.

enable\_prompt\_expansion

boolean

No

true

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

[Bytedance Seedream V3](/docs/docs-api/bytedance/bytedance-seedream-v3 "Bytedance Seedream V3")[Bytedance Seedream V4](/docs/docs-api/bytedance/bytedance-seedream-v4 "Bytedance Seedream V4")