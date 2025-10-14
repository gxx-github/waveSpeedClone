# /docs/docs-api/wavespeed-ai/flux-schnell

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/flux-schnell

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Flux Schnell

# Flux Schnell

Flux Schnell

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/flux-schnell)

FLUX.1 \[schnell\]\` is a 12 billion parameter rectified flow transformer capable of generating images from text descriptions.

## Features[](#features)

# FLUX.1 \[schnell\]

FLUX.1 \[schnell\]\` is a 12 billion parameter rectified flow transformer capable of generating images from text descriptions.

## Key Features[](#key-features)

1.  Cutting-edge output quality and competitive prompt following, matching the performance of closed source alternatives.
2.  Trained using latent adversarial diffusion distillation, `FLUX.1 [schnell]` can generate high-quality images in only 1 to 4 steps.
3.  Released under the `apache-2.0` licence, the model can be used for personal, scientific, and commercial purposes.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/flux-schnell" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "strength": 0.8,
    "size": "1024*1024",
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

prompt

string

Yes

\-

The positive prompt for the generation.

image

string

No

\-

mask\_image

string

No

\-

The mask image tells the model where to generate new pixels (white) and where to preserve the original image (black). It acts as a stencil or guide for targeted image editing.

strength

number

No

0.8

0.00 ~ 1.00

Strength indicates extent to transform the reference image.

size

string

No

1024\*1024

256 ~ 1536 per dimension

The size of the generated media in pixels (width\*height).

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

[Flux Redux Pro](/docs/docs-api/wavespeed-ai/flux-redux-pro "Flux Redux Pro")[Flux Schnell LoRA](/docs/docs-api/wavespeed-ai/flux-schnell-lora "Flux Schnell LoRA")