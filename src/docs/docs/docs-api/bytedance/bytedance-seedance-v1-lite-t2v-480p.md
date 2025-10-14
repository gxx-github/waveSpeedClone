# /docs/docs-api/bytedance/bytedance-seedance-v1-lite-t2v-480p

来源: https://wavespeed.ai/docs/docs-api/bytedance/bytedance-seedance-v1-lite-t2v-480p

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Bytedance](/docs/docs-api/bytedance/bytedance-avatar-omni-human "Bytedance")Bytedance Seedance V1 Lite T2V 480p

# Bytedance Seedance V1 Lite T2V 480p

Bytedance Seedance V1 Lite T2V 480p

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/bytedance/seedance-v1-lite-t2v-480p)

ByteDance Seedance is an advanced AI video model that excels in coherent multi-shot video generation. It can deliver smooth, stable motion, and accurately follow detailed prompts for complex video content.

## Features[](#features)

# Seedance 1.0

_A video generation model that creates videos from text prompts and images._

* * *

## 🌟 Core Capabilities[](#-core-capabilities)

### 🎬 Video Generation[](#-video-generation)

*   **Text-to-Video (T2V):** Generate videos from text descriptions
*   **Image-to-Video (I2V):** Generate videos from static images with optional text prompts
*   **Resolution:** Outputs 1080p videos

### 🎥 Motion and Dynamics[](#-motion-and-dynamics)

*   Wide dynamic range supporting both subtle and large-scale movements
*   Maintains physical realism and stability across motion sequences
*   Handles complex action sequences and multi-agent interactions

### 🧩 Multi-Shot Support[](#-multi-shot-support)

*   Native multi-shot video generation with narrative coherence
*   Maintains consistency in subjects, visual style, and atmosphere across shot transitions
*   Handles temporal and spatial shifts between scenes

### 🎨 Style and Aesthetics[](#-style-and-aesthetics)

*   Supports diverse visual styles: photorealism, cyberpunk, illustration, felt texture, and more
*   Interprets stylistic prompts accurately
*   Maintains cinematic quality with rich visual details

### 🧠 Prompt Understanding[](#-prompt-understanding)

*   Parses natural language descriptions effectively
*   Stable control over camera movements and positioning
*   Accurate interpretation of complex scene descriptions
*   Strong prompt adherence across generated content

* * *

## ⚙️ Technical Specifications[](#️-technical-specifications)

*   **Model Version:** 1.0
*   **Output Resolution:** 1080p
*   **Input Types:** Text prompts, images (for I2V mode)
*   **Video Length:** Multi-shot capable (specific duration limits not specified)

* * *

## 📊 Model Performance[](#-model-performance)

Based on internal benchmarks using `SeedVideoBench-1.0` and third-party evaluations:

*   High scores in prompt adherence
*   Strong motion quality ratings
*   Competitive aesthetic quality
*   Effective source image consistency in I2V tasks

* * *

## 🎯 Use Cases[](#-use-cases)

*   Creative video content generation
*   Prototype development for film and animation
*   Commercial video production
*   Educational and documentary content
*   Fantasy and surreal video creation

* * *

## ⚠️ Limitations[](#️-limitations)

*   Performance metrics based on specific benchmark datasets
*   Actual generation quality may vary with prompt complexity
*   Multi-shot consistency depends on prompt clarity and scene descriptions

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/bytedance/seedance-v1-lite-t2v-480p" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{
    "aspect_ratio": "16:9",
    "duration": 5,
    "camera_fixed": false,
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

The positive prompt for the generation.

aspect\_ratio

string

No

16:9

21:9, 16:9, 4:3, 1:1, 3:4, 9:16, 9:21

The aspect ratio of the generated media.

duration

integer

Yes

5

5 ~ 10

The duration of the generated media in seconds.

camera\_fixed

boolean

No

false

\-

Whether to fix the camera position.

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

[Bytedance Seedance V1 Lite T2V 1080p](/docs/docs-api/bytedance/bytedance-seedance-v1-lite-t2v-1080p "Bytedance Seedance V1 Lite T2V 1080p")[Bytedance Seedance V1 Lite T2V 720p](/docs/docs-api/bytedance/bytedance-seedance-v1-lite-t2v-720p "Bytedance Seedance V1 Lite T2V 720p")