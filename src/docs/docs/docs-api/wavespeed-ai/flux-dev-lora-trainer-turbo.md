# /docs/docs-api/wavespeed-ai/flux-dev-lora-trainer-turbo

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/flux-dev-lora-trainer-turbo

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Flux Dev LoRA Trainer Turbo

# Flux Dev LoRA Trainer Turbo

Flux Dev LoRA Trainer Turbo

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/flux-dev-lora-trainer-turbo)

Train custom FLUX LoRA models 10x faster. Style training, character training, object training. From concept to model in minutes, not hours. Upload a ZIP file containing images to start!

## Features[](#features)

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/flux-dev-lora-trainer" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "trigger_word": "p3r5on",
    "steps": 1000,
    "learning_rate": 0.0004,
    "lora_rank": 16
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

URL to zip archive with images. Try to use at least 4 images in general the more the better. In addition to images the archive can contain text files with captions. Each text file should have the same name as the image file it corresponds to.

trigger\_word

string

No

p3r5on

\-

Trigger word to be used in the captions. If None, a trigger word will not be used. If no captions are provide the trigger\_word will be used instead of captions. If captions are the trigger word will not be used.

steps

integer

No

1000

1000 ~ 10000

Number of steps to train the LoRA on.

learning\_rate

number

No

0.0004

0.00000 ~ 1.00000

lora\_rank

integer

No

16

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

[Flux Dev LoRA Trainer](/docs/docs-api/wavespeed-ai/flux-dev-lora-trainer "Flux Dev LoRA Trainer")[Flux Dev LoRA Ultra Fast](/docs/docs-api/wavespeed-ai/flux-dev-lora-ultra-fast "Flux Dev LoRA Ultra Fast")