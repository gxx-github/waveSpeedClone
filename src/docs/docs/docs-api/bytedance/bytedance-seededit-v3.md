# /docs/docs-api/bytedance/bytedance-seededit-v3

来源: https://wavespeed.ai/docs/docs-api/bytedance/bytedance-seededit-v3

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Bytedance](/docs/docs-api/bytedance/bytedance-avatar-omni-human "Bytedance")Bytedance Seededit V3

# Bytedance Seededit V3

Bytedance Seededit V3

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/bytedance/seededit-v3)

SeedEdit 3.0 is a state-of-the-art image editing model that lets you edit images using text prompts. It makes editing intuitive by understanding the relationship between visuals and language, allowing for precise changes to objects, scenes, and layout without disrupting the composition.

## Features[](#features)

SeedEdit 3.0 is a state-of-the-art image editing model that lets you edit images using text prompts. It makes editing intuitive by understanding the relationship between visuals and language. You can make precise changes to objects, scenes, and layout — all without disrupting the composition.

### Key Features[](#key-features)

*   **Context-Aware Editing**: Intelligent understanding of image semantics for precise modifications that preserve natural aesthetics.
*   **Lightning Fast**: Optimized neural architecture delivers professional results in seconds for real-time workflows.
*   **Precision Control**: Granular control over transformations with intuitive parameters and fine-tuning capabilities.
*   **SOTA Quality**: State-of-the-art results surpassing existing models across all quality benchmarks.

### Use Cases[](#use-cases)

*   **Style Transfer**: Convert photos to different art styles, like watercolor, oil painting and sketches.
*   **Object/Clothing Changes**: Modify hairstyles, add accessories, change colors.
*   **Text Editing**: Replace text in signs, posters, and labels.
*   **Background Swapping**: Change environments while preserving subjects.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/bytedance/seededit-v3" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "guidance_scale": 0.5,
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

guidance\_scale

number

No

0.5

0.0 ~ 1.0

The guidance scale to use for the generation.

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

[Bytedance Seedance V1 Pro T2V 720p](/docs/docs-api/bytedance/bytedance-seedance-v1-pro-t2v-720p "Bytedance Seedance V1 Pro T2V 720p")[Bytedance Seedream V3](/docs/docs-api/bytedance/bytedance-seedream-v3 "Bytedance Seedream V3")