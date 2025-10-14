# /docs/docs-api/bytedance/bytedance-dreamina-v3.0-edit

来源: https://wavespeed.ai/docs/docs-api/bytedance/bytedance-dreamina-v3.0-edit

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Bytedance](/docs/docs-api/bytedance/bytedance-avatar-omni-human "Bytedance")Bytedance Dreamina V3.0 Edit

# Bytedance Dreamina V3.0 Edit

Bytedance Dreamina V3.0 Edit

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/bytedance/dreamina-v3.0/edit)

ByteDance Dreamina V3.0 Edit is a image-to-image model that is sourced from the same technology as Dreamina, and focuses on upgrading the visual effects of the generated images. This version has made significant improvements in terms of picture aesthetics, style accuracy, and richness of details, while also retaining the ability to respond to text inputs.

## Features[](#features)

# ByteDance Dreamina V3.0 Edit

ByteDance Dreamina V3.0 Edit is a image-to-image model that is sourced from the same technology as Dreamina, and focuses on upgrading the visual effects of the generated images. This version has made significant improvements in terms of picture aesthetics, style accuracy, and richness of details, while also retaining the ability to respond to text inputs.

## Key Features[](#key-features)

*   High-quality image generation
*   Photorealistic output
*   Fast synchronous inference
*   Stable and reliable

## Input Requirements[](#input-requirements)

*   Text prompt describing the desired image
*   Maximum prompt length: 120 characters
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
*   Image-to-image only (no text-to-image or inpainting)

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
curl --location --request POST "https://api.wavespeed.ai/api/v3/bytedance/dreamina-v3.0/edit" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "size": "1328*1328",
    "seed": -1,
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

image

string

Yes

\-

The image to edit, can be a URL or base64 encoded image.

size

string

No

1328\*1328

512 ~ 2048 per dimension

The size of the generated media in pixels (width\*height).

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

[Bytedance Avatar Omni Human 1.5](/docs/docs-api/bytedance/bytedance-avatar-omni-human-1.5 "Bytedance Avatar Omni Human 1.5")[Bytedance Dreamina V3.0 Image To Video 1080p](/docs/docs-api/bytedance/bytedance-dreamina-v3.0-image-to-video-1080p "Bytedance Dreamina V3.0 Image To Video 1080p")