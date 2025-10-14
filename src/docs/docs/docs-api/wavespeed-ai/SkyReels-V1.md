# /docs/docs-api/wavespeed-ai/SkyReels-V1

来源: https://wavespeed.ai/docs/docs-api/wavespeed-ai/SkyReels-V1

[WaveSpeedAI API](/docs/docs-api/webhooks "WaveSpeedAI API")[Wavespeed AI](/docs/docs-api/wavespeed-ai/any-llm "Wavespeed AI")SkyReels V1

# SkyReels V1

SkyReels V1

## Playground[](#playground)

[Try it on WavespeedAI!](https://wavespeed.ai/models/wavespeed-ai/SkyReels-V1)

SkyReels V1 is the first and most advanced open-source human-centric video foundation model. By fine-tuning HunyuanVideo on O(10M) high-quality film and television clips.

## Features[](#features)

# SkyReels V1: Human-Centric Video Foundation Model

## 🌟 Overview[](#-overview)

SkyReels V1 is the first and most advanced open-source human-centric video foundation model. By fine-tuning [HunyuanVideo](https://huggingface.co/tencent/HunyuanVideo) on O(10M) high-quality film and television clips, SkyReels V1 offers three key advantages:

1.  **Open-Source Leadership**: Our Text-to-Video model achieves state-of-the-art (SOTA) performance among open-source models, comparable to proprietary models like Kling and Hailuo.
2.  **Advanced Facial Animation**: Captures 33 distinct facial expressions with over 400 natural movement combinations, accurately reflecting human emotions.
3.  **Cinematic Lighting and Aesthetics**: Trained on high-quality Hollywood-level film and television data, each generated frame exhibits cinematic quality in composition, actor positioning, and camera angles.

## 🔑 Key Features[](#-key-features)

### 1\. Self-Developed Data Cleaning and Annotation Pipeline[](#1-self-developed-data-cleaning-and-annotation-pipeline)

Our model is built on a self-developed data cleaning and annotation pipeline, creating a vast dataset of high-quality film, television, and documentary content.

*   **Expression Classification**: Categorizes human facial expressions into 33 distinct types.
*   **Character Spatial Awareness**: Utilizes 3D human reconstruction technology to understand spatial relationships between multiple people in a video, enabling film-level character positioning.
*   **Action Recognition**: Constructs over 400 action semantic units to achieve a precise understanding of human actions.
*   **Scene Understanding**: Conducts cross-modal correlation analysis of clothing, scenes, and plots.

## Authentication[](#authentication)

For authentication details, please refer to the [Authentication Guide](/docs/docs-authentication).

## API Endpoints[](#api-endpoints)

### Submit Task & Query Result[](#submit-task--query-result)

cURLPythonJavaScript

```bash

# Submit the task
curl --location --request POST "https://api.wavespeed.ai/api/v3/wavespeed-ai/SkyReels-V1" \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${WAVESPEED_API_KEY}" \
--data-raw '{}'

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

Yes

\-

URL of the image input.

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

[Real Esrgan](/docs/docs-api/wavespeed-ai/real-esrgan "Real Esrgan")[Song Generation](/docs/docs-api/wavespeed-ai/song-generation "Song Generation")