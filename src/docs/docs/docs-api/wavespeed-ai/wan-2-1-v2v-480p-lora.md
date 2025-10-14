# /docs/docs-api/wavespeed-ai/wan-2.1-v2v-480p-lora

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/wan-2.1-v2v-480p-lora

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Wan 2.1 V2V 480p LoRA

# Wan 2.1 V2V 480p LoRA

Wan 2.1 V2V 480p LoRA

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/wan-2.1/v2v-480p-lora)

Generate unlimited AI videos with Wan 2.1 video to video model, supporting custom LoRAs.

## Features[](#features)

# Wan 2.1 AI Video Model

We present Wan2.1, a comprehensive and open suite of video foundation models that pushes the boundaries of video generation. Wan2.1 offers these key features:

*   👍 SOTA Performance: Wan2.1 consistently outperforms existing open-source models and state-of-the-art commercial solutions across multiple benchmarks.
*   👍 Multiple Tasks: Wan2.1 excels in Text-to-Video, Image-to-Video, Video Editing, Text-to-Image, and Video-to-Audio, advancing the field of video generation.
*   👍 Visual Text Generation: Wan2.1 is the first video model capable of generating both Chinese and English text, featuring robust text generation that enhances its practical applications.
*   👍 Powerful Video VAE: Wan-VAE delivers exceptional efficiency and performance, encoding and decoding 1080P videos of any length while preserving temporal information, making it an ideal foundation for video and image generation.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/wan-2.1/v2v-480p-lora" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "loras": [
        {
            "path": "motimalu/wan-flat-color-v2",
            "scale": 1
        }
    ],
    "num_inference_steps": 30,
    "duration": 5,
    "strength": 0.9,
    "guidance_scale": 5,
    "flow_shift": 3,
    "seed": -1
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

video

string

Yes

\-

The video for generating the output.

prompt

string

Yes

\-

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

negative\_prompt

string

No

\-

The negative prompt for the generation.

num\_inference\_steps

integer

No

30

1 ~ 40

The number of inference steps to perform.

duration

integer

No

5

5 ~ 10

The duration of the generated media in seconds.

strength

number

No

0.9

0.10 ~ 1.00

guidance\_scale

number

No

5

0.00 ~ 20.00

The guidance scale to use for the generation.

flow\_shift

number

No

3

1.0 ~ 10.0

The shift value for the timestep schedule for flow matching.

seed

integer

No

\-1

\-1 ~ 2147483647

The random seed to use for the generation. -1 means a random seed will be used.

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

[Wan 2.1 V2V 480p](/docs/docs-api/wavespeed-ai/wan-2.1-v2v-480p "Wan 2.1 V2V 480p")[Wan 2.1 V2V 480p LoRA Ultra Fast](/docs/docs-api/wavespeed-ai/wan-2.1-v2v-480p-lora-ultra-fast "Wan 2.1 V2V 480p LoRA Ultra Fast")