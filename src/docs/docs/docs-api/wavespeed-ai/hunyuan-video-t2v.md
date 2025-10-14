# /docs/docs-api/wavespeed-ai/hunyuan-video-t2v

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/hunyuan-video-t2v

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Hunyuan Video T2V

# Hunyuan Video T2V

Hunyuan Video T2V

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/hunyuan-video/t2v)

HunyuanVideo is an advanced text-to-video generation model that can create high-quality videos from text descriptions.

## Features[](#features)

# HunyuanVideo

HunyuanVideo is an advanced text-to-video generation model that can create high-quality videos from text descriptions. It features a comprehensive framework that integrates image-video joint model training and efficient infrastructure for large-scale model training and inference.

## Model Description[](#model-description)

This model is trained on a spatial-temporally compressed latent space and uses a large language model for text encoding. According to professional human evaluation results, HunyuanVideo outperforms previous state-of-the-art models in terms of text alignment, motion quality, and visual quality.

## Key features[](#key-features)

*   🎨 High-quality video generation from text descriptions
*   📐 Support for various aspect ratios and resolutions
*   ✍️ Advanced prompt handling with a built-in rewrite system
*   🎯 Stable motion generation and temporal consistency

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/hunyuan-video/t2v" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "size": "1280*720",
    "seed": -1,
    "num_inference_steps": 30
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

1280\*720

1280\*720, 720\*1280

The size of the generated media in pixels (width\*height).

seed

integer

No

\-1

\-1 ~ 2147483647

The random seed to use for the generation. -1 means a random seed will be used.

num\_inference\_steps

integer

No

30

2 ~ 30

The number of inference steps to perform.

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

[Hunyuan Video I2V](/docs/docs-api/wavespeed-ai/hunyuan-video-i2v "Hunyuan Video I2V")[Hunyuan3d V2 Base](/docs/docs-api/wavespeed-ai/hunyuan3d-v2-base "Hunyuan3d V2 Base")