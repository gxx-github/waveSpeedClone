# /docs/docs-api/wavespeed-ai/think-sound

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/think-sound

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Think Sound

# Think Sound

Think Sound

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/think-sound)

Upload a video and provide a text description to generate realistic audio.

## Features[](#features)

# ThinkSound

## What is ThinkSound?[](#what-is-thinksound)

ThinkSound is a cutting-edge video-to-audio generation model. By leveraging advanced deep learning techniques, this model can generate high-quality, realistic audio that aligns perfectly with the content of the input video.

## Key Features:[](#key-features)

*   **Video-to-Audio Generation**: Converts video content into corresponding audio tracks, enhancing the overall multimedia experience.
*   **High-Quality Output**: Produces clear and realistic audio that matches the context and actions depicted in the video.

## Tips[](#tips)

For optimal results, ensure that the input video has clear visuals and distinct actions or events that can be translated into audio.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/think-sound" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
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

No

\-

The positive prompt for the generation.

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

[Step1x Edit](/docs/docs-api/wavespeed-ai/step1x-edit "Step1x Edit")[Uno](/docs/docs-api/wavespeed-ai/uno "Uno")