# /docs/docs-api/minimax/minimax-hailuo-02-i2v-standard

来源: https://wavespeed.ai/docs/docs-api/minimax/minimax-hailuo-02-i2v-standard

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Minimax](/docs/docs-api/minimax/minimax-hailuo-02-fast "Minimax")Minimax Hailuo 02 I2V Standard

# Minimax Hailuo 02 I2V Standard

Minimax Hailuo 02 I2V Standard

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/minimax/hailuo-02/i2v-standard)

Hailuo 02 is a new AI video generation model, from Hailuo AI, created on MiniMax’s evolving framework. It has been fine-tuned to deliver ultra-clear 768P resolution and unprecedented responsiveness while even handling, the craziest of physics driven scenes.

## Features[](#features)

Hailuo 02 is a new AI video generation model, from Hailuo AI, created on MiniMax’s evolving framework. It has been fine-tuned to deliver ultra-clear 768P resolution and unprecedented responsiveness while even handling, the craziest of physics driven scenes.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/minimax/hailuo-02/i2v-standard" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "duration": 6,
    "enable_prompt_expansion": false
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

No

\-

The positive prompt for the generation.

image

string

Yes

\-

The model generates video with the picture passed in as the first frame.Base64 encoded strings in data:image/jpeg; base64,{data} format for incoming images, or URLs accessible via the public network. The uploaded image needs to meet the following conditions: Format is JPG/JPEG/PNG; The aspect ratio is greater than 2:5 and less than 5:2; Short side pixels greater than 300px; The image file size cannot exceed 20MB.

end\_image

string

No

\-

\-

The model generates video with the picture passed in as the last frame.Base64 encoded strings in data:image/jpeg; base64,{data} format for incoming images, or URLs accessible via the public network. The uploaded image needs to meet the following conditions: Format is JPG/JPEG/PNG; The aspect ratio is greater than 2:5 and less than 5:2; Short side pixels greater than 300px; The image file size cannot exceed 20MB.

duration

integer

No

6

6, 10

The duration of the generated media in seconds.

enable\_prompt\_expansion

boolean

No

false

\-

The model automatically optimizes incoming prompts to enhance output quality. This also activates the safety checker, which ensures content safety by detecting and filtering potential risks.

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

[Minimax Hailuo 02 I2V Pro](/docs/docs-api/minimax/minimax-hailuo-02-i2v-pro "Minimax Hailuo 02 I2V Pro")[Minimax Hailuo 02 Pro](/docs/docs-api/minimax/minimax-hailuo-02-pro "Minimax Hailuo 02 Pro")