# /docs/docs-api/ideogram-ai/ideogram-ai-ideogram-v2

来源: https://wavespeed.ai/docs/docs-api/ideogram-ai/ideogram-ai-ideogram-v2

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Ideogram AI](/docs/docs-api/ideogram-ai/ideogram-ai-ideogram-character "Ideogram AI")Ideogram AI Ideogram V2

# Ideogram Ai Ideogram V2

Ideogram Ai Ideogram V2

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/ideogram-ai/ideogram-v2)

An excellent image model with state of the art inpainting, prompt comprehension and text rendering

## Features[](#features)

# Overview

Ideogram (pronounced “eye-dee-oh-gram”) is a free-to-use AI tool that turns your ideas into stunning images, in a matter of seconds. Ideogram excels at creating captivating designs, realistic images, innovative logos and posters. With unique capabilities like text rendering in images, we aim to inspire creativity and help every user bring their imagination to life.

# Features

[https://docs.ideogram.ai/using-ideogram/ideogram-features](https://docs.ideogram.ai/using-ideogram/ideogram-features)

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/ideogram-ai/ideogram-v2" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "style": "Auto",
    "aspect_ratio": "1:1",
    "enable_base64_output": false
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

The image to generate an image from.

mask\_image

string

No

\-

The mask image tells the model where to generate new pixels (white) and where to preserve the original image (black). It acts as a stencil or guide for targeted image editing.

style

string

No

Auto

Auto, General, Realistic, Design, Render 3D, Anime

The style of the generated image.

aspect\_ratio

string

No

1:1

1:1, 16:9, 9:16, 4:3, 3:4

The aspect ratio of the generated media.

enable\_base64\_output

boolean

No

false

\-

If enabled, the output will be encoded into a BASE64 string instead of a URL. This property is only available through the API.

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

[Ideogram AI Ideogram Character](/docs/docs-api/ideogram-ai/ideogram-ai-ideogram-character "Ideogram AI Ideogram Character")[Ideogram AI Ideogram V2 Turbo](/docs/docs-api/ideogram-ai/ideogram-ai-ideogram-v2-turbo "Ideogram AI Ideogram V2 Turbo")