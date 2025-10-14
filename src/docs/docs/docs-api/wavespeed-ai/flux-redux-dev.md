# /docs/docs-api/wavespeed-ai/flux-redux-dev

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/flux-redux-dev

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Flux Redux Dev

# Flux Redux Dev

Flux Redux Dev

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/flux-redux-dev)

FLUX.1 Redux \[dev\] is an adapter for all FLUX.1 base models for image variation generation. Given an input image, FLUX.1 Redux can reproduce the image with slight variation, allowing to refine a given image. It naturally integrates into more complex workflows unlocking image restyling.

## Features[](#features)

# FLUX.1 \[dev\]

FLUX.1 \[dev\] is a 12 billion parameter rectified flow transformer capable of generating images from text descriptions.

## Key Features[](#key-features)

1.  Cutting-edge output quality, second only to our state-of-the-art model `FLUX.1 [pro]`.
2.  Competitive prompt following, matching the performance of closed source alternatives .
3.  Trained using guidance distillation, making `FLUX.1 [dev]` more efficient.
4.  Open weights to drive new scientific research, and empower artists to develop innovative workflows.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/flux-redux-dev" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "size": "1024*1024",
    "num_inference_steps": 28,
    "guidance_scale": 3.5,
    "num_images": 1,
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

image

string

Yes

\-

The URL of the image to generate an image from.

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

guidance\_scale

number

No

3.5

1 ~ 20

The guidance scale to use for the generation.

num\_images

integer

No

1

1 ~ 4

The number of images to generate.

seed

integer

No

\-1

\-1 ~ 2147483647

The random seed to use for the generation.

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

[Flux Pulid](/docs/docs-api/wavespeed-ai/flux-pulid "Flux Pulid")[Flux Redux Pro](/docs/docs-api/wavespeed-ai/flux-redux-pro "Flux Redux Pro")