# /docs/docs-api/wavespeed-ai/wan-2.1-14b-vace

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/wan-2.1-14b-vace

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")Wan 2.1 14b Vace

# Wan 2.1 14b Vace

Wan 2.1 14b Vace

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/wan-2.1-14b-vace)

VACE is an all-in-one model designed for video creation and editing. It encompasses various tasks, including reference-to-video generation (R2V), video-to-video editing (V2V), and masked video-to-video editing (MV2V), allowing users to compose these tasks freely. This functionality enables users to explore diverse possibilities and streamlines their workflows effectively, offering a range of capabilities, such as Move-Anything, Swap-Anything, Reference-Anything, Expand-Anything, Animate-Anything, and more.

## Features[](#features)

# Wan2.1 VACE: Three Core Capabilities Analysis

## Multi-modal Information Input,Making video generation more controllable.[](#multi-modal-information-inputmaking-video-generation-more-controllable)

Traditional video generation workflows, once completed, make it difficult to adjust character postures, actions, scene transitions, and other details. Wan2.1 VACE provides powerful controllable capabilities, supporting generation based on human poses, motion flow, structural preservation, spatial movement, camera angles, and other controls, while also supporting video generation based on themes and background references.

The core technology behind this is Wan VACE’s multi-modal input mechanism. Unlike traditional models that rely solely on text prompts, Wan VACE(Wan2.1 VACE) has built a unified input system that integrates text, images, videos, masks, and control signals.

For image input, Wan VACE (Wan 2.1 VACE) supports object reference images or video frames. For video input, users can use Wan VACE to regenerate content through operations such as erasing and local expansion. For local regions, users can specify editing areas through binary 0/1 signals. For control signals, Wan VACE (Wan2.1 VACE) supports depth maps, optical flow, layouts, grayscale, line drawings, and pose estimation.

## Unified Single Model - One-Stop Solution for Multiple Tasks[](#unified-single-model---one-stop-solution-for-multiple-tasks)

Wan VACE (Wan2.1 VACE) supports content replacement, addition, or deletion operations in specified areas within videos. In terms of time dimension, Wan VACE can arbitrarily extend the video length at the beginning or end. In terms of spatial dimension, it supports progressive generation of backgrounds or specific regions, such as background replacement - under the premise of preserving the main subject, the background environment can be changed according to prompts.

## Free Combination of Multiple Tasks - Unleashing AI Creative Boundaries[](#free-combination-of-multiple-tasks---unleashing-ai-creative-boundaries)

Wan VACE(Wan2.1 VACE) also supports the free combination of various single-task capabilities, breaking through the limitations of traditional expert models that work in isolation. As a unified model, it can naturally integrate capabilities such as video generation, pose control, background replacement, and local region editing. There’s no need to train new models for single-function tasks separately.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/wan-2.1-14b-vace" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "task": "depth",
    "duration": 5,
    "size": "832*480",
    "num_inference_steps": 30,
    "guidance_scale": 5,
    "flow_shift": 16,
    "context_scale": 1,
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

prompt

string

Yes

\-

images

array

No

\[\]

\-

URL of ref images to use while generating the video.

video

string

No

\-

The video for generating the output.

task

string

No

depth

depth, pose, face, inpainting, none

Extract control information from the provided video to guide video generation.

negative\_prompt

string

No

\-

The negative prompt for the generation.

mask\_video

string

No

\-

\-

URL of the mask video.

mask\_image

string

No

\-

URL of the mask image.

first\_image

string

No

\-

\-

URL of the first image.

last\_image

string

No

\-

\-

URL of the last image.

duration

integer

No

5

5 ~ 10

The duration of the generated media in seconds.

size

string

No

832\*480

832\*480, 480\*832, 1280\*720, 720\*1280

The size of the generated media in pixels (width\*height).

num\_inference\_steps

integer

No

30

1 ~ 40

The number of inference steps to perform.

guidance\_scale

number

No

5

0.0 ~ 20.0

The guidance scale to use for the generation.

flow\_shift

number

No

16

0.0 ~ 30.0

The shift value for the timestep schedule for flow matching.

context\_scale

number

No

1

0.0 ~ 2.0

Controls how close you want the model to stick to the reference context.

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

[Wan 2.1 14b LoRA Trainer](/docs/docs-api/wavespeed-ai/wan-2.1-14b-lora-trainer "Wan 2.1 14b LoRA Trainer")[Wan 2.1 I2V 480p](/docs/docs-api/wavespeed-ai/wan-2.1-i2v-480p "Wan 2.1 I2V 480p")