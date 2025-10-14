# /docs/docs-api/wavespeed-ai/framepack

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/framepack

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Framepack

# Framepack

Framepack

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/framepack)

Framepack is an efficient Image-to-video model that autoregressively generates videos.

## Features[](#features)

# Framepack

FramePack is a next-frame (next-frame-section) prediction neural network structure that generates videos progressively.

FramePack compresses input contexts to a constant length so that the generation workload is invariant to video length.

FramePack can process a very large number of frames with 13B models even on laptop GPUs.

FramePack can be trained with a much larger batch size, similar to the batch size for image diffusion training.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/framepack" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "aspect_ratio": "16:9",
    "resolution": "720p",
    "seed": 0,
    "num_inference_steps": 25,
    "num_frames": 180,
    "guidance_scale": 10
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

The URL of the video to generate the audio for.

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

aspect\_ratio

string

No

16:9

16:9, 9:16

The aspect ratio of the generated media.

resolution

string

No

720p

720p, 480p

The resolution of the video to generate. 720p generations cost 1.5x more than 480p generations.

seed

integer

No

\-

\-1 ~ 2147483647

The random seed to use for the generation.

num\_inference\_steps

integer

No

25

4 ~ 50

The number of inference steps to perform.

num\_frames

integer

No

180

30 ~ 1800

The duration of the audio to generate.

guidance\_scale

number

No

10

0 ~ 32

The guidance scale to use for the generation.

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

[Flux Srpo Image To Image](/docs/docs-api/wavespeed-ai/flux-srpo-image-to-image "Flux Srpo Image To Image")[Ghibli](/docs/docs-api/wavespeed-ai/ghibli "Ghibli")