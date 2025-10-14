# /docs/docs-api/wavespeed-ai/flux-controlnet-union-pro-2.0

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/flux-controlnet-union-pro-2.0

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Flux Controlnet Union Pro 2.0

# Flux Controlnet Union Pro 2.0

Flux Controlnet Union Pro 2.0

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/flux-controlnet-union-pro-2.0)

Gain advanced control with FLUX Dev ControlNet, powered by the FLUX.1-dev-ControlNet-Union-Pro-2.0 model. This powerful model supports simultaneous Canny, Depth, Soft Edge, Pose, and Grayscale conditioning. Use FLUX Dev ControlNet standalone or combine it with other ControlNets for refined image generation. It’s perfect for directing AI outputs for motion, character consistency, or background shaping, adapting seamlessly to your multimodal control needs.

## Features[](#features)

# FLUX Dev ControlNet

Gain advanced control with FLUX Dev ControlNet, powered by the FLUX.1-dev-ControlNet-Union-Pro-2.0 model. This powerful model supports simultaneous Canny, Depth, Soft Edge, Pose, and Grayscale conditioning. Use FLUX Dev ControlNet standalone or combine it with other ControlNets for refined image generation. It’s perfect for directing AI outputs for motion, character consistency, or background shaping, adapting seamlessly to your multimodal control needs.

See [Shakker-Labs/FLUX.1-dev-ControlNet-Union-Pro-2.0](https://huggingface.co/Shakker-Labs/FLUX.1-dev-ControlNet-Union-Pro-2.0)

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/flux-controlnet-union-pro-2.0" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "size": "1024*1024",
    "num_inference_steps": 28,
    "guidance_scale": 3.5,
    "controlnet_conditioning_scale": 0.7,
    "control_guidance_start": 0,
    "control_guidance_end": 0.8,
    "loras": [],
    "seed": 0,
    "num_images": 1,
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

control\_image

string

Yes

\-

\-

The URL of the control image for ControlNet guidance.

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

0.00 ~ 20.00

The guidance scale to use for the generation.

controlnet\_conditioning\_scale

number

No

0.7

0.00 ~ 2.00

The conditioning scale for ControlNet. Higher values make the output follow the control image more closely.

control\_guidance\_start

number

No

\-

0.00 ~ 1.00

The fraction of total steps at which ControlNet guidance start.

control\_guidance\_end

number

No

0.8

0.00 ~ 1.00

The fraction of total steps at which ControlNet guidance ends.

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

seed

integer

No

\-

\-1 ~ 2147483647

The random seed to use for the generation.

num\_images

integer

No

1

1 ~ 4

The number of images to generate.

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

[Flux 1.1 Pro Ultra](/docs/docs-api/wavespeed-ai/flux-1.1-pro-ultra "Flux 1.1 Pro Ultra")[Flux Dev](/docs/docs-api/wavespeed-ai/flux-dev "Flux Dev")