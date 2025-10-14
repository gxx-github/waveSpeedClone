# /docs/docs-api/wavespeed-ai/qwen-image-edit

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/qwen-image-edit

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Qwen Image Edit

# Qwen Image Edit

Qwen Image Edit

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/qwen-image/edit)

Qwen-Image-Edit — a 20B MMDiT model for next-gen image edit generation. Built on 20B Qwen-Image, it brings precise bilingual text editing (Chinese & English) while preserving style, and supports both semantic and appearance-level editing.

## Features[](#features)

**Qwen-Image-Edit** — a 20B MMDiT model for next-gen image edit generation. Built on 20B Qwen-Image, it brings precise bilingual text editing (Chinese & English) while preserving style, and supports both semantic and appearance-level editing.

**Key Features**:

*   Semantic and Appearance Editing: Qwen-Image-Edit supports both low-level visual appearance editing (such as adding, removing, or modifying elements, requiring all other regions of the image to remain completely unchanged) and high-level visual semantic editing (such as IP creation, object rotation, and style transfer, allowing overall pixel changes while maintaining semantic consistency).
    
*   Precise Text Editing: Qwen-Image-Edit supports bilingual (Chinese and English) text editing, allowing direct addition, deletion, and modification of text in images while preserving the original font, size, and style.
    
*   Strong Benchmark Performance: Evaluations on multiple public benchmarks demonstrate that Qwen-Image-Edit achieves state-of-the-art (SOTA) performance in image editing tasks, establishing it as a powerful foundation model for image editing.
    

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/qwen-image/edit" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
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

image

string

Yes

\-

The image to generate an image from.

size

string

No

\-

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

[Neta Lumina](/docs/docs-api/wavespeed-ai/neta-lumina "Neta Lumina")[Qwen Image Edit LoRA](/docs/docs-api/wavespeed-ai/qwen-image-edit-lora "Qwen Image Edit LoRA")