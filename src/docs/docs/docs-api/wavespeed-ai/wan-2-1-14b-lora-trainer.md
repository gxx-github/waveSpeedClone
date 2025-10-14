# /docs/docs-api/wavespeed-ai/wan-2.1-14b-lora-trainer

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/wan-2.1-14b-lora-trainer

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Wan 2.1 14b LoRA Trainer

# Wan 2.1 14b LoRA Trainer

Wan 2.1 14b LoRA Trainer

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/wan-2.1-14b-lora-trainer)

Train custom Wan 2.1 LoRA models 10x faster. Style training, character training, object training. From concept to model in minutes, not hours. Upload a ZIP file containing images to start!

## Features[](#features)

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/wan-2.1-14b-lora-trainer" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "trigger_word": "p3r5on",
    "steps": 2000,
    "learning_rate": 0.0001,
    "lora_rank": 32
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

data

string

Yes

\-

\-

To train a WAN Lora, you need at least 10 face images to achieve good results.you can check out our default image dataset.

trigger\_word

string

No

p3r5on

\-

The phrase that will trigger the model to generate an video.

steps

integer

No

2000

1000 ~ 10000

Number of steps to train the LoRA on.

learning\_rate

number

No

0.0001

0.00000 ~ 1.00000

lora\_rank

integer

No

32

1 ~ 64

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

[Video Watermark Remover](/docs/docs-api/wavespeed-ai/video-watermark-remover "Video Watermark Remover")[Wan 2.1 14b Vace](/docs/docs-api/wavespeed-ai/wan-2.1-14b-vace "Wan 2.1 14b Vace")