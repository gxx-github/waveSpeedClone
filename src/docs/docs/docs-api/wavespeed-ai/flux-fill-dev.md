# /docs/docs-api/wavespeed-ai/flux-fill-dev

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/flux-fill-dev

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Flux Fill Dev

# Flux Fill Dev

Flux Fill Dev

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/flux-fill-dev)

FLUX.1 Fill \[dev\] is a 12 billion parameter rectified flow transformer capable of filling areas in existing images based on a text description.

## Features[](#features)

# FLUX.1 Fill \[dev\]

FLUX.1 Fill \[dev\] is a 12 billion parameter rectified flow transformer capable of filling areas in existing images based on a text description.

## Key Features[](#key-features)

1.  Cutting-edge output quality, second only to our state-of-the-art model `FLUX.1 Fill [pro]`.
2.  Blends impressive prompt following with completing the structure of your source image.
3.  Trained using guidance distillation, making `FLUX.1 Fill [dev]` more efficient.
4.  Open weights to drive new scientific research, and empower artists to develop innovative workflows.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/flux-fill-dev" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "size": "1024*1024",
    "num_inference_steps": 28,
    "seed": 0,
    "guidance_scale": 30,
    "num_images": 1,
    "loras": []
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

The URL of the image to generate an image from.

mask\_image

string

Yes

\-

The URL of the mask image to generate an image from.

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

num\_inference\_steps

integer

No

28

1 ~ 50

The number of inference steps to perform.

seed

integer

No

\-

\-1 ~ 2147483647

The random seed to use for the generation.

guidance\_scale

number

No

30

28 ~ 35

The guidance scale to use for the generation.

num\_images

integer

No

1

1 ~ 4

The number of images to generate.

loras

array

No

max 3 items

List of LoRAs to apply (max 3).

loras\[\].path

string

Yes

\-

Path to the LoRA model

loras\[\].scale

float

Yes

\-

0.0 ~ 4.0

Scale of the LoRA model

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

[Flux Dev Ultra Fast](/docs/docs-api/wavespeed-ai/flux-dev-ultra-fast "Flux Dev Ultra Fast")[Flux Kontext Dev](/docs/docs-api/wavespeed-ai/flux-kontext-dev "Flux Kontext Dev")