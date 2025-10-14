# /docs/docs-api/wavespeed-ai/video-face-swap

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/video-face-swap

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Video Face Swap

# Video Face Swap

Video Face Swap

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/video-face-swap)

AI Video Face Swap lets you easily swap faces in videos online. To use the tool, simply visit the website and upload a video file and an image file.

## Features[](#features)

# AI Video Face Swap \[Unlimited\]

## What is AI Video Face Swap?[](#what-is-ai-video-face-swap)

AI Video Face Swap is an AI-powered tool that allows you to replace faces in videos with any face of your choice. It uses advanced machine learning algorithms to detect faces and seamlessly swap them while maintaining natural expressions and movements.

## Pricing[](#pricing)

Our endpoint starts with **$0.05 per 5 seconds** video generation and supports a maximum generation length of **10 minutes**.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/video-face-swap" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "target_gender": "all",
    "target_index": 0,
    "max_duration": 0
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

The video that contains the face to be replaced.

face\_image

string

Yes

\-

\-

The face image as reference.

target\_gender

string

No

all

all, female, male

Gender filter for target faces to be swapped. 'all' means no filter.

target\_index

integer

No

\-

0 ~ 10

0 = largest face. To switch to another target face - switch to index 1, e.t.c.

max\_duration

integer

No

\-

0 ~ 600

Max duration of the output video in seconds. 0 means no limit.

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

[Uno](/docs/docs-api/wavespeed-ai/uno "Uno")[Video Upscaler](/docs/docs-api/wavespeed-ai/video-upscaler "Video Upscaler")