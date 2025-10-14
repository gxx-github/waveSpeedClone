# /docs/docs-api/wavespeed-ai/wan-2.2-t2v-720p-lora-ultra-fast

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/wan-2.2-t2v-720p-lora-ultra-fast

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Wan 2.2 T2V 720p LoRA Ultra Fast

# Wan 2.2 T2V 720p LoRA Ultra Fast

Wan 2.2 T2V 720p LoRA Ultra Fast

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/wan-2.2/t2v-720p-lora-ultra-fast)

Generate unlimited AI videos with Wan 2.2 text to video model, supporting custom LoRAs.

## Features[](#features)

# Wan 2.2 AI Video Model

Wan 2.2 is a new generation multimodal generative model launched by WAN AI. This model adopts an innovative MoE (Mixture of Experts) architecture, consisting of high-noise and low-noise expert models. It can divide expert models according to denoising timesteps, thus generating higher quality video content.

## Key Features of Wan 2.2[](#key-features-of-wan-22)

*   cinematic-level aesthetic control, deeply integrating professional film industry aesthetic standards, supporting multi-dimensional visual control such as lighting, color, and composition;
*   large-scale complex motion, easily restoring various complex motions and enhancing the smoothness and controllability of motion;
*   precise semantic compliance, excelling in complex scenes and multi-object generation, better restoring users’ creative intentions. The model supports multiple generation modes such as text-to-video and image-to-video, suitable for content creation, artistic creation, education and training, and other application scenarios.

## Model Highlights[](#model-highlights)

*   Cinematic-level Aesthetic Control: Professional camera language, supports multi-dimensional visual control such as lighting, color, and composition
*   Large-scale Complex Motion: Smoothly restores various complex motions, enhances motion controllability and naturalness
*   Precise Semantic Compliance: Complex scene understanding, multi-object generation, better restoring creative intentions

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/wan-2.2/t2v-720p-lora-ultra-fast" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "size": "1280*720",
    "duration": 5,
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

prompt

string

Yes

\-

The positive prompt for the generation.

negative\_prompt

string

No

\-

The negative prompt for the generation.

size

string

No

1280\*720

1280\*720, 720\*1280

The size of the generated media in pixels (width\*height).

duration

integer

No

5

5, 8

The duration of the generated media in seconds.

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

high\_noise\_loras

array

No

\-

\-

List of high noise LoRAs to apply (max 3).

low\_noise\_loras

array

No

\-

\-

List of low noise LoRAs to apply (max 3).

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

[Wan 2.2 T2V 720p LoRA](/docs/docs-api/wavespeed-ai/wan-2.2-t2v-720p-lora "Wan 2.2 T2V 720p LoRA")[Wan 2.2 T2V 720p Ultra Fast](/docs/docs-api/wavespeed-ai/wan-2.2-t2v-720p-ultra-fast "Wan 2.2 T2V 720p Ultra Fast")