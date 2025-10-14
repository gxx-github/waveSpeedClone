# /docs/docs-api/kwaivgi/kwaivgi-kling-v2.0-i2v-master

来源: https://wavespeed.ai/docs/docs-api/kwaivgi/kwaivgi-kling-v2.0-i2v-master

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Kwaivgi](/docs/docs-api/kwaivgi/kwaivgi-kling-effects "Kwaivgi")Kwaivgi Kling V2.0 I2V Master

# Kwaivgi Kling V2.0 I2V Master

Kwaivgi Kling V2.0 I2V Master

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/kwaivgi/kling-v2.0-i2v-master)

Kling 2.0 is the latest AI video model from Kling AI that improves upon its predecessor, the Kling 1.6 model. This new release features improved prompt understanding, enhanced character motion dynamics, greater visual quality, and even a ‘Multi-Elements Editor’ that makes video editing more accessible, flexible, and efficient.

## Features[](#features)

# Kling 2.0 Key Features

## Enhanced Prompt Adherence[](#enhanced-prompt-adherence)

Kling 2.0 interprets complex user prompts with sequential actions more precisely than ever. It can accurately understand intricate character actions, delicate expressions, and advanced camera movements, allowing professional-grade control over visual sequences.

* * *

## Better Motion Dynamics[](#better-motion-dynamics)

Kling 2.0 supports a greater motion range with more natural and fluid character movements. It generates immersive sequences simulating complex motions with realistic detail.

* * *

## Improved Visual Aesthetics[](#improved-visual-aesthetics)

Kling 2.0 produces higher-quality videos featuring richer details and more accurate visual style control. It enables cinematic-level sequences with dramatic expressions and consistent styles using reference images.

* * *

## Multi-Elements Editor[](#multi-elements-editor)

Kling 2.0 introduces a powerful video editor that allows users to add, swap, or delete video content using text or image inputs. Users can swap elements such as clothing or even entire subjects, enabling greater customization and creative control.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/kwaivgi/kling-v2.0-i2v-master" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "guidance_scale": 0.5,
    "duration": 5
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

First frame of the video; Supported image formats include.jpg/.jpeg/.png; The image file size cannot exceed 10MB, and the image resolution should not be less than 300\*300px, and the aspect ratio of the image should be between 1:2.5 ~ 2.5:1.

end\_image

string

No

\-

\-

Tail frame of the video; Supported image formats include.jpg/.jpeg/.png; The image file size cannot exceed 10MB, and the image resolution should not be less than 300\*300px.

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

guidance\_scale

number

No

0.5

0.00 ~ 1.00

The guidance scale to use for the generation.

duration

integer

No

5

5, 10

The duration of the generated media in seconds.

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

[Kwaivgi Kling V1.6 T2V Standard](/docs/docs-api/kwaivgi/kwaivgi-kling-v1.6-t2v-standard "Kwaivgi Kling V1.6 T2V Standard")[Kwaivgi Kling V2.0 T2V Master](/docs/docs-api/kwaivgi/kwaivgi-kling-v2.0-t2v-master "Kwaivgi Kling V2.0 T2V Master")