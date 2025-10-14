# /docs/docs-api/wavespeed-ai/ltx-video-v097-i2v-720p

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/ltx-video-v097-i2v-720p

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Ltx Video V097 I2V 720p

# Ltx Video V097 I2V 720p

Ltx Video V097 I2V 720p

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/ltx-video-v097/i2v-720p)

Generate videos from prompts and images using LTX Video-0.9.7.

## Features[](#features)

# LTX Video-0.9.7

LTX-Video is the first DiT-based video generation model capable of generating high-quality videos in real-time. It produces 30 FPS videos at a 1216×704 resolution faster than they can be watched. Trained on a large-scale dataset of diverse videos, the model generates high-resolution videos with realistic and varied content. We provide a model for both text-to-video as well as image+text-to-video usecases

# General tips

*   The model works on resolutions that are divisible by 32 and number of frames that are divisible by 8 + 1 (e.g. 257). In case the resolution or number of frames are not divisible by 32 or 8 + 1, the input will be padded with -1 and then cropped to the desired resolution and number of frames.
*   The model works best on resolutions under 720 x 1280 and number of frames below 257.
*   Prompts should be in English. The more elaborate the better. Good prompt looks like The turquoise waves crash against the dark, jagged rocks of the shore, sending white foam spraying into the air. The scene is dominated by the stark contrast between the bright blue water and the dark, almost black rocks. The water is a clear, turquoise color, and the waves are capped with white foam. The rocks are dark and jagged, and they are covered in patches of green moss. The shore is lined with lush green vegetation, including trees and bushes. In the background, there are rolling hills covered in dense forest. The sky is cloudy, and the light is dim.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/ltx-video-v097/i2v-720p" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "size": "1280*720"
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

Image URL for Image-to-Video task.

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

720\*1280, 1280\*720

The size of the generated media in pixels (width\*height).

seed

integer

No

\-

\-1 ~ 2147483647

The random seed to use for the generation.

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

[Ltx Video V097 I2V 480p](/docs/docs-api/wavespeed-ai/ltx-video-v097-i2v-480p "Ltx Video V097 I2V 480p")[Lynx](/docs/docs-api/wavespeed-ai/lynx "Lynx")